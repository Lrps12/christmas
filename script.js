// Configuration de la roulette
let wheel = new Winwheel({
    'canvasId': 'rouletteCanvas',
    'numSegments': 8, // Nombre de segments
    'segments': [
        { 'fillStyle': '#eae56f', 'text': 'Rien' },
        { 'fillStyle': '#89f26e', 'text': 'PS5' },
        { 'fillStyle': '#7de6ef', 'text': 'Bonbons' },
        { 'fillStyle': '#e7706f', 'text': 'Une surprise' },
        { 'fillStyle': '#eae56f', 'text': 'Un câlin' },
        { 'fillStyle': '#89f26e', 'text': 'PS5' },
        { 'fillStyle': '#7de6ef', 'text': 'Chocolat' },
        { 'fillStyle': '#e7706f', 'text': 'Un sourire' }
    ],
    'animation': {
        'type': 'spinToStop',
        'duration': 5, // Durée en secondes
        'spins': 8,    // Nombre de tours
        'callbackFinished': revealPrize
    }
});

// Désactiver le bouton pour éviter les spams
let spinButton = document.getElementById('spinButton');
spinButton.addEventListener('click', () => {
    spinButton.disabled = true;
    wheel.startAnimation();
});

// Révéler le cadeau
function revealPrize(indicatedSegment) {
    let revealDiv = document.getElementById('reveal');
    revealDiv.classList.remove('hidden'); // Montre la section du cadeau
    revealDiv.querySelector('p').textContent = `Tu as gagné : ${indicatedSegment.text}`;
}
