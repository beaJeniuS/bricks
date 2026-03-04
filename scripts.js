import AppState from "./appState.js";
import Layout from "./layout.js";

const bricksCountEl = document.querySelector("#bricks-count");
const rowsCountEl = document.querySelector("#rows-count");
const genButton = document.querySelector("#generate");
const reportBtn = document.querySelector("#report-btn");
const reportsClearBtn = document.querySelector("#reports-clear");
const saveBtn = document.querySelector("#btn-save");
const saveAsBtn = document.querySelector("#btn-saveas");
const saveAll = document.querySelector("#btn-save-all");
const loadBtn = document.querySelector("#btn-load");
const deleteBtn = document.querySelector("#btn-delete");
const layout = document.querySelector(".layout");
const cbShowNumbers = document.querySelector("#cb-show-numbers");
const cbShowDoor = document.querySelector("#cb-show-door");
const door = document.querySelector(".door");
const deleteAllColorsBtn = document.querySelector("#del-all-color-btn");
const addColorBtn = document.querySelector("#add-color-btn");
const colorsSamplesPan = document.querySelector(".colors-samples");
const selLayoutName = document.querySelector("#layout-name");
const reports = document.querySelector(".reports-list");

const appState = new AppState();

function generate() {
  const newDesign = [];

  for (let i = 0; i < appState.rowsCount; i++) {
    newDesign.push([]);
    for (let j = 0; j < appState.bricksCount; j++) {
      const colorIndex = Math.floor(Math.random() * appState.colors.length);
      newDesign[i].push(Number(appState.colors[colorIndex]));
    }
  }
  appState.design = newDesign;
}
