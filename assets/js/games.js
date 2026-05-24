/* =============================================================
   games.js  –  6 Complete Game Engines
   1. Memory Card Game   (4x4 grid, timer, move counter)
   2. Snake Game         (canvas, D-pad, levels)
   3. Word Scramble      (30 words, hints, score)
   4. Reaction Speed     (5 rounds, best/average)
   5. Math Blaster       (60s timer, difficulty scaling)
   6. Colour Match       (Stroop effect, lives system)
   ============================================================= */

document.addEventListener('DOMContentLoaded', function () {

  function el(id) { return document.getElementById(id); }
  function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

  /* ══════════════════════════════════════════════════════════
     1. MEMORY CARD GAME
  ══════════════════════════════════════════════════════════ */
  (function initMemory() {
    var grid = el('mem-grid');
    if (!grid) return;

    var EMOJIS = ['🐉','🦄','🚀','🌈','🦊','🎨','⭐','🌸'];
    var cards = [], flipped = [], matched = 0, moves = 0, canFlip = true;
    var timerInterval = null, seconds = 0;

    function startTimer() {
      clearInterval(timerInterval);
      seconds = 0;
      timerInterval = setInterval(function() {
        seconds++;
        el('mem-time').textContent = '⏱️ Time: ' + seconds + 's';
      }, 1000);
    }

    function stopTimer() { clearInterval(timerInterval); }

    function init() {
      cards = shuffle([...EMOJIS, ...EMOJIS]);
      flipped = []; matched = 0; moves = 0; canFlip = true;
      el('mem-moves').textContent   = '🎯 Moves: 0';
      el('mem-pairs').textContent   = '✅ Pairs: 0/8';
      el('mem-time').textContent    = '⏱️ Time: 0s';
      el('mem-feedback').textContent = '';
      stopTimer();
      render();
    }

    function render() {
      grid.innerHTML = '';
      cards.forEach(function(emoji, idx) {
        var card = document.createElement('div');
        card.className = 'mem-card';
        card.dataset.idx = idx;
        card.innerHTML = '<span class="mem-front">' + emoji + '</span><span class="mem-back">❓</span>';
        card.addEventListener('click', function() { flipCard(card, idx); });
        grid.appendChild(card);
      });
    }

    function flipCard(card, idx) {
      if (!canFlip) return;
      if (card.classList.contains('mem-flipped') || card.classList.contains('mem-matched')) return;
      if (flipped.length === 0) startTimer();
      card.classList.add('mem-flipped');
      flipped.push({ card: card, emoji: cards[idx] });
      if (flipped.length === 2) {
        canFlip = false;
        moves++;
        el('mem-moves').textContent = '🎯 Moves: ' + moves;
        setTimeout(checkMatch, 700);
      }
    }

    function checkMatch() {
      if (flipped[0].emoji === flipped[1].emoji) {
        flipped.forEach(function(f) { f.card.classList.add('mem-matched'); f.card.classList.remove('mem-flipped'); });
        matched++;
        el('mem-pairs').textContent = '✅ Pairs: ' + matched + '/8';
        if (matched === 8) {
          stopTimer();
          el('mem-feedback').innerHTML = '🎉 You matched all pairs in <strong>' + moves + ' moves</strong> and <strong>' + seconds + ' seconds</strong>! Amazing!';
          el('mem-feedback').className = 'game-feedback game-win';
          if (typeof confettiBurst === 'function') confettiBurst(80);
        }
      } else {
        flipped.forEach(function(f) { f.card.classList.remove('mem-flipped'); });
      }
      flipped = [];
      canFlip = true;
    }

    el('mem-reset').addEventListener('click', init);
    init();
  })();

  /* ══════════════════════════════════════════════════════════
     2. SNAKE GAME
  ══════════════════════════════════════════════════════════ */
  (function initSnake() {
    var canvas = el('snake-canvas');
    if (!canvas) return;
    var ctx      = canvas.getContext('2d');
    var overlay  = el('snake-overlay');
    var startBtn = el('snake-start-btn');
    var CELL = 20, COLS = 16, ROWS = 16;
    var snake, dir, nextDir, food, score, bestScore = 0, level, speed, gameLoop, running = false;

    var COLORS = {
      bg:      '#f5f0ff',
      grid:    '#ede8f8',
      head:    '#a78bfa',
      body:    '#c4b5fd',
      food:    '#ff6b9d',
      text:    '#1e3a5f'
    };

    function drawGrid() {
      ctx.fillStyle = COLORS.bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = COLORS.grid;
      ctx.lineWidth = 0.5;
      for (var x = 0; x <= COLS; x++) { ctx.beginPath(); ctx.moveTo(x*CELL,0); ctx.lineTo(x*CELL,ROWS*CELL); ctx.stroke(); }
      for (var y = 0; y <= ROWS; y++) { ctx.beginPath(); ctx.moveTo(0,y*CELL); ctx.lineTo(COLS*CELL,y*CELL); ctx.stroke(); }
    }

    function drawRoundRect(x, y, w, h, r, color) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(x+r, y);
      ctx.lineTo(x+w-r, y); ctx.arcTo(x+w, y, x+w, y+r, r);
      ctx.lineTo(x+w, y+h-r); ctx.arcTo(x+w, y+h, x+w-r, y+h, r);
      ctx.lineTo(x+r, y+h); ctx.arcTo(x, y+h, x, y+h-r, r);
      ctx.lineTo(x, y+r); ctx.arcTo(x, y, x+r, y, r);
      ctx.closePath();
      ctx.fill();
    }

    function draw() {
      drawGrid();
      // food
      ctx.font = (CELL-2) + 'px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🍎', food.x * CELL + CELL/2, food.y * CELL + CELL/2);
      // snake body
      snake.forEach(function(seg, i) {
        var color = i === 0 ? COLORS.head : COLORS.body;
        drawRoundRect(seg.x*CELL+1, seg.y*CELL+1, CELL-2, CELL-2, 5, color);
        if (i === 0) {
          ctx.font = Math.round(CELL*0.55) + 'px serif';
          ctx.fillText('👀', seg.x*CELL + CELL/2, seg.y*CELL + CELL/2);
        }
      });
    }

    function placeFood() {
      var empty;
      do {
        empty = { x: Math.floor(Math.random()*COLS), y: Math.floor(Math.random()*ROWS) };
      } while (snake.some(function(s) { return s.x === empty.x && s.y === empty.y; }));
      food = empty;
    }

    function startGame() {
      snake   = [{x:8,y:8},{x:7,y:8},{x:6,y:8}];
      dir     = {x:1,y:0};
      nextDir = {x:1,y:0};
      score   = 0; level = 1; speed = 180;
      el('snake-score').textContent = '🍎 Score: 0';
      el('snake-level').textContent = '⚡ Level: 1';
      overlay.style.display = 'none';
      running = true;
      placeFood();
      clearInterval(gameLoop);
      gameLoop = setInterval(tick, speed);
    }

    function tick() {
      dir = { x: nextDir.x, y: nextDir.y };
      var head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
      // wall collision
      if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) { gameOver(); return; }
      // self collision
      if (snake.some(function(s) { return s.x === head.x && s.y === head.y; })) { gameOver(); return; }

      snake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        score++;
        el('snake-score').textContent = '🍎 Score: ' + score;
        if (score > bestScore) { bestScore = score; el('snake-best').textContent = '🏆 Best: ' + bestScore; }
        // level up every 5 apples
        if (score % 5 === 0) {
          level++;
          speed = Math.max(80, speed - 20);
          el('snake-level').textContent = '⚡ Level: ' + level;
          clearInterval(gameLoop);
          gameLoop = setInterval(tick, speed);
        }
        placeFood();
      } else {
        snake.pop();
      }
      draw();
    }

    function gameOver() {
      clearInterval(gameLoop);
      running = false;
      overlay.style.display = 'flex';
      el('snake-overlay-msg').textContent = 'Game Over! Score: ' + score + ' 🐍';
      startBtn.textContent = '🔄 Play Again';
    }

    // keyboard
    document.addEventListener('keydown', function(e) {
      if (!running) return;
      var map = { ArrowUp:{x:0,y:-1}, ArrowDown:{x:0,y:1}, ArrowLeft:{x:-1,y:0}, ArrowRight:{x:1,y:0} };
      if (map[e.key]) {
        var d = map[e.key];
        if (d.x !== -dir.x || d.y !== -dir.y) nextDir = d;
        e.preventDefault();
      }
    });

    // d-pad buttons
    document.querySelectorAll('.dpad-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        if (!running) return;
        var map = { UP:{x:0,y:-1}, DOWN:{x:0,y:1}, LEFT:{x:-1,y:0}, RIGHT:{x:1,y:0} };
        var d = map[btn.dataset.dir];
        if (d && (d.x !== -dir.x || d.y !== -dir.y)) nextDir = d;
      });
    });

    startBtn.addEventListener('click', startGame);

    // initial draw
    drawGrid();
    ctx.font = '28px serif';
    ctx.textAlign = 'center';
    ctx.fillText('🐍', canvas.width/2, canvas.height/2);
  })();

  /* ══════════════════════════════════════════════════════════
     3. WORD SCRAMBLE
  ══════════════════════════════════════════════════════════ */
  (function initScramble() {
    var root = el('scramble-box');
    if (!root) return;

    var words = [
      {w:'ELEPHANT', h:'🐘 Biggest land animal', c:'Animals'},
      {w:'RAINBOW',  h:'🌈 Appears after rain',  c:'Nature'},
      {w:'ROCKET',   h:'🚀 Goes to space',        c:'Space'},
      {w:'DRAGON',   h:'🐉 Mythical fire beast',  c:'Fantasy'},
      {w:'BUTTERFLY',h:'🦋 Beautiful flying insect', c:'Insects'},
      {w:'DINOSAUR', h:'🦕 Ancient giant reptile', c:'Dinos'},
      {w:'VOLCANO',  h:'🌋 Erupts with lava',     c:'Nature'},
      {w:'DOLPHIN',  h:'🐬 Smart ocean mammal',   c:'Animals'},
      {w:'TREASURE', h:'💎 Hidden riches',         c:'Adventure'},
      {w:'PENGUIN',  h:'🐧 Black-white ice bird', c:'Animals'},
      {w:'LIGHTNING',h:'⚡ Bright flash in storm', c:'Weather'},
      {w:'ASTRONAUT',h:'👨‍🚀 Person who goes to space', c:'Space'},
      {w:'PYRAMID',  h:'🔺 Ancient Egyptian structure', c:'History'},
      {w:'CROCODILE',h:'🐊 Long-jawed reptile',   c:'Animals'},
      {w:'UMBRELLA', h:'☂️ Keeps you dry in rain', c:'Objects'},
    ];

    var chosen = shuffle(words).slice(0, 8);
    var idx = 0, score = 0, hintsLeft = 3;

    function scrambleWord(word) {
      var arr = word.split('');
      do { arr = shuffle(arr); } while (arr.join('') === word);
      return arr.join('');
    }

    function render() {
      if (idx >= chosen.length) { showFinal(); return; }
      var item = chosen[idx];
      var scrambled = scrambleWord(item.w);

      root.innerHTML =
        '<div class="scramble-card">' +
          '<div class="game-stats-row">' +
            '<span class="game-stat">📝 Word ' + (idx+1) + '/' + chosen.length + '</span>' +
            '<span class="game-stat">⭐ Score: ' + score + '</span>' +
            '<span class="game-stat">💡 Hints: ' + hintsLeft + '</span>' +
          '</div>' +
          '<div class="scramble-category">📂 Category: <strong>' + item.c + '</strong></div>' +
          '<div class="scramble-letters">' +
            scrambled.split('').map(function(l) {
              return '<span class="scramble-letter">' + l + '</span>';
            }).join('') +
          '</div>' +
          '<div class="scramble-blanks" id="sc-blanks">' +
            item.w.split('').map(function() { return '<span class="sc-blank">_</span>'; }).join('') +
          '</div>' +
          '<div class="riddle-input-row">' +
            '<input type="text" id="sc-input" placeholder="Type the word…" autocomplete="off" maxlength="' + (item.w.length + 2) + '" />' +
            '<button class="btn btn-primary" id="sc-submit">✅ Check</button>' +
          '</div>' +
          '<div class="scramble-hint-row">' +
            '<button class="btn-hint" id="sc-hint"' + (hintsLeft===0?' disabled style="opacity:0.5"':'') + '>💡 Hint (' + hintsLeft + ' left)</button>' +
          '</div>' +
          '<div id="sc-feedback" class="riddle-feedback"></div>' +
        '</div>';

      // live preview
      el('sc-input').addEventListener('input', function() {
        var val = this.value.toUpperCase();
        var blanks = el('sc-blanks').querySelectorAll('.sc-blank');
        blanks.forEach(function(b, i) { b.textContent = val[i] || '_'; });
      });

      el('sc-submit').addEventListener('click', checkScramble);
      el('sc-input').addEventListener('keydown', function(e) { if (e.key==='Enter') checkScramble(); });

      el('sc-hint').addEventListener('click', function() {
        if (hintsLeft <= 0) return;
        hintsLeft--;
        el('sc-feedback').innerHTML = '💡 Hint: ' + item.h;
        el('sc-feedback').className = 'riddle-feedback';
        el('sc-hint').textContent = '💡 Hint (' + hintsLeft + ' left)';
        if (hintsLeft === 0) el('sc-hint').disabled = true;
      });
    }

    function checkScramble() {
      var val = el('sc-input').value.trim().toUpperCase();
      var item = chosen[idx];
      var fb   = el('sc-feedback');
      if (!val) { fb.textContent = '✏️ Type the word first!'; return; }
      el('sc-submit').disabled = true;
      el('sc-input').disabled  = true;
      if (val === item.w) {
        score++;
        fb.innerHTML = '🎉 Correct! The word is <strong>' + item.w + '</strong>!';
        fb.className = 'riddle-feedback correct';
        if (typeof confettiBurst === 'function') confettiBurst(30);
      } else {
        fb.innerHTML = '❌ The word was <strong>' + item.w + '</strong>.';
        fb.className = 'riddle-feedback wrong';
      }
      setTimeout(function() { idx++; render(); }, 2000);
    }

    function showFinal() {
      root.innerHTML =
        '<div class="scramble-card" style="text-align:center">' +
          '<div style="font-size:3rem">🔤</div>' +
          '<h3 style="font-family:\'Fredoka One\',cursive;font-size:1.8rem;color:var(--color-navy)">Word Score: ' + score + '/' + chosen.length + '!</h3>' +
          '<p style="font-weight:600;color:#6a7a8a;margin:0.5rem 0 1.5rem">' +
            (score===chosen.length ? '🌟 Perfect! Word wizard!' : '📚 Good try! Play again to improve!') +
          '</p>' +
          '<button class="btn btn-primary" id="sc-restart">🔄 Play Again</button>' +
        '</div>';
      el('sc-restart').addEventListener('click', function() {
        chosen = shuffle(words).slice(0, 8);
        idx = 0; score = 0; hintsLeft = 3;
        render();
      });
      if (score === chosen.length && typeof confettiBurst === 'function') confettiBurst(80);
    }

    var words_ref = words; // keep reference for restart
    render();
  })();

  /* ══════════════════════════════════════════════════════════
     4. REACTION SPEED TEST
  ══════════════════════════════════════════════════════════ */
  (function initReaction() {
    var pad   = el('react-pad');
    var label = el('react-label');
    if (!pad) return;

    var STATE = { IDLE:'idle', WAITING:'waiting', READY:'ready', EARLY:'early' };
    var state = STATE.IDLE;
    var times = [], timer = null, startTime = null;
    var MAX_ROUNDS = 5;

    function setState(s) {
      state = s;
      pad.className = 'react-pad react-' + s;
      if (s === STATE.IDLE)    label.textContent = 'TAP TO START';
      if (s === STATE.WAITING) label.textContent = 'Wait for GREEN...';
      if (s === STATE.READY)   label.textContent = 'TAP NOW! 🟢';
      if (s === STATE.EARLY)   label.textContent = 'Too early! ❌ Tap to try again';
    }

    function updateStats() {
      el('react-rounds').textContent = '🎯 Round: ' + times.length + '/' + MAX_ROUNDS;
      if (times.length > 0) {
        var best = Math.min.apply(null, times);
        var avg  = Math.round(times.reduce(function(a,b){return a+b;},0) / times.length);
        el('react-best').textContent = '🏆 Best: ' + best + 'ms';
        el('react-avg').textContent  = '📊 Avg: ' + avg + 'ms';
      }
    }

    function showHistory() {
      var hist = el('react-history');
      hist.innerHTML = times.map(function(t, i) {
        var color = t < 200 ? '#6bcb77' : t < 350 ? '#ffd93d' : '#ff6b6b';
        return '<span class="react-time-badge" style="background:' + color + '">' + (i+1) + ': ' + t + 'ms</span>';
      }).join('');
    }

    function showResult() {
      var best = Math.min.apply(null, times);
      var avg  = Math.round(times.reduce(function(a,b){return a+b;},0) / times.length);
      var rating = best < 200 ? '⚡ Lightning fast!' : best < 350 ? '🎯 Great reflexes!' : '🌱 Keep practising!';
      var hist = el('react-history');
      hist.innerHTML +=
        '<div class="react-final">' +
          '<strong>' + rating + '</strong> Best: ' + best + 'ms | Avg: ' + avg + 'ms' +
          '<button class="btn btn-secondary" id="react-restart" style="margin-left:1rem;font-size:0.85rem;padding:0.4rem 1rem">🔄 Retry</button>' +
        '</div>';
      el('react-restart').addEventListener('click', function() {
        times = [];
        el('react-history').innerHTML = '';
        updateStats();
        setState(STATE.IDLE);
      });
      if (typeof confettiBurst === 'function') confettiBurst(40);
    }

    pad.addEventListener('click', function() {
      if (state === STATE.IDLE || state === STATE.EARLY) {
        if (times.length >= MAX_ROUNDS) { times = []; el('react-history').innerHTML = ''; updateStats(); }
        setState(STATE.WAITING);
        var delay = 1500 + Math.random() * 3000;
        clearTimeout(timer);
        timer = setTimeout(function() {
          setState(STATE.READY);
          startTime = Date.now();
        }, delay);
      } else if (state === STATE.WAITING) {
        clearTimeout(timer);
        setState(STATE.EARLY);
      } else if (state === STATE.READY) {
        var rt = Date.now() - startTime;
        times.push(rt);
        updateStats();
        showHistory();
        label.textContent = '⚡ ' + rt + 'ms!';
        if (times.length >= MAX_ROUNDS) {
          setTimeout(showResult, 600);
          setState(STATE.IDLE);
        } else {
          setState(STATE.IDLE);
          setTimeout(function() { label.textContent = 'Tap for next round'; }, 400);
        }
      }
    });

    setState(STATE.IDLE);
  })();

  /* ══════════════════════════════════════════════════════════
     5. MATH BLASTER
  ══════════════════════════════════════════════════════════ */
  (function initMath() {
    var root = el('math-box');
    if (!root) return;

    var score, streak, timeLeft, timerInterval, answered;
    var TOTAL_TIME = 60;

    function makeQuestion(level) {
      var ops = level < 3 ? ['+','-'] : level < 5 ? ['+','-','×'] : ['+','-','×','÷'];
      var op  = ops[Math.floor(Math.random() * ops.length)];
      var a, b, ans;
      if (op === '+') { a = rand(1, 20+level*5); b = rand(1, 20+level*5); ans = a+b; }
      else if (op === '-') { a = rand(5, 30+level*3); b = rand(1, a); ans = a-b; }
      else if (op === '×') { a = rand(2, 5+level); b = rand(2, 10); ans = a*b; }
      else { ans = rand(2,12); b = rand(2,10); a = ans*b; }
      return { q: a + ' ' + op + ' ' + b + ' = ?', a: String(ans) };
    }

    function rand(min, max) { return min + Math.floor(Math.random()*(max-min+1)); }

    function render(started) {
      if (!started) {
        root.innerHTML =
          '<div class="math-start" style="text-align:center;padding:2rem">' +
            '<div style="font-size:4rem">🔢</div>' +
            '<h3 style="font-family:\'Fredoka One\',cursive;font-size:1.8rem;color:var(--color-navy);margin:.5rem 0">60 Second Maths Challenge!</h3>' +
            '<p style="font-weight:600;color:#6a7a8a;margin-bottom:1.5rem">Answer as many questions as you can. Streak bonuses for 3+ in a row!</p>' +
            '<button class="btn btn-primary" id="math-go">▶️ Start Challenge!</button>' +
          '</div>';
        el('math-go').addEventListener('click', function() { startGame(); });
        return;
      }

      var level = Math.min(8, 1 + Math.floor(score/5));
      var q = makeQuestion(level);
      answered = false;

      root.innerHTML =
        '<div class="math-game">' +
          '<div class="math-top">' +
            '<div class="math-timer-wrap">' +
              '<div class="math-timer-bar"><div id="math-bar" class="math-timer-fill" style="width:100%"></div></div>' +
              '<span id="math-timer" class="math-timer-label">' + timeLeft + 's</span>' +
            '</div>' +
            '<div class="math-scoreboard">' +
              '<span class="game-stat">⭐ Score: <strong id="math-score">' + score + '</strong></span>' +
              '<span class="game-stat">🔥 Streak: <strong id="math-streak">' + streak + '</strong></span>' +
              '<span class="game-stat">⚡ Level: <strong>' + level + '</strong></span>' +
            '</div>' +
          '</div>' +
          '<div class="math-question" id="math-q">' + q.q + '</div>' +
          '<div class="math-options" id="math-opts"></div>' +
          '<div class="riddle-feedback" id="math-fb"></div>' +
        '</div>';

      // Generate wrong answers
      var correct = parseInt(q.a);
      var opts = [correct];
      while (opts.length < 4) {
        var wrong = correct + (Math.random()>0.5?1:-1) * rand(1, Math.max(3, Math.round(correct*0.3)));
        if (wrong > 0 && !opts.includes(wrong)) opts.push(wrong);
      }
      opts = shuffle(opts);

      opts.forEach(function(opt) {
        var btn = document.createElement('button');
        btn.className = 'math-opt';
        btn.textContent = opt;
        btn.addEventListener('click', function() { checkMath(String(opt), q.a); });
        el('math-opts').appendChild(btn);
      });
    }

    function startGame() {
      score = 0; streak = 0; timeLeft = TOTAL_TIME;
      clearInterval(timerInterval);
      timerInterval = setInterval(function() {
        timeLeft--;
        var tEl = el('math-timer');
        var bEl = el('math-bar');
        if (tEl) tEl.textContent = timeLeft + 's';
        if (bEl) bEl.style.width = (timeLeft/TOTAL_TIME*100) + '%';
        if (timeLeft <= 10 && bEl) bEl.style.background = '#ff6b6b';
        if (timeLeft <= 0) { clearInterval(timerInterval); timeUp(); }
      }, 1000);
      render(true);
    }

    function checkMath(chosen, correct) {
      if (answered) return;
      answered = true;
      var opts = el('math-opts').querySelectorAll('.math-opt');
      opts.forEach(function(b) {
        b.disabled = true;
        if (b.textContent === correct) b.classList.add('math-correct');
        else if (b.textContent === chosen) b.classList.add('math-wrong');
      });
      var fb = el('math-fb');
      if (chosen === correct) {
        streak++;
        var bonus = streak >= 3 ? 2 : 1;
        score += bonus;
        el('math-score').textContent  = score;
        el('math-streak').textContent = streak;
        fb.textContent  = streak >= 3 ? '🔥 ' + streak + 'x streak! +' + bonus + ' points!' : '✅ Correct! +' + bonus;
        fb.className    = 'riddle-feedback correct';
        if (typeof confettiBurst === 'function' && streak >= 5) confettiBurst(20);
      } else {
        streak = 0;
        el('math-streak').textContent = 0;
        fb.textContent = '❌ The answer was ' + correct;
        fb.className   = 'riddle-feedback wrong';
      }
      setTimeout(function() { if (timeLeft > 0) render(true); }, 900);
    }

    function timeUp() {
      root.innerHTML =
        '<div style="text-align:center;padding:2rem">' +
          '<div style="font-size:3rem">⏰</div>' +
          '<h3 style="font-family:\'Fredoka One\',cursive;font-size:1.8rem;color:var(--color-navy)">Time\'s Up! Score: ' + score + '</h3>' +
          '<p style="font-weight:600;color:#6a7a8a;margin:0.5rem 0 1.5rem">' +
            (score >= 20 ? '🌟 Maths genius!' : score >= 10 ? '🎉 Great work!' : '📚 Keep practising!') +
          '</p>' +
          '<button class="btn btn-primary" id="math-retry">🔄 Try Again</button>' +
        '</div>';
      el('math-retry').addEventListener('click', function() { render(false); });
      if (score >= 15 && typeof confettiBurst === 'function') confettiBurst(80);
    }

    render(false);
  })();

  /* ══════════════════════════════════════════════════════════
     6. COLOUR MATCH  (Stroop Effect Game)
  ══════════════════════════════════════════════════════════ */
  (function initColour() {
    var root = el('colour-box');
    if (!root) return;

    var COLOURS = [
      { name:'RED',    hex:'#ff4444' },
      { name:'BLUE',   hex:'#4488ff' },
      { name:'GREEN',  hex:'#44bb44' },
      { name:'YELLOW', hex:'#ffcc00' },
      { name:'PINK',   hex:'#ff66aa' },
      { name:'PURPLE', hex:'#9955cc' },
    ];

    var score, lives, level, streak, round, MAX_ROUNDS = 15;

    function makeRound() {
      var textColour  = COLOURS[Math.floor(Math.random()*COLOURS.length)];
      var inkColour   = COLOURS[Math.floor(Math.random()*COLOURS.length)];
      // sometimes make them match (easier) at lower levels
      if (level < 3 && Math.random() < 0.4) inkColour = textColour;
      return { textColour: textColour, inkColour: inkColour };
    }

    function startGame() {
      score = 0; lives = 3; level = 1; streak = 0; round = 0;
      renderRound();
    }

    function renderRound() {
      if (round >= MAX_ROUNDS || lives <= 0) { showFinal(); return; }
      var q = makeRound();
      var opts = shuffle([...COLOURS]).slice(0,4);
      if (!opts.find(function(c){return c.name===q.inkColour.name;})) opts[0] = q.inkColour;
      opts = shuffle(opts);

      root.innerHTML =
        '<div class="colour-game">' +
          '<div class="game-stats-row">' +
            '<span class="game-stat">⭐ ' + score + '</span>' +
            '<span class="game-stat">' + '❤️'.repeat(lives) + '</span>' +
            '<span class="game-stat">🎯 ' + round + '/' + MAX_ROUNDS + '</span>' +
          '</div>' +
          '<p class="colour-instruction">Tap the colour of the <strong>INK</strong>, not the word!</p>' +
          '<div class="colour-word" style="color:' + q.inkColour.hex + '">' + q.textColour.name + '</div>' +
          '<div class="colour-opts" id="colour-opts">' +
            opts.map(function(c) {
              return '<button class="colour-btn" data-name="' + c.name + '" style="background:' + c.hex + '">' + c.name + '</button>';
            }).join('') +
          '</div>' +
          '<div id="colour-fb" class="riddle-feedback"></div>' +
        '</div>';

      el('colour-opts').querySelectorAll('.colour-btn').forEach(function(btn) {
        btn.addEventListener('click', function() { checkColour(btn.dataset.name, q.inkColour.name); });
      });
    }

    function checkColour(chosen, correct) {
      el('colour-opts').querySelectorAll('.colour-btn').forEach(function(b) {
        b.disabled = true;
        if (b.dataset.name === correct) b.style.outline = '4px solid white';
      });
      var fb = el('colour-fb');
      if (chosen === correct) {
        streak++;
        score += streak >= 3 ? 2 : 1;
        if (streak === 3) level = Math.min(5, level+1);
        fb.textContent  = streak>=3 ? '🔥 On fire! +2' : '✅ Correct!';
        fb.className    = 'riddle-feedback correct';
        if (typeof confettiBurst === 'function' && streak >= 5) confettiBurst(20);
      } else {
        streak = 0;
        lives--;
        fb.textContent  = '❌ It was ' + correct + '!';
        fb.className    = 'riddle-feedback wrong';
      }
      round++;
      setTimeout(function() { renderRound(); }, 900);
    }

    function showFinal() {
      var msg = lives <= 0 ? 'Out of lives!' : 'All rounds done!';
      var rating = score >= 20 ? '🌟 Colour genius!' : score >= 12 ? '🎉 Great focus!' : '🧠 Tricky, right?';
      root.innerHTML =
        '<div style="text-align:center;padding:2rem">' +
          '<div style="font-size:3rem">🎨</div>' +
          '<h3 style="font-family:\'Fredoka One\',cursive;font-size:1.8rem;color:var(--color-navy)">' + msg + ' Score: ' + score + '</h3>' +
          '<p style="font-weight:600;color:#6a7a8a;margin:0.5rem 0 1.5rem">' + rating + '</p>' +
          '<button class="btn btn-primary" id="colour-restart">🔄 Play Again</button>' +
        '</div>';
      el('colour-restart').addEventListener('click', startGame);
      if (score >= 15 && typeof confettiBurst === 'function') confettiBurst(80);
    }

    // intro screen
    root.innerHTML =
      '<div style="text-align:center;padding:2rem">' +
        '<div style="font-size:4rem">🎨</div>' +
        '<h3 style="font-family:\'Fredoka One\',cursive;font-size:1.8rem;color:var(--color-navy);margin:.5rem 0">Colour Match!</h3>' +
        '<p style="font-weight:600;color:#6a7a8a;margin-bottom:0.5rem">The word says <span style="color:#ff4444;font-weight:800">RED</span> but it might be printed in BLUE.</p>' +
        '<p style="font-weight:600;color:#6a7a8a;margin-bottom:1.5rem">Tap the colour the TEXT IS <em>printed in</em> — not what it says!</p>' +
        '<button class="btn btn-primary" id="colour-go">🎨 Start Game</button>' +
      '</div>';
    el('colour-go').addEventListener('click', startGame);
  })();

}); // end DOMContentLoaded
