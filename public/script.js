'use strict';

/**
 * PRELOAD
 * 
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);



/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {

  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;

  // reverse the number eg. 20 -> -20, -5 -> 5
  x = x - (x * 2);
  y = y - (y * 2);

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }

});


// header






// reserve table
document.querySelector('.reservation-form').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the default form submission

  // Collect form data
  const formData = {
    name: document.querySelector('input[name="name"]').value,
    email: document.querySelector('input[name="email"]').value,
    tel: document.querySelector('input[name="tel"]').value,
    address: document.querySelector('input[name="address"]').value,
    message: document.querySelector('textarea[name="message"]').value,
  };

  try {
    // Send a POST request to the API
    const response = await fetch('http://127.0.0.1:3000/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    // Clear previous error messages
    document.querySelectorAll('.error-message').forEach(error => error.textContent = '');

    // Handle the response
    if (response.ok) {
      // Clear the form fields after submission
      document.querySelector('input[name="name"]').value = '';
      document.querySelector('input[name="email"]').value = '';
      document.querySelector('input[name="tel"]').value = '';
      document.querySelector('input[name="address"]').value = '';
      document.querySelector('textarea[name="message"]').value = '';

      // Show success message
      Swal.fire({
        title: 'Reserve Table!',
        text: 'Reserve Table Successfully.',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      // If response is not ok, parse error messages
      const error = await response.json();
      console.log(error);

      // Loop through each error and display it under the corresponding input field
      error.error.forEach(err => {
        const inputElement = document.querySelector(`input[name="${err.key}"], textarea[name="${err.key}"]`);
        const errorMessageDiv = inputElement.parentElement.querySelector('.error-message');

        if (inputElement && errorMessageDiv) {
          // Display the error message
          errorMessageDiv.textContent = err.message;
        }
      });
    }
  } catch (err) {
    console.error('Error:', err);
    alert('An error occurred while submitting your reservation. Please try again.');
  }
});





document.querySelector('a[href="#contact"]').addEventListener('click', function (event) {
  event.preventDefault(); // Prevent default anchor link behavior

  // Get the target section (Contact)
  const targetSection = document.getElementById('contact');

  // Scroll to the target section smoothly
  targetSection.scrollIntoView({ behavior: 'smooth' });
});



// WhatsApp link
document.addEventListener("DOMContentLoaded", () => {
  const phoneNumber = "8562098995332"; // Replace with your number
  const whatsappLink = `https://wa.me/${phoneNumber}`;
  document.querySelector('.topbar-item.link').setAttribute('href', whatsappLink);
});



// For the Read More Modal
var readMoreModal = document.getElementById('readMoreModal');
var readMoreBtn = document.getElementById('readMoreButton');
var readMoreSpan = document.getElementById('closeReadMoreModal');

// For the View All Menu Modal
var menuModal = document.getElementById('menuModal');
var viewAllMenuBtn = document.getElementById('viewAllMenuButton');
var menuSpan = document.getElementById('closeMenuModal');

// When the user clicks the "Read More" button, open the Read More modal
readMoreBtn.addEventListener('click', function() {
    readMoreModal.style.display = 'block'; // Show the modal
});

// When the user clicks on <span> (x) in Read More modal, close it
readMoreSpan.addEventListener('click', function() {
    readMoreModal.style.display = 'none'; // Close the modal
});

// When the user clicks anywhere outside of the Read More modal, close it
window.addEventListener('click', function(event) {
    if (event.target == readMoreModal) {
        readMoreModal.style.display = 'none'; // Close the modal if clicked outside
    }
});

// When the user clicks the "View All Menu" button, open the Menu modal
viewAllMenuBtn.addEventListener('click', function() {
    menuModal.style.display = 'block'; // Show the modal
});

// When the user clicks on <span> (x) in Menu modal, close it
menuSpan.addEventListener('click', function() {
    menuModal.style.display = 'none'; // Close the modal
});

// When the user clicks anywhere outside of the Menu modal, close it
window.addEventListener('click', function(event) {
    if (event.target == menuModal) {
        menuModal.style.display = 'none'; // Close the modal if clicked outside
    }
});
