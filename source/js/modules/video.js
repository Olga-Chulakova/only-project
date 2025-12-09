const heroSection = document.querySelector('.hero');
const videoContainer = document.querySelector('.hero__video-container');
const video = document.querySelector('.hero__video');
const cursor = document.querySelector('.hero__video-cursor');

const CURSOR_OFFSET = 30;
const VIDEO_AUTOPLAY_DELAY = 1000;

function initVideoPlayer() {
  if (!videoContainer) {
    return;
  }

  videoContainer.addEventListener('mouseenter', () => {
    heroSection.classList.add('video-hover');
  });

  videoContainer.addEventListener('mouseleave', () => {
    heroSection.classList.remove('video-hover');
  });

  document.addEventListener('mousemove', (event) => {
    cursor.style.left = `${event.clientX - CURSOR_OFFSET}px`;
    cursor.style.top = `${event.clientY - CURSOR_OFFSET}px`;
  });

  videoContainer.addEventListener('click', (event) => {
    event.preventDefault();

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });


  setTimeout(() => video.play(), VIDEO_AUTOPLAY_DELAY);
}

export { initVideoPlayer };
