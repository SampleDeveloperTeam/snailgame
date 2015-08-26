/**
 * Created by goldenmelon on 26.08.15.
 */
function CellCoords(x, y){
    this.x = x;
    this.y = y;
}
function Cell(x, y){
    this.coordinates = new CellCoords(x,y);
    this.getX = function() {
        return this.coordinates.x;
    };
    this.getY = function() {
        return this.coordinates.y;
    };
}
function Snake() {
    this.direction = 1;
    this.head = new Cell(3,5);
    this.getPosition = function(){
        return this.head;
    };
    this.move = function(){
        switch (this.direction){
            case 1:
                this.head.coordinates.x = (this.head.coordinates.x + 1) % 32;
                break;
        }
    }
}