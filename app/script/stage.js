var Stage = (function () {
    function Stage() {
    }
    Stage.setStage = function (id, width, height) {
        var stage = new Konva.Stage({
            container: id,
            width: width,
            height: height
        });
        var layer = new Konva.Layer();
        Stage.stage = stage;
        Stage.layer = layer;
        return { stage: stage, layer: layer };
    };
    Stage.parseObjects = function (data) {
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var d = data_1[_i];
            this.draw(d);
            if (d.children) {
                this.parseObjects(d.children);
            }
        }
    };
    Stage.parseRelations = function (relations) {
        for (var _i = 0, relations_1 = relations; _i < relations_1.length; _i++) {
            var r = relations_1[_i];
            this.draw(r);
        }
    };
    Stage.draw = function (d) {
        var obj;
        if (d.type === "container") {
            obj = new Container(d.id, d.title, d.position);
        }
        else if (d.type === "button") {
            obj = new Button(d.id, d.fc, d.position);
        }
        else if (d.type === "organization") {
            obj = new Organization(d.id, d.title, d.position);
        }
        else if (d.type === "person") {
            obj = new Person(d.id, d.title, d.position);
        }
        else if (d.type === "relation") {
            obj = new Relation(d.from, d.to);
        }
        this.objects.push({ data: d, konva: obj });
    };
    Stage.display = function () {
        Stage.stage.add(Stage.layer);
    };
    Stage.objects = []; //stored objects + konvas references
    return Stage;
}());
//# sourceMappingURL=stage.js.map