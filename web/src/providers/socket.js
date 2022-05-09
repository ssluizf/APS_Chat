import io from "socket.io-client";

const socket = io("http://localhost:4000", {
  query: {
    token: localStorage.getItem("token"),
  },
});

export default socket;
