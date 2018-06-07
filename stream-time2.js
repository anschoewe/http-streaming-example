var Stream = require('stream');
var stream = new Stream();
const CRLF = '\r\n';
 
http = require('http');
var server = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8;', 'Transfer-Encoding': 'chunked'});

    // some browsers only render the first browser response after 1KB of data
    var randomStr = "";
    var length = 1024;
    for(var i = 0; i < length; i++) {
        randomStr += "0";
    }

    stream.pipe = function(dest) {
        dest.write(prepareMessage(randomStr));
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
      dest.write(prepareMessage('Andrew')); //temporarilly return the same value every second!!!
      return dest;
     };
    stream.pipe(res);
  },1000);
}).listen(process.env.PORT || 8080);

function prepareMessage(content) {
  const hexLength = content.length.toString(16);
  var output = hexLength + CRLF + content + CRLF;
  return output;
}

