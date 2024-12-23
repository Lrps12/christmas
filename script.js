document.addEventListener('DOMContentLoaded', () => {
    const NUMBER_OF_SNOWFLAKES = 300;
    const MAX_SNOWFLAKE_SIZE = 5;
    const MAX_SNOWFLAKE_SPEED = 2;
    const SNOWFLAKE_COLOUR = '#ddd';
    const snowflakes = [];

    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.pointerEvents = 'none';
    canvas.style.top = '0px';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    // Snowflake Animation
    const createSnowflake = () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.floor(Math.random() * MAX_SNOWFLAKE_SIZE) + 1,
        color: SNOWFLAKE_COLOUR,
        speed: Math.random() * MAX_SNOWFLAKE_SPEED + 1,
        sway: Math.random() - 0.5
    });

    const drawSnowflake = snowflake => {
        ctx.beginPath();
        ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2);
        ctx.fillStyle = snowflake.color;
        ctx.fill();
        ctx.closePath();
    };

    const updateSnowflake = snowflake => {
        snowflake.y += snowflake.speed;
        snowflake.x += snowflake.sway;
        if (snowflake.y > canvas.height) {
            Object.assign(snowflake, createSnowflake());
        }
    };

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        snowflakes.forEach(snowflake => {
            updateSnowflake(snowflake);
            drawSnowflake(snowflake);
        });
        requestAnimationFrame(animate);
    };

    for (let i = 0; i < NUMBER_OF_SNOWFLAKES; i++) {
        snowflakes.push(createSnowflake());
    }

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    window.addEventListener('scroll', () => {
        canvas.style.top = `${window.scrollY}px`;
    });

    animate();

    // Function to create and animate the beaver image
    const createBeaverImage = () => {
        const beaver = document.createElement('img');
        beaver.src = './public/beaver.png'; // Path to your beaver image
        beaver.classList.add('beaver');

        const randomPosition = Math.random() * (window.innerWidth - 100); // Random position on the bottom border (taking into account the beaver width)
        beaver.style.left = `${randomPosition}px`;
        beaver.style.bottom = '0px'; // Start at the bottom of the screen

        document.body.appendChild(beaver);

        setTimeout(() => {
            beaver.style.display = 'block';  // Make the beaver visible
            beaver.style.animation = 'appear 3s forwards'; // Apply the appear animation
        }, 100);

        setTimeout(() => {
            beaver.style.animation = 'disappear 3s forwards'; // Apply the disappear animation
            setTimeout(() => {
                beaver.remove();  // Remove the beaver after it disappears
            }, 3000); // Wait until disappear animation ends
        }, 3000); // Keep the beaver visible for 3 seconds before disappearing
    };

    setInterval(createBeaverImage, 5000);

    // Event listener for the gift box click to reveal the PS5
    const giftBox = document.getElementById('giftBox');
    const reveal = document.getElementById('reveal');

    giftBox.addEventListener('click', () => {
        // Add shuffling animation to the gift box
        giftBox.classList.add('shuffling');

        // After the animation completes (2s in this case), reveal the PS5
        setTimeout(() => {
            // Hide the gift box with the gift image
            giftBox.classList.add('hidden');
            // Show the PS5 image and message after the shuffle animation ends
            reveal.classList.remove('hidden');
        }, 2000); // Match the timeout with the animation duration
    });
});
