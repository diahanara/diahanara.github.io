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

    // Gallery item click functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Get data attributes
            const images = JSON.parse(this.getAttribute('data-images'));
            const caption = this.getAttribute('data-caption');
            const location = this.getAttribute('data-location');
            const date = this.getAttribute('data-date');
            
            // Update carousel slides
            updateCarousel(images);
            
            // Update post details
            document.querySelector('.post-caption p').innerHTML = caption;
            document.querySelector('.location').textContent = location;
            document.querySelector('.post-date').textContent = date;
            
            // Scroll to the instagram post section with animation
            const instagramSection = document.getElementById('instagram-post');
            instagramSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            
            // Highlight effect
            instagramSection.style.animation = 'highlight 1s';
            setTimeout(() => {
                instagramSection.style.animation = '';
            }, 1000);
        });
    });

    // Tambahkan di JS
if (caption.length > 300) {
    const shortCaption = caption.substring(0, 300) + '...';
    const fullCaption = caption;
    
    const captionElement = document.querySelector('.post-caption p');
    captionElement.innerHTML = shortCaption;
    
    const moreBtn = document.createElement('button');
    moreBtn.textContent = 'Lihat Selengkapnya';
    moreBtn.className = 'see-more-btn';
    captionElement.parentNode.appendChild(moreBtn);
    
    moreBtn.addEventListener('click', () => {
        captionElement.innerHTML = fullCaption;
        moreBtn.remove();
    });
}

    // Function to update carousel with new images
    function updateCarousel(imageUrls) {
        const carousel = document.querySelector('.carousel');
        
        // Remove existing slides
        const existingSlides = document.querySelectorAll('.carousel-slide');
        existingSlides.forEach(slide => slide.remove());
        
        // Create new slides
        imageUrls.forEach((url, index) => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            if (index === 0) slide.classList.add('active');
            slide.innerHTML = `<img src="${url}" alt="Gallery Image">`;
            carousel.insertBefore(slide, document.querySelector('.carousel-btn.next'));
        });
        
        // Reset carousel state
        currentSlide = 0;
        slides = document.querySelectorAll('.carousel-slide');
        createDots();
    }
});