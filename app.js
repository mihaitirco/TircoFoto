const images = document.querySelectorAll('.image-container img');
const popup = document.querySelector('.popup-image');
const popupImg = document.querySelector('.popup-img');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const closeBtn = document.querySelector('.close-btn');

let currentIndex = 0;

images.forEach((image, index) => {
  image.addEventListener('click', () => {
    currentIndex = index;
    updatePopupImage();
    popup.style.display = 'block';
  });
});

closeBtn.addEventListener('click', () => {
  popup.style.display = 'none';
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updatePopupImage();
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  updatePopupImage();
});

function updatePopupImage() {
  const selectedImage = images[currentIndex];
  popupImg.src = selectedImage.src;
  popupImg.style.maxWidth = '80%'; 
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    prevBtn.click();
  } else if (event.key === 'ArrowRight') {
    nextBtn.click();
  } else if (event.key === 'Escape') {
    closeBtn.click();
  }
});
let touchStartX = 0;

popupImg.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
});

popupImg.addEventListener('touchend', (e) => {
  const touchEndX = e.changedTouches[0].clientX;
  const swipeThreshold = 50; 
  if (touchEndX - touchStartX > swipeThreshold) {
    prevBtn.click();
  } else if (touchStartX - touchEndX > swipeThreshold) {
    nextBtn.click();
  }
});