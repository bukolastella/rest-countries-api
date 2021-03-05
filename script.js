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
const selectToggle = document.querySelector(".select_toggle");
const arrow = document.querySelector(".arrow");
const back = document.querySelector(".back");
const second = document.querySelector(".second");
const body = document.querySelector("body");

const color = [head, form, text, selectMain, selectOpt, back, second];
const backgroundColor = [countries, first, select, second, body];

//dark mode
dark.addEventListener("click", function () {
  const count = document.querySelectorAll(".count_container");
  const a = document.querySelector(".end_render").querySelectorAll("a");
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
//select
const selectDisplay = function () {
  selectOpt.classList.toggle("hidden");
};
arrow.addEventListener("click", selectDisplay);

//render error
const renderError = function (element) {
  const html = `<div class='error'> Not Available, Try again! </div>`;
  element.innerHTML = "";
  element.insertAdjacentHTML("afterbegin", html);
};
const spinner = function (element) {
  const html = `<div class='spinner'> <i class="fas fa-spinner fa-7x"></i> </div>`;
  element.innerHTML = "";
  element.insertAdjacentHTML("afterbegin", html);
};
//render all countries
const renderAll = async function (addr) {
  try {
    spinner(countries);
    const res = await fetch(addr);
    const data = await res.json();
    const html = data
      .map(
        (ev) => ` 
      <div class="count_container ${
        head.classList.contains("dark_mode") ? "dark_mode" : ""
      }">
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
    countries.innerHTML = "";
    countries.insertAdjacentHTML("afterbegin", html);
  } catch (error) {
    console.log(error);
    renderError(countries);
  }
};
renderAll("https://restcountries.eu/rest/v2/all");

//search for countries

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!text.value) return;
  renderAll(`https://restcountries.eu/rest/v2/name/${text.value}`);
  text.value = "";
});
//filter by region
select.addEventListener("click", function (e) {
  if (!e.target.closest("li")) return;
  const data = e.target.textContent;
  selectDisplay();
  if (data == "All") {
    selectToggle.textContent = "Filter by Region";
    renderAll("https://restcountries.eu/rest/v2/all");
  } else {
    selectToggle.textContent = data;
    renderAll(`https://restcountries.eu/rest/v2/region/${data}`);
  }
});
//detailed page
const renderDetail = async function (addr) {
  try {
    spinner(second);
    const res = await fetch(addr);
    let data = await res.json();
    if (!data.length) {
      const foo = [];
      foo.push(data);
      data = foo;
    }
    const html = data
      .map(
        (ev) => ` 
        <div class="second_img">
        <img src=${ev.flag} alt="flag" />
      </div>
      <div class="right">
        <h1>${ev.name}</h1>
        <div class="right_content">
          <ul>
            <li>Native Name: <span>${ev.nativeName}</span></li>
            <li>population: <span>${ev.population.toLocaleString()}</span></li>
            <li>region: <span>${ev.region}</span></li>
            <li>sub region: <span>${ev.subregion}</span></li>
            <li>capital: <span>${ev.capital}</span></li>
          </ul>
          <ul>
            <li>top level domain <span>${ev.topLevelDomain[0]}</span></li>
            <li>currencies <span>${ev.currencies[0].name}</span></li>
            <li>languages <span>${ev.languages
              .map((ev) => ev.name)
              .join(",")}</span></li>
          </ul>
        </div>
        <div class="right_end ${ev.borders.length == 0 ? "hidden" : ""}">
          <span> border countries: </span>
          <div class="end_render">${ev.borders
            .map(
              (ev) =>
                `<a class='${
                  head.classList.contains("dark_mode") ? "dark_mode" : ""
                }'>${ev}</a>`
            )
            .join("")}
          </div>
        </div>
      </div>
     `
      )
      .join("");
    second.innerHTML = "";
    second.insertAdjacentHTML("afterbegin", html);
  } catch (error) {
    console.error(error);
    renderError(second);
  }
};
const display = [form, select, countries, back, second];
let border;
countries.addEventListener("click", function (e) {
  //
  display.forEach((ev) => ev.classList.toggle("hidden"));
  border = document.querySelector(".end_render");
  if (!e.target.closest(".count_container")) return;
  const data = e.target.closest(".count_container").querySelector("h3")
    .textContent;
  renderDetail(`https://restcountries.eu/rest/v2/name/${data}`);
});
//border detail page
second.addEventListener("click", function (e) {
  if (!e.target.closest("a")) return;
  const data = e.target.closest("a").textContent;
  renderDetail(`https://restcountries.eu/rest/v2/alpha/${data}`);
});

//back
back.addEventListener("click", function () {
  display.forEach((ev) => ev.classList.toggle("hidden"));
  selectToggle.textContent = "Filter by Region";
  renderAll("https://restcountries.eu/rest/v2/all");
});
