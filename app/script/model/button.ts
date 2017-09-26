class Button {
  konvaRect; //rectangle

  constructor(id: string,
    fc: Function,
    position: {
      left: number,
      top: number,
      width: number,
      height: number
    }) {
    this.addRect(fc, position);
  }

  addRect(fc, position) {
    var rect = new Konva.Rect({
      x: position.left,
      y: position.top,
      width: position.width,
      height: position.height,
      fill: 'orange',
      stroke: 'orange',
      strokeWidth: 1
    });
    rect.on('mousedown', function () {
      console.log("Clicked button");
      fc();
    });
    this.konvaRect = rect;
    Stage.layer.add(rect);
  }

  getKonva() {
    return { rect: this.konvaRect };
  }
}