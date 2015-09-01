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

//setInterval(changefields,500);

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
function reFillField()
{
	
	for(var i=0;i<width;i++)
 	{
 		for(var j=0;j<height;j++)
	 	{
	 		mainfield[i][j]=0;
	 	}
 	}
}

function player(nick)
{
	this.nick=nick;
	this.snail=new Snake();
}


function update()
{
    for(var i=0;i<players.length;i++)
    {
        players[i].snail.move();
    }
    io.sockets.emit('test',mainfield);
}



DirectionEnum={
	UP:0,
	LEFT:1,
	DOWN:2,
	RIGHT:3
}

function Snake()
{
	this.bodysnake=new Array();

	this.bodysnake.push(new vector2(10,5));
	this.bodysnake.push(new vector2(9,5));
	this.bodysnake.push(new vector2(8,5));
	this.lastpos= new vector2(0,0);
	this.direction=DirectionEnum.RIGHT;
    this.nextpos=function()
    {
        var nextposition=this.bodysnake[0];
        switch(this.direction)
	    {
		case DirectionEnum.UP:
			nextposition.y--;
		break;

		case DirectionEnum.LEFT:
			nextposition.x--;
		break;

		case DirectionEnum.DOWN:
			nextposition.y++;
		break;

		case DirectionEnum.RIGHT:
			nextposition.x++;
		break;
	   }
    return nextposition;
    }
}
Snake.prototype.move = function(direction) {
    if(mainfield[this.nextpos.x][this.nextpos.y]==0)
    {
        this.bodysnake[0]=this.nextpos;
    }
	/*switch(this.direction)
	{
		case DirectionEnum.UP:
			this.bodysnake[0].y--;
		break;

		case DirectionEnum.LEFT:
			this.bodysnake[0].x--;
		break;

		case DirectionEnum.DOWN:
			this.bodysnake[0].y++;
		break;

		case DirectionEnum.RIGHT:
			this.bodysnake[0].x++;
		break;
	}*/

	this.lastpos=this.bodysnake[this.bodysnake.length-1];
	for(var i=this.bodysnake.length-1;i>0;i--)
	{
		this.bodysnake[i]=this.bodysnake[i-1];
	}
    //reFillField();
    for(var i=this.bodysnake.length-1;i>-1;i--)
	{
        if(i==0)
        {
            mainfield[this.bodysnake[i].x][this.bodysnake[i].y]=1;
        }
        else 
        {
            mainfield[this.bodysnake[i].x][this.bodysnake[i].y]=2;
        }
	}
};




function vector2(x,y)
{
	this.x=x;
	this.y=y;
}




setInterval(update,1000);
