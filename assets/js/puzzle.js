/* =============================================================
   puzzle.js  –  All 6 puzzle engines for Aryan's Blog
   1. Word Riddles
   2. Sliding Puzzle (8-tile)
   3. Logic Puzzles
   4. Spot the Odd One Out
   5. Number Sequence Puzzles
   6. Secret Code Decoder
   ============================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ─── helpers ──────────────────────────────────────────── */
  function el(id) { return document.getElementById(id); }
  function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  /* ══════════════════════════════════════════════════════════
     1. WORD RIDDLES
  ══════════════════════════════════════════════════════════ */
  (function initRiddles() {
    const root = el('riddle-box');
    if (!root) return;

    const riddles = [
      { q: "I have hands but I can't clap. What am I?",            a: "clock",      hint: "It tells you the time ⏰" },
      { q: "I'm tall when young and short when old. What am I?",   a: "candle",     hint: "It burns and gives light 🕯️" },
      { q: "I speak without a mouth and hear without ears. What am I?", a: "echo",  hint: "You hear it in mountains 🏔️" },
      { q: "I have cities but no houses. I have mountains but no trees. What am I?", a: "map", hint: "You use it to find directions 🗺️" },
      { q: "The more you take, the more you leave behind. What am I?", a: "footsteps", hint: "You make them when you walk 👣" },
      { q: "I fly without wings and cry without eyes. What am I?",  a: "cloud",     hint: "You see me in the sky ☁️" },
      { q: "I have a head, a tail, but no body. What am I?",        a: "coin",      hint: "You use it to buy things 💰" },
      { q: "What has keys but no locks, and space but no room?",    a: "keyboard",  hint: "You use it to type on a computer ⌨️" },
    ];

    let idx = 0, score = 0, hintUsed = false, total = riddles.length;
    // pick 5 random riddles
    const chosen = shuffle(riddles).slice(0, 5);

    function render() {
      if (idx >= chosen.length) { showFinal(); return; }
      hintUsed = false;
      const r = chosen[idx];
      root.innerHTML =
        '<div class="riddle-card">' +
          '<div class="riddle-progress">Riddle ' + (idx+1) + ' of ' + chosen.length + '</div>' +
          '<div class="riddle-q">🤔 ' + r.q + '</div>' +
          '<div class="riddle-input-row">' +
            '<input type="text" id="riddle-input" placeholder="Type your answer…" autocomplete="off" />' +
            '<button class="btn btn-primary" id="riddle-submit">✅ Check</button>' +
          '</div>' +
          '<div class="riddle-hint-row">' +
            '<button class="btn-hint" id="riddle-hint">💡 Show Hint</button>' +
          '</div>' +
          '<div id="riddle-hint-text" class="riddle-hint-text" style="display:none">' + r.hint + '</div>' +
          '<div id="riddle-feedback" class="riddle-feedback"></div>' +
        '</div>';

      el('riddle-submit').addEventListener('click', checkRiddle);
      el('riddle-input').addEventListener('keydown', function(e) { if (e.key === 'Enter') checkRiddle(); });
      el('riddle-hint').addEventListener('click', function() {
        el('riddle-hint-text').style.display = 'block';
        hintUsed = true;
      });
    }

    function checkRiddle() {
      const input = el('riddle-input');
      const val   = input.value.trim().toLowerCase();
      const r     = chosen[idx];
      const fb    = el('riddle-feedback');

      if (!val) { fb.textContent = '✏️ Type your answer first!'; return; }

      el('riddle-submit').disabled = true;
      input.disabled = true;

      if (val === r.a) {
        fb.innerHTML = '🎉 <strong>Correct!</strong> The answer is <em>' + r.a + '</em>!';
        fb.className = 'riddle-feedback correct';
        if (!hintUsed) score++;
        if (typeof confettiBurst === 'function') confettiBurst(30);
      } else {
        fb.innerHTML = '❌ Not quite! The answer was <strong>' + r.a + '</strong>.';
        fb.className = 'riddle-feedback wrong';
      }
      setTimeout(function() { idx++; render(); }, 2000);
    }

    function showFinal() {
      root.innerHTML =
        '<div class="riddle-card" style="text-align:center">' +
          '<div style="font-size:3rem">🏆</div>' +
          '<h3 style="font-family:\'Fredoka One\',cursive;font-size:1.8rem;color:var(--color-navy)">You scored ' + score + '/' + chosen.length + '!</h3>' +
          '<p style="font-weight:600;color:#6a7a8a;margin:0.5rem 0 1.5rem">' +
            (score === chosen.length ? '🌟 Perfect! You\'re a riddle master!' : '🎉 Well done! Try again to get full marks!') +
          '</p>' +
          '<button class="btn btn-primary" id="riddle-restart">🔄 Play Again</button>' +
        '</div>';
      el('riddle-restart').addEventListener('click', function() { idx = 0; score = 0; render(); });
      if (score === chosen.length && typeof confettiBurst === 'function') confettiBurst(80);
    }

    render();
  })();

  /* ══════════════════════════════════════════════════════════
     2. SLIDING PUZZLE (3×3, tile 9 = empty)
  ══════════════════════════════════════════════════════════ */
  (function initSliding() {
    const grid  = el('slide-grid');
    const movEl = el('slide-moves');
    const statEl = el('slide-status');
    const resetBtn = el('slide-reset');
    if (!grid) return;

    const EMOJIS = ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣'];
    const GOAL   = [0,1,2,3,4,5,6,7,8]; // 8 = blank
    let tiles = [], moves = 0;

    function isSolvable(arr) {
      let inv = 0;
      for (let i = 0; i < 8; i++)
        for (let j = i+1; j < 8; j++)
          if (arr[i] !== 8 && arr[j] !== 8 && arr[i] > arr[j]) inv++;
      return inv % 2 === 0;
    }

    function init() {
      moves = 0;
      statEl.textContent = '';
      statEl.className   = '';
      movEl.textContent  = 'Moves: 0';
      do { tiles = shuffle([0,1,2,3,4,5,6,7,8]); } while (!isSolvable(tiles));
      render();
    }

    function render() {
      grid.innerHTML = '';
      tiles.forEach(function(val, pos) {
        const cell = document.createElement('div');
        cell.className = 'slide-cell' + (val === 8 ? ' slide-empty' : '');
        cell.textContent = val === 8 ? '' : EMOJIS[val];
        if (val !== 8) cell.addEventListener('click', function() { trySlide(pos); });
        grid.appendChild(cell);
      });
    }

    function trySlide(pos) {
      const blank = tiles.indexOf(8);
      const adj   = [pos-3, pos+3, pos-1, pos+1];
      // prevent wrap-around on left/right edges
      const valid = adj.filter(function(n) {
        if (n < 0 || n > 8) return false;
        if (pos % 3 === 0 && n === pos-1) return false;
        if (pos % 3 === 2 && n === pos+1) return false;
        return true;
      });
      if (!valid.includes(blank)) return;
      // swap
      tiles[blank] = tiles[pos];
      tiles[pos]   = 8;
      moves++;
      movEl.textContent = 'Moves: ' + moves;
      render();
      if (tiles.join(',') === GOAL.join(',')) {
        statEl.textContent = '🎉 Solved in ' + moves + ' moves! Amazing!';
        statEl.className   = 'slide-win';
        if (typeof confettiBurst === 'function') confettiBurst(80);
      }
    }

    resetBtn.addEventListener('click', init);
    init();
  })();

  /* ══════════════════════════════════════════════════════════
     3. LOGIC PUZZLES  (multi-choice)
  ══════════════════════════════════════════════════════════ */
  (function initLogic() {
    const root = el('logic-box');
    if (!root) return;

    const puzzles = [
      {
        q: "Tom has 3 apples. He gives 1 to Sara and gets 2 from Ben. How many does Tom have now?",
        opts: ["3 apples","4 apples","5 apples","6 apples"],
        a: 1,
        exp: "3 − 1 + 2 = 4 apples! 🍎"
      },
      {
        q: "If Monday is the 1st day and Sunday is the 7th, what day is the 15th day of the month if it starts on Wednesday?",
        opts: ["Tuesday","Wednesday","Thursday","Friday"],
        a: 1,
        exp: "Day 1 = Wednesday, day 8 = Wednesday, day 15 = Wednesday! 📅"
      },
      {
        q: "A farmer has 17 sheep. All but 9 run away. How many are left?",
        opts: ["8 sheep","9 sheep","17 sheep","0 sheep"],
        a: 1,
        exp: "'All but 9' means 9 stayed! It's a trick question 🐑"
      },
      {
        q: "What comes once in a minute, twice in a moment, but never in a thousand years?",
        opts: ["The letter T","The letter M","The letter E","The letter O"],
        a: 1,
        exp: "The letter M! miNute=1 M, MoMent=2 M, thousand years=0 M 🔤"
      },
      {
        q: "There are 3 cats in 3 rooms. Each cat eats 1 mouse in 1 minute. How long for 3 cats to eat 3 mice?",
        opts: ["3 minutes","1 minute","9 minutes","6 minutes"],
        a: 1,
        exp: "All 3 cats eat at the SAME TIME so it takes just 1 minute! 🐱"
      },
      {
        q: "Riya is 5 years older than Aryan. In 3 years, Riya will be twice Aryan's age. How old is Aryan now?",
        opts: ["1 year old","2 years old","3 years old","4 years old"],
        a: 1,
        exp: "Aryan = 2, Riya = 7. In 3 years: Aryan = 5, Riya = 10 = 2×5 ✅"
      },
    ];

    let idx = 0, score = 0;
    const chosen = shuffle(puzzles).slice(0, 4);

    function render() {
      if (idx >= chosen.length) { showFinal(); return; }
      const p = chosen[idx];
      root.innerHTML =
        '<div class="logic-card">' +
          '<div class="riddle-progress">Puzzle ' + (idx+1) + ' of ' + chosen.length + '</div>' +
          '<div class="riddle-q">🧠 ' + p.q + '</div>' +
          '<div class="logic-opts" id="logic-opts">' +
            p.opts.map(function(o,i) {
              return '<button class="logic-opt" data-i="' + i + '">' + o + '</button>';
            }).join('') +
          '</div>' +
          '<div id="logic-feedback" class="riddle-feedback"></div>' +
        '</div>';

      el('logic-opts').querySelectorAll('.logic-opt').forEach(function(btn) {
        btn.addEventListener('click', function() { checkLogic(parseInt(btn.dataset.i)); });
      });
    }

    function checkLogic(chosen) {
      const p  = chosen_puzzles[idx];  // use local var below
      const cp = chosen_arr[idx];
      el('logic-opts').querySelectorAll('.logic-opt').forEach(function(b,i) {
        b.disabled = true;
        if (i === cp.a) b.classList.add('logic-correct');
        else if (i === chosen) b.classList.add('logic-wrong');
      });
      const fb = el('logic-feedback');
      if (chosen === cp.a) {
        score++;
        fb.innerHTML = '🎉 Correct! ' + cp.exp;
        fb.className = 'riddle-feedback correct';
        if (typeof confettiBurst === 'function') confettiBurst(30);
      } else {
        fb.innerHTML = '❌ Not quite! ' + cp.exp;
        fb.className = 'riddle-feedback wrong';
      }
      setTimeout(function() { idx++; render(); }, 2400);
    }

    // patch: re-scope chosen array
    var chosen_arr = chosen;
    // override checkLogic to use correct closure
    root.addEventListener('click', function handler(e) {
      if (!e.target.classList.contains('logic-opt')) return;
      if (e.target.disabled) return;
      const p = chosen_arr[idx];
      const i = parseInt(e.target.dataset.i);
      el('logic-opts').querySelectorAll('.logic-opt').forEach(function(b,j) {
        b.disabled = true;
        if (j === p.a) b.classList.add('logic-correct');
        else if (j === i) b.classList.add('logic-wrong');
      });
      const fb = el('logic-feedback');
      if (i === p.a) {
        score++;
        fb.innerHTML = '🎉 Correct! ' + p.exp;
        fb.className = 'riddle-feedback correct';
        if (typeof confettiBurst === 'function') confettiBurst(30);
      } else {
        fb.innerHTML = '❌ Not quite! ' + p.exp;
        fb.className = 'riddle-feedback wrong';
      }
      setTimeout(function() { idx++; render(); }, 2400);
    });

    function showFinal() {
      root.innerHTML =
        '<div class="riddle-card" style="text-align:center">' +
          '<div style="font-size:3rem">🧠</div>' +
          '<h3 style="font-family:\'Fredoka One\',cursive;font-size:1.8rem;color:var(--color-navy)">Brain Score: ' + score + '/' + chosen.length + '!</h3>' +
          '<p style="font-weight:600;color:#6a7a8a;margin:0.5rem 0 1.5rem">' +
            (score === chosen.length ? '🌟 Genius! Full marks!' : '💪 Great try! Keep practising!') +
          '</p>' +
          '<button class="btn btn-secondary" id="logic-restart">🔄 Try Again</button>' +
        '</div>';
      el('logic-restart').addEventListener('click', function() { idx = 0; score = 0; render(); });
    }

    render();
  })();

  /* ══════════════════════════════════════════════════════════
     4. SPOT THE ODD ONE OUT
  ══════════════════════════════════════════════════════════ */
  (function initSpot() {
    const root = el('spot-box');
    if (!root) return;

    const rounds = [
      { group: ['🐶','🐶','🐶','🐱','🐶','🐶'], odd: 3, reason: "🐱 is the only cat, not a dog!" },
      { group: ['🍎','🍊','🍋','🍇','🚗','🍓'], odd: 4, reason: "🚗 is a car — everything else is a fruit!" },
      { group: ['🔴','🔴','🔵','🔴','🔴','🔴'], odd: 2, reason: "🔵 is blue — all the others are red!" },
      { group: ['🐟','🐠','🦈','🐙','🦋','🐡'], odd: 4, reason: "🦋 is an insect — everything else lives in water!" },
      { group: ['2️⃣','4️⃣','6️⃣','7️⃣','8️⃣','🔟'], odd: 3, reason: "7️⃣ is odd — all others are even numbers!" },
      { group: ['🌍','🌙','⭐','🌍','🌍','🌍'], odd: 1, reason: "🌙 is the Moon — everything else is Earth!" },
      { group: ['🍕','🍔','🌮','🍜','🧁','🌯'], odd: 4, reason: "🧁 is a dessert — everything else is a savoury meal!" },
    ];

    let idx = 0, score = 0;
    const chosen = shuffle(rounds).slice(0, 5);

    function render() {
      if (idx >= chosen.length) { showFinal(); return; }
      const r = chosen[idx];
      const shuffledGroup = shuffle(r.group.map(function(e,i) { return {e:e, origIdx:i}; }));

      root.innerHTML =
        '<div class="spot-card">' +
          '<div class="riddle-progress">Round ' + (idx+1) + ' of ' + chosen.length + '</div>' +
          '<p class="spot-instruction">👇 Tap the emoji that does NOT belong!</p>' +
          '<div class="spot-grid" id="spot-grid">' +
            shuffledGroup.map(function(item) {
              return '<button class="spot-btn" data-orig="' + item.origIdx + '">' + item.e + '</button>';
            }).join('') +
          '</div>' +
          '<div id="spot-feedback" class="riddle-feedback"></div>' +
        '</div>';

      el('spot-grid').querySelectorAll('.spot-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
          const orig = parseInt(btn.dataset.orig);
          el('spot-grid').querySelectorAll('.spot-btn').forEach(function(b) { b.disabled = true; });
          const fb = el('spot-feedback');
          if (orig === r.odd) {
            btn.classList.add('spot-correct');
            score++;
            fb.innerHTML = '🎉 Correct! ' + r.reason;
            fb.className = 'riddle-feedback correct';
            if (typeof confettiBurst === 'function') confettiBurst(30);
          } else {
            btn.classList.add('spot-wrong');
            fb.innerHTML = '❌ Not quite! ' + r.reason;
            fb.className = 'riddle-feedback wrong';
          }
          setTimeout(function() { idx++; render(); }, 2200);
        });
      });
    }

    function showFinal() {
      root.innerHTML =
        '<div class="riddle-card" style="text-align:center">' +
          '<div style="font-size:3rem">🔍</div>' +
          '<h3 style="font-family:\'Fredoka One\',cursive;font-size:1.8rem;color:var(--color-navy)">You found ' + score + '/' + chosen.length + ' odd ones!</h3>' +
          '<p style="font-weight:600;color:#6a7a8a;margin:0.5rem 0 1.5rem">' +
            (score === chosen.length ? '🌟 Eagle eye! Perfect score!' : '👀 Good spotting! Try again!') +
          '</p>' +
          '<button class="btn btn-primary" id="spot-restart">🔄 Play Again</button>' +
        '</div>';
      el('spot-restart').addEventListener('click', function() { idx = 0; score = 0; render(); });
    }

    render();
  })();

  /* ══════════════════════════════════════════════════════════
     5. NUMBER SEQUENCE PUZZLES
  ══════════════════════════════════════════════════════════ */
  (function initNumbers() {
    const root = el('number-box');
    if (!root) return;

    const seqs = [
      { seq: [2, 4, 6, 8, '?'],         a: '10',  exp: 'Add 2 each time! 2+2=4, 4+2=6… so 8+2=10 🎯' },
      { seq: [1, 3, 9, 27, '?'],        a: '81',  exp: 'Multiply by 3 each time! 27×3=81 🌟' },
      { seq: [100, 90, 80, 70, '?'],    a: '60',  exp: 'Subtract 10 each time! 70−10=60 ✅' },
      { seq: [1, 1, 2, 3, 5, 8, '?'],  a: '13',  exp: 'Fibonacci! Add the two before: 5+8=13 🐚' },
      { seq: [5, 10, 20, 40, '?'],      a: '80',  exp: 'Double each time! 40×2=80 💥' },
      { seq: [3, 6, 9, 12, '?'],        a: '15',  exp: 'Times table of 3! 3×5=15 🔢' },
      { seq: [81, 27, 9, 3, '?'],       a: '1',   exp: 'Divide by 3 each time! 3÷3=1 ✨' },
    ];

    let idx = 0, score = 0;
    const chosen = shuffle(seqs).slice(0, 5);

    function render() {
      if (idx >= chosen.length) { showFinal(); return; }
      const s = chosen[idx];
      const display = s.seq.map(function(n) {
        return '<span class="seq-item' + (n === '?' ? ' seq-blank' : '') + '">' + n + '</span>';
      }).join('<span class="seq-sep">→</span>');

      root.innerHTML =
        '<div class="riddle-card">' +
          '<div class="riddle-progress">Sequence ' + (idx+1) + ' of ' + chosen.length + '</div>' +
          '<div class="seq-display">' + display + '</div>' +
          '<p style="font-weight:600;color:#6a7a8a;text-align:center;margin-bottom:1rem">What number replaces the <strong style="color:var(--color-pink)">?</strong></p>' +
          '<div class="riddle-input-row">' +
            '<input type="number" id="num-input" placeholder="Enter number…" style="max-width:160px" />' +
            '<button class="btn btn-primary" id="num-submit">✅ Check</button>' +
          '</div>' +
          '<div id="num-feedback" class="riddle-feedback"></div>' +
        '</div>';

      el('num-submit').addEventListener('click', checkNum);
      el('num-input').addEventListener('keydown', function(e) { if (e.key === 'Enter') checkNum(); });
    }

    function checkNum() {
      const val = el('num-input').value.trim();
      const s   = chosen[idx];
      const fb  = el('num-feedback');
      if (!val) { fb.textContent = '✏️ Enter a number first!'; return; }
      el('num-submit').disabled = true;
      el('num-input').disabled  = true;
      if (val === s.a) {
        score++;
        fb.innerHTML = '🎉 Correct! ' + s.exp;
        fb.className = 'riddle-feedback correct';
        if (typeof confettiBurst === 'function') confettiBurst(30);
      } else {
        fb.innerHTML = '❌ The answer was <strong>' + s.a + '</strong>. ' + s.exp;
        fb.className = 'riddle-feedback wrong';
      }
      setTimeout(function() { idx++; render(); }, 2400);
    }

    function showFinal() {
      root.innerHTML =
        '<div class="riddle-card" style="text-align:center">' +
          '<div style="font-size:3rem">🔢</div>' +
          '<h3 style="font-family:\'Fredoka One\',cursive;font-size:1.8rem;color:var(--color-navy)">Pattern Master: ' + score + '/' + chosen.length + '!</h3>' +
          '<p style="font-weight:600;color:#6a7a8a;margin:0.5rem 0 1.5rem">' +
            (score === chosen.length ? '🌟 Incredible! Math genius!' : '🔢 Good effort! Try again!') +
          '</p>' +
          '<button class="btn btn-secondary" id="num-restart">🔄 Try Again</button>' +
        '</div>';
      el('num-restart').addEventListener('click', function() { idx = 0; score = 0; render(); });
    }

    render();
  })();

  /* ══════════════════════════════════════════════════════════
     6. SECRET CODE DECODER
  ══════════════════════════════════════════════════════════ */
  (function initCode() {
    const root = el('code-box');
    if (!root) return;

    // Each emoji maps to a letter. Player sees the cipher, must type the word.
    const codeMap = {
      '⭐':'A','🌙':'B','☀️':'C','🌈':'D','🌸':'E',
      '🦋':'F','🚀':'G','🎨':'H','💎':'I','🦄':'J',
      '🐉':'K','🌟':'L','🎯':'M','🎪':'N','🔥':'O',
      '🎭':'P','🌊':'Q','🦁':'R','🐬':'S','🏆':'T',
      '🌺':'U','🎸':'V','🎃':'W','🎲':'X','🎵':'Y','🎠':'Z'
    };

    // Reverse map: letter → emoji
    const encode = {};
    Object.keys(codeMap).forEach(function(em) { encode[codeMap[em]] = em; });

    function encodeWord(word) {
      return word.toUpperCase().split('').map(function(c) { return encode[c] || c; }).join(' ');
    }

    const words = [
      { word: 'SUN',    emoji: '🌞' },
      { word: 'STAR',   emoji: '⭐' },
      { word: 'MOON',   emoji: '🌙' },
      { word: 'LION',   emoji: '🦁' },
      { word: 'FIRE',   emoji: '🔥' },
      { word: 'TREE',   emoji: '🌳' },
      { word: 'ROSE',   emoji: '🌹' },
      { word: 'DRAGON', emoji: '🐉' },
    ];

    let idx = 0, score = 0;
    const chosen = shuffle(words).slice(0, 5);

    // Build the legend table
    const legendHTML =
      '<details class="code-legend">' +
        '<summary>🔑 Tap to see the code key</summary>' +
        '<div class="code-legend-grid">' +
          Object.keys(codeMap).map(function(em) {
            return '<span class="code-pair"><span class="code-em">' + em + '</span><span class="code-lt">' + codeMap[em] + '</span></span>';
          }).join('') +
        '</div>' +
      '</details>';

    function render() {
      if (idx >= chosen.length) { showFinal(); return; }
      const w       = chosen[idx];
      const encoded = encodeWord(w.word);

      root.innerHTML =
        '<div class="riddle-card">' +
          '<div class="riddle-progress">Message ' + (idx+1) + ' of ' + chosen.length + '</div>' +
          legendHTML +
          '<p style="font-weight:700;font-family:\'Baloo 2\',cursive;text-align:center;margin:1.2rem 0 0.5rem;font-size:1rem;color:#6a7a8a">Decode this secret message:</p>' +
          '<div class="code-display">' + encoded + '</div>' +
          '<div class="riddle-input-row">' +
            '<input type="text" id="code-input" placeholder="Type the word…" autocomplete="off" style="text-transform:uppercase" />' +
            '<button class="btn btn-primary" id="code-submit">✅ Check</button>' +
          '</div>' +
          '<div id="code-feedback" class="riddle-feedback"></div>' +
        '</div>';

      el('code-submit').addEventListener('click', checkCode);
      el('code-input').addEventListener('keydown', function(e) { if (e.key === 'Enter') checkCode(); });
    }

    function checkCode() {
      const val = el('code-input').value.trim().toUpperCase();
      const w   = chosen[idx];
      const fb  = el('code-feedback');
      if (!val) { fb.textContent = '✏️ Type the word first!'; return; }
      el('code-submit').disabled = true;
      el('code-input').disabled  = true;
      if (val === w.word) {
        score++;
        fb.innerHTML = '🎉 Correct! The word is <strong>' + w.word + '</strong> ' + w.emoji;
        fb.className = 'riddle-feedback correct';
        if (typeof confettiBurst === 'function') confettiBurst(30);
      } else {
        fb.innerHTML = '❌ The word was <strong>' + w.word + '</strong> ' + w.emoji;
        fb.className = 'riddle-feedback wrong';
      }
      setTimeout(function() { idx++; render(); }, 2200);
    }

    function showFinal() {
      root.innerHTML =
        '<div class="riddle-card" style="text-align:center">' +
          '<div style="font-size:3rem">🕵️</div>' +
          '<h3 style="font-family:\'Fredoka One\',cursive;font-size:1.8rem;color:var(--color-navy)">Code Cracker: ' + score + '/' + chosen.length + '!</h3>' +
          '<p style="font-weight:600;color:#6a7a8a;margin:0.5rem 0 1.5rem">' +
            (score === chosen.length ? '🌟 Secret agent material! Perfect!' : '🔑 Good decoding! Try again!') +
          '</p>' +
          '<button class="btn btn-primary" id="code-restart">🔄 Play Again</button>' +
        '</div>';
      el('code-restart').addEventListener('click', function() { idx = 0; score = 0; render(); });
    }

    render();
  })();

}); // end DOMContentLoaded
