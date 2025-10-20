class Ship {
  constructor(length, type) {
    this.type = type;
    this.length = length;
    this.hitCount = 0;
    this.isSinked = false;
    this.coordonates = [];
    this.hits = [];
    this.allowedMoves = [];
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







class Gameboard {
  constructor() {
    this.criticalShots = [];
    this.nonCriticalShots = {};
    this.historyShots = [];
    this.ships = {
      carrier: new Ship(5, "carrier"),
      battleship: new Ship(4, "battleship"),
      cruiser: new Ship(3, "cruiser"),
      submarine: new Ship(3, "submarine"),
      destroyer: new Ship(2, "destroyer"),
    };

    let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    for (let i = 1; i <= 10; i++) {
      this.nonCriticalShots[`Row${i}`] = [];
      for (let letter of letters) {
        this.nonCriticalShots[`Row${i}`].push([letter, String(i)]);
      }
    }
  }

  placeBoat(ship, coordonateStr) {
    let historyShotsPass = true;
    let allowedMovePass = false;

    let coordonate = [];
    coordonate.push(coordonateStr[0]);
    coordonate.push(coordonateStr.slice(1));
    console.log(coordonate);

    // CONSTRUCTING POSSIBLE MOVES
    if (this.ships[ship].coordonates.length === 0) {
      this.ships[ship].allowedMoves.push(coordonate);
      console.log(this.ships[ship].allowedMoves);
    }
    if (this.ships[ship].coordonates.length === 2){
      if(this.ships[ship].coordonates[0][0] !== this.ships[ship].coordonates[1][0] && this.ships[ship].coordonates[0][1] === this.ships[ship].coordonates[1][1]){
        let orderedTwoMoves = this.ships[ship].coordonates.sort((a,b) => a[0].charCodeAt()-b[0].charCodeAt())
        this.ships[ship].allowedMoves = []
        
        if(orderedTwoMoves[0][0].charCodeAt()-1 >= 65){
          this.ships[ship].allowedMoves.push([String.fromCharCode(orderedTwoMoves[0][0].charCodeAt()-1),orderedTwoMoves[0][1]])
          //console.log('Possible move 1: ', [String.fromCharCode(orderedTwoMoves[0][0].charCodeAt()-1),orderedTwoMoves[0][1]])
        }


        if(orderedTwoMoves[1][0].charCodeAt()+1 <= 75){
          this.ships[ship].allowedMoves.push([String.fromCharCode(orderedTwoMoves[1][0].charCodeAt()+1),orderedTwoMoves[1][1]])
          //console.log('Possible move 2: ', [String.fromCharCode(orderedTwoMoves[1][0].charCodeAt()+1),orderedTwoMoves[1][1]])
        }


        console.log(this.ships[ship].allowedMoves)
      }
      
      else if(this.ships[ship].coordonates[0][0] === this.ships[ship].coordonates[1][0] && this.ships[ship].coordonates[0][1] !== this.ships[ship].coordonates[1][1]){
        let orderedTwoMoves = this.ships[ship].coordonates.sort((a,b) => a[0].charCodeAt()-b[0].charCodeAt())
        this.ships[ship].allowedMoves = []
        if(Number(orderedTwoMoves[0][1])-1 >= 1){
          this.ships[ship].allowedMoves.push([orderedTwoMoves[0][0],String(Number(orderedTwoMoves[0][1])-1)])
          //console.log('Possible move 1: ', [orderedTwoMoves[0][0],String(Number(orderedTwoMoves[0][1])-1)])
        }
        if(Number(orderedTwoMoves[1][1])+1 <= 10){
          this.ships[ship].allowedMoves.push([orderedTwoMoves[1][0],String(Number(orderedTwoMoves[1][1])+1)])
          //console.log('Possible move 2: ', [orderedTwoMoves[1][0],String(Number(orderedTwoMoves[1][1])+1)])
        }
        console.log(this.ships[ship].allowedMoves)
      }
    }
    // CONSTRUCTING POSSIBLE MOVES

    // Check for repeating coordonate - SEEMS GOOD
    for (let position of this.historyShots) {
      if (position[0] === coordonate[0] && position[1] === coordonate[1]) {
        historyShotsPass = false;
        console.log("Repeating position found");
      }
    }
    // Check for repeating coordonate - SEEMS GOOD

    // Check for possibleMove
    for (let possibleMove of this.ships[ship].allowedMoves) {
      if (
        possibleMove[0] === coordonate[0] &&
        possibleMove[1] === coordonate[1]
      ) {
        allowedMovePass = true;
      }
    }
    // Check for possibleMove

    if (!allowedMovePass) {
      console.log("Unnable to validate position");
    }

    // Add coordonate
    if (
      this.ships[ship].coordonates.length < this.ships[ship].length &&
      historyShotsPass === true &&
      allowedMovePass === true
    ){

      console.log("passed");
      this.ships[ship].coordonates.push(coordonate);
      this.criticalShots.push(coordonate);
      this.historyShots.push(coordonate);

      for (let row in this.nonCriticalShots) {
        for (let position of this.nonCriticalShots[row]) {
          for (let possibleMove of this.ships[ship].allowedMoves) {
            if (
              position[0] === coordonate[0] &&
              position[1] === coordonate[1] &&
              possibleMove[0] === coordonate[0] &&
              possibleMove[1] === coordonate[1]
            ) {
              this.nonCriticalShots[row].splice(
                this.nonCriticalShots[row].indexOf(position),
                1
              );
            }
          }
        }
      }

      console.log("Adding 4 more possitions");
      if (this.ships[ship].coordonates.length === 1) {
        let letter = this.ships[ship].coordonates[0][0];
        let num = this.ships[ship].coordonates[0][1];

        // [ L+1 ; N ]
        if (letter.charCodeAt(0) + 1 >= 72) {
          this.ships[ship].allowedMoves[1] = ["J", num];
        } else {
          this.ships[ship].allowedMoves[1] = [
            String.fromCharCode(letter.charCodeAt(0) + 1),
            num,
          ];
        }

        // [ L-1 ; N ]
        if (letter.charCodeAt(0) - 1 <= 65) {
          this.ships[ship].allowedMoves[2] = ["A", num];
        } else {
          this.ships[ship].allowedMoves[2] = [
            String.fromCharCode(letter.charCodeAt(0) - 1),
            num,
          ];
        }

        // [ L ; N + 1 ]
        if (Number(num) + 1 >= 10) {
          this.ships[ship].allowedMoves[3] = [letter, "10"];
        } else {
          this.ships[ship].allowedMoves[3] = [
            letter,
            String(Number(num) + 1),
          ];
        }

        // [ L-1 ; N - 1 ]
        if (Number(num) - 1 <= 1) {
          this.ships[ship].allowedMoves[4] = [letter, "1"];
        } else {
          this.ships[ship].allowedMoves[4] = [
            letter,
            String(Number(num) - 1),
          ];
        }

        this.ships[ship].allowedMoves = this.ships[ship].allowedMoves.filter(
          (move) => move !== undefined
        );
        this.ships[ship].allowedMoves = this.ships[ship].allowedMoves.filter(
          (move) => move.join("") !== coordonate.join("")
        );
        console.log(this.ships[ship].allowedMoves);
      }
    }
    // Addcoordonate
    console.log(this);
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
me.gameboard.placeBoat("submarine", "C2");
me.gameboard.placeBoat("submarine", "B2");
me.gameboard.placeBoat("submarine", "J2");
me.gameboard.placeBoat("carrier", "A1");




// DOM
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

    for (let row in me.gameboard.nonCriticalShots) {
      for (let coordonate of me.gameboard.nonCriticalShots[row]) {
        if (e.target.id === coordonate.join("")) {
          console.log("Miss: ", coordonate);
          square.style.backgroundColor = "white";
          me.gameboard.nonCriticalShots[row].splice(
            me.gameboard.nonCriticalShots[row].indexOf(coordonate),
            1
          );
        }
      }
    }

    for (let ship in me.gameboard.ships) {
      for (let coordonate of me.gameboard.ships[ship].hits) {
        if (
          coordonate.join("") === e.target.id &&
          me.gameboard.ships[ship].isSinked
        ) {
          for (let hit of me.gameboard.ships[ship].hits) {
            squares.forEach((insideSquare) => {
              if (insideSquare.id === hit.join("")) {
                insideSquare.style.backgroundColor = "red";
              }
            });
          }
        }
      }
    }
  });
});
