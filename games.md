---
layout: layouts/base.html
title: "Games"
description: "Play fun, interactive games and brain teasers!"
---

<div class="page-hero page-hero-games">
  <h1>🎮 My Games</h1>
  <p>Play awesome interactive games and puzzles! Challenge yourself and have fun! 🎯</p>
</div>

<section class="section reveal">
  <div class="container">
    <div style="margin-bottom:3rem">
      <h2 style="margin-bottom:1.5rem; text-align:center">🃏 Memory Card Game</h2>
      <p style="text-align:center; font-size:1.05rem; color:#6a7a8a; margin-bottom:2rem">
        Match all the pairs! Flip two cards at a time. How many moves will it take you? 🧠
      </p>
      
      <div data-game="memory" class="game-container">
        <div class="game-area">
          <div style="display:flex; gap:2.5rem; align-items:center; margin-bottom:1rem; flex-wrap:wrap; justify-content:center">
            <div id="moves" data-moves style="font-family:'Fredoka One',cursive; font-size:1.4rem; color:var(--color-navy)">
              Moves: 0
            </div>
            <div id="pairs" data-pairs style="font-family:'Fredoka One',cursive; font-size:1.4rem; color:var(--color-mint-green)">
              Pairs: 0/8
            </div>
          </div>
          <div data-memory-grid class="memory-grid"></div>
          <div data-feedback style="text-align:center; font-weight:600; font-size:1.1rem; color:var(--color-navy); min-height:1.6rem; margin-top:1rem"></div>
        </div>
        <div style="text-align:center; margin-top:1.5rem">
          <button class="btn btn-primary" data-reset-game>🔄 New Game</button>
        </div>
      </div>
    </div>

    <div class="deco-separator">🎮 🕹️ 🎮 🕹️ 🎮</div>

    <div style="margin-top:3rem">
      <h2 style="margin-bottom:1.5rem; text-align:center">🎯 More Games Coming Soon!</h2>
      <p style="text-align:center; font-size:1.05rem; color:#8a96a3; font-weight:600">
        I'm working on more awesome games! Check back soon for:
      </p>
      <div class="feature-cards" style="margin-top:2rem">
        <div class="feature-card" style="border-color:#6ec6f0; background:linear-gradient(135deg,#f0f9ff,#fff)">
          <span class="feature-emoji">🧩</span>
          <h3 class="feature-title">Puzzle Games</h3>
          <p class="feature-description">Brain-teasing puzzles and challenges</p>
        </div>
        <div class="feature-card" style="border-color:#ffd93d; background:linear-gradient(135deg,#fffdf0,#fff)">
          <span class="feature-emoji">🎪</span>
          <h3 class="feature-title">Word Games</h3>
          <p class="feature-description">Fun with words and language</p>
        </div>
        <div class="feature-card" style="border-color:#6bcb77; background:linear-gradient(135deg,#f0fff4,#fff)">
          <span class="feature-emoji">🏆</span>
          <h3 class="feature-title">Competitions</h3>
          <p class="feature-description">Challenge yourself and beat your scores</p>
        </div>
      </div>
    </div>
  </div>
</section>

<script src="/assets/js/puzzle.js"></script>
