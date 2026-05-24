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

  <div class="hero-avatar">🧒</div>
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
    <div class="stories-grid">
      {% for story in collections.stories | limit(3) %}
        <a href="{{ story.url }}" class="story-card">
          <div class="story-thumb" style="background: linear-gradient(135deg, #E8F8FF, #D8E8FF)">
            {% if story.data.emoji %}{{ story.data.emoji }}{% else %}📖{% endif %}
          </div>
          <div class="story-info">
            {% if story.data.tags %}
              <span class="tag tag-story">📚 Story</span>
            {% endif %}
            <h3>{{ story.data.title }}</h3>
            <p class="story-excerpt">{{ story.data.excerpt or story.content | slice(0, 140) }}…</p>
            <div class="story-footer-meta">
              <span>📅 {{ story.date | dateDisplay }}</span>
              {% if story.data.readtime %}<span>⏱️ {{ story.data.readtime }} min</span>{% endif %}
            </div>
          </div>
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
    <div class="gallery">
      {% for drawing in collections.drawings | limit(6) %}
        <a href="{{ drawing.url }}" class="gallery-item">
          <div class="gallery-placeholder">
            {% if drawing.data.emoji %}{{ drawing.data.emoji }}{% else %}🎨{% endif %}
          </div>
          <div class="gallery-overlay">
            <h3>{{ drawing.data.title }}</h3>
          </div>
        </a>
      {% endfor %}
    </div>
    <div style="text-align:center;margin-top:2.5rem">
      <a href="/drawings/" class="btn btn-secondary">🖼️ View Full Gallery →</a>
    </div>
  </div>
</section>

<div class="section deco-separator">🌟 ⭐ 🌟 ⭐ 🌟</div>
