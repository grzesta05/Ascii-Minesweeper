import GameUtils from "./GameUtils.js";
import Tile from "./Tile.js";
import Game from "./Game.js";

export const types = {
  init: "&#9634;",
  mine: "&#x2622;",
  empty: "0",
  flag: "&#127987;",
  smile: ""
};

export const bestTimes = [];



function fetchData() {
  const validResponse = GameUtils.validateInputs();
  if (validResponse.response) {
    game = new Game();
  } else {
    alert(validResponse.errorCode);
  }
}

document.getElementById("refresh").addEventListener("click", fetchData);
let game = new Game();
