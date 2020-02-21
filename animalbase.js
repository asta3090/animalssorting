"use strict";

window.addEventListener("DOMContentLoaded", start);

let allAnimals = [];

// The prototype for all animals:
const Animal = {
  name: "",
  desc: "-unknown animal-",
  type: "",
  age: 0
};

function start() {
  console.log("ready");

  document.querySelector("body > p > button:nth-child(1)").addEventListener("click", filterCats);
  document.querySelector("body > p > button:nth-child(2)").addEventListener("click", filterDogs);
  document.querySelector("body > p > button:nth-child(3)").addEventListener("click", filterAll);

  document.querySelector("#sorting > th:nth-child(1)").addEventListener("click", sortingName);
  document.querySelector("#sorting > th:nth-child(2)").addEventListener("click", sortingDesc);
  document.querySelector("#sorting > th:nth-child(3)").addEventListener("click", sortingType);
  document.querySelector("#sorting > th:nth-child(4)").addEventListener("click", sortingAge);
  loadJSON();
}

async function loadJSON() {
  const response = await fetch("animals.json");
  const jsonData = await response.json();

  // when loaded, prepare data objects
  prepareObjects(jsonData);
}

function prepareObjects(jsonData) {
  allAnimals = jsonData.map(preapareObject);

  // TODO: This might not be the function we want to call first - call the filter list
  displayList(allAnimals);
}

//Filter

function filterAll() {
  const All = allAnimals.filter(alle);
  displayList(All);
}

function filterCats() {
  const onlyCats = allAnimals.filter(isCat);
  displayList(onlyCats);
}

function filterDogs() {
  const onlyDogs = allAnimals.filter(isDog);
  displayList(onlyDogs);
}

//ALLE

function alle(Animal) {
  return animal;
}

//DOGS

function isDog(Animal) {
  if (Animal.type === "dog") {
    return true;
  } else {
    return false;
  }
}
//CATS
function isCat(Animal) {
  if (Animal.type === "cat") {
    return true;
  } else {
    return false;
  }
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

function filterList() {
  displayList();
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

//SORTING

function compareName(a, b) {
  if (a.name < b.name) {
    return -1;
  } else if (a.name > b.name) {
    return -1;
  } else {
    return 1;
  }
}

function compareDesc(a, b) {
  if (a.desc < b.desc) {
    return -1;
  } else if (a.desc > b.desc) {
    return -1;
  } else {
    return 1;
  }
}

function compareType(a, b) {
  if (a.type < b.type) {
    return -1;
  } else if (a.type > b.type) {
    return -1;
  } else {
    return 1;
  }
}

function compareAge(a, b) {
  if (a.age < b.age) {
    return -1;
  } else if (a.age > b.age) {
    return -1;
  } else {
    return 1;
  }
}

function sortingName() {
  const sortName = allAnimals.sort(compareName);
  displayList(sortName);
}

function sortingDesc() {
  const sortDesc = allAnimals.sort(compareDesc);
  displayList(sortDesc);
}

function sortingType() {
  const sortType = allAnimals.sort(compareType);
  displayList(sortType);
}

function sortingAge() {
  const sortAge = allAnimals.sort(compareAge);
  displayList(sortAge);
}
