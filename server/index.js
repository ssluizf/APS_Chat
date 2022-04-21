const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  }
});

io.on('connection', socket => {
  socket.on('message', ({ name, message }) => {
    console.log({ name, message })
    io.emit('message', { name, message })
  })
})

http.listen(4000)