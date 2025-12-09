const slidesContainer = document.querySelector('.banner__slide-wrapper');
const slides = document.querySelectorAll('.banner__slide');
const bulletsBtn = document.querySelectorAll('.banner__bullet');

const duplicatedSlides = () => {

  const originalSlides = Array.from(slides);

  slides.forEach((slide) => slide.remove());

  const countSlides = bulletsBtn.length;

  for (let i = 0; i < countSlides; i++) {
    const indexSlides = i % originalSlides.length;
    const clonedSlides = originalSlides[indexSlides].cloneNode(true);

    clonedSlides.classList.remove('is-active');
    slidesContainer.appendChild(clonedSlides);
  }

  const allSlides = document.querySelectorAll('.banner__slide');

  if (allSlides.length > 0) {
    allSlides[0].classList.add('is-active');
  }

  return allSlides;
};

const changeSlide = () => {
  const newSlides = duplicatedSlides();

  bulletsBtn.forEach((bullet, index) => {
    bullet.addEventListener('click', () => {
      newSlides.forEach((slide) => {
        slide.classList.remove('is-active');
      });

      bulletsBtn.forEach((btn) => {
        btn.classList.remove('is-active');
      });

      newSlides[index].classList.add('is-active');
      bullet.classList.add('is-active');
    });
  });
};


export {changeSlide};
