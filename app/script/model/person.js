var Person = (function () {
    function Person(id, title, position) {
        this.addRect(title, position);
        this.addText(title, position);
    }
    Person.prototype.addRect = function (title, position) {
        var rect = new Konva.Rect({
            x: position.left,
            y: position.top,
            width: position.width,
            height: position.height,
            fill: 'blue',
            stroke: 'blue',
            strokeWidth: 1
        });
        rect.on('mousedown', function () {
            console.log("Clicked: " + title);
        });
        this.konvaRect = rect;
        Stage.layer.add(rect);
    };
    Person.prototype.addText = function (title, position) {
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
    Person.prototype.getKonva = function () {
        return { rect: this.konvaRect, text: this.konvaText };
    };
    return Person;
}());
//# sourceMappingURL=person.js.map