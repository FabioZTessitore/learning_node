// Using Redis to store data in memory

const redis = require('redis');

// Connect to redis
const redisClient = redis.createClient(6379, '127.0.0.1');
redisClient.on('error', function (err) {
    console.log('Err: Cannot connect to Redis');
    console.log('The server is running?')
});

redisClient.on('connect', function () {
    // Storing a key/value pair:
    redisClient.set('color', 'red', redis.print);
    redisClient.get('color', function (err, value) {
        if (err) throw err;

        console.log('color stored is:', value);
    });

    // Storing an hashmap:
    redisClient.hmset('HSVcolor', {
        'hue': 50,
        'saturation': '42',
        'value': 100
    }, redis.print);
    redisClient.hget('HSVcolor', 'saturation', function (err, value) {
        if (err) throw err;

        console.log('Data retrieved:', value);
    });
    redisClient.hkeys('HSVcolor',  function(err, keys) {
        if (err) throw err;
        
        console.log(keys);
    });

    // Storing a list
    redisClient.lpush('tasks', 'Learning Node', redis.print);
    redisClient.lpush('tasks', 'Learning Vue', redis.print);
    redisClient.lrange('tasks', 0, -1, function (err, items) {
        if (err) throw err;

        console.log(items);
    });

    // Storing a set
    redisClient.sadd('colors', 'red', redis.print);
    redisClient.sadd('colors', 'yellow', redis.print);
    redisClient.sadd('colors', 'red', redis.print);     // This will not stored (it's a duplicate)
    redisClient.smembers('colors', function (err, values) {
        if (err) throw err;

        console.log(values);
    });
});
