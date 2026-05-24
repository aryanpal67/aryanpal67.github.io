---
layout: layouts/base.html
title: "Games"
description: "Play 6 awesome interactive games – memory, snake, word scramble, reaction test, math blaster & colour match!"
---

<div class="page-hero page-hero-games">
  <h1>🎮 My Games</h1>
  <p>6 totally awesome games! Can you beat your high score? 🏆</p>
</div>

<!-- NAV CARDS -->
<section class="section reveal">
  <div class="container">
    <div class="games-nav-grid">
      <a href="#memory-game"   class="game-nav-card gnc-pink">
        <span class="gnc-emoji">🃏</span>
        <span class="gnc-title">Memory Cards</span>
        <span class="gnc-desc">Match the pairs!</span>
      </a>
      <a href="#snake-game"    class="game-nav-card gnc-mint">
        <span class="gnc-emoji">🐍</span>
        <span class="gnc-title">Snake Game</span>
        <span class="gnc-desc">Eat and grow!</span>
      </a>
      <a href="#word-scramble" class="game-nav-card gnc-sky">
        <span class="gnc-emoji">🔤</span>
        <span class="gnc-title">Word Scramble</span>
        <span class="gnc-desc">Unscramble it!</span>
      </a>
      <a href="#reaction-game" class="game-nav-card gnc-sunshine">
        <span class="gnc-emoji">⚡</span>
        <span class="gnc-title">Reaction Test</span>
        <span class="gnc-desc">How fast are you?</span>
      </a>
      <a href="#math-game"     class="game-nav-card gnc-purple">
        <span class="gnc-emoji">🔢</span>
        <span class="gnc-title">Math Blaster</span>
        <span class="gnc-desc">Race the clock!</span>
      </a>
      <a href="#colour-match"  class="game-nav-card gnc-coral">
        <span class="gnc-emoji">🎨</span>
        <span class="gnc-title">Colour Match</span>
        <span class="gnc-desc">Match the colour!</span>
      </a>
    </div>
  </div>
</section>

<div class="section deco-separator">🎮 🕹️ 🎮 🕹️ 🎮</div>

<!-- GAME 1 — MEMORY CARDS -->
<section class="section reveal" id="memory-game" style="scroll-margin-top:90px">
  <div class="container">
    <h2 class="game-section-title">🃏 Memory Card Game</h2>
    <p class="game-section-sub">Flip two cards at a time and find all matching pairs! 🧠</p>
    <div class="game-box">
      <div class="game-stats-row">
        <span class="game-stat" id="mem-moves">🎯 Moves: 0</span>
        <span class="game-stat" id="mem-pairs">✅ Pairs: 0/8</span>
        <span class="game-stat" id="mem-time">⏱️ Time: 0s</span>
      </div>
      <div class="memory-grid-new" id="mem-grid"></div>
      <div class="game-feedback" id="mem-feedback"></div>
      <div style="text-align:center;margin-top:1.2rem">
        <button class="btn btn-primary" id="mem-reset">🔄 New Game</button>
      </div>
    </div>
  </div>
</section>

<div class="section deco-separator">🃏 ✨ 🃏 ✨ 🃏</div>

<!-- GAME 2 — SNAKE -->
<section class="section reveal" id="snake-game" style="scroll-margin-top:90px">
  <div class="container">
    <h2 class="game-section-title">🐍 Snake Game</h2>
    <p class="game-section-sub">Eat the apple to grow longer! Dont hit the walls or your own tail! Use arrow keys or the buttons. 🎮</p>
    <div class="game-box" style="text-align:center">
      <div class="game-stats-row">
        <span class="game-stat" id="snake-score">🍎 Score: 0</span>
        <span class="game-stat" id="snake-best">🏆 Best: 0</span>
        <span class="game-stat" id="snake-level">⚡ Level: 1</span>
      </div>
      <div class="snake-canvas-wrap">
        <canvas id="snake-canvas" width="320" height="320"></canvas>
        <div id="snake-overlay" class="snake-overlay">
          <div class="snake-overlay-inner">
            <div style="font-size:3rem">🐍</div>
            <p id="snake-overlay-msg" class="snake-overlay-msg">Press START to play!</p>
            <button class="btn btn-primary" id="snake-start-btn">▶️ Start Game</button>
          </div>
        </div>
      </div>
      <div class="snake-dpad">
        <div class="dpad-row"><button class="dpad-btn" data-dir="UP">⬆️</button></div>
        <div class="dpad-row">
          <button class="dpad-btn" data-dir="LEFT">⬅️</button>
          <button class="dpad-btn" data-dir="DOWN">⬇️</button>
          <button class="dpad-btn" data-dir="RIGHT">➡️</button>
        </div>
      </div>
    </div>
  </div>
</section>

<div class="section deco-separator">🐍 ✨ 🐍 ✨ 🐍</div>

<!-- GAME 3 — WORD SCRAMBLE -->
<section class="section reveal" id="word-scramble" style="scroll-margin-top:90px">
  <div class="container">
    <h2 class="game-section-title">🔤 Word Scramble</h2>
    <p class="game-section-sub">The letters are all jumbled up! Can you figure out the word? 🤔</p>
    <div class="game-box" id="scramble-box"></div>
  </div>
</section>

<div class="section deco-separator">🔤 ✨ 🔤 ✨ 🔤</div>

<!-- GAME 4 — REACTION TEST -->
<section class="section reveal" id="reaction-game" style="scroll-margin-top:90px">
  <div class="container">
    <h2 class="game-section-title">⚡ Reaction Speed Test</h2>
    <p class="game-section-sub">Wait for the box to turn GREEN then tap it as fast as you can! 5 rounds. ⏱️</p>
    <div class="game-box" style="text-align:center">
      <div class="game-stats-row">
        <span class="game-stat" id="react-best">🏆 Best: --</span>
        <span class="game-stat" id="react-avg">📊 Avg: --</span>
        <span class="game-stat" id="react-rounds">🎯 Round: 0/5</span>
      </div>
      <div id="react-pad" class="react-pad react-idle">
        <div id="react-label" class="react-label">TAP TO START</div>
      </div>
      <div id="react-history" class="react-history"></div>
    </div>
  </div>
</section>

<div class="section deco-separator">⚡ ✨ ⚡ ✨ ⚡</div>

<!-- GAME 5 — MATH BLASTER -->
<section class="section reveal" id="math-game" style="scroll-margin-top:90px">
  <div class="container">
    <h2 class="game-section-title">🔢 Math Blaster</h2>
    <p class="game-section-sub">Answer as many maths questions as you can in 60 seconds! ⏰</p>
    <div class="game-box" id="math-box"></div>
  </div>
</section>

<div class="section deco-separator">🔢 ✨ 🔢 ✨ 🔢</div>

<!-- GAME 6 — COLOUR MATCH -->
<section class="section reveal" id="colour-match" style="scroll-margin-top:90px">
  <div class="container">
    <h2 class="game-section-title">🎨 Colour Match</h2>
    <p class="game-section-sub">The WORD says a colour — tap the button matching the TEXT COLOUR, not the word itself! Super tricky! 🌈</p>
    <div class="game-box" id="colour-box"></div>
  </div>
</section>

<script src="/assets/js/games.js"></script>
