"use strict";
const dark = document.querySelector(".dark");
const head = document.querySelector(".head");
const form = document.querySelector(".form");
const text = document.querySelector(".text");
const selectMain = document.querySelector(".select_main");
const selectOpt = document.querySelector(".select_opt");
const first = document.querySelector(".first");
const countries = document.querySelector(".countries");
const select = document.querySelector(".select");
const count = document.querySelectorAll(".count_container");
const arrow = document.querySelector(".arrow");
const back = document.querySelector(".back");
const second = document.querySelector(".second");
const body = document.querySelector("body");
const a = document.querySelector(".end_render").querySelectorAll("a");

const color = [head, form, text, selectMain, selectOpt, back, second];
const backgroundColor = [countries, first, select, second, body];

//dark mode
dark.addEventListener("click", function () {
  color.forEach((ev) => {
    ev.classList.toggle("dark_mode");
  });
  text.classList.toggle("dark_caret");
  backgroundColor.forEach((ev) => ev.classList.toggle("dark_background"));
  count.forEach((element) => {
    element.classList.toggle("dark_mode");
  });
  a.forEach((ev) => ev.classList.toggle("dark_mode"));
});
arrow.addEventListener("click", function () {
  selectOpt.classList.toggle("hidden");
});

//render all countries
const renderAll = async function () {
  try {
    const res = await fetch("https://restcountries.eu/rest/v2/all");
    const data = await res.json();
    console.log(data);
    const html = data
      .map(
        (ev) => ` 
      <div class="count_container">
        <div class="container_top">
          <img src=${ev.flag} alt="flag" />
        </div>
        <div class="container_down">
          <h3>${ev.name}</h3>
          <div>population: <span>${ev.population.toLocaleString()}</span></div>
          <div>region: <span>${ev.region}</span></div>
          <div>capital: <span>${ev.capital}</span></div>
        </div>
      </div>`
      )
      .join("");
    countries.insertAdjacentHTML("afterbegin", html);
  } catch (error) {
    console.log(error);
  }
};
renderAll();
