document.addEventListener('DOMContentLoaded', function() {
    const imageWrapper = document.querySelector('.image-wrapper');
    const video = document.getElementById('myVideo');

    
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

    
    video.play();
});

const video = document.getElementById('hoverVideo');


video.addEventListener('mouseenter', () => {
  video.play();
});


video.addEventListener('mouseleave', () => {
  video.pause();
});