/* =============================================================
   puzzle.js  –  Puzzle game engine
   Handles memory matching games, sliding puzzles, etc.
   ============================================================= */

(function initMemoryGame() {
  const root = document.querySelector('[data-game="memory"]');
  if (!root) return;

  const emojis = ['🐉', '🦄', '🚀', '🌈', '🦊', '🎨', '⭐', '🌸'];
  let deck = [], flipped = [], matched = 0, moves = 0, gameActive = true;

  function initGame() {
    // Shuffle deck
    deck = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    flipped = [];
    matched = 0;
    moves = 0;
    gameActive = true;

    const grid = root.querySelector('[data-memory-grid]');
    grid.innerHTML = '';

    deck.forEach((emoji, idx) => {
      const card = document.createElement('button');
      card.className = 'memory-card';
      card.dataset.emoji = emoji;
      card.dataset.idx = idx;
      card.innerHTML = `
        <span class="card-front">${emoji}</span>
        <span class="card-back">❓</span>
      `;
      card.addEventListener('click', () => flipCard(card));
      grid.appendChild(card);
    });

    updateDisplay();
  }

  function flipCard(card) {
    if (!gameActive) return;
    if (card.classList.contains('is-flipped')) return;
    if (card.classList.contains('is-matched')) return;
    if (flipped.length >= 2) return;

    card.classList.add('is-flipped');
    flipped.push(card);

    if (flipped.length === 2) {
      gameActive = false;
      moves++;
      updateDisplay();

      setTimeout(checkMatch, 800);
    }
  }

  function checkMatch() {
    const [c1, c2] = flipped;
    const match = c1.dataset.emoji === c2.dataset.emoji;

    if (match) {
      c1.classList.add('is-matched');
      c2.classList.add('is-matched');
      matched++;
    } else {
      c1.classList.remove('is-flipped');
      c2.classList.remove('is-flipped');
    }

    flipped = [];
    updateDisplay();

    if (matched === emojis.length) {
      endGame();
    } else {
      gameActive = true;
    }
  }

  function updateDisplay() {
    const movesEl = root.querySelector('[data-moves]');
    const pairsEl = root.querySelector('[data-pairs]');
    if (movesEl) movesEl.textContent = `Moves: ${moves}`;
    if (pairsEl) pairsEl.textContent = `Pairs: ${matched}/${emojis.length}`;
  }

  function endGame() {
    gameActive = false;
    const feedback = root.querySelector('[data-feedback]');
    if (feedback) {
      feedback.innerHTML = `<strong>🎉 You won in ${moves} moves! Amazing!</strong>`;
    }
    if (typeof confettiBurst === 'function') confettiBurst(80);
  }

  // Reset button
  const resetBtn = root.querySelector('[data-reset-game]');
  if (resetBtn) {
    resetBtn.addEventListener('click', initGame);
  }

  initGame();
})();
