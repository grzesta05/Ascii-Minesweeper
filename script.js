import GameUtils from "./GameUtils.js";
import Tile from "./Tile.js";
import Game from "./Game.js";
import CookieManager from "./CookieManager.js";
import generateRanking from "./GenerateRanking.js";

export const types = {
  init: "&#9634;",
  mine: "&#x2622;",
  empty: "0",
  flag: "&#127987;",
  smile: "",
};

export const bestTimes = [];

export function showSaveTimeModal() {
  document.querySelector(".saving-modal").classList.toggle("saving-modal-show");
}
function showLeaderboard() {
  document
    .querySelector(".leaderboard-modal")
    .classList.toggle("leaderboard-modal-show");
}
function fetchData() {
  clearInterval(game.timerInterval);
  const validResponse = GameUtils.validateInputs();
  if (validResponse.response) {
    game = new Game();
  } else {
    alert(validResponse.errorCode);
  }
}

document.getElementById("refresh").addEventListener("click", fetchData);
let game = new Game();

function submitTime() {
  const username = document.getElementById("username").value;
  CookieManager.saveCookie(`${game.width * game.height}`, {
    username: username,
    mines: game.mines,
    width: game.width,
    height: game.height,
    time: game.time,
  });
  showSaveTimeModal();
  fetchData();
}

function changeTheme() {
  document.querySelector("html").classList.toggle("dark");
  let prefContent = document.querySelector(".mode-pref");
  prefContent.innerHTML = prefContent.innerHTML == "Dark" ? "Light" : "Dark";
}

document.querySelector("#swapDiv").addEventListener("click", changeTheme);
document.querySelector("#submit-time").addEventListener("click", submitTime);
document.querySelector("#close-time").addEventListener("click", () => {
  showSaveTimeModal();
});
document.querySelector("#leaderboard-button").addEventListener("click", () => {
  generateRanking();
  showLeaderboard();
});
document
  .querySelector("#leaderboard-close")
  .addEventListener("click", showLeaderboard);
