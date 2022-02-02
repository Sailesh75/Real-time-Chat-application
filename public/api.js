const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:270127/chat-api")
.then(()=>console.log('Connection Successful'))
.catch((err)=>console.log(err));

