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
    if (
      this.ships[ship].coordonates.length === 0 &&
      ((coordonate[0].charCodeAt() >= 65 && coordonate[0].charCodeAt() < 74) ||
        (coordonate[0].charCodeAt() > 65 &&
          coordonate[0].charCodeAt() <= 74)) &&
      (Number(coordonate[1]) >= 1 || Number(coordonate[1]) <= 10)
    ) {
      this.ships[ship].allowedMoves.push(coordonate);
      console.log(this.ships[ship].allowedMoves);
    } else if (this.ships[ship].coordonates.length === 2) {
      if (
        this.ships[ship].coordonates[0][0] !==
          this.ships[ship].coordonates[1][0] &&
        this.ships[ship].coordonates[0][1] ===
          this.ships[ship].coordonates[1][1]
      ) {
        let orderedTwoMoves = this.ships[ship].coordonates.sort(
          (a, b) => a[0].charCodeAt() - b[0].charCodeAt()
        );
        this.ships[ship].allowedMoves = [];

        if (orderedTwoMoves[0][0].charCodeAt() - 1 >= 65) {
          this.ships[ship].allowedMoves.push([
            String.fromCharCode(orderedTwoMoves[0][0].charCodeAt() - 1),
            orderedTwoMoves[0][1],
          ]);
        }
        if (orderedTwoMoves[1][0].charCodeAt() + 1 <= 74) {
          this.ships[ship].allowedMoves.push([
            String.fromCharCode(orderedTwoMoves[1][0].charCodeAt() + 1),
            orderedTwoMoves[1][1],
          ]);
        }
        console.log(this.ships[ship].allowedMoves);
      } else if (
        this.ships[ship].coordonates[0][0] ===
          this.ships[ship].coordonates[1][0] &&
        this.ships[ship].coordonates[0][1] !==
          this.ships[ship].coordonates[1][1]
      ) {
        let orderedTwoMoves = this.ships[ship].coordonates.sort(
          (a, b) => a[1] - b[1]
        );
        this.ships[ship].allowedMoves = [];
        if (Number(orderedTwoMoves[0][1]) - 1 >= 1) {
          this.ships[ship].allowedMoves.push([
            orderedTwoMoves[0][0],
            String(Number(orderedTwoMoves[0][1]) - 1),
          ]);
        }
        if (Number(orderedTwoMoves[1][1]) + 1 <= 10) {
          this.ships[ship].allowedMoves.push([
            orderedTwoMoves[1][0],
            String(Number(orderedTwoMoves[1][1]) + 1),
          ]);
        }
        console.log("Smaller move: ", Number(orderedTwoMoves[0][1]) - 1);
        console.log("Bigger move: ", Number(orderedTwoMoves[1][1]) + 1);
        console.log(this.ships[ship].allowedMoves);
      }

      //FIX THIS SHIT HERE
    } else if (this.ships[ship].coordonates.length >= 3) {
      console.log(this.ships[ship].coordonates);
      this.ships[ship].allowedMoves = [];

      let direction;
      let ordersThreeOrMoreMoves;

      if (
        this.ships[ship].coordonates[0][0] ===
        this.ships[ship].coordonates[1][0]
      ) {
        direction = "column";
        ordersThreeOrMoreMoves = this.ships[ship].coordonates.sort(
          (a, b) => a[1] - b[1]
        );
      } else if (
        this.ships[ship].coordonates[0][1] ===
        this.ships[ship].coordonates[1][1]
      ) {
        direction = "row";
        ordersThreeOrMoreMoves = this.ships[ship].coordonates.sort(
          (a, b) => a[0].charCodeAt() - b[0].charCodeAt()
        );
      }

      console.log(direction);
      console.log(this.ships[ship].coordonates);
      console.log(ordersThreeOrMoreMoves);
      // CONTINUE
      if (direction === "row") {
        if (ordersThreeOrMoreMoves[0][0].charCodeAt() - 1 >= 65) {
          this.ships[ship].allowedMoves.push([
            String.fromCharCode(ordersThreeOrMoreMoves[0][0].charCodeAt() - 1),
            ordersThreeOrMoreMoves[0][1],
          ]);
        }
        if (
          ordersThreeOrMoreMoves[
            ordersThreeOrMoreMoves.length - 1
          ][0].charCodeAt() +
            1 <=
          74
        ) {
          this.ships[ship].allowedMoves.push([
            String.fromCharCode(
              ordersThreeOrMoreMoves[
                ordersThreeOrMoreMoves.length - 1
              ][0].charCodeAt() + 1
            ),
            ordersThreeOrMoreMoves[0][1],
          ]);
        }
        console.log(this.ships[ship].allowedMoves);
      } else if (direction === "column") {
        if (Number(ordersThreeOrMoreMoves[0][1]) - 1 >= 1) {
          console.log(Number(ordersThreeOrMoreMoves[0][1]) - 1);
          this.ships[ship].allowedMoves.push([
            ordersThreeOrMoreMoves[0][0],
            String(Number(ordersThreeOrMoreMoves[0][1]) - 1),
          ]);
        }
        if (
          Number(ordersThreeOrMoreMoves[ordersThreeOrMoreMoves.length - 1][1]) +
            1 <=
          10
        ) {
          console.log(
            Number(
              ordersThreeOrMoreMoves[ordersThreeOrMoreMoves.length - 1][1]
            ) + 1
          );
          this.ships[ship].allowedMoves.push([
            ordersThreeOrMoreMoves[0][0],
            String(
              Number(
                ordersThreeOrMoreMoves[ordersThreeOrMoreMoves.length - 1][1]
              ) + 1
            ),
          ]);
        }
      }
      console.log(direction);
    }
    // CONSTRUCTING POSSIBLE MOVES

    // Check for repeating coordonate
    for (let position of this.historyShots) {
      if (position[0] === coordonate[0] && position[1] === coordonate[1]) {
        historyShotsPass = false;
        console.log("Repeating position found");
      }
    }
    // Check for repeating coordonate

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
    ) {
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
        console.log("Adding 1 move");
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
          this.ships[ship].allowedMoves[3] = [letter, String(Number(num) + 1)];
        }

        // [ L-1 ; N - 1 ]
        if (Number(num) - 1 <= 1) {
          this.ships[ship].allowedMoves[4] = [letter, "1"];
        } else {
          this.ships[ship].allowedMoves[4] = [letter, String(Number(num) - 1)];
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

  recieveAttack(square) {
    for (let coordonate of me.gameboard.criticalShots) {
      if (square.id === coordonate.join("")) {
        console.log("Hit: ", coordonate);
        square.style.backgroundColor = "yellow";
        me.gameboard.criticalShots.splice(
          me.gameboard.criticalShots.indexOf(coordonate),
          1
        );

        for (let ship in me.gameboard.ships) {
          for (let coordonate of me.gameboard.ships[ship].coordonates) {
            if (coordonate.join("") === square.id) {
              me.gameboard.ships[ship].hits.push(coordonate);
              me.gameboard.ships[ship].hit();
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
        if (square.id === coordonate.join("")) {
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
          coordonate.join("") === square.id &&
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
  }
}

class Player {
  constructor() {
    this.gameboard = new Gameboard();
  }
}

let me = new Player();
let computer = new Player();

let placingContainer = document.querySelector(".placingContainer");
let placingDoneButton = document.querySelector(".placingDoneButton");
let tableRow = document.querySelectorAll(".tableRow");
let placingMapCoordonates = document.querySelectorAll(".square-placing");
let coordonateInputs = document.querySelectorAll(".coordonateInput");
tableQuantity = document.querySelectorAll(".tableQuantity");

function finishMap() {
  let allCoordonatesPlaced = true;
  for (let ship in me.gameboard.ships) {
    if (
      me.gameboard.ships[ship].coordonates.length !==
      me.gameboard.ships[ship].length
    ) {
      allCoordonatesPlaced = false;
    }
  }
  if (allCoordonatesPlaced) {
    console.log("allPlaced");
    placingDoneButton.classList.add("mapDone");
  } else {
    placingDoneButton.classList.remove("mapDone");
  }
}

coordonateInputs.forEach((input) => {
  if (input.disabled) {
    input.style.cursor = "not-allowed";
    input.style.backgroundColor = "#E6E6E6";
  } else if (!input.disabled) {
    input.classList.add("activeInput");
  }
});

coordonateInputs.forEach((input) => {
  input.addEventListener("change", () => {
    let validatedCoordonate = false;
    input.value = input.value.toUpperCase();
    console.log(input.value);
    console.log(input.id);
    me.gameboard.placeBoat(input.id, input.value);
    finishMap();
    if (input.nextElementSibling) {
      input.nextElementSibling.classList.add("activeInput");
      input.nextElementSibling.removeAttribute("disabled");
      input.nextElementSibling.style.cursor = "pointer";
      input.nextElementSibling.style.backgroundColor = "white";
    }
    console.log("---> ", me.gameboard);
    placingMapCoordonates.forEach((coordonate) => {
      for (let leftMove of me.gameboard.historyShots) {
        if (leftMove.join("") === input.value) {
          validatedCoordonate = true;
        }
      }

      if (coordonate.id === input.value && validatedCoordonate) {
        coordonate.classList.add("squareInputed");
        coordonate.classList.add("growMapCoordonate");
        setTimeout(()=>{
          coordonate.classList.remove("growMapCoordonate");
        },400)
        for (let row of tableRow) {
          if (row.children[0].textContent.toLowerCase() === input.id) {
            console.log(
              me.gameboard.ships[input.id].coordonates.length ===
                me.gameboard.ships[input.id].length
            );
            if (
              me.gameboard.ships[input.id].coordonates.length ===
              me.gameboard.ships[input.id].length
            ) {
              console.log("ADD BLUE ");
              row.classList.add("blueBorder");
              row.classList.remove("redBorder");
              row.classList.remove("greyBorder");
              row.children[0].style.color = "#5986E9";
              row.children[1].style.color = "#5986E9";
              row.children[2].style.color = "#5986E9";
              row.children[2].textContent = "1";
              row.children[2].classList.remove("grey");
            } else if (
              me.gameboard.ships[input.id].coordonates.length >= 1 &&
              me.gameboard.ships[input.id].coordonates.length < 5
            ) {
              console.log("addingred");
              row.classList.add("redBorder");
              row.classList.remove("greyBorder");
              row.classList.remove("blueBorder");
              row.children[0].style.color = "#BC4B4B";
              row.children[1].style.color = "#BC4B4B";
              row.children[2].classList.add("grey");
              row.children[2].textContent = "0";
              row.children[2].removeAttribute("style");
            }
          }
        }
      }
    });
  });
});

coordonateInputs.forEach((input) => {
  input.addEventListener("click", () => {
    if (input.value !== "") {
      let pastValue = [input.value[0], input.value.slice(1)];
      input.value = null;
      finishMap();
      placingDoneButton.classList.remove("mapDone");
      for (let criticalShot of me.gameboard.criticalShots) {
        if (criticalShot.join("") === pastValue.join("")) {
          me.gameboard.criticalShots.splice(
            me.gameboard.criticalShots.indexOf(criticalShot),
            1
          );
        }
      }
      for (let historyShot of me.gameboard.historyShots) {
        if (historyShot.join("") === pastValue.join("")) {
          me.gameboard.historyShots.splice(
            me.gameboard.historyShots.indexOf(historyShot),
            1
          );
        }
      }
      for (let nonCriticalShot of me.gameboard.nonCriticalShots[
        "Row" + pastValue[1]
      ]) {
        if (pastValue[0] === "A") {
          me.gameboard.nonCriticalShots["Row" + pastValue[1]].unshift(
            pastValue
          );
          break;
        } else if (pastValue[0] === "J") {
          me.gameboard.nonCriticalShots["Row" + pastValue[1]].push(pastValue);
          break;
        } else {
          if (
            nonCriticalShot[0].charCodeAt() ===
            pastValue[0].charCodeAt() + 1
          ) {
            me.gameboard.nonCriticalShots["Row" + pastValue[1]].splice(
              me.gameboard.nonCriticalShots["Row" + pastValue[1]].indexOf(
                nonCriticalShot
              ),
              0,
              pastValue
            );
            break;
          }
        }
      }

      console.log(me.gameboard.ships[input.id]);
      for (let coordonate of me.gameboard.ships[input.id].coordonates) {
        if (coordonate.join("") === pastValue.join("")) {
          me.gameboard.ships[input.id].coordonates.splice(
            me.gameboard.ships[input.id].coordonates.indexOf(coordonate),
            1
          );

          // Rewrite possible moves based on new length
          if (me.gameboard.ships[input.id].coordonates.length === 0) {
            me.gameboard.ships[input.id].allowedMoves = [];
          } else if (me.gameboard.ships[input.id].coordonates.length === 1) {
            let letter = me.gameboard.ships[input.id].coordonates[0][0];
            let num = me.gameboard.ships[input.id].coordonates[0][1];

            // [ L+1 ; N ]
            if (letter.charCodeAt(0) + 1 >= 72) {
              me.gameboard.ships[input.id].allowedMoves[0] = ["J", num];
            } else {
              me.gameboard.ships[input.id].allowedMoves[0] = [
                String.fromCharCode(letter.charCodeAt(0) + 1),
                num,
              ];
            }

            // [ L-1 ; N ]
            if (letter.charCodeAt(0) - 1 <= 65) {
              me.gameboard.ships[input.id].allowedMoves[1] = ["A", num];
            } else {
              me.gameboard.ships[input.id].allowedMoves[1] = [
                String.fromCharCode(letter.charCodeAt(0) - 1),
                num,
              ];
            }

            // [ L ; N + 1 ]
            if (Number(num) + 1 >= 10) {
              me.gameboard.ships[input.id].allowedMoves[2] = [letter, "10"];
            } else {
              me.gameboard.ships[input.id].allowedMoves[2] = [
                letter,
                String(Number(num) + 1),
              ];
            }

            // [ L-1 ; N - 1 ]
            if (Number(num) - 1 <= 1) {
              me.gameboard.ships[input.id].allowedMoves[3] = [letter, "1"];
              console.log([letter, 1]);
            } else {
              me.gameboard.ships[input.id].allowedMoves[3] = [
                letter,
                String(Number(num) - 1),
              ];
              console.log([letter, String(Number(num) - 1)]);
              console.log(me.gameboard.ships[input.id].allowedMoves[4]);
            }

            me.gameboard.ships[input.id].allowedMoves = me.gameboard.ships[
              input.id
            ].allowedMoves.filter((move) => move !== undefined);
            console.log(me.gameboard.ships[input.id].allowedMoves);
          } else if (me.gameboard.ships[input.id].coordonates.length === 2) {
            console.log(me.gameboard.ships[input.id].coordonates);
            if (
              me.gameboard.ships[input.id].coordonates[0][0] !==
                me.gameboard.ships[input.id].coordonates[1][0] &&
              me.gameboard.ships[input.id].coordonates[0][1] ===
                me.gameboard.ships[input.id].coordonates[1][1]
            ) {
              let orderedTwoMoves = me.gameboard.ships[
                input.id
              ].coordonates.sort(
                (a, b) => a[0].charCodeAt() - b[0].charCodeAt()
              );
              me.gameboard.ships[input.id].allowedMoves = [];

              if (orderedTwoMoves[0][0].charCodeAt() - 1 >= 65) {
                me.gameboard.ships[input.id].allowedMoves.push([
                  String.fromCharCode(orderedTwoMoves[0][0].charCodeAt() - 1),
                  orderedTwoMoves[0][1],
                ]);
              }
              if (orderedTwoMoves[1][0].charCodeAt() + 1 <= 74) {
                me.gameboard.ships[input.id].allowedMoves.push([
                  String.fromCharCode(orderedTwoMoves[1][0].charCodeAt() + 1),
                  orderedTwoMoves[1][1],
                ]);
              }
            } else if (
              me.gameboard.ships[input.id].coordonates[0][0] ===
                me.gameboard.ships[input.id].coordonates[1][0] &&
              me.gameboard.ships[input.id].coordonates[0][1] !==
                me.gameboard.ships[input.id].coordonates[1][1]
            ) {
              let orderedTwoMoves = me.gameboard.ships[
                input.id
              ].coordonates.sort((a, b) => a[1] - b[1]);
              me.gameboard.ships[input.id].allowedMoves = [];
              if (Number(orderedTwoMoves[0][1]) - 1 >= 1) {
                me.gameboard.ships[input.id].allowedMoves.push([
                  orderedTwoMoves[0][0],
                  String(Number(orderedTwoMoves[0][1]) - 1),
                ]);
              }
              if (Number(orderedTwoMoves[1][1]) + 1 <= 10) {
                me.gameboard.ships[input.id].allowedMoves.push([
                  orderedTwoMoves[1][0],
                  String(Number(orderedTwoMoves[1][1]) + 1),
                ]);
              }
            }
          }
        }
      }

      // EDITING COLOR GREY RED BLUE
      placingMapCoordonates.forEach((coordonate) => {
        if (coordonate.id === pastValue.join("")) {
          coordonate.classList.remove("squareInputed");
          coordonate.classList.add('shrinkMapCoordonate')
          setTimeout(()=>{
            coordonate.classList.remove('shrinkMapCoordonate')
          },400)

          for (let row of tableRow) {
            if (row.children[0].textContent.toLowerCase() === input.id) {
              if (me.gameboard.ships[input.id].coordonates.length === 0) {
                row.classList.add("greyBorder");
                row.classList.remove("redBorder");
                row.classList.remove("blueBorder");
                row.children[0].style.color = "black";
                row.children[1].style.color = "black";
                row.children[2].classList.add("grey");
                row.children[2].textContent = "0";
                row.children[2].removeAttribute("style");
              } else if (
                me.gameboard.ships[input.id].coordonates.length >= 1 &&
                me.gameboard.ships[input.id].coordonates.length < 5
              ) {
                row.classList.add("redBorder");
                row.classList.remove("greyBorder");
                row.classList.remove("blueBorder");
                row.children[0].style.color = "#BC4B4B";
                row.children[1].style.color = "#BC4B4B";
                row.children[2].classList.add("grey");
                row.children[2].textContent = "0";
                row.children[2].removeAttribute("style");
              }
            }
          }
        }
      });
    }
  });
});

placingDoneButton.addEventListener("click", (e) => {
  if (e.target.classList.contains("mapDone")) {
    placingContainer.style.display = "none";
  }
});


function getComputerCoordonates(){
  let randomBoats = {
   ships:{
    carrier: {
    direction: null,
    coordonates: null,
    length: 5
   },
   battleship: {
    direction: null,
    coordonates: null,
    length: 4
   },
   cruiser: {
    direction: null,
    coordonates: null,
    length: 3
   },
   submarine: {
    direction: null,
    coordonates: null,
    length: 3
   },
   destroyer: {
    direction: null,
    coordonates: null,
    length: 2
   }
   },
   history:[]
}

function getDirection(){
  let randomNumber = Math.random()
  if(randomNumber <= 0.5){
    return 'row'
  }else{
    return 'column'
  }
}

for(let randomBoat in randomBoats.ships){
  randomBoats.ships[randomBoat].direction = getDirection()
}

function getUniversalNumber_Row(){
  let universalNumber = Math.floor(Math.random()*10)+1;
  return universalNumber
}

function getUniversalLetter_Column(){
  let universalLetter = Math.floor(Math.random()*10)+1;
  switch(universalLetter){
    case 1:
      universalLetter = 'A'
    break;
    case 2:
      universalLetter = 'B'
    break;
    case 3:
      universalLetter = 'C'
    break;
    case 4:
      universalLetter = 'D'
    break;
    case 5:
      universalLetter = 'E'
    break;
    case 6:
      universalLetter = 'F'
    break;
    case 7:
      universalLetter = 'G'
    break;
    case 8:
      universalLetter = 'H'
    break;
    case 9:
      universalLetter = 'I'
    break;
    case 10:
      universalLetter = 'J'
    break;
  }
  return universalLetter
}

function getfirstLetter_Row(){
  let firstLetter = Math.floor(Math.random()*10)+1;
  switch(firstLetter){
    case 1:
      firstLetter = 'A'
    break;
    case 2:
      firstLetter = 'B'
    break;
    case 3:
      firstLetter = 'C'
    break;
    case 4:
      firstLetter = 'D'
    break;
    case 5:
      firstLetter = 'E'
    break;
    case 6:
      firstLetter = 'F'
    break;
    case 7:
      firstLetter = 'G'
    break;
    case 8:
      firstLetter = 'H'
    break;
    case 9:
      firstLetter = 'I'
    break;
    case 10:
      firstLetter = 'J'
    break;
  }
  return firstLetter
}

function getfirstNumber_Column(){
  let firstNumber = Math.floor(Math.random()*10)+1;
  return firstNumber
}

function getRandomRow(universalNumber,firstLetter,boatLength){
  let coordonatesArr = []
  coordonatesArr.push([firstLetter, String(universalNumber)])

  let rowFormula = boatLength - ( 74 - firstLetter.charCodeAt() + 1);

  if(rowFormula > 0){
    for( let i = 1; i < ( 74 - firstLetter.charCodeAt() + 1 ); i++ ){
      coordonatesArr.push( [ String.fromCharCode(firstLetter.charCodeAt() + i ) , String(universalNumber) ] )
    }
    for( let i = 1; i <= rowFormula; i++ ){
      coordonatesArr.push( [ String.fromCharCode(firstLetter.charCodeAt() - i ) , String(universalNumber) ] )
    }
  }else if(rowFormula <= 0){
    for( let i = 1; i < boatLength; i++){
      coordonatesArr.push( [ String.fromCharCode(firstLetter.charCodeAt() + i ) , String(universalNumber) ] )
    }
  }

  return coordonatesArr
}


function getRandomColumn(universalLetter,firstNumber,boatLength){
  let coordonatesArr = []
  coordonatesArr.push([universalLetter , String(firstNumber)])

  let columnFormula = boatLength - ( 10 - firstNumber + 1 )

  if(columnFormula > 0){
    for(let i = 1; i < ( 10 - firstNumber + 1 ); i++){
      coordonatesArr.push( [ universalLetter  , String(firstNumber + i)])
    }
    for(let i = 1; i <= columnFormula; i++){
      coordonatesArr.push( [ universalLetter  , String(firstNumber - i)])
    }

  }else if(columnFormula <= 0){
    for(let i = 1; i < boatLength; i++){
      coordonatesArr.push( [ universalLetter  , String(firstNumber + i)])
    }
  }
  
  return coordonatesArr
}

function verifyRows(row,boatLength){
  let rowVerified = true;
  let verifiedRow = row

  for(let historyCoordonate of randomBoats.history){
    for(let rowCoordonate of verifiedRow){
       if(historyCoordonate.join('') === rowCoordonate.join('')){
        rowVerified = false;
        console.log('Found dublicate: history -->  ',historyCoordonate,' coordonate: --> ', rowCoordonate)
        console.log(verifiedRow)
        break
      }
    }
  }

  while(rowVerified === false){
    console.log('verification declined, repeating function')
    verifiedRow = getRandomRow(getUniversalNumber_Row(), getfirstLetter_Row(), boatLength)

    rowVerified = true;
    for(let historyCoordonate of randomBoats.history){
      for(let rowCoordonate of verifiedRow){
        if(historyCoordonate.join('') === rowCoordonate.join('')){
          rowVerified = false;
          break;
        }
      }
    } 
  }

  for(let verifiedRowCoordonate of verifiedRow){
    randomBoats.history.push(verifiedRowCoordonate)
  }
  return verifiedRow;
}

function verifyColumns(column,boatLength){
  columnVerified = true;
  let verifiedColumn = column;

  for(let historyCoordonate of randomBoats.history){
    for(let columnCoordonate of verifiedColumn){
      if(historyCoordonate.join('') === columnCoordonate.join('')){
        columnVerified = false;
        console.log('Found dublicate: history -->  ',historyCoordonate,' coordonate: --> ', columnCoordonate)
        console.log(verifiedColumn)
        break;
      }
    }
  }

  while(columnVerified === false){
    console.log('verification declined, repeating function')
    verifiedColumn = getRandomColumn(getUniversalLetter_Column(),getfirstNumber_Column(), boatLength)

    columnVerified = true;
    for(let historyCoordonate of randomBoats.history){
      for(let columnCoordonate of verifiedColumn){
        if(historyCoordonate.join('') === columnCoordonate.join('')){
          columnVerified = false;
          break;
        }
      }
    }
  }

  for(let verifiedColumnCoordonate of verifiedColumn){
    randomBoats.history.push(verifiedColumnCoordonate)
  }
  return verifiedColumn

}

for(let ship in randomBoats.ships){
  if(randomBoats.ships[ship].direction === 'row'){
    randomBoats.ships[ship].coordonates = verifyRows(getRandomRow(getUniversalNumber_Row(), getfirstLetter_Row(), randomBoats.ships[ship].length),randomBoats.ships[ship].length)
  }else if(randomBoats.ships[ship].direction === 'column'){
    randomBoats.ships[ship].coordonates = verifyColumns(getRandomColumn(getUniversalLetter_Column(),getfirstNumber_Column(), randomBoats.ships[ship].length),randomBoats.ships[ship].length)
  }
}

return randomBoats;
}

console.log(getComputerCoordonates())


