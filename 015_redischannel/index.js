// Using redis channel to communicate over net socket

// Use netcat to connect to this server
// $ netcat 127.0.0.1 1337

const net = require('net');
const redis = require('redis');

const server = net.createServer( function (socket) {
    // every user (socket) has a publisher and a subscriber
    const subscriber = redis.createClient();
    const publisher = redis.createClient();

    // the user listen to the main channel.
    // when the server see a message, send it
    subscriber.subscribe('main_channel');
    subscriber.on('message', function (channel, message) {
        socket.write('Channel ' + channel + ': ' + message);
    });

    // when the server reveive a message,
    // broadcast to the main channel by the publisher
    socket.on('data', function (data) {
        publisher.publish('main_channel', data);
    });

    socket.on('end', function () {
        subscriber.unsubscribe('main_channel');
        subscriber.quit();
        publisher.quit();
    })
});
server.listen(1337);