var Stream = require('stream');
var stream = new Stream();
 
http = require('http');
var server = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});

    // some browsers only render the first browser response after 1KB of data
    var randomStr = "";
    for(var i = 0; i < 1024; i++) {
        randomStr += "0";
    }

    stream.pipe = function(dest) {
        dest.write(randomStr);
        return dest;
    };
    stream.pipe(res);

    // stream the time every second
    setInterval(function(){
        var currentTime = new Date();
        var currentTimeStr =
            currentTime.getHours()
            + ':' +
            currentTime.getMinutes()
            + ':' +
            currentTime.getSeconds() + "<br/>";
                                               
            stream.pipe = function(dest) {
                dest.write(currentTimeStr);
                return dest;
            };
            stream.pipe(res);
    },1000);
}).listen(process.env.PORT || 8080);