require("dotenv").config();
const express = require("express");
const cors = require("cors");
const socketio = require("socket.io");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("./models/User");
const Message = require("./models/Message");

const app = express();
app.use(express.json());
app.use(cors());

const http = require("http").createServer(app);

const io = socketio(http, {
  cors: {
    origin: "*",
  },
});

io.use((socket, next) => {  
  try {
    const token = socket.handshake.query.token;
    const secret = process.env.SECRET;
    const payload = jwt.verify(token, secret);

    socket.userId = payload.id
    socket.userName = payload.name

    next();
  } catch (err) {}
})

io.on("connection", (socket) => {
  Message.find().then((result) => {
    socket.emit("output-messages", result);
  });

  socket.on("message", async ({ message }) => {
    const messageInfo = { userId: socket.userId, name: socket.userName, message, datetime: new Date() };
    const messageDatabase = new Message(messageInfo);

    messageDatabase.save().then(() => {
      io.emit("message", messageInfo);
    });
  });
});

app.post("/auth/register", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  const serverResponse = (status, msg) => res.status(status).json({ msg });

  if (!name) {
    return serverResponse(422, "O nome é obrigatório!");
  }
  if (!email) {
    return serverResponse(422, "O email é obrigatório!");
  }
  if (!password) {
    return serverResponse(422, "A senha é obrigatória!");
  }
  if (password !== confirmPassword) {
    return serverResponse(422, "As senhas não conferem!");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return serverResponse(422, "Este email já possui cadastro!");
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    email,
    password: passwordHash,
  });

  try {
    await user.save();
    
    const secret = process.env.SECRET;
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
      },
      secret
    );

    return res.status(201).json({ msg: "Usuário criado com sucesso!", token });
  } catch {
    return serverResponse(
      500,
      "Aconteceu um erro no servidor, tente novamente mais tarde!"
    );
  }
});

app.post("/auth/user", async (req, res) => {
  const { email, password } = req.body;
  const serverResponse = (status, msg) => res.status(status).json({ msg });

  if (!email) {
    return serverResponse(422, "O email é obrigatório!");
  }
  if (!password) {
    return serverResponse(422, "A senha é obrigatória!");
  }

  const user = await User.findOne({ email });

  if (!user) {
    return serverResponse(404, "Usuário não encontrado!");
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return serverResponse(422, "Senha inválida!");
  }

  try {
    const secret = process.env.SECRET;

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
      },
      secret
    );

    res.status(200).json({ msg: "Usuário autenticado com sucesso!", token });
  } catch {
    return serverResponse(
      500,
      "Aconteceu um erro no servidor, tente novamente mais tarde!"
    );
  }
});

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbUrl = `mongodb+srv://${dbUser}:${dbPass}@cluster0.bxgmu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    http.listen(4000);
  })
  .catch((err) => console.log(err));
