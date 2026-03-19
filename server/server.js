const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes')
const {Server} = require('socket.io')
const socketHandler = require('./sockets/socketHandler')

dotenv.config();
connectDB();

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors:{
    origin:process.env.CLIENT_URL,
    methods: ['GET','POST']
  }
})

socketHandler(io)

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use('/api/auth',authRoutes);

const PORT = process.env.PORT || 5000;

app.use((err, req, res, next) => {
  console.error('ERROR STACK:', err.stack);
  res.status(500).json({ message: err.message });
});

server.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
});