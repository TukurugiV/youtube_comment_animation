const { LiveChat } = require("youtube-chat");
const fs = require("fs");

const liveCLient = new LiveChat({channelId:"UCMxIxoMdtcLkZ1wTq7qjztg"});

liveCLient.on("start", (liveId) => {
    console.log("start");
})

var users = [{
    name: null
}];

var userCount=0;

var chatGet = false;

liveCLient.on("chat", (chatItem) => {
    /*
    for(var i = 0; i < users.length-1; i++) {
        if(users[i].name != chatItem.author.name) {
            users.push({name: chatItem.author.name})
                io.emit('newUserComment', chatItem.message[0].text, chatItem.author.name);
                //console.log(chatItem.message[0])
                //console.log(Object.values(chatItem.message[0]).pop())
                console.log("newUserComment")
        }else{
            io.emit('UserCommet', chatItem.message[0].text, chatItem.author.name)
        }
    }
    console.log(Object.values(chatItem.message[0]).pop())
    io.emit('newComment', chatItem.message, chatItem.author.name);
    */
    
    
    io.emit('newUserComment', chatItem.message[0].text, chatItem.author.name);
    console.log(chatItem.message[0].text ,chatItem.author.name)
})


liveCLient.start()

const express = require('express');
const app = express();
const http=require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('animation'));
app.use(express.static('public'));

const port = 3000;

app.get('/', (req, res) => {
    console.log("get");
    fs.readFile('./public/index.html', 'utf-8', (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    });
});

app.get('/dev', (req, res) => {
    fs.readFile('./public/dev.html', 'utf-8', (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    });
});

var users = [null];
io.on("connection",function(socket){
    socket.on("DevCom",function(msg, name){
        if(users.includes(name) == false){
            io.emit("newUserComment", msg, name);
        }
    });
});

http.listen(3000);