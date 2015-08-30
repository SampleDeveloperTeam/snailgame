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
function Cell(){
    this.coordinates = new CellCoords(0,0);
    this.nextCell = undefined;
    //this.prevCell = undefined;

    this.getX = function() {
        return this.coordinates.x;
    };
    this.getY = function() {
        return this.coordinates.y;
    };
    this.setCoordinates = function(x, y) {
        this.coordinates.x = x;
        this.coordinates.y = y;
    };
}
function Snake() {
    this.direction = DirectionEnum.RIGHT;
    this.newdirection = DirectionEnum.RIGHT;
    this.head = new Cell();

    this.init = function(x, y) {
        this.head.setCoordinates(x, y);
        var first = this.head;
        for(var i = 0; i < 4; i++) {
            first.nextCell = new Cell();
            first.nextCell.setCoordinates(3,4 - i);

            first.nextCell = first.nextCell.nextCell;
        }
    };

    this.getHeadPosition = function(){
        return this.head;
    };

    this.getSnakePosition = function() {
        var fcell = this.head;
        var i = 1;
        while(fcell.nextCell != undefined) {
            i++;
        }
    };

    this.move = function(){
        this.changeDirection(this.newdirection);
        var coords = this.head.coordinates;
        switch (this.direction){
            case DirectionEnum.UP:
                this.head.coordinates.y = (this.head.coordinates.y - 1);
                if(this.head.coordinates.y == -1) {
                    this.head.coordinates.y = this.head.coordinates.y + height;
                }

                var nextcell = this.head.nextCell;
                while(nextcell!=undefined){
                    var nextcellcoords = nextcell.coordinates;
                    nextcell.coordinates = coords;
                    coords = nextcellcoords;
                    nextcell = nextcell.nextCell;
                }
                break;
            case DirectionEnum.RIGHT:
                this.head.coordinates.x = (this.head.coordinates.x + 1) % width;
                var nextcell = this.head.nextCell;
                while(nextcell!=undefined){
                    var nextcellcoords = nextcell.coordinates;
                    nextcell.coordinates = coords;
                    coords = nextcellcoords;
                    nextcell = nextcell.nextCell;
                }
                break;
            case DirectionEnum.DOWN:
                this.head.coordinates.y = (this.head.coordinates.y + 1) % height;
                var nextcell = this.head.nextCell;
                while(nextcell!=undefined){
                    var nextcellcoords = nextcell.coordinates;
                    nextcell.coordinates = coords;
                    coords = nextcellcoords;
                    nextcell = nextcell.nextCell;
                }
                break;
            case DirectionEnum.LEFT:
                this.head.coordinates.x = this.head.coordinates.x - 1;
                if(this.head.coordinates.x == -1){
                    this.head.coordinates.x = this.head.coordinates.x + width;
                }
                var nextcell = this.head.nextCell;
                while(nextcell!=undefined){
                    var nextcellcoords = nextcell.coordinates;
                    nextcell.coordinates = coords;
                    coords = nextcellcoords;
                    nextcell = nextcell.nextCell;
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
    };

    this.setNewDirection = function(newDirection) {
        this.newdirection = newDirection;
    }
}