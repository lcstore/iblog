var express = require('express')
var path = require('path')
var serveStatic = require('serve-static')

var app = express()

var sPaths = process.env.share_paths || path.join(__dirname, 'public')
var port = parseInt(process.env.share_port) || 8001

var pathArr = sPaths.split(',')
for (var pi = 0; pi < pathArr.length; pi++) {
	console.log("serveStatic:" + pi + ",path:" + pathArr[pi]);
	app.use(serveStatic(pathArr[pi], {
	  	maxAge: '1d',
	  	setHeaders: setCustomCacheControl
	}))
}
console.log("listen on:" + port);
app.listen(port)

function setCustomCacheControl (res, path) {
  if (serveStatic.mime.lookup(path) === 'text/html') {
    // Custom Cache-Control for HTML files
    res.setHeader('Cache-Control', 'public, max-age=0')
  }
}