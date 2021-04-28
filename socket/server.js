const httpServer = require("http").createServer();

const io = require("socket.io")(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

let sockets = []
io.on('connection', socket => {

    socket.on('create', (roomId) => {
        console.log('created room', roomId)
        socket.join(roomId);
        console.log(sockets)
        sockets.push({player: socket.id, username: null})
        io.to(roomId).emit('players-in-room', sockets)
        // io.to(roomId).emit('count', io.sockets.adapter.rooms.get(roomId) ? io.sockets.adapter.rooms.get(roomId).size : 0)
        socket.on('new-message', ({ username, message }) => {
            io.in(roomId).emit('incoming-message', { username, message });
        })

        //handle ready function
        socket.on('ready', (socketId) => {
            console.log(socketId + " is ready!")
            io.to(roomId).emit('player-ready', socketId)
        })

        //handle user adds username
        socket.on('name', (payload) => {
            sockets.find(s => s.player === payload.id).username = payload.username
            console.log(payload.id + " has username " + payload.username)
            console.log(sockets)
            io.to(roomId).emit('players-in-room', sockets)
        })

    // *************************************************************************************
        // HANDLE USER ENTERS ROOM
        socket.on("disconnect", () => {
            // io.to(roomId).emit('count', io.sockets.adapter.rooms.get(roomId) ? io.sockets.adapter.rooms.get(roomId).size : 0)
            sockets.splice(sockets.findIndex(s => s.player === socket.id), 1)
            if (io.sockets.adapter.rooms.get(roomId)) {
                io.to(roomId).emit('players-in-room', sockets)
            }
            // io.to(roomId).emit('admin-message', `${socket.id} has left`)
        });
    })
});

module.exports = httpServer;