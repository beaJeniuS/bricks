class Layout {
  name; // layout`s name
  colors; // bricks colors indexes array
  rowsCount; // count bricks lines
  bricksCount; // count bricks per line
  showNumbers; // show color index at every brick option
  design; // lines and bricks colors configuration
  constructor(layout) {
    if (layout === undefined) {
      this.name = "по умолчанию";
      this.colors = ["1", "2", "3", "4", "5"];
      this.rowsCount = 10;
      this.bricksCount = 10;
      this.showNumbers = false;
      this.design = [];
    } else {
      this.name = layout.name;
      this.colors = [...layout.colors];
      this.rowsCount = layout.rowsCount;
      this.bricksCount = layout.bricksCount;
      this.showNumbers = layout.showNumbers;
      this.design = [...layout.design];
    }
  }
}

export default Layout;
