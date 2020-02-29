import { io } from "socket.io-client";

var socket = io(`http://localhost:3000`,{
    query:Date.getTime()
})

socket.on('connect', function(){
    console.log('connect')
});

socket.on('event', function(data){
    console.log('event')
});

socket.on('disconnect', function(){
    console.log('disconnect')
});