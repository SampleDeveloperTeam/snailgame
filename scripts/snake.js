/**
 * Created by goldenmelon on 26.08.15.
 */
DirectionEnum = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3
};


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
    this.direction = DirectionEnum.RIGHT;
    this.head = new Cell(3,5);
    this.getHeadPosition = function(){
        return this.head;
    };
    this.move = function(){
        switch (this.direction){
            case DirectionEnum.UP:
                this.head.coordinates.y = (this.head.coordinates.y - 1);
                if(this.head.coordinates.y == -1) {
                    this.head.coordinates.y = this.head.coordinates.y + height;
                }
                break;
            case DirectionEnum.RIGHT:
                this.head.coordinates.x = (this.head.coordinates.x + 1) % width;
                break;
            case DirectionEnum.DOWN:
                this.head.coordinates.y = (this.head.coordinates.y + 1) % height;
                break;
            case DirectionEnum.LEFT:
                this.head.coordinates.x = this.head.coordinates.x - 1;
                if(this.head.coordinates.x == -1){
                    this.head.coordinates.x = this.head.coordinates.x + widthd;
                }
                break;
        }
    };
    this.changeDirection = function(direction) {
        if(direction == DirectionEnum.UP && this.direction != DirectionEnum.DOWN) {
            this.direction = DirectionEnum.UP;
        } else if(direction == DirectionEnum.RIGHT && this.direction != DirectionEnum.LEFT) {
            this.direction = DirectionEnum.RIGHT;
        } else if(direction == DirectionEnum.DOWN && this.direction != DirectionEnum.UP) {
            this.direction = DirectionEnum.DOWN;
        } else if(direction == DirectionEnum.LEFT && this.direction != DirectionEnum.RIGHT) {
            this.direction = DirectionEnum.LEFT;
        }
    }
}