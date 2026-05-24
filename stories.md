---
layout: layouts/base.html
title: "Stories"
description: "Read all of Aryan's amazing stories – adventures, fantasy, space and more!"
---

<div class="page-hero page-hero-stories">
  <h1>📖 All My Stories</h1>
  <p>Adventures, mysteries, and magical worlds await! Pick a story and let's go! 🚀</p>
</div>

<section class="section reveal">
  <div class="container">
    <div class="stories-grid">
      {% for story in collections.stories %}
        <a href="{{ story.url }}" class="story-card">
          <div class="story-thumb" style="background: linear-gradient(135deg, #E8F8FF, #D8E8FF)">
            {% if story.data.emoji %}{{ story.data.emoji }}{% else %}📖{% endif %}
          </div>
          <div class="story-info">
            {% if story.data.tags %}
              {% for tag in story.data.tags %}
                {% if tag != "stories" %}
                  <span class="tag tag-story">{{ tag }}</span>
                {% endif %}
              {% endfor %}
            {% endif %}
            <h3>{{ story.data.title }}</h3>
            <p class="story-excerpt">{{ story.data.excerpt or story.content | slice(0, 160) }}…</p>
            <div class="story-footer-meta">
              <span>📅 {{ story.date | dateDisplay }}</span>
              {% if story.data.readtime %}<span>⏱️ {{ story.data.readtime }} min read</span>{% endif %}
            </div>
          </div>
        </a>
      {% endfor %}
    </div>
  </div>
</section>

{% if not collections.stories.length %}
<section class="section">
  <div class="container text-center">
    <p style="font-size:1.2rem;color:#8a96a3;font-weight:600">No stories yet! Check back soon! 📚</p>
  </div>
</section>
{% endif %}
