---
layout: layouts/base.html
title: "Art Gallery"
description: "Check out all of Aryan's amazing drawings and artwork!"
---

<style>
/* ── Art gallery grid ─────────────────────────────────── */
.art-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.4rem;
}
@media (max-width: 900px) { .art-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 500px) { .art-grid { grid-template-columns: 1fr; } }

/* ── Each card ───────────────────────────────────────── */
.art-card {
  border-radius: 18px;
  overflow: hidden;
  border: 3px solid #f0e8ff;
  box-shadow: 0 4px 14px rgba(0,0,0,0.08);
  text-decoration: none;
  display: flex;
  flex-direction: column;
  background: #fff;
  transition: transform 0.3s cubic-bezier(.34,1.56,.64,1), box-shadow 0.3s;
}
.art-card:hover {
  transform: scale(1.04);
  box-shadow: 0 16px 40px rgba(0,0,0,0.14);
  border-color: #ffd93d;
}

/* ── Image / placeholder area ─────────────────────────── */
.art-thumb {
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
  display: block;
  flex-shrink: 0;
}
.art-placeholder {
  width: 100%;
  aspect-ratio: 4/3;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  flex-shrink: 0;
}

/* ── Title bar — ALWAYS visible ──────────────────────── */
.art-label {
  padding: 0.65rem 0.9rem;
  background: #fff;
  border-top: 2px solid #f0e8ff;
}
.art-label h3 {
  font-family: 'Baloo 2', cursive;
  font-weight: 700;
  font-size: 0.92rem;
  color: #1e3a5f;
  margin: 0 0 0.15rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.art-label span {
  font-size: 0.72rem;
  font-weight: 600;
  color: #a0aab4;
}
</style>

<div class="page-hero page-hero-drawings">
  <h1>🎨 My Art Gallery</h1>
  <p>All my colorful drawings, paintings, and creative artwork! 🖌️</p>
</div>

<section class="section reveal">
  <div class="container">
    <div class="art-grid">
      {% for drawing in collections.drawings %}
        <a href="{{ drawing.url }}" class="art-card">

          {% if drawing.data.image %}
            <img
              class="art-thumb"
              src="{{ drawing.data.image }}"
              alt="{{ drawing.data.title }}"
              loading="lazy"
            />
          {% else %}
            <div
              class="art-placeholder"
              style="background:{{ drawing.data.bg | default('linear-gradient(135deg,#f5f0ff,#ede8ff)') }}"
            >{{ drawing.data.emoji | default("🎨") }}</div>
          {% endif %}

          <div class="art-label">
            <h3>{{ drawing.data.title }}</h3>
            {% if drawing.data.medium %}
              <span>🖌️ {{ drawing.data.medium }}</span>
            {% endif %}
          </div>

        </a>
      {% endfor %}
    </div>
  </div>
</section>

{% if not collections.drawings.length %}
<section class="section">
  <div class="container" style="text-align:center">
    <p style="font-size:1.2rem;color:#8a96a3;font-weight:600">No drawings yet — check back soon! 🎨</p>
  </div>
</section>
{% endif %}
