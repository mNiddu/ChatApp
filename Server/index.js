const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
const http = require('http');
const { initializeSocket } = require('./socket'); // Import the initializeSocket function
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = initializeSocket(server); // Initialize Socket.io and pass the HTTP server instance

// Socket.io connection handling (already handled in socket.js, no need to duplicate)
// io.on('connection', (socket) => {
//   console.log('A user connected');

//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });
// });

// Routes setup
app.use('/api/Chat', require('./router/Register'));
app.use('/api/usercontact', require('./router/AddContact'));
app.use('/api/profile',express.static('./upload/Register'))
connectToMongo();

const port = process.env.PORT || 5000;
server.listen(port, () => console.log('Server is running on port ' + port));

module.exports = { io }; // Export io instance if needed elsewhere
