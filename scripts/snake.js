/**
 * Created by goldenmelon on 26.08.15.
 */
DirectionEnum = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3
};

function Cell(){
    //this.coordinates = new CellCoords(0,0);
    //this.prevCell = undefined;
    this.nextItem = undefined;
}

function Snake() {
    this.direction = DirectionEnum.RIGHT;
    this.newdirection = DirectionEnum.RIGHT;
    this.head = new Array();

    this.init = function() {
        this.head.push(new Cell());
        //this.head.setCoordinates(x, y);
        //var first = this.head[0];
        for(var i = 0; i < 3; i++) {
            this.head[i].nextItem = DirectionEnum.LEFT;
            this.head.push(new Cell());
        }
    };

    this.getHead = function(){
        return this.head;
    };

    /*this.getSnakePosition = function() {
    };*/

    this.inversePosition = function(direction) {
        switch(direction){
            case DirectionEnum.RIGHT:
                return DirectionEnum.LEFT;
            case DirectionEnum.UP:
                return DirectionEnum.DOWN;
            case DirectionEnum.DOWN:
                return DirectionEnum.UP;
            case DirectionEnum.LEFT:
                return DirectionEnum.RIGHT;
        }
    };
    this.addNewCell = function() {
        this.head[this.head.length - 1].nextItem =  this.head[this.head.length-2].nextItem;
        this.head.push(new Cell());
    };

    this.move = function(){
        this.changeDirection(this.newdirection);
        //var coords = this.head.coordinates;
        var next = this.inversePosition(this.direction);
        var temp = this.head[0].nextItem;
        this.head[0].nextItem = next;
        for(var i = 1; i < this.head.length-1; i++){
            next = temp;
            temp = this.head[i].nextItem;
            this.head[i].nextItem = next;
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
    };

    this.setNewDirection = function(newDirection) {
        this.newdirection = newDirection;
    }
}