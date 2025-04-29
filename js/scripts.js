/*!
* Start Bootstrap - Personal v1.0.1 (https://startbootstrap.com/template-overviews/personal)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-personal/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project
document.addEventListener('DOMContentLoaded', function() {
  // Initialize carousel
  let currentSlide = 0;
  let slides = document.querySelectorAll('.carousel-slide');
  let dotsContainer = document.querySelector('.carousel-dots');
  let prevBtn = document.querySelector('.prev');
  let nextBtn = document.querySelector('.next');
  let slideInterval;

  // Create dots based on number of slides
  function createDots() {
      dotsContainer.innerHTML = '';
      slides.forEach((slide, index) => {
          const dot = document.createElement('div');
          dot.classList.add('dot');
          if (index === currentSlide) dot.classList.add('active');
          dot.addEventListener('click', () => goToSlide(index));
          dotsContainer.appendChild(dot);
      });
  }

  // Go to specific slide
  function goToSlide(n) {
      slides[currentSlide].classList.remove('active');
      dotsContainer.children[currentSlide].classList.remove('active');
      
      currentSlide = (n + slides.length) % slides.length;
      
      slides[currentSlide].classList.add('active');
      dotsContainer.children[currentSlide].classList.add('active');
  }

  // Next slide
  function nextSlide() {
      goToSlide(currentSlide + 1);
  }

  // Previous slide
  function prevSlide() {
      goToSlide(currentSlide - 1);
  }

  // Start auto slide
  function startAutoSlide() {
      slideInterval = setInterval(nextSlide, 5000);
  }

  // Stop auto slide
  function stopAutoSlide() {
      clearInterval(slideInterval);
  }

  // Initialize carousel
  function initCarousel() {
      createDots();
      slides[currentSlide].classList.add('active');
      startAutoSlide();
  }

  // Event listeners for buttons
  prevBtn.addEventListener('click', () => {
      stopAutoSlide();
      prevSlide();
      startAutoSlide();
  });

  nextBtn.addEventListener('click', () => {
      stopAutoSlide();
      nextSlide();
      startAutoSlide();
  });

  // Pause on hover
  const carousel = document.querySelector('.carousel');
  carousel.addEventListener('mouseenter', stopAutoSlide);
  carousel.addEventListener('mouseleave', startAutoSlide);

  // Initialize the carousel
  initCarousel();

  // Gallery item click functionality
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach(item => {
      item.addEventListener('click', function() {
          // Get data attributes
          const images = JSON.parse(this.getAttribute('data-images'));
          const caption = this.getAttribute('data-caption');
          const date = this.getAttribute('data-date');
          
          // Update carousel slides
          updateCarousel(images);
          
          // Update post details
          document.querySelector('.post-caption p').textContent = caption;
          document.querySelector('.post-date').textContent = date;
          
          // Scroll to the instagram post section
          document.getElementById('instagram-post').scrollIntoView({ 
              behavior: 'smooth' 
          });
      });
  });

  // Function to update carousel with new images
  function updateCarousel(imageUrls) {
      const carousel = document.querySelector('.carousel');
      
      // Remove existing slides (except the first one which we'll reuse)
      const existingSlides = document.querySelectorAll('.carousel-slide');
      for (let i = 1; i < existingSlides.length; i++) {
          existingSlides[i].remove();
      }
      
      // Update first slide
      const firstSlide = existingSlides[0];
      firstSlide.querySelector('img').src = imageUrls[0];
      
      // Add new slides for additional images
      for (let i = 1; i < imageUrls.length; i++) {
          const slide = document.createElement('div');
          slide.classList.add('carousel-slide');
          slide.innerHTML = `<img src="${imageUrls[i]}" alt="Gallery Image">`;
          carousel.insertBefore(slide, document.querySelector('.carousel-btn.next'));
      }
      
      // Reset carousel state
      currentSlide = 0;
      slides = document.querySelectorAll('.carousel-slide');
      createDots();
      slides.forEach(slide => slide.classList.remove('active'));
      slides[0].classList.add('active');
  }
});