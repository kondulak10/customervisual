class Stage {
  public static stage;
  public static layer;
  public static objects = []; //stored objects + konvas references

  static setStage(id: string, width: number, height: number) {
    var stage = new Konva.Stage({
      container: id,
      width: width,
      height: height
    });
    var layer = new Konva.Layer();
    Stage.stage = stage;
    Stage.layer = layer;
    return { stage: stage, layer: layer };
  }

  static parseObjects(data) {
    for (let d of data) {
      this.draw(d);
      if (d.children) {
        this.parseObjects(d.children);
      }
    }
  }

  static parseRelations(relations) {
    for (let r of relations) {
      this.draw(r);
    }
  }

  static draw(d) {
    var obj;
    if (d.type === "container") {
      obj = new Container(d.id, d.title, d.position)
    }
    else if (d.type==="button") {
      obj = new Button(d.id, d.fc, d.position);
    }
    else if (d.type === "organization") {
      obj = new Organization(d.id, d.title, d.position)
    }
    else if (d.type === "person") {
      obj = new Person(d.id, d.title, d.position)
    }
    else if (d.type === "relation") {
      obj = new Relation (d.from, d.to)
    }
    this.objects.push({data: d, konva: obj});
  }

  static display() {
    Stage.stage.add(Stage.layer);
  }
}