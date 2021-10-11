const users=[];
//join user to chat
function userJoin(id,username,room,password){
    const user={id,username,room,password};
    users.push(user);
return user;
}

//get the current user
function getCurrentUser(id){
    return users.find(user=>user.id===id);
}
//user leaves
function userleave(id){
    const index=users.findIndex(user=>user.id===id);

    if(index!=-1)
    {
        return users.splice(index,1)[0];
    }

}

//get room user
function getRoomUsers(room){
return users.filter(user=>user.room===room)
}
module.exports={
    userJoin,
    getCurrentUser,
    userleave,
    getRoomUsers
}
