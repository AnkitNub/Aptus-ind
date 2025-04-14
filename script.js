$(document).ready(function () {
  const video = document.getElementById('hero-video');
  window.addEventListener('load', function () {
    video.play().catch((error) => {
      console.log('Auto-play was prevented. User interaction required.');
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

// window.addEventListener('scroll', function () {
//   const scrollTop = window.scrollY;
//   const docHeight = document.body.offsetHeight - window.innerHeight;
//   const scrollPercent = (scrollTop / docHeight) * 100;
//   document.querySelector('.scroll-progress').style.width = scrollPercent + '%';
// });

// Add this to your script.js file
document.addEventListener('DOMContentLoaded', function () {
  // Get all form inputs
  const formInputs = document.querySelectorAll('#contactForm input');

  // Add focus and blur event listeners to each input
  formInputs.forEach((input) => {
    // When input gets focus
    input.addEventListener('focus', function () {
      this.style.borderBottom = '2px solid #00a651';
    });

    // When input loses focus
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

  const scriptURL =
    'https://script.google.com/macros/s/AKfycbzoeBvJdBqJtZ9CO_iX3gsR7qapqwGVY103U5a1lhX2GGJQYMFVo03XjKaWPGYqf7ye/exec';

  const form = document.forms['contact-form'];

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = document.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = submitBtn.querySelector('.spinner');

    // Show spinner and hide text
    btnText.style.display = 'none';
    spinner.style.display = 'block';
    submitBtn.disabled = true;

    fetch(scriptURL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: new FormData(form),
    })
      .then((response) => {
        alert('Thank you! We will contact you shortly.');
        form.reset();
      })
      .catch((error) => console.error('Error!', error.message))
      .finally(() => {
        // Hide spinner and show text
        btnText.style.display = 'block';
        spinner.style.display = 'none';
        submitBtn.disabled = false;
      });
  });
}
