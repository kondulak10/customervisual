class Relation {
  konvaArrow;
  konvaText1;
  konvaText2;

  constructor(from, to) {
    var fromObject = {}; //from object
    var toObject = {}; //to object
    for (let d of Stage.objects) {
      if (d.data.id === from.id) {
        fromObject = d;
      }
      else if (d.data.id === to.id) {
        toObject = d;
      }
    }
    var coord = this.computeSide(fromObject, toObject);
    this.addArrow(coord);
    this.addText(from.title, coord, "from");
    this.addText(to.title, coord, "to");
  }

  addArrow(coord) {
    var arrow = new Konva.Arrow({
      x: coord["line"]["from"].x,
      y: coord["line"]["from"].y,
      points: [0, 0, coord["line"]["to"].x, coord["line"]["to"].y],
      pointerLength: 5,
      pointerWidth: 5,
      fill: 'black',
      stroke: 'black',
      strokeWidth: 2
    });
    this.konvaArrow = arrow;
    Stage.layer.add(arrow);
  }

  addText(title, coord, type) {
    var text = new Konva.Text({
      x: coord["text"][type].x,
      y: coord["text"][type].y,
      text: title,
      fontSize: 14,
      fontFamily: 'Calibri',
      fill: 'black'
    });
    if (type === "from") {
      this.konvaText1 = text;
    }
    else if (type ==="to") {
      this.konvaText2 = text;
    }
    Stage.layer.add(text);
  }

  computeSide(fromObject, toObject) {
    //TODO: finish other sides
    //right bottom
    if (fromObject.data.position.left + fromObject.data.position.width <= toObject.data.position.left) {
      return {
        line: {
          from: {
            x: fromObject.data.position.left + fromObject.data.position.width,
            y: fromObject.data.position.top + fromObject.data.position.height / 2
          },
          to: {
            x: toObject.data.position.left - fromObject.data.position.left - fromObject.data.position.width + toObject.data.position.width / 2,
            y: toObject.data.position.top - fromObject.data.position.top - fromObject.data.position.height / 2
          }
        },
        text: {
          from: {
            x: fromObject.data.position.left + fromObject.data.position.width + 10,
            y: fromObject.data.position.top + fromObject.data.position.height / 2 - 10,
          },
          to: {
            x: toObject.data.position.left + toObject.data.position.width / 2 + 10,
            y: toObject.data.position.top - 20
          }
        }
      }
    }
    //top
    else if (fromObject.data.position.left <= toObject.data.position.left) {
      return {
        line: {
          from: {
            x: fromObject.data.position.left + fromObject.data.position.width / 2,
            y: fromObject.data.position.top
          },
          to: {
            x: -(fromObject.data.position.left - toObject.data.position.left),
            y: -(fromObject.data.position.top - toObject.data.position.top - toObject.data.position.height)
          }
        },
        text: {
          from: {
            x: toObject.data.position.left + toObject.data.position.width / 2 + 10,
            y: fromObject.data.position.top - 20,
          },
          to: {
            x: toObject.data.position.left + toObject.data.position.width / 2 + 10,
            y: toObject.data.position.top + toObject.data.position.height + 10
          }
        }
      }
    }
    //else
    else {
      console.log("Not yet implemented");
    }
  }

  getKonva() {
    return { arrow: this.konvaArrow, text1: this.konvaText1, text2: this.konvaText2 }
  }
}