"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

// Promisifying Geolocation API

navigator.geolocation.getCurrentPosition(
  (position) => console.log(position),
  (err) => console.log(err)
);

const getPosition = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

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

const whereAmI = function (lat, lng) {
  getPosition()
    .then((res) => {
      const { latitude: lat, longitute: lng } = res.coords;
      return fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=-${lng}&localityLanguage=en`
      );
    })
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
      console.error(err.message);
    });
};

btn.addEventListener("click", whereAmI);

/*
// CREATING PROMISES

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log("Lottery draw is happening...");
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve("You WON!");
    } else {
      reject(new Error("You lost!"));
    }
  }, 2000);
});

lotteryPromise
  .then((res) => console.log(res))
  .catch((err) => console.error(err));

// Promisifying setTimeout

const wait = function (secs) {
  return new Promise((resolve) => {
    setTimeout(resolve, secs * 1000);
  });
};

wait(1)
  .then(() => {
    console.log("I waited for 1 seconds");
    return wait(1);
  })
  .then(() => {
    console.log("I waited for 2 seconds");
    return wait(1);
  })
  .then(() => {
    console.log("I waited for 3 seconds");
    return wait(1);
  })
  .then(() => console.log("I waited for 4 seconds"));

/*
//EVENT LOOP IN PRATICE

console.log("Test start");
setTimeout(() => console.log("0 sec timer", 0));
Promise.resolve("Resolved promise 1").then((res) => {
  console.log(res); // setTimeout's callback will only be executed once this microtask is finished
});

Promise.resolve("Resolved promise 2").then((res) => {
  for (let i = 0; i < 10000; i++) {}
  console.log(res); // setTimeout's callback will only be executed once this microtask is finished
});

/*
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
/*

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
*/
