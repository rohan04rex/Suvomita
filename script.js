document.addEventListener('DOMContentLoaded', () => {

    const backgroundMusic = document.getElementById('background-music');
    
    const playMusicOnClick = () => {
        if (backgroundMusic && backgroundMusic.paused) {
            backgroundMusic.play().catch(error => {
                console.error("Audio playback failed:", error);
            });
        }
        // Remove the listener after the first click to avoid re-triggering
        document.removeEventListener('click', playMusicOnClick);
        document.removeEventListener('keydown', playMusicOnClick);
    };

    document.addEventListener('click', playMusicOnClick);
    document.addEventListener('keydown', playMusicOnClick);

    // --- Logic for main page (index.html) ---
    if (document.getElementById('hero')) {
        // --- Hero Section Logic ---
        const emojiContainer = document.getElementById('emoji-container');
        const typingText = document.getElementById('typing-text');
        const scrollDownButton = document.getElementById('scroll-down-button');
        const mainContent = document.querySelector('main');

        const emojis = ['❤️', '💕', '✨', '🌸', '🦋', '🥰', '💖', '💝'];
        const textToType = "Happy Valentines Day! 💕";
        const typingSpeed = 100; // ms per character
        const typingDelay = 1000; // ms before typing starts
        const numEmojis = 10;

        // Create and animate emojis
        for (let i = 0; i < numEmojis; i++) {
            const emoji = document.createElement('span');
            emoji.classList.add('emoji');
            emoji.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
            
            let top, left;
            do {
                top = Math.random() * 120 - 10;
                left = Math.random() * 120 - 10;
            } while (
                (top > 30 && top < 70) && // Vertical center clear zone
                (left > 20 && left < 80)   // Horizontal center clear zone
            );

            emoji.style.left = `${left}vw`;
            emoji.style.top = `${top}vh`;
            emoji.style.animationDuration = `${Math.random() * 5 + 5}s`; // 5-10 seconds
            emoji.style.animationDelay = `${Math.random() * 2}s`;
            emojiContainer.appendChild(emoji);
        }

        // Typing animation
        let charIndex = 0;
        function type() {
            if (charIndex < textToType.length) {
                typingText.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(type, typingSpeed);
            } else {
                // Typing finished, show the scroll button
                typingText.style.borderRight = 'none'; // Remove cursor
                setTimeout(() => {
                    scrollDownButton.style.display = 'block';
                }, 500);
            }
        }

        // Start typing after a delay
        setTimeout(type, typingDelay);


        // Scroll down button functionality
        function smoothScroll(target, duration) {
            const targetPosition = target.getBoundingClientRect().top;
            const startPosition = window.pageYOffset;
            let startTime = null;

            function easeInOutQuad(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }

            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = easeInOutQuad(timeElapsed, startPosition, targetPosition, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }

            requestAnimationFrame(animation);
        }

        scrollDownButton.addEventListener('click', () => {
            smoothScroll(mainContent, 1000); // Scroll over 1000ms (1 second)
        });

        // --- Scroll Animations ---
        const animatedSections = document.querySelectorAll('.card-style');
        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animatedSections.forEach(section => {
            sectionObserver.observe(section);
        });

        const photoItems = document.querySelectorAll('.photo-item');
        const photoObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 }); // Trigger when 20% of the photo is visible

        photoItems.forEach(item => {
            photoObserver.observe(item);
        });
    }
});