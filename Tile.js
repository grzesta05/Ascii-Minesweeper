import {types} from "./script.js"

class Tile {
    constructor(props) {
      this.id = "t" + props.id;
      this.underField = props.underField;
      this.flagged = props.flagged;
      this.neighbours = [];
      this.enabled = true;
      this.key = props.id;
    }
    getTile() {
      return `<div class="mine--block" id="${this.id}">${types.init}</div>`;
    }
  }

export default Tile;