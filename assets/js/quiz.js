/* =============================================================
   quiz.js  –  Quiz engine  v2
   Supports MULTIPLE quizzes on the same page.
   Each [data-quiz] container is fully independent.
   ============================================================= */

async function loadQuiz(root) {
  const slug = root.dataset.quiz;

  // Unique prefix per container so IDs never clash
  const uid = 'qz-' + slug;

  // Loading state
  root.innerHTML = `<div class="quiz-wrapper" style="text-align:center;padding:2rem">
    <span style="font-size:2rem">⏳</span>
    <p style="font-family:'Baloo 2',cursive;font-weight:700;margin-top:.5rem">Loading quiz…</p>
  </div>`;

  let data;
  try {
    const res = await fetch('/quizzes/' + slug + '.json');
    if (!res.ok) throw new Error('Not found');
    data = await res.json();
  } catch (err) {
    root.innerHTML = '<div class="quiz-wrapper"><p style="color:#c03030;font-weight:700;font-family:\'Baloo 2\',cursive">⚠️ Could not load quiz <strong>' + slug + '</strong>. Make sure quizzes/' + slug + '.json exists.</p></div>';
    return;
  }

  const questions = data.questions;
  let qIndex = 0, score = 0, answered = false;

  // Build DOM — all IDs namespaced with uid so multiple quizzes never clash
  root.innerHTML =
    '<div class="quiz-wrapper">' +
      '<div class="quiz-progress-row">' +
        '<span class="quiz-score-badge" id="' + uid + '-score">Score: 0</span>' +
        '<div class="progress-bar"><div class="progress-fill" id="' + uid + '-progress" style="width:0%"></div></div>' +
        '<span class="quiz-counter" id="' + uid + '-counter">Q 1 of ' + questions.length + '</span>' +
      '</div>' +
      '<div class="quiz-question"><span>🤔</span><span id="' + uid + '-text">Loading…</span></div>' +
      '<div class="quiz-options" id="' + uid + '-options"></div>' +
      '<div class="quiz-feedback" id="' + uid + '-feedback"></div>' +
    '</div>';

  function get(id) { return document.getElementById(uid + '-' + id); }

  function renderQuestion() {
    const q = questions[qIndex];
    get('text').textContent     = q.question;
    get('counter').textContent  = 'Q ' + (qIndex + 1) + ' of ' + questions.length;
    get('progress').style.width = ((qIndex / questions.length) * 100) + '%';
    get('feedback').textContent = '';

    const opts = get('options');
    opts.innerHTML = '';
    q.options.forEach(function(opt, i) {
      const btn = document.createElement('button');
      btn.className   = 'quiz-option';
      btn.textContent = opt;
      btn.addEventListener('click', function() { handleAnswer(i, btn, opts); });
      opts.appendChild(btn);
    });
    answered = false;
  }

  function handleAnswer(chosen, btn, opts) {
    if (answered) return;
    answered = true;

    const q = questions[qIndex];
    const correct = typeof q.answer === 'number'
      ? q.answer
      : q.options.indexOf(q.answer);

    opts.querySelectorAll('.quiz-option').forEach(function(b) { b.disabled = true; });

    if (chosen === correct) {
      btn.classList.add('correct');
      score++;
      get('score').textContent    = 'Score: ' + score;
      get('feedback').textContent = '🎉 Correct! ' + (q.explanation || '');
      if (typeof confettiBurst === 'function') confettiBurst(40);
    } else {
      btn.classList.add('wrong');
      opts.querySelectorAll('.quiz-option')[correct].classList.add('correct');
      get('feedback').textContent = '❌ Not quite! ' + (q.explanation || '');
    }

    setTimeout(function() {
      qIndex++;
      if (qIndex < questions.length) { renderQuestion(); } else { showResult(); }
    }, 2200);
  }

  function showResult() {
    const pct = Math.round((score / questions.length) * 100);
    const msg = pct === 100
      ? '🌟 PERFECT SCORE! You are a GENIUS! 🌟'
      : pct >= 60 ? '🎉 Great job! Keep learning!' : '📚 Good try! Practice makes perfect!';

    get('text').textContent     = 'You scored ' + score + '/' + questions.length + '! (' + pct + '%) 🏆';
    get('feedback').textContent = msg;
    get('progress').style.width = '100%';
    get('options').innerHTML    =
      '<button class="btn btn-primary" onclick="loadQuiz(this.closest(\'[data-quiz]\'))" style="grid-column:1/-1">🔄 Play Again!</button>';

    if (pct === 100 && typeof confettiBurst === 'function') confettiBurst(80);
  }

  renderQuestion();
}

// Auto-init every [data-quiz] on the page — works for 1, 2, or 10 quizzes
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('[data-quiz]').forEach(function(el) { loadQuiz(el); });
});
