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

    const giftBox = document.getElementById('giftBox');
    const reveal = document.getElementById('reveal');
    const message = document.querySelector('.message');

    let step = 1; // Track the current step

    const steps = [
        {
            image: './public/gift.png',
            message: 'Clique sur ton cadeau, VITE',
        },
        {
            image: './public/orange.png',
            message: 'Pas ouf, tu peux recliquer',
        },
        {
            image: './public/gift.png',
            message: 'Allez go',
        },
        {
            image: './public/paco.png',
            message: 'Et nan, ça t\'as déjà un exemplaire, next',
        },
        {
            image: './public/gift.png',
            message: 'On enchaîne hop hop hop',
        },
        {
            image: './public/jul.jpg',
            message: 'Ah déso, la rencontre avec le J en personne ça sera pour une autre fois...',
        },
        {
            image: './public/gift.png',
            message: 'Bon on lâche rieng, celle là c\'est la bonne (et la dernière)',
        },
        {
            image: './public/ps5.png',
            message: 'Bon bah ça sera une p\'tite ps5....... si ça te va.......',
        },
    ];

    const updateStage = () => {
        const currentStep = steps[step - 1]; // Get the current step
        if (currentStep) {
            if (currentStep.image === './public/gift.png') {
                // Show the gift box again
                giftBox.classList.remove('hidden');
                reveal.classList.add('hidden');
                message.textContent = currentStep.message;
            } else {
                // Update the image and message for other steps
                reveal.querySelector('img').src = currentStep.image;
                message.textContent = currentStep.message;

                // Hide the gift box and show the reveal
                giftBox.classList.add('hidden');
                reveal.classList.remove('hidden');
            }
        }
    };

    let isAnimating = false; // Track if an animation is ongoing

    giftBox.addEventListener('click', () => {
        if (isAnimating || step === steps.length) {
            return; // Ignore clicks during animation or if no further steps
        }

        isAnimating = true; // Block additional clicks

        if (step === steps.length - 1) {
            // Apply the longer shuffle animation for the last step
            giftBox.classList.add('shuffling-last');

            setTimeout(() => {
                giftBox.classList.remove('shuffling-last');
                step++;
                updateStage();
                isAnimating = false; // Allow clicks again
            }, 5000); // 5 seconds for the last animation
        } else {
            // Apply the regular shuffle animation
            giftBox.classList.add('shuffling');

            setTimeout(() => {
                giftBox.classList.remove('shuffling');
                step++;
                updateStage();
                isAnimating = false; // Allow clicks again
            }, 2000); // Match the animation duration
        }
    });

    reveal.addEventListener('click', () => {
        if (isAnimating || step === steps.length) {
            return; // Ignore clicks during animation or if no further steps
        }

        isAnimating = true; // Block additional clicks

        // Clear the message explicitly when switching steps
        message.textContent = '';

        step++;
        updateStage();

        // Trigger confetti animation if it's the last step

        isAnimating = false; // Allow clicks again
    });

    // Initialize the first stage
    updateStage();
});
