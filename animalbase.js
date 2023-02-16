"use strict";

window.addEventListener("DOMContentLoaded", start);

let allAnimals = [];

// The prototype for all animals:
const Animal = {
  name: "",
  desc: "-unknown animal-",
  type: "",
  age: 0,
};

function start() {
  console.log("ready");

  // TODO: Add event-listeners to filter and sort buttons

  loadJSON();
  filterClicked();
}

async function loadJSON() {
  const response = await fetch("animals.json");
  const jsonData = await response.json();

  // when jsonData(array) loaded, prepare data objects
  prepareObjects(jsonData);
}

function prepareObjects(jsonData) {
  allAnimals = jsonData.map(preapareObject);

  // TODO: This might not be the function we want to call first
  displayList(allAnimals);
}

function preapareObject(jsonObject) {
  const animal = Object.create(Animal);

  const texts = jsonObject.fullname.split(" ");
  animal.name = texts[0];
  animal.desc = texts[2];
  animal.type = texts[3];
  animal.age = jsonObject.age;

  return animal;
}

function displayList(animals) {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  animals.forEach(displayAnimal);
}

function displayAnimal(animal) {
  // create clone
  const clone = document.querySelector("template#animal").content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=name]").textContent = animal.name;
  clone.querySelector("[data-field=desc]").textContent = animal.desc;
  clone.querySelector("[data-field=type]").textContent = animal.type;
  clone.querySelector("[data-field=age]").textContent = animal.age;

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}

// when filter button gets clicked
// it executes a function that executes filterAnimal function
// and give filterType (document.querySelector("button").dataset.filter = "dog" or "cat" or "*")

// needed to use forEach bc doc.querySelector("button").addEventListener will activate only the first button
// giving addEventListener to each button with forEach

function filterClicked() {
  const buttons = document.querySelectorAll("button");
  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      const filter = button.dataset.filter;
      filterAnimal(filter);
    });
  });
}

function filterAnimal(filterType) {
  console.log(filterType);

  function filterCat() {}

  function filterDog() {}

  function filterAll() {}
}
