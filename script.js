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

document.addEventListener('DOMContentLoaded', function () {
  const formInputs = document.querySelectorAll('#contactForm input');

  formInputs.forEach((input) => {
    input.addEventListener('focus', function () {
      this.style.borderBottom = '2px solid #00a651';
    });

    input.addEventListener('blur', function () {
      if (this.value === '') {
        this.style.borderBottom = '1px solid #ccc';
      } else {
        this.style.borderBottom = '2px solid #00a651';
      }
    });
  });
});

const phoneInputField = document.querySelector('#phone');
if (phoneInputField) {
  const phoneInput = window.intlTelInput(phoneInputField, {
    preferredCountries: ['in', 'us', 'de'],
    utilsScript:
      'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js',
    separateDialCode: true,
    initialCountry: 'in',
  });
}

document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent default form submission

  const form = e.target;
  const formData = new FormData(form);

  // Get the phone input field and its country code
  const phoneInputField = document.querySelector('#phone');
  if (phoneInputField) {
    const phoneInput = window.intlTelInputGlobals.getInstance(phoneInputField);
    const countryData = phoneInput.getSelectedCountryData();
    formData.append('countryCode', countryData.dialCode); // Append country code to form data
  }

  fetch(
    'https://script.google.com/macros/s/AKfycbxLmd2c6-MaCX8WtAG2ujI4R8CdWzZrKGk4w9MD6z_9g9UZnoW2jbcWq9Y0RUG78BBSSw/exec',
    {
      method: 'POST',
      body: formData,
      mode: 'cors', // Enable CORS
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((result) => {
      if (result.status === 'success') {
        alert('Form submitted successfully!');
        form.reset(); // Reset the form after successful submission
      } else {
        alert('Error submitting form: ' + result.message);
      }
    })
    .catch((error) => {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again later.');
    });
});
