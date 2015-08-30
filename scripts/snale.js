Direction={
	UP:0,
	DOWN:1,
	LEFT:2,
	RIGHT:3
};

function Snake()
{
	this.parts=[];
	this.parts.push(new point(6,5));
   this.parts.push(new point(5,5));
	//this.dir=Direction.DOWN;
}
Snake.prototype.update=function()
{
   for(var i=this.parts.length-1;i>0;i--)
   {
      this.parts[i]=this.parts[i-1];
   }
   switch(this.dir)
   {
   		case Direction.UP:
         this.parts[0].y-=1;
   		break;	
         
   		case Direction.LEFT:
         this.parts[0].x-=1;
   		break;	

   		case Direction.DOWN:
         this.parts[0].y+=1;
   		break;	
         
   		case Direction.RIGHT:
         this.parts[0].x+=1;
   		break;	
         
   }
   /*********************************************/
   if(this.parts[0].x == -1) this.parts[0].x+width;
   if(this.parts[0].y == -1) this.parts[0].y+height;
   if(this.parts[0].x == width) this.parts[0].x-width;
   if(this.parts[0].y == height) this.parts[0].y-height;
   //*****Выход за границу***********************/

   /*//Обновление поля
   for(var i=this.parts.length-1;i>0;i--)
   {
      if(field[this.parts[i].x,field[this.parts[i].y==0)
      {
         if(i==0)
         {
            field[this.parts[i].x,field[this.parts[i].y='head'+mynick;
         }
         
         else
         {
            field[this.parts[i].x,field[this.parts[i].y=mynick; 
         }
      }    
   }*/


};



function point(x,y)
{
	this.x=x;
	this.y=y;
   
}