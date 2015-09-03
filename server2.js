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
    
    socket.on('control',function(data){
        for(var i=0;i<players.length;i++)
        {
            if(players[i].nick==socket.nickname)
            {
                switch (data)
                {
                    case 38:
                        if(players[i].snail.direction!=DirectionEnum.DOWN) players[i].snail.direction=DirectionEnum.UP;
                        break;
                     case 37:
                        if(players[i].snail.direction!=DirectionEnum.RIGHT) players[i].snail.direction=DirectionEnum.LEFT;
                        break;
                     case 40:
                        if(players[i].snail.direction!=DirectionEnum.UP) players[i].snail.direction=DirectionEnum.DOWN;
                        break;
                     case 39:
                        if(players[i].snail.direction!=DirectionEnum.LEFT) players[i].snail.direction=DirectionEnum.RIGHT;
                        break;
                }
            }
        }
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

var food=setFood();

function setFood()//Функция спавна еды
{
    
    /*while(!checkFoodPosition(new vector2(posX,posY)))
    {
       var posX=Math.floor(Math.random()*(width-1)); 
       var posY=Math.floor(Math.random()*(height-1));
       
    }*/
     var posX=Math.floor(Math.random()*(width-1)); 
       var posY=Math.floor(Math.random()*(height-1));
    var foodpos=new vector2(posX,posY); 
    return foodpos;
    
}

function checkFoodPosition(pos) //Функция проверки пересечения позиции и змеек  
{
    for(var i=0;i<players.length;i++)
    {
        for(var j=0;j<players[i].snail.body.length;j++)
        {
            if(pos.x == players[i].snail.body[j].x && pos.y == players[i].snail.body[j].y)
            {
                return false;
            }
        }
    }
    return true;
}
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
	this.snail=new Snake(4,5,3,5,2,5);
}


function update()
{
    for(var i=0;i<players.length;i++)
    {
        players[i].snail.move();
        //players[i].snail.setNextPosition();
    }
    
    if(!checkFoodPosition(food))
    {
        var newBlock=players[0].snail.posforfood;
        players[0].snail.body.push(newBlock);
        food=setFood();
        console.log("DLUNA!!!: "+players[0].snail.length);
    }
    sendSnail();
}

function sendSnail()
{
    if(players.length>0)
    {
        io.sockets.emit('test',{snail:players[0].snail.body, food:food});
    }
}

DirectionEnum={
	UP:0,
	LEFT:1,
	DOWN:2,
	RIGHT:3
}

function Snake(x0,y0,x1,y1,x2,y2)
{
    this.direction=DirectionEnum.RIGHT;
    this.length=3;
    this.body=new Array();
    this.body.push(new vector2(x0,y0));
    this.body.push(new vector2(x1,y1));
    this.body.push(new vector2(x2,y2));
    this.posforfood=this.body[this.length-1];
    
}


Snake.prototype.move = function() {
    
    for(var i=this.length-1;i>0;i--)
    {
        if(i==this.length-1)
        {
            this.posforfood=this.body[i];
        }
        this.body[i].x=this.body[i-1].x;
        this.body[i].y=this.body[i-1].y;
    }
    switch(this.direction)
    {
            case DirectionEnum.UP:
            this.body[0].y--;
        break;
            
            case DirectionEnum.LEFT:
            this.body[0].x--;
        break;
            
            case DirectionEnum.DOWN:
            this.body[0].y++;
        break;
            
            case DirectionEnum.RIGHT:
            this.body[0].x++;
        break;
    }
    if(this.body[0].x==width) this.body[0].x-=width;
    if(this.body[0].y==height) this.body[0].y-=height;
    if(this.body[0].x==-1) this.body[0].x+=width;
    if(this.body[0].y==-1) this.body[0].y+=height;
    
    this.length=this.body.length;
};




function vector2(x,y)
{
	this.x=x;
	this.y=y;
}




setInterval(update,150);
