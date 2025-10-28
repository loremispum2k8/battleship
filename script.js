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
      ((coordonate[0].charCodeAt() >= 65 && coordonate[0].charCodeAt() < 75) ||
        (coordonate[0].charCodeAt() > 65 &&
          coordonate[0].charCodeAt() <= 75)) &&
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
        if (orderedTwoMoves[1][0].charCodeAt() + 1 <= 75) {
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
          75
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
        console.log(coordonate.classList.add("squareInputed"));
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
              if (orderedTwoMoves[1][0].charCodeAt() + 1 <= 75) {
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




let randomCoordonatesHistory = [];
// Column or Row
function randomCoord() {
  let row_column_generator;
  let letter_number_generator_universal;
  let first_number_letter;
  let validCoordonates = false;
  let randomNumber = Math.random();


  if (randomNumber <= 0.5) {
    row_column_generator = "row";
    //Pick universal number for row
    randomNumber = String(Math.floor(Math.random() * 10));
    letter_number_generator_universal = randomNumber;
    console.log("Universal Number: ", letter_number_generator_universal);
  }
  // --->>>>>>>   Working on columns
  else if (randomNumber > 0.5) {
    let randomCoordonates = [];
    row_column_generator = "column";

    //Pick universal letter for column
    randomNumber = Math.floor(Math.random() * 10);
    switch (randomNumber) {
      case 0:
        letter_number_generator_universal = "A";
        break;
      case 1:
        letter_number_generator_universal = "B";
        break;
      case 2:
        letter_number_generator_universal = "C";
        break;
      case 3:
        letter_number_generator_universal = "D";
        break;
      case 4:
        letter_number_generator_universal = "E";
        break;
      case 5:
        letter_number_generator_universal = "F";
        break;
      case 6:
        letter_number_generator_universal = "G";
        break;
      case 7:
        letter_number_generator_universal = "H";
        break;
      case 8:
        letter_number_generator_universal = "I";
        break;
      case 9:
        letter_number_generator_universal = "J";
        break;
    }
    console.log("Universal Letter: ", letter_number_generator_universal);

    //Pick first number coordonate
    function pickFirstNumbers() {
      first_number_letter = Math.floor(Math.random() * 10);

      if (5 - (10 - first_number_letter + 1) <= 0) {
        console.log("Fits all 5 coordonates before 10");
        randomCoordonates = [];
        randomCoordonates.push([
          letter_number_generator_universal,
          String(first_number_letter),
        ]);
        for (let i = 1; i <= 4; i++) {
          randomCoordonates.push([
            letter_number_generator_universal,
            String(first_number_letter + i),
          ]);
        }
        //console.log(randomCoordonates);
      } 
      
      else if (5 - (10 - first_number_letter + 1) > 0) {
        console.log(
          "Does not fit all 5 coordonates before 10 and should also add: ",
          5 - (10 - first_number_letter + 1),
          " coordonates"
        );
        randomCoordonates = [];
        randomCoordonates.push([
          letter_number_generator_universal,
          String(first_number_letter),
        ]);
        for (let i = 1; i <= 10 - first_number_letter; i++) {
          randomCoordonates.push([
            letter_number_generator_universal,
            String(first_number_letter + i),
          ]);
        }
        for (let i = 1; i <= 5 - (10 - first_number_letter + 1); i++) {
          randomCoordonates.push([
            letter_number_generator_universal,
            String(first_number_letter - i),
          ]);
        }
        //console.log(randomCoordonates);
      }

      validCoordonates = true;
      for (let coordonate of randomCoordonatesHistory) {
        for (let randomCoodonate in randomCoordonates) {
          if (
            coordonate[0] === randomCoodonate[0] &&
            coordonate[1] === randomCoodonate[1]
          ) {
            console.log(' -->> REPEATING POSITION FOUND  <<--')
            validCoordonates = false;
          }
        }
      }

      if(validCoordonates){
        for (let randomCoodonate of randomCoordonates) {
          randomCoordonatesHistory.push(randomCoodonate)
        }
      }

    }

    do {
      pickFirstNumbers();
    } while ((validCoordonates = false));

    console.log(randomCoordonates)
  }

  console.log(row_column_generator);
}