"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

btn.addEventListener("click", function () {
  getCountryData("brazlll");
});

const renderError = function (msg) {
  countriesContainer.insertAdjacentHTML(
    "beforeend",
    `<div class="err">${msg}</div>`
  );
};

const getJSON = function (url, errorMsg) {
  fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(errorMsg);
    }
    return response.json();
  });
};

///////////////////////////////////////
// MODERN WAY OF MAKING AJAX CALLS
const getCountryData = function (country) {
  getJSON(
    `https://countries-api-836d.onrender.com/countries/name/${country}`,
    "Country not found!"
  )
    .then((data) => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) {
        throw new Error("Neighbour not found!");
      }

      return getJSON(
        `https://countries-api-836d.onrender.com/countries/name/${neighbour}`,
        "Country not found!"
      );
    })
    .then((data) => renderCountry(data[0], "neighbour"))
    .catch((err) => {
      renderError(`Something went wrong. ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// OLD SCHOOL WAY

const renderCountry = function (data, classification) {
  const html = `<article class="country ${classification}">
  <img class="country__img" src="${data.flags.png}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      data.population / 1000000
    ).toFixed(1)}M people</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
    </article>`;

  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

/*
const getCountryCards = function (country) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    const [neighbour] = data.borders;
    // Render country 1
    renderCountry(data);

    if (!neighbour) return;

    //AJAX call country 2

    const request2 = new XMLHttpRequest();
    request2.open("GET", `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener("load", function () {
      const data2 = JSON.parse(this.responseText);
      renderCountry(data2, "neighbour");
    });
  });
};

*/

const whereAmI = function (lat, lng) {
  fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=-${lng}&localityLanguage=en`
  )
    .then((response) => {
      if (!response) {
        throw new Error("Amount of requests per second exceeded");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.countryName}`);

      return fetch(
        `https://countries-api-836d.onrender.com/countries/name/${data.countryName}`
      );
    })
    .then((response) => {
      if (!response) {
        throw new Error(`Country not found! ${response.status}`);
      }
      return response.json();
    })
    .then((data) => renderCountry(data[0]))
    .catch((err) => {
      console.err(err.message);
    });
};

whereAmI(-26.329999923706055, -48.84000015258789);