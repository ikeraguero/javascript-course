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

const validInput = (...inputs) => inputs.every((inp) => Number.isFinite(inp));
console.log(validInput(NaN, NaN, NaN));

// Classes

////////////////////////////////////////////////////////////////////////
// APPLICATION ARCHITETURE //
class App {
  #map;
  #mapEvent;
  #workouts = [];
  constructor() {
    this._getPosition();

    // Add marker to map when form is submited
    form.addEventListener("submit", this._newWorkout.bind(this));

    // Switching between cadence and elevation according to activity selected on type option

    inputType.addEventListener("change", this._toggleElevationField);
  }

  // methods
  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this._loadMap.bind(this));
    }
  }
  _loadMap(position) {
    console.log(position);
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];
    //Loading map
    this.#map = L.map("map").setView(coords, 15);
    console.log(map);
    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.#map);

    // Handling map click
    this.#map.on("click", this._showForm.bind(this));
  }
  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove("hidden");
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
  }

  _newWorkout(e) {
    e.preventDefault();
    //Validation functions
    const validInput = (...inputs) =>
      inputs.every((inp) => Number.isFinite(inp));

    const allPositive = function (...inputs) {
      return inputs.every((inp) => {
        return inp >= 0;
      });
    };

    //Get data from form
    const type = inputType.value;
    const distance = Number(inputDistance.value);
    const duration = Number(inputDuration.value);
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;
    //Check if data is valid

    // If running, create running object
    if (type === "running") {
      const cadence = Number(inputCadence.value);
      console.log(cadence);
      if (
        !validInput(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      ) {
        return alert("Please insert a valid number");
      } else {
        workout = new Running([lat, lng], duration, distance, cadence);
        this.#workouts.push(workout);
        console.log(workout);
      }
    }
    // If cycling, create cycling object
    if (type === "cycling") {
      const elevation = Number(inputCadence.value);
      if (
        !validInput(distance, duration, elevation) ||
        !allPositive(distance, duration)
      ) {
        return alert("Please insert a valid number");
      } else {
        workout = new Cycling([lat, lng], duration, distance, elevation);
      }
    }
    //Add new object to workout array
    this.#workouts.push(workout);

    // Render Workout on map as marker
    this.renderWorkoutMarker(workout);

    //Hide form and clear input field

    inputCadence.value =
      inputDistance.value =
      inputDuration.value =
      inputElevation.value =
        "";
  }
  renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent("Workout")
      .openPopup();
  }
}

class Workout {
  date = new Date();
  id = (Date.now() + "").slice(-10);
  constructor(coords, duration, distance) {
    this.coords = coords;
    this.distance = distance; // km
    this.duration = duration; // min
  }
}

class Running extends Workout {
  type = "running";
  constructor(coords, duration, distance, cadence) {
    super(coords, duration, distance);
    this.cadence = cadence;
    this.calcPace();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = "cycling";
  constructor(coords, duration, distance, elevation) {
    super(coords, duration, distance);
    this.calcSpeed();
  }

  calcSpeed() {
    // km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// Creating apps
const app = new App();
