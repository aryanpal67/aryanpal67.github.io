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
    <div class="gallery">
      {% for drawing in collections.drawings %}
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
  </div>
</section>

{% if not collections.drawings.length %}
<section class="section">
  <div class="container text-center">
    <p style="font-size:1.2rem;color:#8a96a3;font-weight:600">No drawings yet! Check back soon! 🎨</p>
  </div>
</section>
{% endif %}
