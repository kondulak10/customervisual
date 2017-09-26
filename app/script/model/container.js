var Container = (function () {
    function Container(id, title, position) {
        this.addRect(title, position);
        this.addText(title, position);
    }
    Container.prototype.addRect = function (title, position) {
        var rect = new Konva.Rect({
            x: position.left,
            y: position.top,
            width: position.width,
            height: position.height,
            fill: '#f0f0f0',
            stroke: '#909090',
            strokeWidth: 1
        });
        rect.on('mousedown', function () {
            console.log("Clicked: " + title);
        });
        rect.on('mouseover', function () {
            rect.setFill("#fafafa");
            Stage.layer.draw();
        });
        rect.on('mouseout', function () {
            rect.setFill("#f0f0f0");
            Stage.layer.draw();
        });
        this.konvaRect = rect;
        Stage.layer.add(rect);
    };
    Container.prototype.addText = function (title, position) {
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
    Container.prototype.getKonva = function () {
        return { rect: this.konvaRect, text: this.konvaText };
    };
    return Container;
}());
//# sourceMappingURL=container.js.map