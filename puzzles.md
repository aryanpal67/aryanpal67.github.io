---
layout: layouts/base.html
title: "Puzzles"
description: "Solve fun brain-teasers, riddles, sliding puzzles and secret codes!"
---

<div class="page-hero page-hero-puzzles">
  <h1>🧩 Puzzle Zone</h1>
  <p>6 awesome puzzles to solve! Riddles, codes, sliding tiles &amp; more! 🤔</p>
</div>

<!-- ══════════════════════════════════════════════
     NAV CARDS
══════════════════════════════════════════════ -->
<section class="section reveal">
  <div class="container">
    <div class="games-nav-grid">

      <a href="#word-riddles"   class="game-nav-card gnc-pink">
        <span class="gnc-emoji">🔤</span>
        <span class="gnc-title">Word Riddles</span>
        <span class="gnc-desc">Solve tricky riddles!</span>
      </a>
      <a href="#sliding-puzzle" class="game-nav-card gnc-purple">
        <span class="gnc-emoji">🧩</span>
        <span class="gnc-title">Sliding Puzzle</span>
        <span class="gnc-desc">Put tiles in order!</span>
      </a>
      <a href="#logic-puzzles"  class="game-nav-card gnc-sky">
        <span class="gnc-emoji">🧠</span>
        <span class="gnc-title">Logic Puzzles</span>
        <span class="gnc-desc">Use your brain!</span>
      </a>
      <a href="#spot-odd"       class="game-nav-card gnc-mint">
        <span class="gnc-emoji">🔍</span>
        <span class="gnc-title">Spot the Odd One</span>
        <span class="gnc-desc">Find what's different!</span>
      </a>
      <a href="#number-puzzle"  class="game-nav-card gnc-sunshine">
        <span class="gnc-emoji">🔢</span>
        <span class="gnc-title">Number Puzzles</span>
        <span class="gnc-desc">Find the pattern!</span>
      </a>
      <a href="#secret-code"    class="game-nav-card gnc-coral">
        <span class="gnc-emoji">⭐</span>
        <span class="gnc-title">Secret Codes</span>
        <span class="gnc-desc">Crack the cipher!</span>
      </a>

    </div>
  </div>
</section>

<div class="section deco-separator">🧩 🎯 🧩 🎯 🧩</div>

<!-- ══════════════════════════════════════════════
     1. WORD RIDDLES
══════════════════════════════════════════════ -->
<section class="section reveal" id="word-riddles" style="scroll-margin-top:90px">
  <div class="container">
    <h2 class="puzzle-section-title">🔤 Word Riddles</h2>
    <p class="puzzle-section-sub">Read the riddle carefully and type your answer!</p>

    <div class="puzzle-box" id="riddle-box">
      <!-- rendered by puzzle.js -->
    </div>
  </div>
</section>

<div class="section deco-separator">✨ 🔤 ✨ 🔤 ✨</div>

<!-- ══════════════════════════════════════════════
     2. SLIDING PUZZLE
══════════════════════════════════════════════ -->
<section class="section reveal" id="sliding-puzzle" style="scroll-margin-top:90px">
  <div class="container">
    <h2 class="puzzle-section-title">🧩 Sliding Puzzle</h2>
    <p class="puzzle-section-sub">Click a tile next to the empty space to slide it. Put them in order 1–8!</p>

    <div class="puzzle-box" style="text-align:center">
      <div class="sliding-stats">
        <span id="slide-moves">Moves: 0</span>
        <span id="slide-status"></span>
      </div>
      <div class="slide-grid" id="slide-grid"></div>
      <button class="btn btn-primary mt-3" id="slide-reset">🔀 Shuffle Again</button>
    </div>
  </div>
</section>

<div class="section deco-separator">✨ 🧩 ✨ 🧩 ✨</div>

<!-- ══════════════════════════════════════════════
     3. LOGIC PUZZLES
══════════════════════════════════════════════ -->
<section class="section reveal" id="logic-puzzles" style="scroll-margin-top:90px">
  <div class="container">
    <h2 class="puzzle-section-title">🧠 Logic Puzzles</h2>
    <p class="puzzle-section-sub">Think carefully — these need your brain power! 💪</p>

    <div class="puzzle-box" id="logic-box">
      <!-- rendered by puzzle.js -->
    </div>
  </div>
</section>

<div class="section deco-separator">✨ 🧠 ✨ 🧠 ✨</div>

<!-- ══════════════════════════════════════════════
     4. SPOT THE ODD ONE OUT
══════════════════════════════════════════════ -->
<section class="section reveal" id="spot-odd" style="scroll-margin-top:90px">
  <div class="container">
    <h2 class="puzzle-section-title">🔍 Spot the Odd One Out</h2>
    <p class="puzzle-section-sub">Find the emoji that does NOT belong with the others!</p>

    <div class="puzzle-box" id="spot-box">
      <!-- rendered by puzzle.js -->
    </div>
  </div>
</section>

<div class="section deco-separator">✨ 🔍 ✨ 🔍 ✨</div>

<!-- ══════════════════════════════════════════════
     5. NUMBER PUZZLES
══════════════════════════════════════════════ -->
<section class="section reveal" id="number-puzzle" style="scroll-margin-top:90px">
  <div class="container">
    <h2 class="puzzle-section-title">🔢 Number Puzzles</h2>
    <p class="puzzle-section-sub">What comes next in the sequence? Find the pattern!</p>

    <div class="puzzle-box" id="number-box">
      <!-- rendered by puzzle.js -->
    </div>
  </div>
</section>

<div class="section deco-separator">✨ 🔢 ✨ 🔢 ✨</div>

<!-- ══════════════════════════════════════════════
     6. SECRET CODE DECODER
══════════════════════════════════════════════ -->
<section class="section reveal" id="secret-code" style="scroll-margin-top:90px">
  <div class="container">
    <h2 class="puzzle-section-title">⭐ Secret Code Decoder</h2>
    <p class="puzzle-section-sub">Each emoji stands for a letter. Decode the secret message! 🕵️</p>

    <div class="puzzle-box" id="code-box">
      <!-- rendered by puzzle.js -->
    </div>
  </div>
</section>

<!-- All puzzle JS -->
<script src="/assets/js/puzzle.js"></script>
