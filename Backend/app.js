//requiriendo dependencias 
const express = require('express');
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const socketio = require('socket.io')
const http = require('http')
const server = http.createServer(express)

var mongoose = require('mongoose');

var ChatController = require('./controller/chatController');
var Chat_routes = require('./routes/chatRouter');

//instancia de express
const app = express()

const io = socketio(server);


io.on('connection', (socket) => {
  console.log('usuario conectado');


  socket.on('chat', (msg) => {
    socket.broadcast.emit('chat', msg);
    console.log(msg);

    //guardar chats
    ChatController.guardarMensajeChat(msg);
  });

  //información del usuario conectado
  socket.on('info-usuario', (user) => {

    //guardar participantes
    ChatController.guardarParticipantes(user);

  });


  socket.on('disconnect', (msg) => {
    console.log('usuario desconectado');
  });
});

//iniciando el server de socket.io
// const io = socketio(server)
const PORT2 = process.env.PORT || 3000


const PORT = process.env.PORT || 3050

// Cargar ficheros rutas
var usuario_routes = require('./routes/RUsuario');



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});




// Añadir perfijos a rutas / cargar rutas
app.use('/api', usuario_routes);
app.use('/api', Chat_routes);

//corriendo el servidor
server.listen(PORT2, () => {
  console.log(`Server socket running on port ${PORT2}`)
})


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


mongoose.set("useFindAndModify", false);
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1:27017/cursoChats", { useNewUrlParser: true })
  .then(() => {

    console.log("conexion exitosa! mongoDB");




  });
