/**
 * Created by goldenmelon on 27.08.15.
 */

/**
 * Объект, который у которого есть 4 свойства, которые служат для определения что находится в клетке сетки игры
 * @type {{EMPTY: number, HEAD: number, BODY: number, BONUS: number}}
 */
GRID_CELL = {
    EMPTY: 0,
    HEAD: 1,
    BODY: 2,
    BONUS: 3
};

/**
 * Конструктор объектов, который хранит в себе значение, которое служит для определения что находится в ячейке сетки игры
 * Изначально инизициализируется 0, то есть GRID_CELL.EMPTY, так как наша сетка изначально пустая
 * У этого объекта есть метод setValue, который может изменять значение ячейки сетки
 * @constructor
 */
function MapCoords(){
    this.value = GRID_CELL.EMPTY;

    /**
     * принимает в себе значение объекта GRID_CELL и присваивает переменной value
     * @param value Значение, которое задается через объект GRID_CELL
     */
    this.setValue = function(value){
        this.value = value;
    }
}

/**
 * Сетка игры, которая представлена в виде ОДНОМЕРНОГО массива x*y с объектами типа MapCoords
 * @param x ширина сетки
 * @param y высота сетки
 * @constructor Инициализирует массив размером x*y
 */
function GameMap(x, y){
    this.snakes = new Array(3);
    this.x = x;
    this.y = y;
    this.mapgrid = new Array(x*y); //768 indexes

    /**
     * Инизициализирует значения массива mapgrid объектами MapCoords
     */
    this.init = function(){
        for(var i = 0; i < this.mapgrid.length; i++){
            this.mapgrid[i] = new MapCoords();
        }
        //this.mapgrid[76].setValue(GRID_CELL.HEAD);
    };

    /**
     * Функция, которая возвращает значение ячейки сетки по указанным координатам
     * @param x координата по ширине
     * @param y координата по высоте
     * @returns {*} возвращает значение, которое хранит в себе объект MapCoords
     */
    this.show = function(x, y){
        return this.mapgrid[this.y*x + y].value;
    };

    this.getSnakePosition = function(){
        var x, y;
        //alert(snakes[1]);
        x = this.snakes[1];
        y = this.snakes[2];
        this.mapgrid[x*this.y+y].setValue(GRID_CELL.HEAD);
        for(var i = 0; i < this.snakes[0].getHead().length-1; i++) {
            //alert("asasa");
            switch(this.snakes[0].getHead()[i].nextItem) {
                case DirectionEnum.LEFT:
                    x--;
                    x = this.checkBounds(x,true);
                    this.mapgrid[x*this.y+y].setValue(GRID_CELL.BODY);
                    break;
                case DirectionEnum.RIGHT:
                    x++;
                    x = this.checkBounds(x,true);
                    this.mapgrid[x*this.y+y].setValue(GRID_CELL.BODY);
                    break;
                case DirectionEnum.UP:
                    y--;
                    y = this.checkBounds(y,false);
                    this.mapgrid[x*this.y+y].setValue(GRID_CELL.BODY);
                    break;
                case DirectionEnum.DOWN:
                    y++;
                    y = this.checkBounds(y,false);
                    this.mapgrid[x*this.y+y].setValue(GRID_CELL.BODY);
                    break;
            }
        }
    };
    this.setSnake = function (snake) {
        this.snakes = [snake, 1, 5];
        this.getSnakePosition();
    };

    this.checkBounds = function (coords, iswidth){
        if(iswidth == true){
            if(coords < 0){
                coords = coords + width;
            }
            coords = coords % width;
            return coords;
        } else {
            if(coords < 0){
                coords = coords + height;
            }
            coords = coords % height;
            return coords;
        }
    };

    this.moveSnake = function(snake) {
        var x = this.snakes[1];
        var y = this.snakes[2];
        switch (this.snakes[0].direction) {
            case DirectionEnum.LEFT:
                x--;
                x = this.checkBounds(x,true);
                //this.mapgrid[x*this.y+y].setValue(GRID_CELL.BODY);
                break;
            case DirectionEnum.RIGHT:
                x++;
                x = this.checkBounds(x,true);
                //this.mapgrid[x*this.y+y].setValue(GRID_CELL.BODY);
                break;
            case DirectionEnum.UP:
                y--;
                y = this.checkBounds(y,false);
                //this.mapgrid[x*this.y+y].setValue(GRID_CELL.BODY);
                break;
            case DirectionEnum.DOWN:
                y++;
                y = this.checkBounds(y,false);
                //this.mapgrid[x*this.y+y].setValue(GRID_CELL.BODY);
                break;
        }
        this.snakes[1] = x;
        this.snakes[2] = y;
    };

    /**
     * Функция, которая очищает сетку от змей.
     * Заного инициализует все значения ячеек "пустыми" значениями
     */
    this.refillField = function() {
        for(var i = 0; i < this.mapgrid.length; i++){
            this.mapgrid[i].setValue(GRID_CELL.EMPTY);
        }
    }
}