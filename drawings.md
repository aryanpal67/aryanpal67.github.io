---
layout: layouts/base.html
title: "Art Gallery"
description: "Check out all of Aryan's amazing drawings and artwork!"
---

<style>
.art-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem;
}
@media (max-width: 768px) { .art-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .art-grid { grid-template-columns: 1fr; } }

.art-card {
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  border: 3px solid #f0e8ff;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  text-decoration: none;
  display: block;
  background: #fff;
  transition: transform 0.3s cubic-bezier(.34,1.56,.64,1), box-shadow 0.3s;
  aspect-ratio: 4/3;
}
.art-card:hover {
  transform: scale(1.04) rotate(1deg);
  box-shadow: 0 16px 40px rgba(0,0,0,0.15);
  border-color: var(--color-sunshine-yellow, #ffd93d);
  z-index: 2;
}
.art-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.art-card-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
}
.art-overlay {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  padding: 0.9rem 1rem;
  background: linear-gradient(transparent, rgba(30,58,95,0.88));
  transform: translateY(100%);
  transition: transform 0.28s ease;
}
.art-card:hover .art-overlay { transform: translateY(0); }
.art-overlay h3 {
  font-family: 'Baloo 2', cursive;
  font-size: 0.95rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
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
            <img src="{{ drawing.data.image }}" alt="{{ drawing.data.title }}" loading="lazy" />
          {% else %}
            <div class="art-card-placeholder" style="background:{{ drawing.data.bg | default('linear-gradient(135deg,#f5f0ff,#fff)') }}">
              {{ drawing.data.emoji | default("🎨") }}
            </div>
          {% endif %}
          <div class="art-overlay">
            <h3>{{ drawing.data.title }}</h3>
          </div>
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
