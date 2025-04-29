/*!
* Start Bootstrap - Personal v1.0.1 (https://startbootstrap.com/template-overviews/personal)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-personal/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project
document.addEventListener('DOMContentLoaded', function() {
  // Carousel functionality
  let currentSlide = 0;
  let slideInterval;
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const carousel = document.querySelector('.carousel');

  function showSlide(n) {
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      currentSlide = (n + slides.length) % slides.length;
      slides[currentSlide].classList.add('active');
      if (dots[currentSlide]) {
          dots[currentSlide].classList.add('active');
      }
  }

  function nextSlide() {
      showSlide(currentSlide + 1);
  }

  function prevSlide() {
      showSlide(currentSlide - 1);
  }

  function startCarousel() {
      slideInterval = setInterval(nextSlide, 5000);
  }

  function stopCarousel() {
      clearInterval(slideInterval);
  }

  // Initialize carousel
  if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
          stopCarousel();
          prevSlide();
          startCarousel();
      });

      nextBtn.addEventListener('click', () => {
          stopCarousel();
          nextSlide();
          startCarousel();
      });
  }

  if (dots.length > 0) {
      dots.forEach((dot, index) => {
          dot.addEventListener('click', () => {
              stopCarousel();
              showSlide(index);
              startCarousel();
          });
      });
  }

  if (carousel) {
      carousel.addEventListener('mouseenter', stopCarousel);
      carousel.addEventListener('mouseleave', startCarousel);
  }

  startCarousel();

  // Gallery item click functionality
  const galleryItems = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const closeModal = document.querySelector('.close-modal');

  galleryItems.forEach(item => {
      item.addEventListener('click', function() {
          // Show in modal
          modal.style.display = 'flex';
          modalImg.src = this.style.backgroundImage.slice(5, -2);

          // Update carousel
          const carouselImages = JSON.parse(this.getAttribute('data-carousel'));
          updateCarousel(carouselImages);

          // Scroll to carousel
          document.getElementById('instagram-post').scrollIntoView({ behavior: 'smooth' });
      });
  });

  function updateCarousel(imageUrls) {
      const carousel = document.querySelector('.carousel');
      const dotsContainer = document.querySelector('.carousel-dots');
      
      // Clear existing slides except template
      const existingSlides = document.querySelectorAll('.carousel-slide');
      existingSlides.forEach((slide, index) => {
          if (index >= imageUrls.length) {
              slide.remove();
          }
      });

      // Clear dots
      dotsContainer.innerHTML = '';

      // Update or create slides
      imageUrls.forEach((url, index) => {
          let slide = existingSlides[index];
          if (!slide) {
              slide = document.createElement('div');
              slide.className = 'carousel-slide';
              carousel.insertBefore(slide, carousel.querySelector('.carousel-btn.next'));
          }
          slide.style.backgroundImage = `url('${url}')`;
          slide.classList.toggle('active', index === 0);

          // Create dots
          const dot = document.createElement('div');
          dot.className = `dot ${index === 0 ? 'active' : ''}`;
          dot.addEventListener('click', () => {
              stopCarousel();
              showSlide(index);
              startCarousel();
          });
          dotsContainer.appendChild(dot);
      });

      // Reset carousel state
      currentSlide = 0;
      showSlide(0);
  }

  // Modal functionality
  closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
      if (e.target === modal) {
          modal.style.display = 'none';
      }
  });
});