const http = require('http');

const app = require('express')();
const server = require('http').createServer(app);
const options={
    cors:true,
    origins:["localhost"],
}

const PORT = process.env.PORT || 5000;

const io = require('socket.io')(server, options);

const router = require('./router');
app.use(router);

// functions imported from the users helper class
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');

// to be performed when there's a connection to the server
io.on('connect', (socket) => {

    // to be performed for a specific instance of a connection that joins
    socket.on('join', ({ name, room }, callback) => {

      // attempts to add user if user does not exist
      const { error, user } = addUser({ id: socket.id, name, room });
        
      // if error with addUser, returns callback
      if(error) return callback(error);
        
      socket.join(user.room);
      
      console.log(`${user.name} has joined`);
      socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
      socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
  
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    });
  
    // to be performed for a specific instance of a connection that sends a message
    socket.on('sendMessage', (message, callback) => {
      const user = getUser(socket.id);
  
      io.to(user.room).emit('message', { user: user.name, text: message });
  
      callback();
    });
  
    // to be performed for a specific instance of a connection that disconnects
    socket.on('disconnect', () => {
      const user = removeUser(socket.id);
  
      if(user) {
        io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
      }
    })
  });

server.listen(PORT, ()=> console.log(`Server has started on port ${PORT}`));
