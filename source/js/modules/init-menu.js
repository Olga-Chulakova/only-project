const btnMenu = document.querySelector('.header__btn-menu');
const menuContainer = document.querySelector('.header__nav-wrapper');
const navMenu = document.querySelector('.nav-menu');
const overlay = document.querySelector('.overlay');
const body = document.querySelector('.page-body');

const closeMenu = () => {
  btnMenu.classList.remove('is-open');
  menuContainer.classList.remove('is-open');
  overlay.classList.remove('active');
  body.classList.remove('no-scroll');
  overlay.removeEventListener('click', closeMenu);
  document.removeEventListener('keydown', buttonKeydownHandler);
};

const openMenu = () => {
  btnMenu.classList.add('is-open');
  menuContainer.classList.add('is-open');
  overlay.classList.add('active');
  body.classList.add('no-scroll');
  overlay.addEventListener('click', closeMenu);
  document.addEventListener('keydown', buttonKeydownHandler);
};

function buttonKeydownHandler(e) {
  if (e.key === 'Escape') {
    closeMenu();
  }
}

const buttonMenuClick = () => {
  if (btnMenu.classList.contains('is-open')) {
    closeMenu();
  } else {
    openMenu();
  }
};

const navMenuClick = (e) => {
  if (e.target.closest('.nav-menu__link')) {
    closeMenu();
  }
};

const initMenu = () => {
  btnMenu.addEventListener('click', buttonMenuClick);
  navMenu.addEventListener('click', navMenuClick);
};

export {initMenu};
