import AppState from "./scripts/appState.js";
import Layout from "./scripts/layout.js";

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

updateInterface();

if (genButton) {
  genButton.addEventListener("click", () => {
    generate();
    updateSamples();
  });
}

if (saveBtn) {
  saveBtn.addEventListener("click", () => {
    appState.saveCurrentLayout();
  });
}

if (saveAll) {
  saveAll.addEventListener("click", () => {
    appState.saveLayouts();
  });
}

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

function updateSamples() {
  layout.replaceChildren();
  if (appState.design.length) {
    for (let i = 0; i < appState.rowsCount; i++) {
      const row = document.createElement("div");
      row.className = "row";
      layout.append(row);
      for (let j = 0; j < appState.bricksCount; j++) {
        const brick = document.createElement("div");
        brick.classList.add("brick");
        brick.classList.add("color");
        brick.classList.add(`color${appState.design[i][j]}`);
        if (appState.showNumbers) brick.classList.add(`show`);
        brick.innerHTML = `<span>${appState.design[i][j]}</span>`;
        brick.dataset.row = i;
        brick.dataset.column = j;
        row.append(brick);
        brick.addEventListener("click", () => {}); //TODO create color replace dialog
      }
    }
  }
}

function updateInterface() {
  rowsCountEl.value = appState.rowsCount;
  bricksCountEl.value = appState.bricksCount;
  cbShowNumbers.checked = appState.showNumbers;
  updateSamples();
}
