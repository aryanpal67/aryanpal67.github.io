---
layout: layouts/base.html
title: "Stories"
description: "Read all of Aryan's amazing stories!"
---

<div class="page-hero page-hero-stories">
  <h1>📖 All My Stories</h1>
  <p>Adventures, mysteries, and magical worlds await! Pick a story and let's go! 🚀</p>
</div>

<section class="section reveal">
  <div class="container">
    <div class="games-nav-grid">

      {% for story in collections.stories %}
        {% set colors = ["gnc-pink","gnc-mint","gnc-sky","gnc-sunshine","gnc-purple","gnc-coral","gnc-pink","gnc-mint","gnc-sky","gnc-sunshine"] %}
        {% set ci = loop.index0 % 6 %}
        <a href="{{ story.url }}" class="game-nav-card {{ colors[ci] }}">
          <span class="gnc-emoji">{{ story.data.emoji | default("📖") }}</span>
          <span class="gnc-title">{{ story.data.title }}</span>
          <span class="gnc-desc">{{ story.data.readtime | default(5) }} min read</span>
        </a>
      {% endfor %}

    </div>
  </div>
</section>
