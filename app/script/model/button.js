var Button = (function () {
    function Button(id, fc, position) {
        this.addRect(fc, position);
    }
    Button.prototype.addRect = function (fc, position) {
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
    };
    Button.prototype.getKonva = function () {
        return { rect: this.konvaRect };
    };
    return Button;
}());
//# sourceMappingURL=button.js.map