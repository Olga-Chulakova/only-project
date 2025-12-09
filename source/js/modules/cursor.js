const heroSection = document.querySelector('.hero');
const videoContainer = document.querySelector('.hero__video-container');
const video = document.querySelector('.hero__video');
const cursor = document.querySelector('.hero__video-cursor');

function initVideoPlayer() {
  if (!videoContainer) {
    return;
  }

  // Курсор
  videoContainer.addEventListener('mouseenter', () => {
    heroSection.classList.add('video-hover');
  });

  videoContainer.addEventListener('mouseleave', () => {
    heroSection.classList.remove('video-hover');
  });

  document.addEventListener('mousemove', (event) => {
    cursor.style.left = `${event.clientX - 30}px`;
    cursor.style.top = `${event.clientY - 30}px`;
  });

  videoContainer.addEventListener('click', (event) => {
    event.preventDefault();

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
    // video.paused ? video.play() : video.pause();
  });

  window.addEventListener('scroll', () => {
    const heroRect = heroSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Плавнее на первый скролл
    if (-heroRect.top > 0 && -heroRect.top < 10) {
      videoContainer.style.transition = 'all 0.5s ease';
    } else {
      videoContainer.style.transition = 'all 0.3s ease';
    }

    // Убираем fullscreen класс
    videoContainer.classList.remove('video-fullscreen');

    // Если hero почти ушла - сбрасываем
    if (heroRect.bottom < windowHeight * 0.3) {
      videoContainer.style.cssText = '';
      videoContainer.style.transition = 'all 0.3s ease'; // Возвращаем transition
      return;
    }

    // Если hero видна
    if (heroRect.top < windowHeight && heroRect.bottom > 0) {
      const maxScroll = 150;
      const progress = Math.min(1, -heroRect.top / maxScroll);

      // console.log('Progress:', progress.toFixed(3));

      // Устанавливаем плавные переходы
      videoContainer.style.transition = 'all 0.3s ease';

      if (progress > 0.6) {
      // Больше 60% - плавно двигаем к центру экрана
        const widthPercent = 30 + (70 * progress); // 30% → 100%
        const heightPercent = widthPercent * 0.9; // 27% → 90%

        // Конвертируем в пиксели
        const widthPx = (window.innerWidth * widthPercent) / 100;
        const heightPx = (window.innerHeight * heightPercent) / 100;

        // Вычисляем позицию для плавного движения
        // Сначала видео на своем месте, потом плавно к центру
        const centerProgress = (progress - 0.6) / 0.4; // 0.6-1.0 → 0-1
        const centerX = (window.innerWidth - widthPx) / 2;
        const centerY = (window.innerHeight - heightPx) / 2;

        // Исходная позиция (где видео начинало увеличиваться)
        const startX = window.innerWidth / 2 - widthPx / 2;
        const startY = window.innerHeight / 2 - heightPx / 2;

        // Плавный переход от start к center
        const currentX = startX + (centerX - startX) * centerProgress;
        const currentY = startY + (centerY - startY) * centerProgress;

        // Применяем стили
        videoContainer.style.position = 'fixed';
        videoContainer.style.width = `${widthPx}px`;
        videoContainer.style.height = `${heightPx}px`;
        videoContainer.style.top = `${currentY}px`;
        videoContainer.style.left = `${currentX}px`;
        videoContainer.style.transform = 'none';
        videoContainer.style.zIndex = '999';
        videoContainer.style.maxWidth = 'none';
        videoContainer.style.borderRadius = `${12 + (8 * progress)}px`;

      } else if (progress > 0) {
      // От 0% до 60% - увеличение на месте
        const widthPercent = 30 + (70 * progress);
        const heightPercent = widthPercent * 0.9;

        // В пикселях для consistency
        const widthPx = (window.innerWidth * widthPercent) / 100;
        const heightPx = (window.innerHeight * heightPercent) / 100;

        // Центрируем в исходной позиции
        const centerX = window.innerWidth / 2 - widthPx / 2;
        const centerY = window.innerHeight / 2 - heightPx / 2;

        videoContainer.style.position = 'fixed'; // Уже fixed для плавности
        videoContainer.style.width = `${widthPx}px`;
        videoContainer.style.height = `${heightPx}px`;
        videoContainer.style.top = `${centerY}px`;
        videoContainer.style.left = `${centerX}px`;
        videoContainer.style.transform = 'none';
        videoContainer.style.zIndex = '100';
        videoContainer.style.maxWidth = 'none';
        videoContainer.style.borderRadius = `${12 + (8 * progress)}px`;
      }

    } else {
    // Hero не видна
      videoContainer.style.cssText = '';
      videoContainer.style.transition = 'all 0.3s ease';
    }
  });


  setTimeout(() => video.play(), 1000);
}

export { initVideoPlayer };
