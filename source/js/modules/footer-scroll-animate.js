const DESKTOP_BREAKPOINT = 1280;
const ANIMATION_THRESHOLD_DESKTOP = 0.6;
const ANIMATION_THRESHOLD_MOBILE = 0.28;
const ANIMATION_DELAY = 100;

let footerObserver = null;

const initFooterAnimation = () => {
  const footer = document.querySelector('[data-animate="footer"]');

  if (!footer) {
    return;
  }

  if (footerObserver) {
    footerObserver.unobserve(footer);
  }

  const isDesktop = window.innerWidth >= DESKTOP_BREAKPOINT;
  const threshold = isDesktop ? ANIMATION_THRESHOLD_DESKTOP : ANIMATION_THRESHOLD_MOBILE;

  footerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animate');
        }, ANIMATION_DELAY);
      } else {
        setTimeout(() => {
          entry.target.classList.remove('animate');
        }, ANIMATION_DELAY);
      }
    });
  }, {
    threshold: threshold,
  });

  footerObserver.observe(footer);
};

window.addEventListener('resize', initFooterAnimation);

export {initFooterAnimation};
