/**
 * переменная, которая хранит в себе сетку игры
 */
var map_grid;

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

/**
 * переменная сокета
 */
//var socket;


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

    map_grid = new GameMap(width,height);
    map_grid.init();

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
            var a = map_grid.show(i,j);
	 		switch(a)
	 		{
	 			case GRID_CELL.EMPTY:
					$ctx.fillStyle='#ffebcd';
					$ctx.fillRect(i*cell,j*cell,cell,cell);
					$ctx.strokeStyle="#111";
					$ctx.strokeRect(i*cell,j*cell,cell,cell);
					break;
				case GRID_CELL.HEAD:
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

/**
 *
 */
function start() {
	$("#sadface").hide();
	var snake = new Snake();
    snake.init(3,5);
	map_grid.getSnakeCoords(snake);

	$(document).keydown(function(event) {
		switch (event.which){
			case 37:
				snake.setNewDirection(DirectionEnum.LEFT);
				break;
			case 38:
				snake.setNewDirection(DirectionEnum.UP);
				break;
			case 39:
				snake.setNewDirection(DirectionEnum.RIGHT);
				break;
			case 40:
				snake.setNewDirection(DirectionEnum.DOWN);
				break;
		}
	});

	setInterval(function(){
		snake.move();
        map_grid.refillField();
        map_grid.getSnakeCoords(snake);
		//var randx = getInt(width);
		//var randy = getInt(height);
		//field[randx][randy] = 1;

	},1000);
}

