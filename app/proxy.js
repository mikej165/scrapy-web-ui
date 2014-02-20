var http = require('http');
var child_process = require('child_process');
var fs = require('fs');

http.createServer(onRequest).listen(3000);

var json_cmds = ['addversion.json','schedule.json','cancel.json','listprojects.json','listversions,json','listspiders.json','listjobs.json','delversion.json','delproject.json'];

function isApiRequest(url){
    var result = false;
    url = url.toLowerCase();
    for(var i = 0; i < json_cmds.length; i++){
        if(url.indexOf(json_cmds[i]) != -1){
            console.log('Found: ' + json_cmds[i]);
            result = true;
            break;
        }
    }
    return result;
}


function onRequest(client_req, client_res) {

    var options = {
        hostname: 'ec2-50-16-60-252.compute-1.amazonaws.com',
        port: 6800,
        path: client_req.url,
        method: 'GET'
    };

    if(isApiRequest(client_req.url) === true){
        // Proxy all API requests

        var proxy = http.request(options, function (res) {
            res.pipe(client_res, {
                end: true
            });
        });
        client_req.pipe(proxy, {
            end: true
        });
    } else {

        var f = client_req.url.substring(1);

        // Serve up ordinary files from the local filesystem
        var readStream = fs.createReadStream(f);
        // This will wait until we know the readable stream is actually valid before piping
        readStream.on('open', function () {
            // This just pipes the read stream to the response object (which goes to the client)
            readStream.pipe(client_res);
        });

    }
}


child_process.spawn('open', ['http://localhost:3000/index.html']);
