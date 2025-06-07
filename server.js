const http = require('http');
const socketIO = require('socket.io');
const app = require('./app'); // Tu app de Express

const server = http.createServer(app);
const io = socketIO(server); // No necesitas cors si frontend y backend están en el mismo host:puerto

// Lógica de sockets
io.on('connection', (socket) => {
  console.log('🟢 Cliente conectado');

  socket.on('privateMessage', ({ from, to, message }) => {
    console.log(`📨 Mensaje de ${from} a ${to}: ${message}`);
    socket.broadcast.emit(`messageTo:${to}`, { from, message });
  });

  socket.on('disconnect', () => {
    console.log('🔴 Cliente desconectado');
  });
});

// Iniciar el servidor en el mismo puerto que usabas antes
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor escuchando en http://0.0.0.0:${PORT}`);
  });