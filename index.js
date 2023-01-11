const http = require('http');
const fs = require('fs');

//create a server object:
http
	.createServer(function (req, res) {
		res.writeHead(200, { 'Content-Type': 'application/json' });
		const file = fs.readFileSync('./public/items.json');
		res.write(file.toString()); //write a response to the client
		res.end(); //end the response
	})
	.listen(8080);
