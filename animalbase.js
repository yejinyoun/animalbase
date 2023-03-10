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
  sortClicked();
}

async function loadJSON() {
  const response = await fetch("animals.json");
  const jsonData = await response.json();

  // when jsonData(array) loaded, prepare data objects
  prepareObjects(jsonData);
}

function prepareObjects(jsonData) {
  allAnimals = jsonData.map(preapareObject);

  // even though the buttons aren't clicked, it should show the animals when the data is ready so
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

function filterClicked() {
  const buttons = document.querySelectorAll("button");
  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      const filter = button.dataset.filter;
      filterAnimal(filter);

      console.log(`${filter} button clicked`);
    });
  });
}

// when filter button gets clicked
// it executes an anonymous function that executes filterAnimal function
// and give filter as parameter (document.querySelector("button").dataset.filter = "dog" or "cat" or "*")

// needed to use forEach bc doc.querySelector("button").addEventListener will activate only the first button

/* function filterAnimal(filterType) {
  let filteredAnimals = allAnimals; //showing allAnimals as base setting

  if (filterType === "cat") {
    // if the clicked button was cat, check allAnimals(array), if each object's type property is cat,
    // array method .filter will create new array that are cats
    // and changes the filteredAnimals value

    filteredAnimals = allAnimals.filter(filterCat);

    function filterCat(animal) {
      if (animal.type === "cat") {
        return true;
      } else {
        return false;
      }
    }
  } else if (filterType === "dog") {
    filteredAnimals = allAnimals.filter(filterDog);
    function filterDog(animal) {
      if (animal.type === "dog") {
        return true;
      } else {
        false;
      }
    }
  }

  displayList(filteredAnimals); // gets executed at the end, bc filteredAnimals variable will change, if it's cat or dog
} */

function filterAnimal(filterType) {
  let filteredAnimals = allAnimals;

  if (filterType !== "*") {
    filteredAnimals = allAnimals.filter(filterBy);

    function filterBy(animal) {
      if (animal.type === filterType) {
        return true;
      } else {
        return false;
      }
    }
  }

  displayList(filteredAnimals);
}

function sortClicked() {
  const buttons = document.querySelectorAll("th");
  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      const sort = button.dataset.sort;
      sortAnimal(sort);

      console.log(`${sort} button clicked`);
    });
  });
}

function sortAnimal(sortType) {
  let sortedAnimals = allAnimals.sort(sortBy);

  function sortBy(a, b) {
    if (a[sortType] < b[sortType]) {
      return -1;
    } else {
      return 1;
    }
  }
  displayList(sortedAnimals);
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
