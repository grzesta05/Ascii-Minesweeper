import { types } from "./script.js";

class GameUtils {
  static win(tiles) {
    tiles.forEach((element) => {
      this.invalidateEvent(element);
    });
  }
  static lose(tiles) {
    tiles.forEach((element) => {
      this.invalidateEvent(element);
      if (element.underField == types.mine)
        document.getElementById(element.id).innerHTML = types.mine;
    });
  }

  static invalidateEvent(object) {
    const tileHTML = document.getElementById(object.id);
    tileHTML.parentNode.replaceChild(tileHTML.cloneNode(true), tileHTML);
  }

  static tileSearch(tile) {
    const tileHTML = document.getElementById(tile.id);
    if (!tile.flagged && tile.enabled) {
      tile.enabled = false;
      switch (tile.underField) {
        //blank space uwu
        case 0:
          tileHTML.innerHTML = types.empty;
          this.invalidateEvent(tile);
          tile.neighbours
            .filter((element) => element.enabled)
            .forEach((element) => {
              this.tileSearch(element);
            });
          break;
        //numerc value
        default:
          tileHTML.innerHTML = tile.underField;
          break;
      }
    }
  }
  static validateInputs() {
    const values = [
      document.getElementById("widthInput").value,
      document.getElementById("heightInput").value,
      document.getElementById("minesInput").value,
    ];
    //Error handlers
    if (
      values.filter((value) => !Number.isInteger(Number.parseInt(value)))
        .length != 0
    ) {
      return {
        response: false,
        errorCode: "Values You entered aren't a number!",
      };
    }
    if (values[2] < 1) {
      return {
        response: false,
        errorCode: "No mines? Isnt that too easy?",
      };
    }
    if (values[2] > (values[0] - 1) * (values[1] - 1)) {
      return {
        response: false,
        errorCode: `Too many Mines! Maximum number for ${values[0]}x${
          values[1]
        } - ${(values[0] - 1) * (values[1] - 1)}`,
      };
    }
    if (values[0] > 64 || values[1] > 64) {
      return { response: false, errorCode: "The plane is too big" };
    }
    return { response: true };
  }
}

export default GameUtils;
