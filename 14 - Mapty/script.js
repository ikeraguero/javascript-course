"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

let map, mapEvent;

if (navigator.geolocation) {
  // checking if navigator can access the location
  navigator.geolocation.getCurrentPosition(
    function (position) {
      console.log(position);
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

      const coords = [latitude, longitude];

      map = L.map("map").setView(coords, 15);
      console.log(map);
      L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      // Displaying form when any region of the map is clicked
      map.on("click", function (mapE) {
        mapEvent = mapE;
        form.classList.remove("hidden");
        inputDistance.focus();
      });
    },
    function () {
      alert("Coudn't collect location data");
    }
  );

  // Add marker to map when form is submited
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    inputCadence.value =
      inputDistance.value =
      inputDuration.value =
      inputElevation.value =
        "";
    const { lat, lng } = mapEvent.latlng;
    L.marker([lat, lng])
      .addTo(map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: "running-popup",
        })
      )
      .setPopupContent("Workout")
      .openPopup();
  });

  // Switching between cadence and elevation according to activity selected on type option

  inputType.addEventListener("change", function () {
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
  });
}
