var express=require('express');
app=express();

server=require('http').createServer(app);
io=require('socket.io').listen(server);




server.listen(8080,'192.168.1.4');


app.get('/scripts/snale.js',function(req,res) {
	res.sendfile(__dirname+'/scripts/snale.js');
});

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

	socket.on('newuser',function(data,callback){
		
		if(data!='' && checkNicks(data))
		{
			callback(true);
			socket.nickname=data;
			players.push(new player(socket.nickname));
		}
		else {
			callback(false);
		}
		io.sockets.emit('usernames',players);
	});

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


var mainfield=createField();

setInterval(changefields,500);

function checkNicks(data)
{
		for(var i=0;i<players.length;i++)
		{
			if(players[i].nick==data)
			{
				return false;
			}

		}
		return true;
}



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
	this.bodySnails=[];
	this.bodySnails.push(new vector2(6,6));
	this.bodySnails.push(new vector2(5,6));
	this.direction=3;
}

function vector2(x,y)
{
	this.x=x;
	this.y=y;
}

