const activeIcon = document.querySelector('.awards__logo-icon--active');
const link = activeIcon.closest('.awards__organizer-link');
let isHovered = false;

const toggleHovered = () => {
  if (!activeIcon) {
    return;
  }

  link.addEventListener('mouseenter', () => {
    if (!isHovered) {
      isHovered = true;
      activeIcon.classList.remove('awards__logo-icon--active');
    }
  });
};

export {toggleHovered};
