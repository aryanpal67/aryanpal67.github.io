---
layout: layouts/base.html
title: "Home"
description: "Aryan's awesome kids blog – stories, art, quizzes & games!"
---

<section class="hero">
  <div class="hero-float" style="top:10%;left:5%;animation-duration:4s">🦄</div>
  <div class="hero-float" style="top:15%;right:6%;animation-duration:5s;animation-delay:-1s">🚀</div>
  <div class="hero-float" style="top:60%;left:3%;animation-duration:6s;animation-delay:-2s">🌈</div>
  <div class="hero-float" style="top:65%;right:5%;animation-duration:4.5s;animation-delay:-0.5s">🎨</div>

  <div class="hero-avatar">
    <img src="/assets/images/aryan_dp.jpg" alt="Aryan" class="avatar-img" />
  </div>
  <h1 class="hero-title">Hi, I'm <span>Aryan!</span> 👋</h1>
  <p class="hero-subtitle">Welcome to my super awesome blog full of stories, drawings, quizzes and lots of fun! 🌟</p>

  <div class="hero-buttons">
    <a href="/stories/" class="btn btn-primary">📖 Read My Stories</a>
    <a href="/quizzes/" class="btn btn-secondary">🧠 Take a Quiz!</a>
  </div>

  <div class="hero-emojis">
    <span>⭐</span>
    <span>🌟</span>
    <span>✨</span>
    <span>💫</span>
    <span>⭐</span>
    <span>🌟</span>
    <span>✨</span>
  </div>
</section>

<section class="section reveal">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">🗺️ Explore My World</h2>
    </div>
    <div class="feature-cards">
      <a href="/stories/" class="feature-card">
        <span class="card-badge badge-hot">Popular</span>
        <span class="feature-emoji">📖</span>
        <h3 class="feature-title">Amazing Stories</h3>
        <p class="feature-description">Go on magical adventures through forests, space and beyond with my awesome stories!</p>
      </a>
      <a href="/drawings/" class="feature-card">
        <span class="card-badge badge-new">New</span>
        <span class="feature-emoji">🎨</span>
        <h3 class="feature-title">Art Gallery</h3>
        <p class="feature-description">See all my colorful drawings – dragons, rainbows, and lots more cool artwork!</p>
      </a>
      <a href="/quizzes/" class="feature-card">
        <span class="card-badge badge-fun">Fun!</span>
        <span class="feature-emoji">🧠</span>
        <h3 class="feature-title">Fun Quizzes</h3>
        <p class="feature-description">Test your brain with my animal, space, and super science quizzes. Can you get 100%?</p>
      </a>
      <a href="/games/" class="feature-card">
        <span class="feature-emoji">🎮</span>
        <h3 class="feature-title">Mini Games</h3>
        <p class="feature-description">Play my awesome memory card game and brain-teaser puzzles. Challenge yourself!</p>
      </a>
      <a href="/puzzles/" class="feature-card">
        <span class="card-badge badge-new">New</span>
        <span class="feature-emoji">✨</span>
        <h3 class="feature-title">Fun Puzzles</h3>
        <p class="feature-description">Solve amazing brain-teasers, riddles, and interactive puzzles. How many can you solve?</p>
      </a>
      <a href="/about/" class="feature-card">
        <span class="feature-emoji">💛</span>
        <h3 class="feature-title">About Me</h3>
        <p class="feature-description">Learn all about me, my favourite things, and why I started this blog!</p>
      </a>
    </div>
  </div>
</section>

<div class="section deco-separator">🌸 🦋 🌸 🦋 🌸</div>

<section class="section reveal">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">📖 Latest Stories</h2>
    </div>
    <div class="games-nav-grid">
      {% set colors = ["gnc-pink","gnc-mint","gnc-sky","gnc-sunshine","gnc-purple","gnc-coral"] %}
      {% for story in collections.stories | limit(6) %}
        <a href="{{ story.url }}" class="game-nav-card {{ colors[loop.index0 % 6] }}">
          <span class="gnc-emoji">{{ story.data.emoji | default("📖") }}</span>
          <span class="gnc-title">{{ story.data.title }}</span>
          <span class="gnc-desc">{{ story.data.readtime | default(5) }} min read</span>
        </a>
      {% endfor %}
    </div>
    <div style="text-align:center;margin-top:2.5rem">
      <a href="/stories/" class="btn btn-primary">📖 See All Stories →</a>
    </div>
  </div>
</section>

<div class="section deco-separator">🎨 🖌️ 🎨 🖌️ 🎨</div>

<section class="section reveal">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">🎨 My Recent Art</h2>
    </div>
    <div class="games-nav-grid">
      {% set dcolors = ["gnc-sunshine","gnc-coral","gnc-purple","gnc-mint","gnc-sky","gnc-pink"] %}
      {% for drawing in collections.drawings | limit(6) %}
        <a href="{{ drawing.url }}" class="game-nav-card {{ dcolors[loop.index0 % 6] }}">
          <span class="gnc-emoji">{{ drawing.data.emoji | default("🎨") }}</span>
          <span class="gnc-title">{{ drawing.data.title }}</span>
          <span class="gnc-desc">{{ drawing.data.medium | default("My artwork") }}</span>
        </a>
      {% endfor %}
    </div>
    <div style="text-align:center;margin-top:2.5rem">
      <a href="/drawings/" class="btn btn-secondary">🖼️ View Full Gallery →</a>
    </div>
  </div>
</section>

<div class="section deco-separator">🌟 ⭐ 🌟 ⭐ 🌟</div>
