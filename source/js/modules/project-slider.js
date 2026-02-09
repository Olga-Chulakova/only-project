const slider = document.querySelector('.project-card__list');
const prevButton = document.querySelector('.projects__slider-button.projects__slider-button--prev');
const nextButton = document.querySelector('.projects__slider-button.projects__slider-button--next');
const cards = document.querySelectorAll('.project-card__item');

const DEFAULT_GAP = 20;
const START_OFFSET = 10;
const END_OFFSET = 10;
const DEFAULT_CARD_WIDTH = 330;

const getScrollAmount = () => {
  if (cards.length === 0) {
    return DEFAULT_CARD_WIDTH + DEFAULT_GAP;
  }

  const card = cards[0];
  const cardWidth = card.offsetWidth;

  const sliderStyles = window.getComputedStyle(slider);
  const gap = parseFloat(sliderStyles.gap) || DEFAULT_GAP;

  return cardWidth + gap;
};

const scrollSlider = () => {
  prevButton.addEventListener('click', () => {
    slider.scrollBy({
      left: -getScrollAmount(),
      behavior: 'smooth'
    });
  });

  nextButton.addEventListener('click', () => {
    slider.scrollBy({
      left: getScrollAmount(),
      behavior: 'smooth'
    });
  });
};

const updateButtonsState = () => {
  const isAtStart = slider.scrollLeft <= START_OFFSET;
  const isAtEnd = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - END_OFFSET;

  prevButton.disabled = isAtStart;
  nextButton.disabled = isAtEnd;

  prevButton.classList.toggle('projects__slider-button--disabled', isAtStart);
  nextButton.classList.toggle('projects__slider-button--disabled', isAtEnd);
};

slider.addEventListener('scroll', updateButtonsState);
window.addEventListener('resize', updateButtonsState);

updateButtonsState();

export { scrollSlider };
