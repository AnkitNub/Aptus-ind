
document.querySelectorAll('.nav-links a').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    window.scrollTo({
      top: targetElement.offsetTop,
      behavior: 'smooth',
    });
  });
});

const video = document.getElementById('hero-video');
const playButton = document.getElementById('video-toggle');
let isPlaying = false;

window.addEventListener('load', function () {
  video.play().catch((error) => {
    console.log('Auto-play was prevented. User interaction required.');
  });
});

playButton.addEventListener('click', function () {
  if (isPlaying) {
    video.pause();
    playButton.classList.remove('playing');
  } else {
    video.play();
    video.muted = false; 
    playButton.classList.add('playing');
  }
  isPlaying = !isPlaying;
});


video.addEventListener('play', function () {
  isPlaying = true;
  playButton.classList.add('playing');
});

video.addEventListener('pause', function () {
  isPlaying = false;
  playButton.classList.remove('playing');
});
