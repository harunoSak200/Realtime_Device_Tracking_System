const express = require('express') ; 
const app = express() ; 
const http = require("http") ; 
const socketio = require("socket.io") ; 
const path = require("path") ; 
const PORT = 3000 ; 

// creation of the server
const server = http.createServer(app) ; 

// upgrading from the http to the socket
const io = socketio(server) ; 

// middleware that helps us to use the ejs file
app.set("view engine" , "ejs") ; 

// serving static files (corrected line)
app.use(express.static(path.join(__dirname , "public"))) ; 
console.log("Serving static files from:", path.join(__dirname , "public")); 

// socket.io connection
io.on("connection" , function(socket){
    socket.on('send-location' , (data)=>{
        io.emit("receive-location" , {id : socket.id ,...data}) ; 
    }) ;
    socket.on("disconnect" , (data)=>{
        io.emit("user-disconnected" , socket.id)
    })
})



// root route
app.get("/" , (req , res)=>{
    res.render("index") ; 
})

// start the server
server.listen(PORT , ()=>{
    console.log(`App is running at http://localhost:${PORT}`) ; 
}) 
