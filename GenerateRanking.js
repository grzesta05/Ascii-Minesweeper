import CookieManager from "./CookieManager.js";

function generateHeader(text) {
  return `<div class="header">Size: ${text}</div>`;
}
function generateRecord(text) {
  return `<div class="record">${text}</div>`;
}
export default function generateRanking() {
  const dict = CookieManager.getCookiesDict();
  const leaderboard = document.getElementById("leaderboard");
  leaderboard.innerHTML = "";
  for (const i in dict) {
    leaderboard.innerHTML += generateHeader(i);
    dict[i].sort((a, b) => a.time > b.time);
    console.log(dict[i][0].username);
    for (let o = 0; o < 10 && o < dict[i].length; o++) {
      const element = dict[i][o];
      leaderboard.innerHTML += generateRecord(
        `${element.username} - Mines: ${element.mines} Time: ${
          element.time * 1000
        }`
      );
    }
  }
}
