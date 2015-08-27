/**
 * Created by goldenmelon on 27.08.15.
 */
GRID_CELL = {
    EMPTY: 0,
    HEAD: 1,
    BODY: 2,
    BONUS: 3
};
function MapCoords(){
    this.value = GRID_CELL.EMPTY;
    this.setValue = function(value){
        this.value = value;
    }
}
function GameMap(x, y){
    this.x = x;
    this.y = y;
    this.mapgrid = new Array(x*y); //768 indexes
    this.init = function(){
        for(var i = 0; i < this.mapgrid.length; i++){
            this.mapgrid[i] = new MapCoords();
        }
        this.mapgrid[76].setValue(GRID_CELL.HEAD);
    };
    this.show = function(x, y){
        return this.mapgrid[this.y*x + y].value;
    }
}