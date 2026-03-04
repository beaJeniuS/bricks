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
}
