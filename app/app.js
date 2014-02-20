var http = require('http');
var child_process = require('child_process');
var fs = require('fs');
var config = require('./config');

http.createServer(onRequest).listen(config.settings.local_port);

var json_cmds = ['/addversion.json','/schedule.json','/cancel.json','/listprojects.json','/listversions,json','/listspiders.json','/listjobs.json','/delversion.json','/delproject.json','/logs','/items'];

function isApiRequest(url){
    var result = false;
    url = url.toLowerCase();
    for(var i = 0; i < json_cmds.length; i++){
        if(url.indexOf(json_cmds[i]) === 0){
            console.log('Found: ' + json_cmds[i]);
            result = true;
            break;
        }
    }
    return result;
}


function onRequest(client_req, client_res) {

    var options = {
        hostname: config.scrapyds[0].host,
        port: config.scrapyds[0].port,
        path: client_req.url,
        method: 'GET'
    };

    if(isApiRequest(client_req.url) === true){
        // Proxy all API requests
        console.log('Proxying to: ' + options.hostname + ':' + options.port + options.path);
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
        readStream.on('error', function(){
            console.log('Invalid request received: ' + f);
        })

    }
}


child_process.spawn('open', ['http://localhost:'+ config.settings.local_port + '/index.html']);
