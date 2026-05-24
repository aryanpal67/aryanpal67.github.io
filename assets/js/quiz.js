/* =============================================================
   quiz.js  –  Quiz engine
   Reads JSON from quizzes/<slug>.json and renders the quiz.
   Usage: add data-quiz="animal-quiz" on a container element.
   ============================================================= */

(async function initQuiz() {
  const root = document.querySelector('[data-quiz]');
  if (!root) return;

  const slug = root.dataset.quiz;
  let data;

  try {
    const res  = await fetch(`/quizzes/${slug}.json`);
    if (!res.ok) throw new Error('Network error');
    data = await res.json();
  } catch (err) {
    root.innerHTML = '<p style="color:red;font-weight:700">⚠️ Could not load quiz. Please try again.</p>';
    return;
  }

  const questions = data.questions;
  let qIndex = 0, score = 0, answered = false;

  // Build DOM shell
  root.innerHTML = `
    <div class="quiz-wrapper">
      <div class="quiz-progress-row">
        <span class="quiz-score-badge" id="qz-score">Score: 0</span>
        <div class="progress-bar"><div class="progress-fill" id="qz-progress" style="width:0%"></div></div>
        <span class="quiz-counter" id="qz-counter">Q 1 of ${questions.length}</span>
      </div>
      <div class="quiz-question" id="qz-question"><span>🤔</span><span id="qz-text">Loading…</span></div>
      <div class="quiz-options" id="qz-options"></div>
      <div class="quiz-feedback" id="qz-feedback"></div>
    </div>
  `;

  function renderQuestion() {
    const q = questions[qIndex];
    document.getElementById('qz-text').textContent    = q.question;
    document.getElementById('qz-counter').textContent = `Q ${qIndex + 1} of ${questions.length}`;
    document.getElementById('qz-progress').style.width = `${(qIndex / questions.length) * 100}%`;
    document.getElementById('qz-feedback').textContent = '';

    const opts = document.getElementById('qz-options');
    opts.innerHTML = '';
    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className   = 'quiz-option';
      btn.textContent = opt;
      btn.addEventListener('click', () => handleAnswer(i, btn));
      opts.appendChild(btn);
    });
    answered = false;
  }

  function handleAnswer(chosen, btn) {
    if (answered) return;
    answered = true;

    const q    = questions[qIndex];
    const correct = typeof q.answer === 'number' ? q.answer : q.options.indexOf(q.answer);

    document.querySelectorAll('.quiz-option').forEach(b => (b.disabled = true));

    if (chosen === correct) {
      btn.classList.add('correct');
      score++;
      document.getElementById('qz-score').textContent = `Score: ${score}`;
      document.getElementById('qz-feedback').textContent = '🎉 Correct! ' + (q.explanation || '');
      if (typeof confettiBurst === 'function') confettiBurst(40);
    } else {
      btn.classList.add('wrong');
      document.querySelectorAll('.quiz-option')[correct].classList.add('correct');
      document.getElementById('qz-feedback').textContent = '❌ Not quite! ' + (q.explanation || '');
    }

    setTimeout(() => {
      qIndex++;
      if (qIndex < questions.length) {
        renderQuestion();
      } else {
        showResult();
      }
    }, 2200);
  }

  function showResult() {
    const pct = Math.round((score / questions.length) * 100);
    const msg = pct === 100
      ? '🌟 PERFECT SCORE! You are a GENIUS! 🌟'
      : pct >= 60
        ? '🎉 Great job! Keep learning!'
        : '📚 Good try! Practice makes perfect!';

    document.getElementById('qz-text').textContent        = `You scored ${score}/${questions.length}! (${pct}%) 🏆`;
    document.getElementById('qz-feedback').textContent    = msg;
    document.getElementById('qz-progress').style.width    = '100%';
    document.getElementById('qz-options').innerHTML       = `
      <button class="btn btn-primary" onclick="location.reload()" style="grid-column:1/-1">
        🔄 Play Again!
      </button>`;

    if (pct === 100 && typeof confettiBurst === 'function') confettiBurst(80);
  }

  renderQuestion();
})();
