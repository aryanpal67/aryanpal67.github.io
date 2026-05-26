---
layout: layouts/base.html
title: "Quizzes"
description: "Take 15 fun quizzes about animals, space, science and more!"
---

<style>
/* ── Quiz nav grid ── */
.qnav { display:grid; grid-template-columns:repeat(auto-fill,minmax(140px,1fr)); gap:1rem; margin-bottom:2.5rem; }
.qcard {
  display:flex; flex-direction:column; align-items:center; text-align:center;
  padding:1.2rem 0.8rem; border-radius:18px; border:3px solid #d0c8f0;
  background:#fff; text-decoration:none; color:#1e3a5f;
  box-shadow:0 4px 14px rgba(0,0,0,0.07);
  transition:transform 0.25s cubic-bezier(.34,1.56,.64,1), box-shadow 0.25s;
  gap:0.35rem;
}
.qcard:hover { transform:translateY(-7px) scale(1.04); box-shadow:0 14px 32px rgba(0,0,0,0.12); }
.qcard:nth-child(1)  { border-color:#6ec6f0; background:linear-gradient(135deg,#f0f9ff,#fff); }
.qcard:nth-child(2)  { border-color:#a78bfa; background:linear-gradient(135deg,#f5f0ff,#fff); }
.qcard:nth-child(3)  { border-color:#6bcb77; background:linear-gradient(135deg,#f0fff4,#fff); }
.qcard:nth-child(4)  { border-color:#ff6b9d; background:linear-gradient(135deg,#fff5f9,#fff); }
.qcard:nth-child(5)  { border-color:#4cc9b0; background:linear-gradient(135deg,#f0fffc,#fff); }
.qcard:nth-child(6)  { border-color:#ffd93d; background:linear-gradient(135deg,#fffdf0,#fff); }
.qcard:nth-child(7)  { border-color:#ff6b6b; background:linear-gradient(135deg,#fff5f5,#fff); }
.qcard:nth-child(8)  { border-color:#6bcb77; background:linear-gradient(135deg,#f0fff4,#fff); }
.qcard:nth-child(9)  { border-color:#a78bfa; background:linear-gradient(135deg,#f5f0ff,#fff); }
.qcard:nth-child(10) { border-color:#6ec6f0; background:linear-gradient(135deg,#f0f9ff,#fff); }
.qcard:nth-child(11) { border-color:#ffd93d; background:linear-gradient(135deg,#fffdf0,#fff); }
.qcard:nth-child(12) { border-color:#ff6b6b; background:linear-gradient(135deg,#fff5f5,#fff); }
.qcard:nth-child(13) { border-color:#6bcb77; background:linear-gradient(135deg,#f0fff4,#fff); }
.qcard:nth-child(14) { border-color:#a78bfa; background:linear-gradient(135deg,#f5f0ff,#fff); }
.qcard:nth-child(15) { border-color:#ff6b9d; background:linear-gradient(135deg,#fff5f9,#fff); }
.qcard:nth-child(16) { border-color:#ffd93d; background:linear-gradient(135deg,#fffdf0,#fff); }
.qcard-em  { font-size:2.4rem; line-height:1; }
.qcard-ttl { font-family:'Baloo 2',cursive; font-weight:700; font-size:0.88rem; color:#1e3a5f; }
.qcard-sub { font-size:0.72rem; font-weight:600; color:#8a96a3; }

/* ── Quiz wrapper ── */
.quiz-wrap {
  background:linear-gradient(135deg,#f0e8ff,#e8f4ff);
  border-radius:24px; padding:2rem;
  border:3px solid #a78bfa;
  margin-bottom:2rem;
}
.quiz-prog-row { display:flex; align-items:center; gap:1rem; margin-bottom:1.2rem; flex-wrap:wrap; }
.quiz-score-b { font-family:'Fredoka One',cursive; font-size:1.6rem; background:linear-gradient(135deg,#a78bfa,#ff6b9d); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; white-space:nowrap; }
.quiz-bar { flex:1; height:12px; background:#d8d0f0; border-radius:50px; overflow:hidden; min-width:80px; }
.quiz-bar-fill { height:100%; background:linear-gradient(90deg,#a78bfa,#ff6b9d); border-radius:50px; transition:width 0.5s ease; }
.quiz-counter { font-family:'Baloo 2',cursive; font-weight:700; font-size:0.88rem; color:#6a7a8a; white-space:nowrap; }
.quiz-q { font-family:'Baloo 2',cursive; font-weight:700; font-size:1.2rem; color:#1e3a5f; margin-bottom:1rem; display:flex; gap:0.5rem; }
.quiz-opts { display:grid; grid-template-columns:1fr 1fr; gap:0.65rem; margin-bottom:1rem; }
@media(max-width:520px){ .quiz-opts{grid-template-columns:1fr;} }
.quiz-opt { background:#fff; border:2.5px solid #e0d8f0; border-radius:14px; padding:0.8rem 1rem; font-family:'Nunito',sans-serif; font-weight:700; font-size:0.92rem; cursor:pointer; text-align:left; transition:all 0.15s; }
.quiz-opt:hover:not(:disabled){ border-color:#a78bfa; background:#f5f0ff; transform:scale(1.02); }
.quiz-opt.correct{ background:#edfff2!important; border-color:#6bcb77!important; color:#1a5c28!important; }
.quiz-opt.wrong  { background:#fff0f0!important; border-color:#ff6b6b!important; color:#8b0000!important; }
.quiz-fb { font-family:'Baloo 2',cursive; font-weight:700; font-size:0.98rem; min-height:1.4em; color:#1e3a5f; }

.deco-sep { text-align:center; letter-spacing:1rem; opacity:.22; font-size:1.2rem; padding:0.5rem 0; user-select:none; }
.q-section { scroll-margin-top:90px; margin-top:2.5rem; }
.q-section h2 { font-family:'Fredoka One',cursive; font-size:1.8rem; color:#1e3a5f; margin-bottom:1.2rem; }
</style>

<div class="page-hero page-hero-quizzes">
  <h1>🧠 My Quizzes</h1>
  <p>16 awesome quizzes! Test your knowledge and see if you can get 100%! 🎯</p>
</div>

<section class="section reveal">
  <div class="container">

    <div class="qnav">
      <a href="#q-animal"      class="qcard"><span class="qcard-em">🐾</span><span class="qcard-ttl">Animal Quiz</span><span class="qcard-sub">Amazing animals!</span></a>
      <a href="#q-space"       class="qcard"><span class="qcard-em">🚀</span><span class="qcard-ttl">Space Quiz</span><span class="qcard-sub">Explore stars!</span></a>
      <a href="#q-dino"        class="qcard"><span class="qcard-em">🦕</span><span class="qcard-ttl">Dinosaur Quiz</span><span class="qcard-sub">Roar!</span></a>
      <a href="#q-body"        class="qcard"><span class="qcard-em">🫀</span><span class="qcard-ttl">Human Body</span><span class="qcard-sub">Know your body!</span></a>
      <a href="#q-ocean"       class="qcard"><span class="qcard-em">🐠</span><span class="qcard-ttl">Ocean Quiz</span><span class="qcard-sub">Deep sea!</span></a>
      <a href="#q-india"       class="qcard"><span class="qcard-em">🇮🇳</span><span class="qcard-ttl">Amazing India</span><span class="qcard-sub">Your country!</span></a>
      <a href="#q-weather"     class="qcard"><span class="qcard-em">🌈</span><span class="qcard-ttl">Weather Quiz</span><span class="qcard-sub">Rain or shine!</span></a>
      <a href="#q-food"        class="qcard"><span class="qcard-em">🍎</span><span class="qcard-ttl">Food Quiz</span><span class="qcard-sub">Yummy facts!</span></a>
      <a href="#q-geo"         class="qcard"><span class="qcard-em">🌍</span><span class="qcard-ttl">Geography</span><span class="qcard-sub">World explorer!</span></a>
      <a href="#q-science"     class="qcard"><span class="qcard-em">🔬</span><span class="qcard-ttl">Science Quiz</span><span class="qcard-sub">Cool science!</span></a>
      <a href="#q-maths"       class="qcard"><span class="qcard-em">🔢</span><span class="qcard-ttl">Maths Quiz</span><span class="qcard-sub">Number fun!</span></a>
      <a href="#q-history"     class="qcard"><span class="qcard-em">🏺</span><span class="qcard-ttl">History Quiz</span><span class="qcard-sub">Back in time!</span></a>
      <a href="#q-sports"      class="qcard"><span class="qcard-em">⚽</span><span class="qcard-ttl">Sports Quiz</span><span class="qcard-sub">Game on!</span></a>
      <a href="#q-tech"        class="qcard"><span class="qcard-em">💻</span><span class="qcard-ttl">Tech Quiz</span><span class="qcard-sub">Digital world!</span></a>
      <a href="#q-superheroes" class="qcard"><span class="qcard-em">🦸</span><span class="qcard-ttl">Superheroes</span><span class="qcard-sub">Who's your hero?</span></a>
      <a href="#q-brain"       class="qcard"><span class="qcard-em">🤯</span><span class="qcard-ttl">Brain Teasers</span><span class="qcard-sub">Emoji puzzles!</span></a>
    </div>

    <div class="deco-sep">✨ 🧠 ✨ 🧠 ✨</div>
    <div id="q-animal"      class="q-section"><h2>🐾 Animal Knowledge Quiz</h2><div data-quiz="animal-quiz"></div></div>
    <div class="deco-sep">✨ 🧠 ✨ 🧠 ✨</div>
    <div id="q-space"       class="q-section"><h2>🚀 Space Exploration Quiz</h2><div data-quiz="space-quiz"></div></div>
    <div class="deco-sep">✨ 🧠 ✨ 🧠 ✨</div>
    <div id="q-dino"        class="q-section"><h2>🦕 Dinosaur Quiz</h2><div data-quiz="dinosaur-quiz"></div></div>
    <div class="deco-sep">✨ 🧠 ✨ 🧠 ✨</div>
    <div id="q-body"        class="q-section"><h2>🫀 Human Body Quiz</h2><div data-quiz="human-body-quiz"></div></div>
    <div class="deco-sep">✨ 🧠 ✨ 🧠 ✨</div>
    <div id="q-ocean"       class="q-section"><h2>🐠 Ocean & Sea Life Quiz</h2><div data-quiz="ocean-quiz"></div></div>
    <div class="deco-sep">✨ 🧠 ✨ 🧠 ✨</div>
    <div id="q-india"       class="q-section"><h2>🇮🇳 Amazing India Quiz</h2><div data-quiz="india-quiz"></div></div>
    <div class="deco-sep">✨ 🧠 ✨ 🧠 ✨</div>
    <div id="q-weather"     class="q-section"><h2>🌈 Weather & Nature Quiz</h2><div data-quiz="weather-quiz"></div></div>
    <div class="deco-sep">✨ 🧠 ✨ 🧠 ✨</div>
    <div id="q-food"        class="q-section"><h2>🍎 Food & Nutrition Quiz</h2><div data-quiz="food-quiz"></div></div>
    <div class="deco-sep">✨ 🧠 ✨ 🧠 ✨</div>
    <div id="q-geo"         class="q-section"><h2>🌍 World Geography Quiz</h2><div data-quiz="geography-quiz"></div></div>
    <div class="deco-sep">✨ 🧠 ✨ 🧠 ✨</div>
    <div id="q-science"     class="q-section"><h2>🔬 Cool Science Quiz</h2><div data-quiz="science-quiz"></div></div>
    <div class="deco-sep">✨ 🧠 ✨ 🧠 ✨</div>
    <div id="q-maths"       class="q-section"><h2>🔢 Fun Maths Quiz</h2><div data-quiz="maths-quiz"></div></div>
    <div class="deco-sep">✨ 🧠 ✨ 🧠 ✨</div>
    <div id="q-history"     class="q-section"><h2>🏺 World History Quiz</h2><div data-quiz="history-quiz"></div></div>
    <div class="deco-sep">✨ 🧠 ✨ 🧠 ✨</div>
    <div id="q-sports"      class="q-section"><h2>⚽ Sports Quiz</h2><div data-quiz="sports-quiz"></div></div>
    <div class="deco-sep">✨ 🧠 ✨ 🧠 ✨</div>
    <div id="q-tech"        class="q-section"><h2>💻 Technology Quiz</h2><div data-quiz="tech-quiz"></div></div>
    <div class="deco-sep">✨ 🧠 ✨ 🧠 ✨</div>
    <div id="q-superheroes" class="q-section"><h2>🦸 Superheroes Quiz</h2><div data-quiz="superheroes-quiz"></div></div>
    <div class="deco-sep">✨ 🧠 ✨ 🧠 ✨</div>
    <div id="q-brain"       class="q-section"><h2>🤯 Brain Teaser Quiz</h2><div data-quiz="brain-teaser-quiz"></div></div>

  </div>
</section>

<script src="/assets/js/quiz.js"></script>
