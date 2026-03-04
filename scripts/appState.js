import Layout from "./layout.js";

class AppState {
  _currentLayout;
  _layouts = [];

  constructor() {
    const curLayoutName = localStorage.getItem("currentLayout") || "";
    this.loadLayouts();

    this._currentLayout =
      this._layouts.find((el) => el.name === curLayoutName) || new Layout();
  }

  get currentLayout() {
    return this._currentLayout;
  }

  set currentLayout(layoutName) {
    this._currentLayout =
      this._layouts.find((layout) => layout.name === layoutName) ||
      new Layout();
  }

  get layoutName() {
    return this._currentLayout.name;
  }

  get layoutsNames() {
    return this._layouts.map((layout) => layout.name);
  }

  get layouts() {
    return [...this._layouts];
  }

  set layouts(layouts) {
    this._layouts = [...layouts];
  }

  get rowsCount() {
    return this._currentLayout.rowsCount;
  }

  set rowsCount(rowsCount) {
    this._currentLayout.rowsCount = rowsCount;
    this._currentLayout.design = [];
  }

  get bricksCount() {
    return this._currentLayout.bricksCount;
  }

  set bricksCount(bricksCount) {
    this._currentLayout.bricksCount = bricksCount;
    this._currentLayout.design = [];
  }

  get colors() {
    return [...this._currentLayout.colors];
  }

  set colors(colors) {
    this._currentLayout.colors = [...colors];
    this._currentLayout.design = [];
  }

  get showNumbers() {
    return this._currentLayout.showNumbers;
  }

  set showNumbers(showNumbers) {
    this._currentLayout.showNumbers = showNumbers;
  }

  get design() {
    return [...this._currentLayout.design];
  }

  set design(design) {
    return (this._currentLayout.design = [...design]);
  }

  addLayout(layout) {
    this._layouts.push(layout);
    this._currentLayout = layout;
    const layoutsKey = localStorage.getItem("layouts");
    if (layoutsKey) {
      let layouts;
      layouts = JSON.parse(layoutsKey).map((lo) => new Layout(lo));
      layouts.push(layout);
      localStorage.setItem("layouts", JSON.stringify(layouts));
    }
    localStorage.setItem("currentLayout", layout.name);
  }

  deleteCurrentLayout() {
    this._layouts = this._layouts.filter(
      (layout) => layout !== this._currentLayout,
    );
    this._currentLayout = {};
    localStorage.setItem("layouts", JSON.stringify(this._layouts));
  }

  saveLayouts() {
    localStorage.setItem("currentLayout", this.layoutName);
    localStorage.setItem("layouts", JSON.stringify(this._layouts));
  }

  loadLayouts() {
    const curLayoutName = localStorage.getItem("currentLayout") || "";
    const layouts = localStorage.getItem("layouts");
    if (layouts) {
      this._layouts = JSON.parse(layouts).map((layout) => new Layout(layout));
    } else {
      this._layouts.push(new Layout());
      this._currentLayout = this._layouts[0];
      localStorage.setItem("layouts", JSON.stringify(this._layouts));
      localStorage.setItem("currentLayout", this._currentLayout.name);
    }
    this._currentLayout =
      this.layouts.find((el) => el.name === curLayoutName) || new Layout();
  }

  getLayoutNames() {
    return this._layouts.map((layout) => layout.name);
  }

  addColor(color) {
    this._currentLayout.colors.push(color);
  }

  removeColor(color) {
    this._currentLayout.colors = this._currentLayout.colors.filter(
      (colorEl) => colorEl !== color,
    );
    this._currentLayout.design = this._currentLayout.design.map((desEl) =>
      desEl.map((el) => (el == color ? 0 : el)),
    );
  }

  saveCurrentLayout() {
    const savedLayouts = JSON.parse(localStorage.getItem("layouts") || "[]");
    let currentInList = savedLayouts.find(
      (el) => el.name === this._currentLayout.name,
    );
    if (currentInList) {
      currentInList.colors = [...this._currentLayout.colors];
      currentInList.rowsCount = this._currentLayout.rowsCount;
      currentInList.bricksCount = this._currentLayout.bricksCount;
      currentInList.showNumbers = this._currentLayout.showNumbers;
      currentInList.design = [...this._currentLayout.design];
      localStorage.setItem("layouts", JSON.stringify(savedLayouts));
    } else {
      savedLayouts.push(this._currentLayout.name);
      localStorage.setItem("layouts", JSON.stringify(savedLayouts));
    }
  }

  removeCurrentLayout() {
    this._layouts = this._layouts.filter(
      (layout) => layout !== this._currentLayout,
    );
    this._currentLayout = {};
    localStorage.setItem("layouts", JSON.stringify(this._layouts));
    localStorage.setItem("currentLayout", "");
  }

  updateBrickColor(row, column, colorIndex) {
    this._currentLayout.design[row][column] = colorIndex;
  }

  changeCurrentLayoutTo(layoutName) {
    const current = this._layouts.find((layout) => layout.name === layoutName);
    if (current) this._currentLayout = current;
  }
}

export default AppState;
