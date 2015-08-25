var express=require('express');
app=express();

server=require('http').createServer(app);
io=require('socket.io').listen(server);




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

io.sockets.on('connection',function(socket){


});

/*
логика игры

*/
/**
 * количество ячеек по ширине
 * @type {number}
 */
var	width=32;

/**
 * количество ячеек по высоте
 * @type {number}
 */
var height=24;

var rooms=[];
var fields=[];
var players=[];

setInterval(changefields,500);

function changefields() 
{

}


function room(player)
{
	this.maxPlayers=2;
	this.players=[];
	this.players.push(player);
	this.field;
};
room.prototype.createRoom = function() {
	this.field=createField() ;
};

function createField()  
{
	var field=new Array(width);
 	for(var i=0;i<width;i++)
 	{
 		field[i]=new Array(height);
 	}
 	for(var i=0;i<width;i++)
 	{
 		for(var j=0;j<height;j++)
	 	{
	 		field[i][j]=0;
	 	}
 	}
 	return field;

}

function player(nick)
{
	this.nick=nick;
	//this.snail=new Snail();
}

function Snail()
{
	this.bodySnails=[2];
}

function vector2(x,y)
{
	this.x=x;
	this.y=y;
}

