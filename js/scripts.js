/*!
* Start Bootstrap - Personal v1.0.1 (https://startbootstrap.com/template-overviews/personal)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-personal/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project
const images = document.querySelectorAll(".carousel img");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const dotsContainer = document.querySelector(".dots");

let currentIndex = 0;

function updateCarousel(index) {
  images.forEach((img, i) => {
    img.classList.toggle("active", i === index);
  });

  dotsContainer.innerHTML = '';
  images.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.classList.toggle("active", i === index);
    dot.addEventListener("click", () => {
      currentIndex = i;
      updateCarousel(i);
    });
    dotsContainer.appendChild(dot);
  });
}

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateCarousel(currentIndex);
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateCarousel(currentIndex);
});

updateCarousel(currentIndex);

// Fungsi klik galeri
const galleryItems = document.querySelectorAll(".gallery-item");

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const index = item.dataset.index;

    // Di sini Anda bisa mengganti data postingan (gambar carousel, caption, dll)
    // Misal untuk demo:
    images[0].src = `assets/photo${+index + 1}.jpg`;
    images[1].src = `assets/photo${+index + 2}.jpg`;
    images[2].src = `assets/photo${+index + 3}.jpg`;
    updateCarousel(0);

    document.querySelector(".caption").textContent = `Caption untuk item ${index}`;
    document.querySelector(".date").textContent = `Tanggal Post item ${index}`;
    document.querySelector(".location").textContent = `Lokasi untuk item ${index}`;
  });
});
