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
        this.criticalShots = []
        this.nonCriticalShots = []
        this.ships = {
            carrier: new Ship(5),
            battleship: new Ship(4),
            cruiser: new Ship(3),
            submarine: new Ship(3),
            destroyer: new Ship(2),
        }

        let letters = ['A','B','C','D','E','F','G','H','I','J']
        for(let i = 1; i <= 10; i++){
            for(let letter of letters){
                this.nonCriticalShots.push([letter,String(i)])
            }
        }
    }


    placeBoat(ship,coordonateStr){
        for(let element in this.ships){
            if(ship === element && this.ships[element].coordonates.length < this.ships[element].length){
                let coordonate = [];
                coordonate.push(coordonateStr[0])
                coordonate.push(coordonateStr.slice(1))
                console.log(coordonate)
                this.ships[element].coordonates.push(coordonate)
                this.criticalShots.push(coordonate)
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
let computer = new Player()


// TEST SITE

me.gameboard.placeBoat('submarine','A10')
me.gameboard.placeBoat('submarine','A9')
me.gameboard.placeBoat('submarine','A8')
me.gameboard.placeBoat('submarine','A8')
console.log(me.gameboard)
