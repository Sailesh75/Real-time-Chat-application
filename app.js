const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http)

const PORT = process.env.PORT || 3000;
 
http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))  //using express middleware
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/form',(req,res)=>{
    const {clientname,message}=req.body;
    let msg = {
        user:clientname,message:message
    }
    io.emit("message",msg);
    io.on("message",(msg)=>{
        console.log(msg)
    })
    res.status(201).json({message:"Message SEND!!"})    
})

// Socket 

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })
})