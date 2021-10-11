const chatForm =document.getElementById('chat-form')
const socket = io();
const chatMessages=document.querySelector('.chat-messages');
const roomname=document.getElementById('room-name');
const userlist=document.getElementById('users');
const chatsidebar=document.querySelector('.chat-sidebar');
const headername=document.getElementById('headername');
let a,b;

const {username,room,password}=Qs.parse(location.search,{
  ignoreQueryPrefix: true
});

socket.emit('joinRoom',{username,room,password});

socket.on('roomUsers',({users,password})=>{
  OutputRoomName(password);
  OutputUsers(users);
  chatsidebar.scrollTop=chatsidebar.scrollHeight;
})
socket.on('header',username=>{
  a=username;
  Outputheader(username);
});
socket.on('id',id=>{
  b=id;
});


chatForm.addEventListener('submit',(e)=>{
  e.preventDefault();


  const msg=e.target.elements.msg.value;

  socket.emit('chatMessage',msg);
 
  
  e.target.elements.msg.value='';
  e.target.elements.msg.focus='';


});

socket.on('message',message =>{
  console.log(message);
  outputMessage(message);
chatMessages.scrollTop=chatMessages.scrollHeight;

});


function outputMessage(message){
  const div =document.createElement('div');
  if(message.username=="Sandesh Bot"){
    div.classList.add('center','message');
    div.innerHTML=`<p class ="text">${message.text}</p>`;
  }
 else if(message.username==a){
    div.classList.add('outgoing','message');
    div.innerHTML=`<p class ="text">${message.text}<span style="font-size:10px"> &nbsp;   ${message.time}<span></p>`;
  }
  else{
    div.classList.add('incoming','message');
    div.innerHTML=`<p class="meta">${message.username}<span style="font-size:10px"> &nbsp;   ${message.time}<span></p><p class ="text">${message.text}</p>`;
  }
  
  document.querySelector('.chat-messages').appendChild(div);
}

function OutputRoomName(password){
roomname.innerText=password;
}


function OutputUsers(users){
  userlist.innerHTML=`${users.map(user=>`<li>${user.username}</li>`).join('')}`;

}

function Outputheader(username){
  headername.innerText=username;
  }

