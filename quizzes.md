---
layout: layouts/base.html
title: "Quizzes"
description: "Take fun quizzes about animals, space, science and more!"
---

<div class="page-hero page-hero-quizzes">
  <h1>🧠 My Quizzes</h1>
  <p>Test your knowledge with fun, interactive quizzes! Can you get 100%? 🎯</p>
</div>

<section class="section reveal">
  <div class="container">
    <div class="feature-cards" style="margin-bottom:3rem">
      
      <a href="#animal-quiz" class="feature-card" onclick="scrollToQuiz('animal-quiz')">
        <span class="card-badge badge-hot">Popular</span>
        <span class="feature-emoji">🐾</span>
        <h3 class="feature-title">Animal Quiz</h3>
        <p class="feature-description">Do you know all about amazing animals? Test your knowledge now!</p>
      </a>

      <a href="#space-quiz" class="feature-card" onclick="scrollToQuiz('space-quiz')">
        <span class="card-badge badge-fun">Fun!</span>
        <span class="feature-emoji">🚀</span>
        <h3 class="feature-title">Space Quiz</h3>
        <p class="feature-description">Explore the universe! How much do you know about planets and stars?</p>
      </a>

      <a href="#dinosaur-quiz" class="feature-card">
        <span class="card-badge badge-new">New</span>
        <span class="feature-emoji">🦕</span>
        <h3 class="feature-title">Dinosaur Quiz</h3>
        <p class="feature-description">Roar! Test your dinosaur knowledge. Which dino are you?</p>
      </a>

    </div>

    <div class="deco-separator">✨ 🧠 ✨ 🧠 ✨</div>

    <!-- Animal Quiz -->
    <div id="animal-quiz" style="margin-top:3rem;scroll-margin-top:100px">
      <h2 style="margin-bottom:1.5rem">🐾 Animal Knowledge Quiz</h2>
      <div data-quiz="animal-quiz"></div>
      <script src="/assets/js/quiz.js"></script>
    </div>

    <div class="deco-separator">✨ 🧠 ✨ 🧠 ✨</div>

    <!-- Space Quiz -->
    <div id="space-quiz" style="margin-top:3rem;scroll-margin-top:100px">
      <h2 style="margin-bottom:1.5rem">🚀 Space Exploration Quiz</h2>
      <div data-quiz="space-quiz"></div>
      <script src="/assets/js/quiz.js"></script>
    </div>

  </div>
</section>

<script>
function scrollToQuiz(quizId) {
  setTimeout(() => {
    document.getElementById(quizId).scrollIntoView({ behavior: 'smooth' });
  }, 100);
  return false;
}
</script>
