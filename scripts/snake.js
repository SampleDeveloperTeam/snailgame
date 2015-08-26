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
            case 0:
                this.head.coordinates.y = (this.head.coordinates.y - 1);
                if(this.head.coordinates.y == -1) {
                    this.head.coordinates.y = this.head.coordinates.y + height;
                }
                break;
            case 1:
                this.head.coordinates.x = (this.head.coordinates.x + 1) % 32;
                break;
            case 2:
                this.head.coordinates.y = (this.head.coordinates.y + 1) % 24;
                break;
            case 3:
                this.head.coordinates.x = (this.head.coordinates.x - 1) % 32;
                if(this.head.coordinates.x == -1){
                    this.head.coordinates.x = this.head.coordinates.x + 32;
                }
                break;
        }
    }
}