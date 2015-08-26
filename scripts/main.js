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

//var socket;
/**
переменная сокета
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
	var i;
 	for(i=0;i<width;i++)
 	{
 		field[i]=new Array(height);
 	}
 	for(i=0;i<width;i++)
 	{
 		for(var j=0;j<height;j++)
	 	{
	 		field[i][j]=0;
	 	}
 	}
}
function reFillField(){
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
function initialization()
{
	//socket=io.connect(); //инициализация сокета
	//$('#newuser').hide();
	$canvas=$('#canvas');
	$ctx=canvas.getContext("2d");
	createField();

	render();
}


function update()
{
	//socket.emit('send msg',"Hello");
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
	 		}
	 	}
 	}
	requestAnimationFrame(render);// вызывает render() по циклу
}

/**
 * вызов функции initialization, когда загрузится html окно
 */
$(document).ready(function(){
	initialization();
});



function getInt(number) {
	return Math.floor(Math.random()*number);
}

function start() {
	var snake = new Snake();
	field[snake.getHeadPosition().getX()][snake.getHeadPosition().getY()] = 1;
	$(document).keydown(function(event) {
		switch (event.which){
			case 37:
				snake.changeDirection(DirectionEnum.LEFT);
				break;
			case 38:
				snake.changeDirection(DirectionEnum.UP);
				break;
			case 39:
				snake.changeDirection(DirectionEnum.RIGHT);
				break;
			case 40:
				snake.changeDirection(DirectionEnum.DOWN);
				break;
		}
	});
	setInterval(function(){
		snake.move();

		reFillField();
		field[snake.getHeadPosition().getX()][snake.getHeadPosition().getY()] = 1;
		//var randx = getInt(width);
		//var randy = getInt(height);
		//field[randx][randy] = 1;

	},1000);
}

