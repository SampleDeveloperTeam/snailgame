Direction{
	:UP,
	:DOWN,
	:LEFT,
	:RIGHT
}

function Snale()
{
	this.parts=[];
	this.parts.push(new point(6,5));
	this.dir=Direction.RIGHT;
}
Snale.update=function()
{
   switch(this.dir)
   {
   		case Direction.UP:

   		break;	
         
   		case Direction.LEFT:

   		break;	

   		case Direction.DOWN:

   		break;	
         
   		case Direction.RIGHT:

   		break;	
         
   }
}



function point(x,y)
{
	this.x=x;
	this.y=y;
   
}