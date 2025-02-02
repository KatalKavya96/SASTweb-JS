document.addEventListener('DOMContentLoaded', function() {
    const imageWrapper = document.querySelector('.image-wrapper');
    const video = document.getElementById('myVideo');

    // Intersection Observer for image animation
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                imageWrapper.classList.add('animate');
            } else {
                imageWrapper.classList.remove('animate');
            }
        });
    }, {
        threshold: 0.2
    });

    observer.observe(imageWrapper);

    // Ensure video plays when it's loaded
    video.play();
});

const video = document.getElementById('hoverVideo');

// Play the video when hovering over it
video.addEventListener('mouseenter', () => {
  video.play();
});

// Pause the video when the cursor leaves
video.addEventListener('mouseleave', () => {
  video.pause();
});