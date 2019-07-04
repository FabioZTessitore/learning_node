// Handle uploaded files

const http = require('http');
const formidable = require('formidable');

const server = http.createServer( function (req, res) {
    switch (req.method) {
        case 'GET':
            show(res);
            break;
        
        case 'POST':
            upload(req, res);
            break;
    }
});

server.listen(3000);

function show(res) {
    const html = ''
        + '<form method="POST" action="/" enctype="multipart/form-data">'
        + '<p><input type="text" name="name"></p>'
        + '<p><input type="file" name="file"></p>'
        + '<p><input type="submit" value="Upload"></p>'
        + '</form>';

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html));
    res.end(html);
}

function upload(req, res) {
    if (!isFormData(req)) {
        res.statusCode = 400;
        res.end('Bad request: expecting multipart/form-data');
        return;
    }

    const form = new formidable.IncomingForm();
    /*form.on('name', function (field, value) {

    });
    form.on('file', function (name, file) {

    });
    form.on('end', function () {
        res.end('upload complete!');
    });*/
    form.on('progress', function (bytesReceived, bytesExpected) {
        const percent = Math.floor(bytesReceived / bytesExpected * 100);
        console.log(percent);
    });
    form.parse(req, function (err, fields, files) {
        console.log(fields);
        console.log(files);
        res.end('upload complete!');
    });
}

function isFormData(req) {
    const type = req.headers['content-type'] || '';

    return type.indexOf('multipart/form-data') == 0;
}