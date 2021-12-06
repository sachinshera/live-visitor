const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const path = require("path");
const port = process.port || 3000;
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})

io.on("connection", socket => {
    console.log("a user connected");
    io.emit("visit", io.sockets.adapter.rooms.size);
    socket.on("disconnect", () => {
        io.emit("visit", io.sockets.adapter.rooms.size);
    })
})

http.listen(port, () => {
    console.log("app is running on ", port);
})

