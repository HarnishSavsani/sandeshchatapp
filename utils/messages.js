const moment =require('moment');//this library is used to display realtime time,day.
function formatMessage(username, text){
    return {
        username,
        text,
        time:moment().utcOffset("+05:30").format('h:mm a')

    }
}
module.exports=formatMessage;