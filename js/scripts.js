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

  // Create dots for navigation
  function createDots() {
      dotsContainer.innerHTML = '';
      slides.forEach((_, index) => {
          const dot = document.createElement('div');
          dot.classList.add('dot');
          if (index === currentSlide) dot.classList.add('active');
          dot.addEventListener('click', () => goToSlide(index));
          dotsContainer.appendChild(dot);
      });
  }

  // Navigate to specific slide
  function goToSlide(n) {
      slides[currentSlide].classList.remove('active');
      dotsContainer.children[currentSlide].classList.remove('active');
      
      currentSlide = (n + slides.length) % slides.length;
      
      slides[currentSlide].classList.add('active');
      if (dotsContainer.children[currentSlide]) {
          dotsContainer.children[currentSlide].classList.add('active');
      }
  }

  // Next slide
  function nextSlide() {
      goToSlide(currentSlide + 1);
  }

  // Previous slide
  function prevSlide() {
      goToSlide(currentSlide - 1);
  }

  // Initialize carousel
  function initCarousel() {
      createDots();
      slides[currentSlide].classList.add('active');
  }

  // Event listeners for buttons
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);

  // Initialize the carousel
  initCarousel();

  // Gallery item click functionality - FIXED
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach(item => {
      item.addEventListener('click', function() {
          // Get data attributes
          const images = JSON.parse(this.getAttribute('data-images'));
          const caption = this.getAttribute('data-caption');
          const location = this.getAttribute('data-location');
          const date = this.getAttribute('data-date');
          
           // Scroll ke bagian postingan Instagram
            const instagramSection = document.getElementById('instagram-post');
            instagramSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start' // Posisi tepat di atas section
            });
          
            // Update carousel slides - FIXED
          updateCarousel(images);
          
          // Update post details
          document.querySelector('.post-caption p').innerHTML = caption;
          document.querySelector('.location').textContent = location;
          document.querySelector('.post-date').textContent = date;
      });
  });

  // Function to update carousel with new images - FIXED
  function updateCarousel(imageUrls) {
      const carousel = document.querySelector('.carousel');
      
      // Remove existing slides
      carousel.querySelectorAll('.carousel-slide').forEach(slide => slide.remove());
      
      // Create new slides
      imageUrls.forEach((url, index) => {
          const slide = document.createElement('div');
          slide.className = 'carousel-slide';
          if (index === 0) slide.classList.add('active');
          slide.innerHTML = `<img src="${url}" alt="Gallery Image">`;
          carousel.insertBefore(slide, carousel.querySelector('.carousel-btn.next'));
      });
      
      // Reinitialize carousel
      slides = document.querySelectorAll('.carousel-slide');
      currentSlide = 0;
      createDots();
  }

  document.addEventListener('DOMContentLoaded', function() {
    // Filter Functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const certificateItems = document.querySelectorAll('.certificate-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(btn => btn.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            // Filter items
            certificateItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Optional: Add click event to entire certificate item if needed
    certificateItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Prevent triggering if clicking on the view button
            if (!e.target.closest('.view-btn')) {
                const link = item.querySelector('.view-btn');
                if (link) {
                    window.open(link.href, '_blank');
                }
            }
        });
    });
});