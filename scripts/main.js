/**
 * информация о игровом поле
 * @type {Array}
 */
var field=[];

/**
 * размер ячейки в пикселях
 * @type {number}
 */
var cell=20;

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


/**
 * DOM доступ к канвас
 */
var $canvas;
/**
 * Контекст канваса
  */
var	$ctx;

var socket=io.connect(); 
/**
переменная сокета
**/

var startgame=false;
/**
Переменная с игроками ,полученная от сервера
**/

/**
 * || нужно больше инфы ||
 *
 * Создание двумерного массива с размерами наших ячеек
 * первый индекс - широта в ячейках
 * второй индекс - высота в ячейках
 *
 * После этого происходит заполнение инфы о игровом поле, так как поле пустое, мы его заполняем нулями
 * 0-ничего(квадратик с background)..
 */
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
function reFillField(snake)
{
	for(var i=0;i<width;i++)
 	{
 		for(var j=0;j<height;j++)
	 	{
	 		field[i][j]=0;
	 	}
 	}
 	
}

/**
 * функция инициализации
 *
 * находим канвас в структуре документа index.html
 * приклепляем 2-d контекст канваса к нашей переменной ctx
 * инициализация информации об игровом поле
 * вызов функции, для отрисовки нашего холста(canvas'а)
 */

$(document).ready(function(){
	
	connection();

	

});

function initialization()
{
	//инициализация сокета
	//$('#newuser').hide();
	$canvas=$('#canvas');
	$ctx=canvas.getContext("2d");
	createField();

    $(document).keydown(function(e){
        var code=e.which;
        socket.emit('control',code);
    });

	render();
	setInterval(render,1000/60);
}




	





function update()
{
	if(startgame)
	{
		//snail.update();
		//reFillField(snail);
	}
	
}

/**
 * функция отрисовки
 */
function render()
{
	update();
	$ctx.clearRect(0,0,640,480);//очистка канваса
	for(var i=0;i<width;i++)
 	{
 		for(var j=0;j<height;j++)
	 	{
	 		switch(field[i][j])
	 		{
	 			case 0:
	 			$ctx.fillStyle='#ffebcd';
	 			$ctx.fillRect(i*cell,j*cell,cell,cell);
	 			$ctx.strokeStyle="#111";
	 			$ctx.strokeRect(i*cell,j*cell,cell,cell);
	 			break;

	 			case 1:
	 			$ctx.fillStyle='#ff0000';
	 			$ctx.fillRect(i*cell,j*cell,cell,cell);
	 			$ctx.strokeStyle="#111";
	 			$ctx.strokeRect(i*cell,j*cell,cell,cell);
	 			break;

	 			case 2:
	 			$ctx.fillStyle='#00ff00';
	 			$ctx.fillRect(i*cell,j*cell,cell,cell);
	 			$ctx.strokeStyle="#111";
	 			$ctx.strokeRect(i*cell,j*cell,cell,cell);
	 			break;
	 		}
	 	}
 	}
	//requestAnimationFrame(render);// вызывает render() по циклу
	
}

/**
 * вызов функции initialization, когда загрузится html окно
 */
 function connection()
 {
 	$("#newuser").submit(function(e){
	e.preventDefault();
	mynick=$("input").val();
	socket.emit('newuser',$("#input").val(), function(data){
		if(data)
		{
			$('#users').hide();
			$("#error").hide();
			
			startgame=true;
            initialization();

		}else{

			$("#error").html("Uncorrect nickname!");
			
		}

	});
	$("#input").val('');

	});

	socket.on('usernames',function(data){
		var html='';
		for(var i=0;i<data.length;i++)
		{
			html+=i+1+":"+data[i].nick+' ';
			
		}
		$("#userlist").html(html);
	});
     
     socket.on('test',function(data){
         reFillField();
        for(var i=0;i<data.length;i++)
        {
            if(i==0)
               {
                field[data[i].x][data[i].y]=1;
               }
               else
            field[data[i].x][data[i].y]=2;
        }
         
     });
 }



 
