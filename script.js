$(document).ready(function () {
  // Handle smooth scrolling for navigation links
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

  // Video handling
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

  // Form submission with loading indicator
  $('#contactForm').on('submit', function (event) {
    event.preventDefault();

    // Change button text to indicate loading
    const submitBtn = $(this).find('.submit-btn');
    const originalText = submitBtn.text();
    submitBtn.text('Submitting...');
    submitBtn.prop('disabled', true);

    $.ajax({
      url: '/submit',
      type: 'POST',
      data: $(this).serialize(),
      success: function (response) {
        // Reset form
        $('#contactForm')[0].reset();

        // Show success message
        alert('Thank you! Your information has been submitted successfully.');

        // Reset button
        submitBtn.text(originalText);
        submitBtn.prop('disabled', false);
      },
      error: function (xhr, status, error) {
        // Show error message
        alert('Error submitting form. Please try again later.');
        console.error('Error details:', xhr.responseText);

        // Reset button
        submitBtn.text(originalText);
        submitBtn.prop('disabled', false);
      },
    });
  });
});
