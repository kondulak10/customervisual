//<reference path="../../node_modules/@types/jquery/index.d.ts"></reference>
//<reference path="../lib/konva.d.ts"></reference>
var Konva;
$(document).ready(function () {
    var setup = Stage.setStage("konva", 1000, 800);
    var stage = setup.stage;
    var layer = setup.layer;
    //parse objects
    Stage.parseObjects(Data.data);
    //parse relations
    Stage.parseRelations(Data.relations);
    //all done
    console.log("Stage", Stage.objects);
    //display
    Stage.display();
});
//# sourceMappingURL=index.js.map