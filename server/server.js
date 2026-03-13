const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

const server = http.createServer(app);

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use(express.json());

const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
});