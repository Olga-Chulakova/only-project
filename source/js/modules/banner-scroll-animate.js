const TABLET_BREAKPOINT = 768;
const BANNER_THRESHOLD = 0.25;
let bannerObserver = null;

const initScrollBannerAnimation = () => {
  const banner = document.querySelector('[data-animate="banner"]');

  if (!banner || window.innerWidth < TABLET_BREAKPOINT) {
    return;
  }

  if (bannerObserver) {
    bannerObserver.unobserve(banner);
  }

  bannerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animate');
        }, 100);
        bannerObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: BANNER_THRESHOLD,
  });

  bannerObserver.observe(banner);
};

window.addEventListener('resize', initScrollBannerAnimation);

export {initScrollBannerAnimation};
