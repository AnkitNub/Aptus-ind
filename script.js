$(document).ready(function () {
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

  $('#contactForm').on('submit', function (event) {
    event.preventDefault();

    const submitBtn = $(this).find('.submit-btn');
    const originalText = submitBtn.text();
    submitBtn.text('Submitting...');
    submitBtn.prop('disabled', true);

    $.ajax({
      url: '/submit',
      type: 'POST',
      data: $(this).serialize(),
      success: function (response) {
        $('#contactForm')[0].reset();

        alert('Thank you! Your information has been submitted successfully.');

        submitBtn.text(originalText);
        submitBtn.prop('disabled', false);
      },
      error: function (xhr, status, error) {
        alert('Error submitting form. Please try again later.');
        console.error('Error details:', xhr.responseText);
        submitBtn.text(originalText);
        submitBtn.prop('disabled', false);
      },
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.nav-links a').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const offset = navbarHeight + 10;

      window.scrollTo({
        top: targetElement.offsetTop - offset,
        behavior: 'smooth',
      });

      document.querySelectorAll('.nav-links a').forEach((link) => {
        link.classList.remove('active');
      });
      this.classList.add('active');
    });
  });

  const sections = document.querySelectorAll('.section');

  sections.forEach((section) => {
    section.classList.add('section-hidden');
  });

  const sectionObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible');

          const id = entry.target.getAttribute('id');
          if (id) {
            document.querySelectorAll('.nav-links a').forEach((link) => {
              link.classList.remove('active');
              if (link.getAttribute('href') === '#' + id) {
                link.classList.add('active');
              }
            });
          }
        }
      });
    },
    {
      root: null,
      threshold: 0.15,
      rootMargin: '-100px 0px',
    }
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
});

window.addEventListener('scroll', function () {
  const scrollTop = window.scrollY;
  const docHeight = document.body.offsetHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.querySelector('.scroll-progress').style.width = scrollPercent + '%';
});
