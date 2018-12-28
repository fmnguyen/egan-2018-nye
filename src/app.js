import http from 'http';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import socketIO from 'socket.io';

const app = express();
app.server = http.createServer(app);

// Adding socket.io to the Experss server
const io = socketIO(app.server);

// Basic setup for the server
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// We list the connected sockets, then list functions inside this fn to define protocols
io.on('connection', (socket) => {

    // Maybe should define some logic to ask a user to input their user name

    // the first string is the protocol passed from the client socket
    socket.on('submitPacket', (formData) => {
        console.log('message: ' + formData.message);
        io.emit('someoneSubmittedSomething', formData.message);
    });

    console.log('a user connected');
});

// Finally, listen to the process to start the server
app.server.listen(process.env.PORT || 1234, () => {
    console.log(`Started on port ${app.server.address().port}`);
});