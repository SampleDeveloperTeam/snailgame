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

    /**
     *
     * @param snake
     */
    this.getSnakeCoords = function(snake) {
        this.mapgrid[snake.getHeadPosition().getX() * this.y + snake.getHeadPosition().getY()] = new MapCoords();
        this.mapgrid[snake.getHeadPosition().getX() * this.y + snake.getHeadPosition().getY()].setValue(GRID_CELL.HEAD)
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