const express = require('express');
const path =require('path');
const http =require('http');
const socketio=require('socket.io');
const formatMessage=require('./utils/messages');
const {userJoin,getCurrentUser,userleave,getRoomUsers}=require('./utils/users.js');


const app = express();
const server=http.createServer(app);
const io=socketio(server);

app.use(express.static(path.join(__dirname,'public')))
const botName='Sandesh Bot';

io.on('connection',socket=>{


  socket.on('joinRoom',({username,room,password})=>{
    //console.log('new connection');
    const user=userJoin(socket.id,username,room,password);
socket.join(user.room);

    socket.emit('header',`${user.username}`);
    socket.emit('id',`${user.id}`);
    socket.emit('message',formatMessage(botName,`${user.username} welcome to Sandesh`));
    
   
    socket.broadcast.to(user.room).emit('message',formatMessage(botName,`${user.username} has joined the chat`));
  

  io.to(user.room).emit('roomUsers',{
    //room:user.room,
    users:getRoomUsers(user.room),
    password:user.password
  });


  });
 
  
  
    socket.on('chatMessage',(msg)=>{

      const user=getCurrentUser(socket.id);
      io.to(user.room).emit('message',formatMessage(user.username,msg));
  });


socket.on('disconnect',() =>{
  const user=userleave(socket.id);

  io.to(user.room).emit('message',formatMessage(botName ,`${user.username} has left the chat`));
});

});
const PORT = process.env.PORT || 3000;

server.listen(PORT,()=>console.log(`server running on port ${PORT}`));
