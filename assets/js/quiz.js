/* =============================================================
   quiz.js  v3  –  Self-contained quiz engine
   • Injects its own CSS so no external stylesheet needed
   • Handles any number of [data-quiz] containers on the page
   • Fetches JSON from /quizzes/<slug>.json
   ============================================================= */

(function () {
  /* ── Inject styles once ─────────────────────────────────── */
  if (!document.getElementById('quiz-engine-styles')) {
    var s = document.createElement('style');
    s.id  = 'quiz-engine-styles';
    s.textContent = [
      '.qwrap{background:linear-gradient(135deg,#f0e8ff,#e8f4ff);border-radius:22px;padding:1.8rem;border:3px solid #a78bfa;position:relative;overflow:hidden}',
      '.qwrap::before{content:"🎯";position:absolute;font-size:7rem;opacity:.05;right:1rem;top:50%;transform:translateY(-50%);pointer-events:none}',
      '.qprog-row{display:flex;align-items:center;gap:1rem;margin-bottom:1.2rem;flex-wrap:wrap}',
      '.qscore{font-family:"Fredoka One",cursive;font-size:1.5rem;background:linear-gradient(135deg,#a78bfa,#ff6b9d);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;white-space:nowrap}',
      '.qbar-wrap{flex:1;height:12px;background:#d8d0f0;border-radius:50px;overflow:hidden;min-width:80px}',
      '.qbar-fill{height:100%;background:linear-gradient(90deg,#a78bfa,#ff6b9d);border-radius:50px;transition:width .5s ease}',
      '.qcounter{font-family:"Baloo 2",cursive;font-weight:700;font-size:.88rem;color:#6a7a8a;white-space:nowrap}',
      '.qquestion{font-family:"Baloo 2",cursive;font-weight:700;font-size:1.15rem;color:#1e3a5f;margin-bottom:1rem;display:flex;gap:.5rem;align-items:flex-start;line-height:1.45}',
      '.qopts{display:grid;grid-template-columns:1fr 1fr;gap:.65rem;margin-bottom:.9rem}',
      '@media(max-width:520px){.qopts{grid-template-columns:1fr}}',
      '.qopt{background:#fff;border:2.5px solid #e0d8f0;border-radius:14px;padding:.75rem 1rem;font-family:"Nunito",sans-serif;font-weight:700;font-size:.92rem;cursor:pointer;text-align:left;transition:all .15s;line-height:1.4}',
      '.qopt:hover:not(:disabled){border-color:#a78bfa;background:#f5f0ff;transform:scale(1.02)}',
      '.qopt.qcorrect{background:#edfff2!important;border-color:#6bcb77!important;color:#1a5c28!important}',
      '.qopt.qwrong{background:#fff0f0!important;border-color:#ff6b6b!important;color:#8b0000!important}',
      '.qfb{font-family:"Baloo 2",cursive;font-weight:700;font-size:.96rem;min-height:1.4em;color:#1e3a5f;border-radius:12px;padding:.4rem .6rem;transition:all .3s}',
      '.qfb.qfb-ok{background:#edfff2;border-left:4px solid #6bcb77}',
      '.qfb.qfb-no{background:#fff0f0;border-left:4px solid #ff6b6b}',
      '.qloading{text-align:center;padding:2rem;font-family:"Baloo 2",cursive;font-weight:700;color:#6a7a8a}',
      '.qerror{color:#c03030;font-weight:700;font-family:"Baloo 2",cursive;padding:1rem}',
      '.qrestart{margin-top:1rem;font-family:"Baloo 2",cursive;font-weight:700;font-size:1rem;padding:.7rem 1.8rem;border-radius:50px;border:none;background:linear-gradient(135deg,#ff6b9d,#a78bfa);color:#fff;cursor:pointer;transition:all .2s;box-shadow:0 4px 16px rgba(255,107,157,.35)}',
      '.qrestart:hover{transform:translateY(-3px);box-shadow:0 7px 22px rgba(255,107,157,.45)}'
    ].join('');
    document.head.appendChild(s);
  }

  /* ── Boot all quizzes on the page ───────────────────────── */
  function bootAll() {
    document.querySelectorAll('[data-quiz]').forEach(function (el) {
      initQuiz(el);
    });
  }

  /* ── Single quiz instance ───────────────────────────────── */
  async function initQuiz(root) {
    var slug = root.dataset.quiz;
    var uid  = 'qz_' + slug.replace(/-/g, '_');

    root.innerHTML = '<div class="qloading">⏳ Loading ' + slug + '…</div>';

    var data;
    try {
      var res = await fetch('/quizzes/' + slug + '.json');
      if (!res.ok) throw new Error(res.status);
      data = await res.json();
    } catch (e) {
      root.innerHTML = '<div class="qerror">⚠️ Could not load <strong>' + slug + '.json</strong>.<br>Make sure the file exists at <code>quizzes/' + slug + '.json</code></div>';
      return;
    }

    var qs       = data.questions;
    var qIdx     = 0;
    var score    = 0;
    var answered = false;

    function g(id) { return document.getElementById(uid + '_' + id); }

    function buildShell() {
      root.innerHTML =
        '<div class="qwrap">' +
          '<div class="qprog-row">' +
            '<span class="qscore" id="' + uid + '_score">Score: 0</span>' +
            '<div class="qbar-wrap"><div class="qbar-fill" id="' + uid + '_bar" style="width:0%"></div></div>' +
            '<span class="qcounter" id="' + uid + '_counter">Q 1 of ' + qs.length + '</span>' +
          '</div>' +
          '<div class="qquestion"><span>🤔</span><span id="' + uid + '_text"></span></div>' +
          '<div class="qopts" id="' + uid + '_opts"></div>' +
          '<div class="qfb" id="' + uid + '_fb"></div>' +
        '</div>';
    }

    function renderQ() {
      var q = qs[qIdx];
      g('text').textContent    = q.question;
      g('counter').textContent = 'Q ' + (qIdx + 1) + ' of ' + qs.length;
      g('bar').style.width     = (qIdx / qs.length * 100) + '%';
      g('fb').textContent      = '';
      g('fb').className        = 'qfb';

      var opts = g('opts');
      opts.innerHTML = '';
      q.options.forEach(function (opt, i) {
        var btn        = document.createElement('button');
        btn.className  = 'qopt';
        btn.textContent = opt;
        btn.addEventListener('click', function () { checkAnswer(i, btn, opts, q); });
        opts.appendChild(btn);
      });
      answered = false;
    }

    function checkAnswer(chosen, btn, opts, q) {
      if (answered) return;
      answered = true;

      var correctIdx = typeof q.answer === 'number'
        ? q.answer
        : q.options.indexOf(q.answer);

      opts.querySelectorAll('.qopt').forEach(function (b) { b.disabled = true; });

      var fb = g('fb');
      if (chosen === correctIdx) {
        btn.classList.add('qcorrect');
        score++;
        g('score').textContent = 'Score: ' + score;
        fb.textContent  = '🎉 Correct! ' + (q.explanation || '');
        fb.className    = 'qfb qfb-ok';
        if (typeof confettiBurst === 'function') confettiBurst(35);
      } else {
        btn.classList.add('qwrong');
        opts.querySelectorAll('.qopt')[correctIdx].classList.add('qcorrect');
        fb.textContent  = '❌ Not quite! ' + (q.explanation || '');
        fb.className    = 'qfb qfb-no';
      }

      setTimeout(function () {
        qIdx++;
        if (qIdx < qs.length) {
          renderQ();
        } else {
          showResult();
        }
      }, 2200);
    }

    function showResult() {
      var pct  = Math.round(score / qs.length * 100);
      var star = pct === 100 ? '🌟 PERFECT! You are a genius! 🌟'
               : pct >= 60  ? '🎉 Great job! Keep learning!'
               :               '📚 Good try! Play again to improve!';

      g('text').textContent  = 'You scored ' + score + '/' + qs.length + ' (' + pct + '%) 🏆';
      g('fb').textContent    = star;
      g('fb').className      = 'qfb' + (pct >= 60 ? ' qfb-ok' : ' qfb-no');
      g('bar').style.width   = '100%';
      g('counter').textContent = 'Done!';

      var opts = g('opts');
      opts.innerHTML = '';
      var rb = document.createElement('button');
      rb.className   = 'qrestart';
      rb.textContent = '🔄 Play Again!';
      rb.addEventListener('click', function () {
        qIdx = 0; score = 0;
        buildShell();
        renderQ();
      });
      opts.appendChild(rb);

      if (pct === 100 && typeof confettiBurst === 'function') confettiBurst(80);
    }

    buildShell();
    renderQ();
  }

  /* ── Run on DOM ready ───────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootAll);
  } else {
    bootAll();
  }
})();
