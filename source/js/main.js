import {initMenu} from './modules/init-menu.js';
import {initVideoPlayer} from './modules/video.js';
import {scrollSlider} from './modules/project-slider.js';
import {changeSlide} from './modules/banner.js';
import {toggleHovered} from './modules/activating-hover-awards.js';
import {initScrollBannerAnimation} from './modules/banner-scroll-animate.js';
import {initFooterAnimation} from './modules/footer-scroll-animate.js';

document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  initVideoPlayer();
  scrollSlider();
  changeSlide();
  toggleHovered();
  initScrollBannerAnimation();
  initFooterAnimation();
});
