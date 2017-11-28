var express = require('express');//require the module
var app = express();
var server = app.listen(3000);
app.use(express.static('public'));

console.log("server is running");

//////////////////////////////////
var oauth2lib = require('oauth20-provider');
var oauth2 = new oauth2lib({log: {level: 2}});
server.use(oauth2.inject());

var socket = require('socket.io');
var io = socket(server);
//listen, when hear 'connection' signal, do newConnection function
io.sockets.on('connection', newConnection);

//send information to the client
function newConnection(socket){
  console.log('new connection:' +socket.id);
//when the socket receive the message named"mouse", do the function mouseMsg
  socket.on('mouse', mouseMsg);//receive the message

  function mouseMsg(data){
    console.log(data);
    socket.broadcast.emit("mouse", data);//broadcast except the client sent the meaasge
    // io.sockets.emit('mouse', data);//broadcast to all clients
  }
}


var NounProject = require('the-noun-project'),
nounProject = new NounProject({
    key: 'eab81cdcad5b43488000081008512040',
    secret: 'f90397b099564ea58ffb6bc7a6daf4a6'
});
