const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const FileUpload = require('express-fileupload');
dotenv.config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const { app, server } = require("./socket/socket.js");


const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(FileUpload({
	useTempFiles: true,
	tempFileDir: '/tmp/'
}));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

server.listen(PORT, () => {
	console.log(`Server Running on port ${PORT}`);
});