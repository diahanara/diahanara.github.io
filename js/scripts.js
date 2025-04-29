/*!
* Start Bootstrap - Personal v1.0.1 (https://startbootstrap.com/template-overviews/personal)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-personal/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

const images = document.querySelector('.carousel-images');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;

function showSlide(index) {
  images.style.transform = `translateX(-${index * 400}px)`;
  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
}

document.querySelector('.prev').onclick = () => {
  currentIndex = (currentIndex === 0) ? 2 : currentIndex - 1;
  showSlide(currentIndex);
};

document.querySelector('.next').onclick = () => {
  currentIndex = (currentIndex === 2) ? 0 : currentIndex + 1;
  showSlide(currentIndex);
};

dots.forEach((dot, index) => {
  dot.onclick = () => {
    currentIndex = index;
    showSlide(index);
  };
});
