var Organization = (function () {
    function Organization(id, title, position) {
        this.addRect(title, position);
        this.addText(title, position);
    }
    Organization.prototype.addRect = function (title, position) {
        var rect = new Konva.Rect({
            x: position.left,
            y: position.top,
            width: position.width,
            height: position.height,
            fill: 'green',
            stroke: 'green',
            strokeWidth: 1
        });
        rect.on('mousedown', function () {
            console.log("Clicked: " + title);
        });
        this.konvaRect = rect;
        Stage.layer.add(rect);
    };
    Organization.prototype.addText = function (title, position) {
        var text = new Konva.Text({
            x: position.left + 5,
            y: position.top + 5,
            text: title,
            fontSize: 14,
            fontFamily: 'Calibri',
            fill: 'black'
        });
        this.konvaText = text;
        Stage.layer.add(text);
    };
    Organization.prototype.getKonva = function () {
        return { rect: this.konvaRect, text: this.konvaText };
    };
    return Organization;
}());
//# sourceMappingURL=organization.js.map
