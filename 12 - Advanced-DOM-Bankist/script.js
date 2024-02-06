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

// Create and insert elements
//. insertAdjacentHTML

const message = document.createElement("div");
message.classList.add("cookie-message");
message.innerHTML =
  'We use cookies to improve security and user experience! <button class="btn btn--close-cookie">Got it!</button> ';
header.append(message);

// Smooth Scrolling with bubbling concept

navLinks.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const section = e.target.getAttribute("href");
    const goTo = document.querySelector(`${section}`);
    console.log(goTo);
    goTo.scrollIntoView({ behavior: "smooth" });
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
