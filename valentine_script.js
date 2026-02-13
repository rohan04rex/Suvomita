document.addEventListener('DOMContentLoaded', () => {
    // --- Logic for valentine.html ---
    if (document.getElementById('valentine-q')) {
        const noButton = document.getElementById('no-button');
        const yesButton = document.getElementById('yes-button');
        const question = document.getElementById('question');
        const gif = document.getElementById('valentine-gif');
        const originalGif = gif.src;
        const sadGif = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXUxbjVsbjdnNHIwNXluYjF4N2d0M2ExcW04YWR6ZG9sd3AyNjd1eiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/BNlSrpW0e4nbgVZ2we/giphy.gif";
        const cryingGif = "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaHdhY250ODJiNG5jYmQxcXh5dG1taTlmNzN6MGVlMjc0MXN2cGM3NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/901mxGLGQN2PyCQpoc/giphy.gif";
        const poutingGif = "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExd25kdmlmOHJpYzJmZmZidGNjamhzN3FqNmhmOXY3anNhMWZweXczdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fFa05KbZowXiEIyRse/giphy.gif";

        let noCount = 0;
        let yesButtonSize = 1;

        const phrases = [
            "No? Are you sure?",
            "Really sure?",
            "Think again!",
            "Last chance!",
            "Okay, fine, I'll stop asking...",
            "Just kidding! PLEASE?",
            "I'm not giving up!",
            "You're breaking my heart :(",
            "Is this your final answer?",
            "You might regret this!",
            "I'll ask one more time...",
            "Please be my Valentine!",
            "Say yes, pretty please?",
            "Don't make me beg!",
            "Yes is the only answer!"
        ];

        noButton.addEventListener('click', () => {
            noCount++;
            yesButtonSize += 0.5;

            // Update GIF based on click count
            if (noCount === 1 || noCount === 2) {
                gif.src = sadGif;
            } else if (noCount === 3) {
                gif.src = cryingGif;
            } else if (noCount === 4 || noCount === 5) {
                gif.src = poutingGif;
            } else {
                gif.src = originalGif;
            }

            // Increase the size of the "Yes" button
            yesButton.style.transform = `scale(${yesButtonSize})`;

            // Change the question
            question.textContent = phrases[noCount % phrases.length];

            // Optionally, make the "No" button smaller or move it
            const noButtonSize = Math.max(1 - (noCount * 0.1), 0.1); // Shrink it
            noButton.style.transform = `scale(${noButtonSize})`;

            if (noCount >= 5) {
                noButton.style.display = 'none';
            }
        });

        yesButton.addEventListener('click', () => {
            // Hide the question and buttons
            question.textContent = "YAY! You're my Valentine! ❤️";
            gif.src = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3k1a2Roc3hucmo1dHNlZnZ5d2U1ZDNwMndveTYxbWEwZ3R1emp0aiZlcD12MV9iZWdpbmdfYWxsX3dlYmNhdXMzMjB4MjY1LW5vbmUucmVxdWVzdHMuanBlZyYyNjV3JnI9Z2lm/26FLdmIp6wJr91JAI/giphy.gif";
            noButton.style.display = 'none';
            yesButton.style.display = 'none';

            // Show the download button
            const downloadContainer = document.getElementById('download-container');
            downloadContainer.style.display = 'block';
        });
    }
});