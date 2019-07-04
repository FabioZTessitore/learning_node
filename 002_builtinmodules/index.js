// Using a built-in module

const url = require('url');

const urlAddress = 'http://www.example.com/profile?name=barry';

const parsedUrl = url.parse(urlAddress);

console.log('url: ', urlAddress);
console.log('protocol: ', parsedUrl.protocol);
console.log('host: ', parsedUrl.host);
console.log('query: ', parsedUrl.query);
