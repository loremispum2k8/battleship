class Ship {
  constructor(length, type) {
    this.type = type;
    this.length = length;
    this.hitCount = 0;
    this.isSinked = false;
    this.coordonates = [];
    this.hits = [];
  }

  hit() {
    this.hitCount++;
  }

  isSunk() {
    if (this.hitCount < this.length) {
      this.isSinked = false;
      return this.isSinked;
    } else {
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

class Gameboard {
  constructor() {
    this.criticalShots = [];
    this.nonCriticalShots = [];
    this.ships = {
      carrier: new Ship(5, "carrier"),
      battleship: new Ship(4, "battleship"),
      cruiser: new Ship(3, "cruiser"),
      submarine: new Ship(3, "submarine"),
      destroyer: new Ship(2, "destroyer"),
    };

    let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    for (let i = 1; i <= 10; i++) {
      for (let letter of letters) {
        this.nonCriticalShots.push([letter, String(i)]);
      }
    }
  }

  placeBoat(ship, coordonateStr) {
    for (let element in this.ships) {
      if (
        ship === element &&
        this.ships[element].coordonates.length < this.ships[element].length
      ) {
        let coordonate = [];
        coordonate.push(coordonateStr[0]);
        coordonate.push(coordonateStr.slice(1));
        console.log(coordonate);
        this.ships[element].coordonates.push(coordonate);
        this.criticalShots.push(coordonate);

        for (let position of this.nonCriticalShots) {
          if (position[0] === coordonate[0] && position[1] === coordonate[1]) {
            this.nonCriticalShots.splice(
              this.nonCriticalShots.indexOf(position),
              1
            );
          }
        }
      }
    }
  }
  recieveAttack(x, y) {
    //sends hit to the ship or the missing shot
  }
}

class Player {
  constructor() {
    this.gameboard = new Gameboard();
  }
}
let me = new Player();
let computer = new Player();

// TEST SITE

me.gameboard.placeBoat("submarine", "A10");
me.gameboard.placeBoat("submarine", "A9");
me.gameboard.placeBoat("submarine", "A8");
console.log(me.gameboard);

let squares = document.querySelectorAll(".square");

squares.forEach((square) => {
  square.addEventListener("click", (e) => {
    for (let coordonate of me.gameboard.criticalShots) {
      if (e.target.id === coordonate.join("")) {
        console.log("Hit: ", coordonate);
        square.style.backgroundColor = "yellow";
        me.gameboard.criticalShots.splice(
          me.gameboard.criticalShots.indexOf(coordonate),
          1
        );

        for (let ship in me.gameboard.ships) {
          for (let coordonate of me.gameboard.ships[ship].coordonates) {
            if (coordonate.join("") === e.target.id) {
              me.gameboard.ships[ship].hits.push(coordonate);
              me.gameboard.ships[ship].hitCount++;
              me.gameboard.ships[ship].coordonates.splice(
                me.gameboard.ships[ship].coordonates.indexOf(coordonate),
                1
              );
              console.log(me.gameboard.ships[ship]);

              if (
                me.gameboard.ships[ship].hitCount ===
                me.gameboard.ships[ship].length
              ) {
                me.gameboard.ships[ship].isSinked = true;
              }
            }
          }
        }
      }
    }
    
    for (let coordonate of me.gameboard.nonCriticalShots) {
      if (e.target.id === coordonate.join("")) {
        console.log("Miss: ", coordonate);
        square.style.backgroundColor = "white";
        me.gameboard.nonCriticalShots.splice(me.gameboard.nonCriticalShots.indexOf(coordonate),1)
      }
    }

    for (let ship in me.gameboard.ships) {
      for (let coordonate of me.gameboard.ships[ship].hits) {
        if (coordonate.join("") === e.target.id && me.gameboard.ships[ship].isSinked) {
            for(let hit of me.gameboard.ships[ship].hits){
                squares.forEach(insideSquare =>{
                    if(insideSquare.id === hit.join('')){
                        insideSquare.style.backgroundColor = 'red'
                    }
                })
            }
        }
      }
    }
  });
});
