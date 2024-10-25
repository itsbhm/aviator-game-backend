const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http'); // Import http module
const socketIo = require('socket.io'); // Import socket.io
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const playCardRoutes = require('./routes/playCardRoutes');
const gameRoutes = require('./routes/gameRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Create an HTTP server
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000', // Allow your client origin
    methods: ['GET', 'POST'],
    credentials: true
  }
}); // Set up Socket.IO

// Middleware
app.use(cors());
app.use(express.json());

// Use Routes
app.use('/api/users', userRoutes);
app.use('/api/playcards', playCardRoutes);
app.use('/api/games', gameRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Basic Route
app.get('/', (req, res) => {
  res.send('Welcome to the Aviator Game API!');
});

// Socket.IO setup
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  // Add additional event listeners for game actions here
});

// Start the Server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
