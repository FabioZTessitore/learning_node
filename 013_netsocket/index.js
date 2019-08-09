// Net Socket

// Use netcat to connect to this server
// $ netcat 127.0.0.1 1337

const net = require('net');

const server = net.createServer( function (socket) {
    // every client has it's own socket
    socket.write('Hello from the server\n');

    socket.on('data', function (data) {
        console.log('User say:', data.toString());
    });

    socket.on('end', function () {
        console.log('Connection closed');
    });

    socket.on('error', function (err) {
        console.log(err.Error);
    });
});

server.listen(1337);