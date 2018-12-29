const express = require('express');
const app = express();
// Pasamos server a Socket.io para que entienda que va estar trabajando mediante la conexion HTTP
const server = require('http').Server(app);
const socketIO = require('socket.io')(server);
const port = 6677;

//Cargando una vista estatica por defecto
// Todos los html que hallan en el directorio cliente van a ser los html estaticos
app.use(express.static('client'));

let messages = [{
    id: 1,
    text: 'Bienvenido al chat privado de Socket.io y NodeJS',
    nickname: 'Bot - danielecheverry.com'
}];

// Abriendo conexion al socket
// Este metodo esta encargado de escuchar y recibir las conexiones de los clientes,
// lo detecta cada vez que un cliente se conecte a nuestro socket
socketIO.on('connection', function(socket) {
    console.log(`El cliente con IP ${ socket.handshake.address } se ha conectado`);

    // Mandando mensaje a los clientes
    socket.emit('messages', messages);

    // Recibiendo el mensaje del cliente
    socket.on('add-message', (data) => {
        messages.push(data);

        // Actualizando los mensajes a los clientes
        socketIO.sockets.emit('messages', messages);
    })

});

server.listen(port, function() {
    console.log(`Servidor trabajando en http://localhost:${port}`);
});

app.get('/hola-mundo', function(req, res) {
    res.status(200).send("Hola mundo desde una ruta");
});