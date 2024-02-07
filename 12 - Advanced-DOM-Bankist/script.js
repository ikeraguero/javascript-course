"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// Select elements
const header = document.querySelector(".header");
const allSections = document.querySelectorAll(".section");
const allButtons = document.getElementsByTagName("button");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.getElementById("section--1");
const navLinks = document.querySelector(".nav__links");
const tabContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab");
const contents = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");

// Create and insert elements
//. insertAdjacentHTML

const message = document.createElement("div");
message.classList.add("cookie-message");
message.innerHTML =
  'We use cookies to improve security and user experience! <button class="btn btn--close-cookie">Got it!</button> ';
header.append(message);

// Fade Nav When Hover

nav.addEventListener("mouseover", function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    siblings.forEach((siblings) => {
      if (siblings != link) siblings.style.opacity = 0.5;
    });
    console.log(siblings);
  }
  console.log(e.target);
});
nav.addEventListener("mouseout", function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    siblings.forEach((siblings) => {
      if (siblings != link) siblings.style.opacity = 1;
    });
    console.log(siblings);
  }
  console.log(e.target);
});

// Operations Tabs

tabContainer.addEventListener("click", function (e) {
  // Selecting button that was clicked by user
  const clicked = e.target.closest("button");
  if (!clicked) return; // preventing error message in case clicked is null
  // Removing active tab class from all tabs and adding to the one that was clicked
  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
  clicked.classList.add("operations__tab--active");

  contents.forEach((content) =>
    content.classList.remove("operations__content--active")
  );
  const contentDisplayed = document.querySelector(
    `.operations__content--${clicked.getAttribute("data-tab")}`
  );
  contentDisplayed.classList.add("operations__content--active");
});

// Smooth Scrolling with bubbling concept

navLinks.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const section = e.target.getAttribute("href");
    const goTo = document.querySelector(`${section}`);
    goTo.scrollIntoView({ behavior: "smooth" });
  }
});

/*
// DOM TRAVERSING

const h1 = document.querySelector("h1");
//Going downwards: child
console.log(h1.querySelectorAll(".highlight"));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = "white";
h1.lastElementChild.style.color = "orangered";

// Goig upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest(".header").style.background = "var (--gradient-secondary)"; // will look up to the closest header element in the html document
h1.closest("h1").style.background = "var (--gradient-primary)"; // will be element itself

// Goig sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);

[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) {
    console.log(`${el} is a sibling element of h1`);
  }
});

// Bubbling on events - events that happen on the child element will 'bubble up' to the parentselements,
// so it's like they also happened in the parent element.

// Event Handlers

//.addEventListener
//onEvent
//.removeEventListener

// Smooth scrooling

// Old school way:
/*
btnScrollTo.addEventListener("click", function () {
  const s1coords = section1.getBoundingClientRect();
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: "smooth",
  });
});*/

// Modern way

btnScrollTo.addEventListener("click", function () {
  section1.scrollIntoView({ behavior: "smooth" });
});

// Delete elements
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.remove();
  });