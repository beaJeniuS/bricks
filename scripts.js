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

if (rowsCountEl) {
  rowsCountEl.addEventListener("change", () => {
    appState.rowsCount = Number(rowsCountEl.value);
  });
}

if (cbShowNumbers) {
  cbShowNumbers.addEventListener("change", (e) => {
    appState.showNumbers = e.target.checked;
    updateSamples();
  });
}

if (bricksCountEl) {
  bricksCountEl.addEventListener("change", () => {
    appState.bricksCount = Number(bricksCountEl.value);
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
        brick.addEventListener("click", colorBtnClick);
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

function createColorDialog(targetElement, clientX, clientY) {
  const documentBody = document.querySelector("body");
  const dialog = document.createElement("dialog");
  dialog.classList.add("dialog");
  const closeBtn = document.createElement("button");
  closeBtn.classList.add("cd-close-btn");
  closeBtn.style.left = `${clientX + 2}px`;
  closeBtn.style.top = `${clientY + 2}px`;
  dialog.append(closeBtn);

  dialog.addEventListener("click", () => {
    dialog.remove();
  });
  closeBtn.addEventListener("click", () => {
    dialog.remove();
  });
  const cdRow = document.createElement("div");
  cdRow.classList.add("cd-row");
  cdRow.style.left = `${clientX}px`;
  cdRow.style.top = `${clientY}px`;
  dialog.append(cdRow);
  for (let i = 0; i < appState.colors.length; i++) {
    const btn = document.createElement("button");
    btn.classList.add("cd-btn", `color${appState.colors[i]}`, "color");
    btn.addEventListener("click", getListener(targetElement, dialog, i));
    cdRow.append(btn);
  }
  documentBody.append(dialog);
}

function colorBtnClick(e) {
  createColorDialog(e.currentTarget, e.clientX, e.clientY);
}

function getListener(targetElement, dialog, colorIndex) {
  console.log("click", targetElement);

  return () => {
    targetElement.classList.remove(
      "color1",
      "color2",
      "color3",
      "color4",
      "color5",
      "color6",
      "color7",
      "color8",
      "color9",
    );

    targetElement.classList.add(`color${colorIndex}`);
    targetElement.firstChild.innerText = `${colorIndex}`;
    appState.updateBrickColor(
      targetElement.dataset.row,
      targetElement.dataset.column,
      colorIndex,
    );
    dialog.remove();
  };
}
