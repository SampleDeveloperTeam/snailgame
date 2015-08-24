var express=require('express');
app=express();

server=require('http').createServer(app);
io=require('socket.io');

io.listen(server);

server.listen(8080,'192.168.1.3');

app.get('/scripts/main.js',function(req,res) {
	res.sendfile(__dirname+'/scripts/main.js');
});
app.get('/scripts/jquery.js',function(req,res) {
	res.sendfile(__dirname+'/scripts/jquery.js');
});
app.get('/scripts/jquery.min.js',function(req,res) {
	res.sendfile(__dirname+'/scripts/jquery.min.js');
});

app.get('/css/snail.css',function(req,res) {
	res.sendfile(__dirname+'/css/snail.css');
});

app.get('/',function(req,res) {
	res.sendfile(__dirname+"/index.html");
});

