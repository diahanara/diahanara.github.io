/*!
* Start Bootstrap - Personal v1.0.1 (https://startbootstrap.com/template-overviews/personal)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-personal/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project
const images = document.querySelectorAll('.carousel-image');
let current = 0;

document.querySelector('.next').addEventListener('click', () => {
  images[current].classList.remove('active');
  current = (current + 1) % images.length;
  images[current].classList.add('active');
});

document.querySelector('.prev').addEventListener('click', () => {
  images[current].classList.remove('active');
  current = (current - 1 + images.length) % images.length;
  images[current].classList.add('active');
});