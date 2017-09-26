var Relation = (function () {
    function Relation(from, to) {
        var fromObject = {}; //from object
        var toObject = {}; //to object
        for (var _i = 0, _a = Stage.objects; _i < _a.length; _i++) {
            var d = _a[_i];
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
    Relation.prototype.addArrow = function (coord) {
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
    };
    Relation.prototype.addText = function (title, coord, type) {
        var text = new Konva.Text({
            x: coord["text"][type].x,
            y: coord["text"][type].y,
            text: title,
            fontSize: 14,
            align: "center",
            fontFamily: 'Calibri',
            fill: 'black'
        });
        if (type === "from") {
            this.konvaText1 = text;
        }
        else if (type === "to") {
            this.konvaText2 = text;
        }
        Stage.layer.add(text);
    };

    function getRectangleNodes(left, top, width, height) {
            return [ [left + width / 2, top], [left + width, top + height / 2], [left + width / 2, top + height], [left, top + height / 2] ];
        }

    function squareDistance(x1, y1, x2, y2) {
        return ( Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) )
    }

    function getTextPosition(x1, y1, x2, y2, distanceFromObject, rightPerpendicular) {
        const perpendicularDistanceFromLine = 20;

        a = Math.sqrt(distanceFromObject**2 / (2*((x2-x1)*2 + (y2-y1)**2)))
        var x = x1 + (x2-x1) * a
        var y = y1 + (y2-y1) * a
        console.log(a);

        a2 = Math.sqrt(perpendicularDistanceFromLine**2 / (2*((x2-x1)*2 + (y2-y1)**2)))

        if (rightPerpendicular) {
          x += (y2-y1) * a2
          y += (x1-x2) * a2
        }
        else {
          x += (y1-y2) * a2
          y += (x2-x1) * a2
        }

        console.log("a2:", a2);

        return [x, y]

    }

    Relation.prototype.computeSide = function (fromObject, toObject) {

        var fromPos = fromObject.data.position;
        var toPos = toObject.data.position;

        fromNodes = getRectangleNodes(fromPos.left, fromPos.top, fromPos.width, fromPos.height);
        toNodes = getRectangleNodes(toPos.left, toPos.top, toPos.width, toPos.height);

        var minDistance = 999999999
        var minFrom;
        var minTo;

        for(var i = 0; i < fromNodes.length; i++) {
            for(var j = 0; j < toNodes.length; j++) {
                var d = squareDistance(fromNodes[i][0], fromNodes[i][1], toNodes[j][0], toNodes[j][1]);
                if (d < minDistance) {
                    minDistance = d
                    minFrom = fromNodes[i]
                    minTo = toNodes[j]
                }
            }
        }

        console.log("fromNodes: ", fromNodes);
        console.log("toNodes: ", toNodes);
        console.log("minFrom: ", minFrom);
        console.log("minTo: ", minTo);


        //todo: make more general
        var rightPerpendicular = true;
        if (minTo[1] < minFrom[1]) {
          rightPerpendicular = false
        }

        var toDist = 100;
        if (minTo[0] < minFrom[1]) {
          toDist = 20
        }

        textFrom = getTextPosition(minFrom[0], minFrom[1], minTo[0], minTo[1], 30, rightPerpendicular)
        textTo = getTextPosition(minTo[0], minTo[1], minFrom[0], minFrom[1], toDist, !rightPerpendicular)
        console.log("textFrom", textFrom);

        return {
            line: {
                from: {
                    x: minFrom[0],
                    y: minFrom[1]
                },
                to: {
                    x: minTo[0] - minFrom[0],
                    y: minTo[1] - minFrom[1]
                }
            },
            text: {
                from: {
                    x: textFrom[0],
                    y: textFrom[1],
                },
                to: {
                    x: textTo[0],
                    y: textTo[1]
                }
            }
        };

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
            };
        }
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
            };
        }
        else {
            console.log("Not yet implemented");
        }
    };
    Relation.prototype.getKonva = function () {
        return { arrow: this.konvaArrow, text1: this.konvaText1, text2: this.konvaText2 };
    };
    return Relation;
}());
//# sourceMappingURL=relation.js.map
