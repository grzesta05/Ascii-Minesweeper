import GameUtils from "./GameUtils.js";
import { types } from "./script.js";
import Tile from "./Tile.js";

class Game {
  constructor() {
    this.plane = document.querySelectorAll(".game--container")[0];
    this.planeArray = [];

    this.width = document.getElementById("widthInput").value;
    this.height = document.getElementById("heightInput").value;

    this.gameUtils = new GameUtils(this);

    this.mines = document.getElementById("minesInput").value;
    this.mineTrueProbability = this.mines / (this.width * this.height);

    this.time = 0;
    this.renderFields();
    this.clicked = false;
    this.flagsUsed = 0;

    this.timerInterval = null;
  }
  timerUI() {
    this.timerInterval = setInterval(() => {
      this.time++;
      document.getElementById("time").innerHTML = this.time;
    }, 1000);
  }
  flagsUI() {
    document.getElementById("flagsUsed").innerHTML = this.flagsUsed;
  }

  winningCondition() {
    for (const i of this.planeArray) {
      console.log(i)
      if (i.underField == types.mine && !i.flagged) {
        return 0;
      }
      clearInterval(this.timerInterval);
      GameUtils.win(this.planeArray);
    }
  }
  addOnClicksToTile(element) {
    const tile = document.getElementById(element.id);
    tile.addEventListener("click", () => {
      if (element.underField == types.mine && !element.flagged) {
        clearInterval(this.timerInterval);
        GameUtils.lose(this.planeArray);
        return;
      }
      if (!this.clicked) {
        this.placeMines(element.key);
        this.clicked = true;
        this.timerUI();
      }
      GameUtils.tileSearch(element);
    });
    tile.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      if (this.flagsUsed < this.mines && element.enabled && !element.flagged) {
        this.flagsUsed++;
        this.flagsHTML = this.flagsUsed;
        tile.innerHTML = types.flag;
        element.flagged = true;
        if (this.flagsUsed == this.mines) {
          this.winningCondition();
        }
      } else if (element.flagged) {
        this.flagsUsed--;
        this.flagsHTML = this.flagsUsed;
        element.flagged = false;
        tile.innerHTML = types.init;
      }
      this.flagsUI();
    });
  }

  placeMines(omit = null) {
    this.minesPlaced = 0;
    while (this.minesPlaced < this.mines) {
      for (const element of this.planeArray) {
        const key = element.key;
        if (key != omit && element.underField != types.mine) {
          if (Math.random() < this.mineTrueProbability) {
            element.underField = types.mine;
            this.minesPlaced++;
            element.neighbours.forEach((element) => {
              if (element.underField != types.mine) element.underField++;
            });
            if (this.minesPlaced == this.mines) {
              break;
            }
          }
        }
      }
    }
  }

  renderFields() {
    let appendToPlane = "";
    for (let i = 0; i < this.height; i++) {
      for (let o = 0; o < this.width; o++) {
        this.planeArray.push(
          new Tile({
            id: this.width * i + o,
            underField: 0,
            flagged: false,
          })
        );
        appendToPlane += this.planeArray[this.width * i + o].getTile();
      }
      appendToPlane += "<br>";
    }
    this.plane.innerHTML = appendToPlane;

    this.planeArray.forEach((element, key) => {
      for (let nw = -1; nw < 2; nw++)
        for (let nh = -1; nh < 2; nh++) {
          if (
            document.getElementById("t" + (key + this.width * nh + nw)) != null
          )
            element.neighbours.push(
              this.planeArray[key + this.width * nh + nw]
            );
        }
      this.addOnClicksToTile(element);
    });
  }
}

export default Game;
