class Ship{
    constructor(length){
        this.length = length;
        this.hitCount = 0;
        this.isSinked = false;
        this.coordonates = [];
    }
    hit(){
        this.hitCount++;
    }
    isSunk(){
        if(this.hitCount < this.length){
            this.isSinked = false;
            return this.isSinked
        }else{
            this.isSinked = true;
            return this.isSinked;
        }
    }
}
//let carrier = new Ship(5)
//let battleship = new Ship(4)
//let cruiser = new Ship(3)
//let submarine = new Ship(3)
//let destroyer = new Ship(2)
//console.log(carrier)
//console.log(destroyer)


class Gameboard{
    constructor(){
        this.remainingShots = []
        this.missedShots = []
        //this.shipsCoordonates = {
                //carrierCoordonates: [],
                //battleshipCoordonates: [],
                //cruiserCoordonates: [],
                //submarineCoordonates: [],
                //destroyerCoordonates: []
        //}
        this.ships = {
            carrier: new Ship(5),
            battleship: new Ship(4),
            cruiser: new Ship(3),
            submarine: new Ship(3),
            destroyer: new Ship(2),
        }
    }
    placeBoat(ship,coordonateStr){
        for(let element in this.ships){
            if(ship === element){
                let coordonate = [];
                coordonate.push(coordonateStr[0])
                coordonate.push(coordonateStr.slice(1))
                console.log(coordonate)
                this.ships[element].coordonates.push(coordonate)
                console.log(this.ships[element])
            }
        }
    }
    recieveAttack(x,y){
        //sends hit to the ship or the missing shot
    }
}


class Player{
    constructor(){
        this.gameboard = new Gameboard
    }
}
let me = new Player()
me.gameboard.placeBoat('carrier','A10')
