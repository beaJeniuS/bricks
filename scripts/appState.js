import Layout from "./layout.js";

class AppState {
  _currentLayout;
  _layouts = [];

  constructor() {
    const curLayoutName = localStorage.getItem("currentLayout") || "";
    this.loadLayouts();

    this._currentLayout =
      this.layouts.find((el) => el.name === curLayoutName) || new Layout();
  }
}
