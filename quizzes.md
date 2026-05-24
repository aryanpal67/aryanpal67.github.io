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

    <div class="quiz-card-grid" style="margin-bottom:3rem">
      <a href="#animal-quiz" class="quiz-nav-card" onclick="scrollToQuiz('animal-quiz')">
        <span class="card-badge badge-hot">Popular</span>
        <span class="quiz-nav-emoji">🐾</span>
        <h3 class="quiz-nav-title">Animal Quiz</h3>
        <p class="quiz-nav-desc">Do you know all about amazing animals? Test your knowledge now!</p>
      </a>
      <a href="#space-quiz" class="quiz-nav-card" onclick="scrollToQuiz('space-quiz')">
        <span class="card-badge badge-fun">Fun!</span>
        <span class="quiz-nav-emoji">🚀</span>
        <h3 class="quiz-nav-title">Space Quiz</h3>
        <p class="quiz-nav-desc">Explore the universe! How much do you know about planets and stars?</p>
      </a>
      <a href="#dinosaur-quiz" class="quiz-nav-card" onclick="scrollToQuiz('dinosaur-quiz')">
        <span class="card-badge badge-new">New</span>
        <span class="quiz-nav-emoji">🦕</span>
        <h3 class="quiz-nav-title">Dinosaur Quiz</h3>
        <p class="quiz-nav-desc">Roar! Test your dinosaur knowledge. Which dino are you?</p>
      </a>
    </div>

    <div class="deco-separator">✨ 🧠 ✨ 🧠 ✨</div>

    <!-- Animal Quiz -->
    <div id="animal-quiz" style="margin-top:3rem;scroll-margin-top:100px">
      <h2 style="margin-bottom:1.5rem">🐾 Animal Knowledge Quiz</h2>
      <div data-quiz="animal-quiz"></div>
    </div>

    <div class="deco-separator">✨ 🧠 ✨ 🧠 ✨</div>

    <!-- Space Quiz -->
    <div id="space-quiz" style="margin-top:3rem;scroll-margin-top:100px">
      <h2 style="margin-bottom:1.5rem">🚀 Space Exploration Quiz</h2>
      <div data-quiz="space-quiz"></div>
    </div>

    <div class="deco-separator">✨ 🧠 ✨ 🧠 ✨</div>

    <!-- Dinosaur Quiz -->
    <div id="dinosaur-quiz" style="margin-top:3rem;scroll-margin-top:100px">
      <h2 style="margin-bottom:1.5rem">🦕 Dinosaur Quiz</h2>
      <div data-quiz="dinosaur-quiz"></div>
    </div>

  </div>
</section>

<!-- Single script load — handles ALL quizzes above automatically -->
<script src="/assets/js/quiz.js"></script>

<script>
function scrollToQuiz(id) {
  setTimeout(function() {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  }, 100);
  return false;
}
</script>
