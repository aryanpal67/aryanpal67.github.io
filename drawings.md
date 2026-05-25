---
layout: layouts/base.html
title: "Art Gallery"
description: "Check out all of Aryan's amazing drawings and artwork!"
---

<div class="page-hero page-hero-drawings">
  <h1>🎨 My Art Gallery</h1>
  <p>All my colorful drawings, paintings, and creative artwork! 🖌️</p>
</div>

<section class="section reveal">
  <div class="container">
    <div class="games-nav-grid">
      {% set colors = ["gnc-sunshine","gnc-coral","gnc-purple","gnc-mint","gnc-sky","gnc-pink","gnc-sunshine","gnc-coral","gnc-purple","gnc-mint"] %}
      {% for drawing in collections.drawings %}
        <a href="{{ drawing.url }}" class="game-nav-card {{ colors[loop.index0 % 6] }}">
          <span class="gnc-emoji">{{ drawing.data.emoji | default("🎨") }}</span>
          <span class="gnc-title">{{ drawing.data.title }}</span>
          <span class="gnc-desc">{{ drawing.data.medium | default("My artwork") }}</span>
        </a>
      {% endfor %}
    </div>
  </div>
</section>

{% if not collections.drawings.length %}
<section class="section">
  <div class="container text-center">
    <p style="font-size:1.2rem;color:#8a96a3;font-weight:600">No drawings yet! Check back soon! 🎨</p>
  </div>
</section>
{% endif %}
