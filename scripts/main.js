var field=[]; //    640/20(pixels одна ячейка)=32 ячейки  -width
				//    480/20(pixels одна ячейка)=24 ячейки  -height

var cell=20,
	width=32,
	height=24;


var $canvas,
	$ctx;


//создаю массив пока тут ,потом перенесу это на сервер.
//0-ничего(квадратик с background)..
function createField()  
{
	field=new Array(width);
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

}


function initialization()
{
	$canvas=$('canvas');
	$ctx=canvas.getContext("2d");
	createField();
	render();
}


function render()
{
	$ctx.clearRect(0,0,640,480);//очистка канваса
	for(var i=0;i<width;i++)
 	{
 		for(var j=0;j<height;j++)
	 	{
	 		switch(field[i][j])
	 		{
	 			case 0:
	 			$ctx.fillStyle='#aa0000';
	 			$ctx.fillRect(i*cell,j*cell,cell,cell);
	 			break
	 		}
	 	}
 	}
	requestAnimationFrame(render);// вызывает render() по циклу
}

$(document).ready(function(){
	initialization();
});