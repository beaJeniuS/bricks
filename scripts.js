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

if (deleteAllColorsBtn) {
  deleteAllColorsBtn.addEventListener("click", () => {
    colorsSamplesPan.replaceChildren();
    appState.colors = [];
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

if (loadBtn) {
  loadBtn.addEventListener("click", () => {
    appState.loadLayouts();
    updateInterface();
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

if (addColorBtn) {
  addColorBtn.addEventListener("click", () => {
    createSampleChoiseDialog();
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

function createDialog(width, height, caption) {
  const documentBody = document.querySelector("body");
  const dialog = document.createElement("dialog");
  dialog.classList.add("dialog");
  const dialogHeader = document.createElement("div");
  dialogHeader.innerHTML = `<span>${caption}</span>` || "";
  dialogHeader.classList.add("dialog-header");
  const dialogBody = document.createElement("div");
  dialogBody.classList.add("dialog-body");
  dialogBody.style.width = `${width}px`;
  dialogBody.style.height = `${height}px`;
  dialogBody.append(dialogHeader);
  dialog.append(dialogBody);

  const closeBtn = document.createElement("button");
  closeBtn.classList.add("cd-close-btn");
  closeBtn.style.left = "94%";
  closeBtn.style.top = "4px";
  dialogHeader.append(closeBtn);

  dialog.addEventListener("click", () => {
    dialog.remove();
  });

  dialogBody.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  closeBtn.addEventListener("click", () => {
    dialog.remove();
  });

  documentBody.append(dialog);
  return dialogBody;
}

function createSampleChoiseDialog() {
  const availableColors = ["1", "2", "3", "4", "5", "6", "7", "8", "9"].filter(
    (el) => !appState._currentLayout.colors.includes(el),
  );

  const dialog = createDialog(300, 300, "Выберите варианты цветов");
  const column = document.createElement("div");
  column.classList.add("variants");
  dialog.append(column);
  const addBtn = document.createElement("button");
  addBtn.innerText = "Добавить";
  addBtn.classList.add("dialog-button");
  const listener = (e) => {
    const checkedColors = Array.from(
      document.querySelectorAll(".variants input"),
    ).filter((el) => el.checked);
    if (checkedColors.length > 0) {
      addBtn.disabled = false;
    } else {
      addBtn.disabled = true;
    }
  };
  for (let i = 0; i < availableColors.length; i++) {
    const variantColor = createColorVariantElement(
      availableColors[i],
      listener,
    );
    column.append(variantColor);
  }

  addBtn.disabled = true;
  addBtn.addEventListener("click", () => {
    const checkedColors = Array.from(
      document.querySelectorAll(".variants input"),
    )
      .filter((el) => el.checked)
      .map((el) => el.dataset.id);
    checkedColors.forEach((color) => appState.addColor(color));
    updateInterface();
    dialog.remove();
  });
  const dialogFooter = document.createElement("div");
  dialogFooter.classList.add("dialog-footer");
  dialogFooter.append(addBtn);
  dialog.append(dialogFooter);
}

function createColorVariantElement(colorIndex, clickListener) {
  const variantEl = document.createElement("div");
  variantEl.classList.add("variants__item");
  const label = document.createElement("label");
  label.htmlFor = `color${colorIndex}`;
  const cb = document.createElement("input");
  cb.id = `color${colorIndex}`;
  cb.dataset.id = `${colorIndex}`;
  cb.type = "checkbox";
  const sample = document.createElement("div");
  sample.classList.add("color-sample", "color", `color${colorIndex}`);
  label.append(cb, sample);
  variantEl.append(label);
  cb.addEventListener("input", clickListener);
  return variantEl;
}

function updateColorsSamplesPan() {
  colorsSamplesPan.replaceChildren();
  appState.colors.forEach((color) => {
    const newSample = document.createElement("div");
    newSample.classList.add("color-sample", "color", `color${color}`);
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("sample-del-btn");
    deleteBtn.innerText = "X";
    deleteBtn.addEventListener("click", () => {
      appState.removeColor(color);
      updateSamples();
      updateColorsSamplesPan();
      updateReport(2);
    });
    newSample.append(deleteBtn);
    colorsSamplesPan.append(newSample);
  });
}

function updateInterface() {
  updateSelLayoutsNames();
  updateColorsSamplesPan();
  rowsCountEl.value = appState.rowsCount;
  bricksCountEl.value = appState.bricksCount;
  cbShowNumbers.checked = appState.showNumbers;
  updateSamples();
  if (reports) reports.replaceChildren();
  updateReport();
}

function updateSelLayoutsNames() {
  selLayoutName.replaceChildren();
  appState.layoutsNames.forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.innerText = name;
    selLayoutName.append(option);
  });
  selLayoutName.selectedIndex = Array.from(selLayoutName.options)
    .map((opt) => opt.value)
    .findIndex((el) => el === appState.layoutName);
}

function updateStatistic() {
  const stat = {
    nocolor: 0,
    colors: [],
    total: 0,
  };
  const colorInxs = appState.design.flat();
  stat.nocolor = colorInxs.reduce((acc, cv) => (cv === 0 ? acc + 1 : acc), 0);
  for (let i = 1; i <= 9; i++) {
    const exists = colorInxs.some((el) => el === i);
    if (exists) {
      const statObj = {
        color: i,
        count: colorInxs.reduce((acc, cv) => (cv === i ? acc + 1 : acc), 0),
      };
      stat.colors.push(statObj);
    }
  }
  stat.total = colorInxs.length;
  return stat;
}

function createReportCard(target, classList, color, count, total) {
  const statCard = document.createElement("div");
  classList.forEach((cl) => statCard.classList.add(cl));
  const span1 = document.createElement("span");
  span1.innerText = color === 0 ? `Без цвета` : `Цвет- ${color}`;
  const span2 = document.createElement("span");
  span2.innerText = `Количество: ${count}`;
  const span3 = document.createElement("span");
  span3.innerText = `Процент: ${((count / total) * 100).toFixed(1)}%`;
  statCard.append(span1, span2, span3);
  target.append(statCard);
}
