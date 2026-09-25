(function () {
  'use strict';

  const { CONFIG, prepareQuestions, selectBalancedQuestions, Round } = window.FrogEngine || {};
  const labels = ['A', 'B', 'C', 'D'];
  const levelInfo = window.FROG_LEVELS;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const stage = document.querySelector('#split-stage');
  const template = document.querySelector('#board-template');
  const accessibilityStatus = document.querySelector('#accessibility-status');
  const boards = [];
  let focusedBoard = null;
  let sound = true;
  let audioContext = null;

  const preloadIdle = new Image();
  preloadIdle.src = 'assets/frogi.png';
  const preloadJump = new Image();
  preloadJump.src = 'assets/froge.png';
  ['assets/count-3.png', 'assets/count-2.png', 'assets/count-1.png', 'assets/count-start.png'].forEach(src => {
    const img = new Image();
    img.src = src;
  });

  const headerPlayerInput = document.querySelector('#header-player-input');

  function getStoredPlayerName() {
    try {
      return localStorage.getItem('frogi_player_name') || '';
    } catch {
      return '';
    }
  }

  function syncPlayerName(name) {
    const cleanName = String(name || '').slice(0, 20);
    try {
      localStorage.setItem('frogi_player_name', cleanName);
    } catch {}

    if (headerPlayerInput && headerPlayerInput.value !== cleanName) {
      headerPlayerInput.value = cleanName;
    }

    boards.forEach(b => {
      b.playerName = cleanName;
      if (b.el.startPlayerInput && b.el.startPlayerInput.value !== cleanName) {
        b.el.startPlayerInput.value = cleanName;
      }
      if (b.el.resultPlayerName) {
        b.el.resultPlayerName.textContent = cleanName || 'Pemain';
      }
    });
  }

  if (headerPlayerInput) {
    headerPlayerInput.value = getStoredPlayerName();
    headerPlayerInput.addEventListener('input', (e) => {
      syncPlayerName(e.target.value);
    });
    headerPlayerInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        headerPlayerInput.blur();
      }
    });
  }

  const formatTime = ms => {
    const seconds = Math.floor(ms / 1000);
    return String(Math.floor(seconds / 60)).padStart(2, '0') + ':' + String(seconds % 60).padStart(2, '0');
  };

  function announce(message) {
    accessibilityStatus.textContent = message;
  }

  function cleanLatexForSpeech(str) {
    if (!str) return '';
    return String(str)
      .replace(/\$([^\$]+)\$/g, '$1')
      .replace(/\\text\{([^}]+)\}/g, '$1')
      .replace(/\\frac\{1\}\{3\}/g, 'sepertiga')
      .replace(/\\frac\{1\}\{2\}/g, 'setengah')
      .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '$1 per $2')
      .replace(/\\sqrt\[3\]\{([^}]+)\}/g, 'akar pangkat tiga dari $1')
      .replace(/\\sqrt\{([^}]+)\}/g, 'akar dari $1')
      .replace(/\\times/g, ' kali ')
      .replace(/\\div/g, ' bagi ')
      .replace(/\\implies/g, ' menghasilkan ')
      .replace(/\^3/g, ' kubik')
      .replace(/\^2/g, ' persegi')
      .replace(/[\\{}]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  const mathCache = new Map();

  function formatMath(element, text) {
    if (!element) return;
    if (!text || typeof text !== 'string') {
      element.textContent = '';
      return;
    }
    // Fast path: jika teks tidak memiliki notasi matematika, pasang langsung tanpa parse DOM
    if (!text.includes('$') && !text.includes('\\')) {
      element.textContent = text;
      return;
    }

    if (mathCache.has(text)) {
      element.innerHTML = mathCache.get(text);
      return;
    }

    element.textContent = text;
    if (typeof window.renderMathInElement === 'function') {
      try {
        window.renderMathInElement(element, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false }
          ],
          throwOnError: false
        });
        if (text.length < 500) mathCache.set(text, element.innerHTML);
        return;
      } catch (_) {
        element.textContent = cleanLatexForSpeech(text);
        return;
      }
    } else if (window.katex) {
      try {
        const parts = text.split('$');
        let html = '';
        for (let i = 0; i < parts.length; i++) {
          if (i % 2 === 1) {
            html += window.katex.renderToString(parts[i], { throwOnError: false });
          } else {
            html += parts[i].replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
          }
        }
        element.innerHTML = html;
        if (text.length < 500) mathCache.set(text, html);
        return;
      } catch (_) {
        element.textContent = cleanLatexForSpeech(text);
        return;
      }
    }
    element.textContent = cleanLatexForSpeech(text);
  }

  let croakAudioBuffer = null;
  let croakAudioLoading = false;
  const croakAudio = new Audio('assets/frog-croak.mp3');
  croakAudio.preload = 'auto';
  croakAudio.volume = 0.7;

  function loadCroakAudioBuffer() {
    if (croakAudioBuffer || croakAudioLoading || !audioContext) return;
    croakAudioLoading = true;
    fetch('assets/frog-croak.mp3')
      .then(res => {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.arrayBuffer();
      })
      .then(buf => audioContext.decodeAudioData(buf))
      .then(decoded => {
        croakAudioBuffer = decoded;
        croakAudioLoading = false;
      })
      .catch(() => {
        croakAudioLoading = false;
      });
  }

  function initAudio() {
    if (!sound) return;
    try {
      const AudioClass = window.AudioContext || window.webkitAudioContext;
      if (AudioClass && !audioContext) {
        audioContext = new AudioClass();
      }
      if (audioContext?.state === 'suspended') {
        audioContext.resume().catch(() => {});
      }
      if (audioContext && !croakAudioBuffer) {
        loadCroakAudioBuffer();
      }
    } catch (_) {
      // Suara adalah fitur tambahan; permainan tetap berjalan tanpa audio.
    }
  }

  function tone(frequency, duration, delay = 0, type = 'sine') {
    if (!sound || !audioContext) return;
    try {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const at = audioContext.currentTime + delay;
      osc.type = type;
      osc.frequency.setValueAtTime(frequency, at);
      gain.gain.setValueAtTime(0, at);
      gain.gain.linearRampToValueAtTime(.075, at + .012);
      gain.gain.exponentialRampToValueAtTime(.001, at + duration);
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.onended = () => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch (_) {}
      };
      osc.start(at);
      osc.stop(at + duration + .02);
    } catch (_) {
      // Audio adalah fitur tambahan.
    }
  }

  function correctSound() {
    tone(523, .12);
    tone(659, .13, .1);
    tone(784, .2, .2);
  }

  function wrongSound() {
    tone(220, .15, 0, 'triangle');
    tone(147, .25, .14, 'triangle');
  }

  function countdownStartSound() {
    tone(523.25, 0.12, 0, 'triangle');
    tone(659.25, 0.12, 0.08, 'triangle');
    tone(783.99, 0.18, 0.16, 'triangle');
    tone(1046.5, 0.35, 0.24, 'sine');
    croakSound();
  }

  function croakSound() {
    if (!sound) return;
    if (audioContext && croakAudioBuffer) {
      try {
        const source = audioContext.createBufferSource();
        const gain = audioContext.createGain();
        gain.gain.value = 0.7;
        source.buffer = croakAudioBuffer;
        source.connect(gain);
        gain.connect(audioContext.destination);
        source.onended = () => {
          try {
            source.disconnect();
            gain.disconnect();
          } catch (_) {}
        };
        source.start(0);
        return;
      } catch (_) {}
    }
    // Fallback yang aman tanpa kloning elemen berulang
    try {
      croakAudio.currentTime = 0;
      croakAudio.play().catch(() => {});
    } catch (_) {}
  }

  function finishSound(win) {
    if (win) [523, 659, 784, 1047].forEach((frequency, index) => tone(frequency, .28, index * .14));
    else wrongSound();
  }

  class GameBoard {
    constructor(root, team) {
      this.root = root;
      this.team = team;
      this.label = team.label;
      this.selectedLevel = 'mudah';
      this.round = null;
      this.remainingMs = (CONFIG.secondsPerQuestion?.[this.selectedLevel] || CONFIG.defaultSecondsPerQuestion || 60) * 1000;
      this.elapsedMs = 0;
      this.lastFrame = 0;
      this.paused = false;
      this.session = 0;
      this.facingAngle = 0;
      this.isAnswering = false;

      this.el = {
        pond: root.querySelector('.pond'),
        shockwave: root.querySelector('.pond-shockwave'),
        flash: root.querySelector('.pond-flash'),
        questionBox: root.querySelector('.question-box'),
        questionCounter: root.querySelector('.question-counter'),
        questionIllustration: root.querySelector('.question-illustration'),
        questionText: root.querySelector('.question-box h2'),
        answerField: root.querySelector('.answer-field'),
        buttons: Array.from(root.querySelectorAll('.answer-pad')),
        frog: root.querySelector('.frog'),
        frogImg: root.querySelector('.frog > img'),
        feedback: root.querySelector('.feedback'),
        timeGroup: root.querySelector('.time-group'),
        countdown: root.querySelector('.countdown'),
        timerProgress: root.querySelector('.timer-progress'),
        secondsValue: root.querySelector('.seconds-value'),
        elapsedValue: root.querySelector('.elapsed'),
        livesValue: root.querySelector('.lives-value'),
        scoreValue: root.querySelector('.score-value'),
        settingsButton: root.querySelector('.settings-button'),
        startScreen: root.querySelector('.start-screen'),
        startButton: root.querySelector('.start-button'),
        startCountdown: root.querySelector('.start-countdown'),
        countdownStage: root.querySelector('.countdown-stage'),
        countdownImg: root.querySelector('.countdown-img'),
        countdownBurst: root.querySelector('.countdown-burst'),
        countdownRipple: root.querySelector('.countdown-ripple'),
        levelButtons: Array.from(root.querySelectorAll('.level-option')),
        selectedLevelLabel: root.querySelector('.selected-level-label'),
        selectedLevelTime: root.querySelector('.selected-level-time'),
        shapeButtons: Array.from(root.querySelectorAll('.shape-option')),
        selectedQuestionCount: root.querySelector('.selected-question-count'),
        headingSuffix: root.querySelector('.heading-suffix'),
        resultScreen: root.querySelector('.result-screen'),
        resultTitle: root.querySelector('.result-screen h2'),
        resultMessage: root.querySelector('.result-message'),
        resultIcon: root.querySelector('.trophy'),
        resultScore: root.querySelector('.result-score'),
        resultScoreDetail: root.querySelector('.result-score-detail'),
        resultCorrect: root.querySelector('.result-correct'),
        resultTime: root.querySelector('.result-time'),
        retryButton: root.querySelector('.retry-button'),
        reportButton: root.querySelector('.report-button'),
        confetti: root.querySelector('.confetti'),
        startPlayerInput: root.querySelector('.start-player-input'),
        resultPlayerName: root.querySelector('.result-player-name')
      };

      const requiredKeys = [
        'pond', 'questionBox', 'questionCounter', 'questionIllustration', 'questionText',
        'answerField', 'frog', 'frogImg', 'feedback', 'timeGroup', 'countdown',
        'timerProgress', 'secondsValue', 'elapsedValue', 'livesValue', 'scoreValue',
        'settingsButton', 'startScreen', 'startButton', 'selectedLevelLabel',
        'selectedLevelTime', 'resultScreen', 'resultTitle', 'resultMessage',
        'resultScore', 'resultCorrect', 'resultTime', 'retryButton', 'reportButton',
        'startCountdown', 'countdownImg'
      ];
      const missingKeys = requiredKeys.filter(key => !this.el[key]);
      if (missingKeys.length || !this.el.buttons.length || !this.el.levelButtons.length) {
        throw new Error(
          'GameBoard: elemen HTML wajib tidak ditemukan (' +
          (missingKeys.join(', ') || 'answer-pad/level-option kosong') +
          '). Cek apakah class di index.html cocok dengan yang dicari game.js.'
        );
      }

      root.classList.add(team.className);
      root.style.setProperty('--team-color', team.color);
      root.setAttribute('aria-label', 'Papan permainan Lompat Katak');

      this.playerName = getStoredPlayerName();
      if (this.el.startPlayerInput) {
        this.el.startPlayerInput.value = this.playerName;
      }
      if (this.el.resultPlayerName) {
        this.el.resultPlayerName.textContent = this.playerName || 'Pemain';
      }

      const activeShapeBtn = this.el.shapeButtons.find(b => b.classList.contains('active'));
      this.selectedShape = activeShapeBtn?.dataset?.shape || 'semua';
      this.bindEvents();
      this.el.shapeButtons.forEach(button => {
        const shapeKey = button.dataset.shape;
        const meta = window.FROG_SHAPES?.[shapeKey];
        const iconHolder = button.querySelector('.shape-icon');
        if (meta && iconHolder && window.FrogIllustrations) {
          const svg = window.FrogIllustrations.getIllustration(meta.illustration);
          if (svg) iconHolder.innerHTML = svg;
        }
      });
      this.selectLevel('mudah', false);
      this.updateStartDetails();
      this.hud();
      this.clock();
    }

    bindEvents() {
      this.el.shapeButtons.forEach(button => button.addEventListener('click', () => this.selectShape(button.dataset.shape)));
      this.el.levelButtons.forEach(button => button.addEventListener('click', () => this.selectLevel(button.dataset.level)));
      this.el.startButton.addEventListener('click', () => this.startGame(this.selectedLevel));
      this.el.retryButton.addEventListener('click', () => this.startGame(this.selectedLevel));
      this.el.buttons.forEach((button, index) => button.addEventListener('click', () => {
        focusedBoard = this;
        initAudio();
        void this.choose(index);
      }));
      this.el.settingsButton.addEventListener('click', () => openDialog(settingsDialog, this));
      this.el.reportButton.addEventListener('click', () => buildReport(this));
      this.root.addEventListener('pointerdown', () => { focusedBoard = this; }, { passive: true });
      this.root.addEventListener('focus', () => { focusedBoard = this; }, true);

      if (this.el.startPlayerInput) {
        this.el.startPlayerInput.addEventListener('input', (e) => {
          syncPlayerName(e.target.value);
        });
        this.el.startPlayerInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            this.startGame(this.selectedLevel);
          }
        });
      }
    }

    isActive() {
      return Boolean(this.round && (this.round.status === 'playing' || this.round.status === 'feedback' || this.round.status === 'countdown'));
    }

    selectShape(shape, shouldAnnounce = true) {
      if (!window.FROG_SHAPES?.[shape]) return false;
      this.selectedShape = shape;
      this.el.shapeButtons.forEach(button => {
        const active = button.dataset.shape === shape;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
      });
      this.updateStartDetails();
      if (shouldAnnounce) announce(this.label + ': bangun ruang ' + window.FROG_SHAPES[shape].label + ' dipilih.');
      return true;
    }

    updateStartDetails() {
      const allInLevel = window.FROG_QUESTIONS[this.selectedLevel] || [];
      const bank = this.selectedShape === 'semua'
        ? allInLevel
        : allInLevel.filter(q => q.shape === this.selectedShape);
      const count = Math.min(bank.length, CONFIG.questionsPerRound || 10);
      if (this.el.selectedQuestionCount) this.el.selectedQuestionCount.textContent = count;
    }

    selectLevel(level, shouldAnnounce = true) {
      if (!levelInfo[level] || !window.FROG_QUESTIONS[level]) return false;
      this.selectedLevel = level;
      const sec = levelInfo[level]?.seconds || 60;
      this.el.levelButtons.forEach(button => {
        const active = button.dataset.level === level;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
      });
      this.el.selectedLevelLabel.textContent = levelInfo[level].label;
      if (this.el.selectedLevelTime) this.el.selectedLevelTime.textContent = sec;
      this.updateStartDetails();
      if (shouldAnnounce) announce(this.label + ': level ' + levelInfo[level].label + ' (' + sec + ' detik) dipilih. ' + levelInfo[level].description + '.');
      return true;
    }

    hud() {
      this.el.livesValue.textContent = this.round ? this.round.lives : CONFIG.lives;
      this.el.scoreValue.textContent = this.round ? this.round.score : 0;
    }

    clock() {
      const totalSec = this.round?.secondsPerQuestion || levelInfo[this.selectedLevel]?.seconds || 60;
      const seconds = Math.max(0, Math.ceil(this.remainingMs / 1000));
      this.el.secondsValue.textContent = seconds;
      this.el.countdown.setAttribute('aria-label', seconds + ' detik tersisa untuk ' + this.label);
      this.el.countdown.classList.toggle('urgent', seconds <= 5);
      this.el.timerProgress.style.strokeDashoffset = String(213.63 * (1 - Math.max(0, this.remainingMs) / (totalSec * 1000)));
      this.el.elapsedValue.textContent = formatTime(this.elapsedMs);
    }

    clearFrog() {
      this.el.frog.getAnimations?.({ subtree: true }).forEach(animation => animation.cancel());
      this.el.frog.style.left = '';
      this.el.frog.style.top = '';
      this.el.frog.style.transform = '';
      this.facingAngle = 0;
      this.el.frog.className = 'frog idle';
      if (this.el.frogImg) this.el.frogImg.src = 'assets/frogi.png';
    }

    showQuestion() {
      if (!this.round || this.round.status !== 'playing') return;
      const question = this.round.question;
      const totalSec = this.round.secondsPerQuestion || 60;
      this.remainingMs = totalSec * 1000;
      this.el.questionCounter.textContent = 'Soal ' + (this.round.index + 1) + ' / ' + this.round.questions.length + ' · ' + levelInfo[this.round.level].label + ' (' + totalSec + 's)';
      
      formatMath(this.el.questionText, question.text);

      if (this.el.questionIllustration) {
        if (question.illustration && window.FrogIllustrations) {
          const svg = window.FrogIllustrations.getIllustration(question.illustration);
          if (svg) {
            this.el.questionIllustration.innerHTML = svg;
            this.el.questionIllustration.hidden = false;
          } else {
            this.el.questionIllustration.hidden = true;
            this.el.questionIllustration.innerHTML = '';
          }
        } else {
          this.el.questionIllustration.hidden = true;
          this.el.questionIllustration.innerHTML = '';
        }
      }

      this.el.buttons.forEach((button, index) => {
        button.className = 'answer-pad pad-' + ['a', 'b', 'c', 'd'][index];
        button.disabled = false;
        const text = button.querySelector('.answer-text');
        formatMath(text, question.options[index]);
        text.classList.toggle('long-answer', question.options[index].length > 15);
        button.querySelector('.answer-symbol').textContent = '';
        button.setAttribute('aria-label', labels[index] + '. ' + cleanLatexForSpeech(question.options[index]));
      });
      this.el.feedback.className = 'feedback';
      this.el.feedback.textContent = '';
      this.clearFrog();
      this.hud();
      this.clock();
      announce(this.label + ': soal ' + (this.round.index + 1) + '. ' + cleanLatexForSpeech(question.text) + ' A: ' + cleanLatexForSpeech(question.options[0]) + '. B: ' + cleanLatexForSpeech(question.options[1]) + '. C: ' + cleanLatexForSpeech(question.options[2]) + '. D: ' + cleanLatexForSpeech(question.options[3]));
    }

    startGame(level = this.selectedLevel) {
      if (this.isAnswering) return false;
      if (!this.selectLevel(level, false)) level = this.selectedLevel;
      if (this.el.startPlayerInput) {
        syncPlayerName(this.el.startPlayerInput.value.trim());
      }
      this.session += 1;
      const currentSession = this.session;
      const allInLevel = window.FROG_QUESTIONS[level] || [];
      let roundQuestions;
      if (this.selectedShape === 'semua') {
        roundQuestions = selectBalancedQuestions
          ? selectBalancedQuestions(allInLevel, CONFIG.questionsPerRound || 10)
          : prepareQuestions(allInLevel, Math.random, CONFIG.questionsPerRound || 10);
      } else {
        const bank = allInLevel.filter(q => q.shape === this.selectedShape);
        if (!bank.length) { announce('Belum ada soal untuk kombinasi level dan bangun ruang ini.'); return false; }
        roundQuestions = prepareQuestions(bank, Math.random, CONFIG.questionsPerRound || 10);
      }
      this.round = new Round(roundQuestions, { level });
      const shapeLabel = window.FROG_SHAPES?.[this.selectedShape]?.label || '';
      if (this.el.headingSuffix) this.el.headingSuffix.textContent = ': ' + shapeLabel;
      this.round.level = level;
      this.round.status = 'countdown';
      this.elapsedMs = 0;
      this.paused = false;
      this.isAnswering = false;
      this.lastFrame = performance.now();
      this.el.startScreen.hidden = true;
      this.el.resultScreen.hidden = true;
      if (this.el.resultScoreDetail) this.el.resultScoreDetail.hidden = true;
      this.el.questionBox.hidden = true;
      this.el.answerField.hidden = false;
      this.el.buttons.forEach((button, index) => {
        button.className = 'answer-pad pad-' + ['a', 'b', 'c', 'd'][index];
        button.disabled = true;
        button.querySelector('.answer-text').textContent = '';
        button.querySelector('.answer-symbol').textContent = '';
      });
      this.el.timeGroup.hidden = true;
      this.el.settingsButton.hidden = false;
      this.el.confetti?.replaceChildren();
      this.clearFrog();
      this.hud();
      focusedBoard = this;
      initAudio();
      ensureLoop();
      void this.playCountdown(currentSession);
    }

    async playCountdown(sessionId) {
      if (!this.el.startCountdown) {
        this.finishCountdown(sessionId);
        return;
      }

      this.el.startCountdown.hidden = false;
      this.el.startCountdown.classList.add('active');

      const steps = [
        { text: '3', img: 'assets/count-3.png', freq: 440, isMulai: false, duration: 800 },
        { text: '2', img: 'assets/count-2.png', freq: 554.37, isMulai: false, duration: 800 },
        { text: '1', img: 'assets/count-1.png', freq: 659.25, isMulai: false, duration: 800 },
        { text: 'Mulai!', img: 'assets/count-start.png', freq: 880, isMulai: true, duration: 850 }
      ];

      for (const step of steps) {
        if (sessionId !== this.session) return;

        this.el.countdownImg.src = step.img;
        this.el.countdownImg.alt = step.text;
        this.el.countdownImg.classList.toggle('is-mulai', step.isMulai);

        if (this.el.countdownStage) {
          this.el.countdownStage.className = 'countdown-stage';
          void this.el.countdownStage.offsetWidth;
          this.el.countdownStage.classList.add(step.isMulai ? 'animate-mulai' : 'animate-pop');
        }
        if (this.el.countdownBurst) {
          this.el.countdownBurst.classList.remove('pulse');
          void this.el.countdownBurst.offsetWidth;
          this.el.countdownBurst.classList.add('pulse');
        }
        if (this.el.countdownRipple) {
          this.el.countdownRipple.classList.remove('expand');
          void this.el.countdownRipple.offsetWidth;
          this.el.countdownRipple.classList.add('expand');
        }

        if (step.isMulai) {
          countdownStartSound();
        } else {
          tone(step.freq, 0.22, 0, 'triangle');
        }
        announce(this.label + ': ' + step.text);

        const ok = await this.waitActive(step.duration, sessionId);
        if (!ok || sessionId !== this.session) return;
      }

      if (sessionId !== this.session) return;
      this.finishCountdown(sessionId);
    }

    async finishCountdown(sessionId) {
      if (sessionId !== this.session) return;
      if (!this.round) return;
      this.round.status = 'playing';
      this.el.questionBox.hidden = false;
      this.el.timeGroup.hidden = false;
      this.lastFrame = performance.now();
      this.showQuestion();

      if (this.el.startCountdown) {
        this.el.startCountdown.classList.remove('active');
        this.el.startCountdown.classList.add('fade-out');
        await this.waitActive(350, sessionId);
        if (sessionId === this.session) {
          this.el.startCountdown.hidden = true;
          this.el.startCountdown.classList.remove('fade-out');
        }
      }
    }

    waitActive(ms, id) {
      return new Promise(resolve => {
        let previous = performance.now();
        let left = ms;
        const step = now => {
          if (id !== this.session) { resolve(false); return; }
          if (!this.paused && !document.hidden) left -= (now - previous);
          previous = now;
          if (left <= 0) { resolve(true); return; }
          if (this.paused || document.hidden) {
            setTimeout(() => {
              previous = performance.now();
              if (id === this.session) requestAnimationFrame(step);
              else resolve(false);
            }, 100);
          } else {
            requestAnimationFrame(step);
          }
        };
        requestAnimationFrame(step);
      });
    }

    async faceTarget(choice, id) {
      if (choice === null) return true;
      const frog = this.el.frog;
      const from = frog.getBoundingClientRect();
      const target = this.el.buttons[choice].getBoundingClientRect();
      const frogX = from.left + from.width / 2;
      const frogY = from.top + from.height * .55;
      const targetX = target.left + target.width / 2;
      const targetY = target.top + target.height * .52;
      this.facingAngle = Math.atan2(targetX - frogX, -(targetY - frogY)) * 180 / Math.PI;
      const facing = 'translate(-50%,-55%) rotate(' + this.facingAngle + 'deg)';
      if (!reducedMotion.matches && typeof frog.animate === 'function') {
        const turn = frog.animate([
          { transform: 'translate(-50%,-55%) rotate(0deg)' },
          { transform: facing }
        ], { duration: 150, easing: 'ease-out', fill: 'forwards' });
        try { await turn.finished; } catch (_) { turn.cancel(); return false; }
        if (id !== this.session) { turn.cancel(); return false; }
        turn.cancel();
      }
      frog.style.transform = facing;
      return id === this.session;
    }

    triggerShockwave(xPercent, yPercent) {
      if (reducedMotion.matches) return;
      const el = this.el.shockwave;
      el.style.setProperty('--sx', xPercent + '%');
      el.style.setProperty('--sy', yPercent + '%');
      el.classList.remove('active');
      void el.offsetWidth;
      el.classList.add('active');
    }

    triggerWrongFeedback(xPercent, yPercent) {
      if (this.el.flash) {
        this.el.flash.classList.remove('wrong-flash');
        void this.el.flash.offsetWidth;
        this.el.flash.classList.add('wrong-flash');
      }
      if (reducedMotion.matches) return;
      const heart = document.createElement('span');
      heart.className = 'life-lost-heart';
      heart.textContent = '♥';
      heart.style.left = xPercent + '%';
      heart.style.top = yPercent + '%';
      heart.setAttribute('aria-hidden', 'true');
      this.el.pond.appendChild(heart);
      const cleanHeart = () => { if (heart.parentNode) heart.remove(); };
      heart.addEventListener('animationend', cleanHeart, { once: true });
      setTimeout(cleanHeart, 1000);
    }

    triggerCorrectFeedback(xPercent, yPercent, points) {
      if (reducedMotion.matches) return;
      const score = document.createElement('span');
      score.className = 'floating-score';
      score.textContent = '+' + (points || (this.round ? this.round.pointsPerQuestion : 10));
      score.style.left = xPercent + '%';
      score.style.top = yPercent + '%';
      score.setAttribute('aria-hidden', 'true');
      this.el.pond.appendChild(score);
      const cleanScore = () => { if (score.parentNode) score.remove(); };
      score.addEventListener('animationend', cleanScore, { once: true });
      setTimeout(cleanScore, 1100);
    }

    async jump(choice, id) {
      const frog = this.el.frog;
      const frogImg = this.el.frogImg;
      frog.classList.remove('idle');
      if (choice === null) {
        const pond = this.el.pond.getBoundingClientRect();
        const from = frog.getBoundingClientRect();
        this.lastLanding = {
          x: (from.left + from.width / 2 - pond.left) / pond.width * 100,
          y: (from.top + from.height * .55 - pond.top) / pond.height * 100
        };
        return this.waitActive(150, id);
      }
      frog.classList.add('jumping');
      croakSound();
      if (frogImg) frogImg.src = 'assets/froge.png';
      const pond = this.el.pond.getBoundingClientRect();
      const from = frog.getBoundingClientRect();
      const target = this.el.buttons[choice].getBoundingClientRect();
      const fromX = (from.left + from.width / 2 - pond.left) / pond.width * 100;
      const fromY = (from.top + from.height * .55 - pond.top) / pond.height * 100;
      const toX = (target.left + target.width / 2 - pond.left) / pond.width * 100;
      const toY = (target.top + target.height * .52 - pond.top) / pond.height * 100;
      this.lastLanding = { x: toX, y: toY };
      if (!reducedMotion.matches && typeof frog.animate === 'function') {
        const arcLift = Math.abs(toY - fromY) / 2 + 16;
        const jumpPoint = (progress, lift, scaleX, scaleY) => ({
          left: fromX + (toX - fromX) * progress + '%',
          top: fromY + (toY - fromY) * progress - arcLift * lift + '%',
          transform: 'translate(-50%,-55%) rotate(' + this.facingAngle + 'deg) scale(' + scaleX + ',' + scaleY + ')',
          offset: progress
        });
        const motion = frog.animate([
          jumpPoint(0, 0, 1, 1),
          jumpPoint(.12, .16, .95, .96),
          jumpPoint(.24, .46, .98, .93),
          jumpPoint(.36, .8, 1.04, .9),
          jumpPoint(.5, 1, 1.1, .88),
          jumpPoint(.64, .8, 1.08, .9),
          jumpPoint(.76, .46, 1.04, .93),
          jumpPoint(.88, .16, 1.02, .97),
          jumpPoint(1, 0, 1, 1)
        ], { duration: 650, easing: 'linear', fill: 'forwards' });
        try { await motion.finished; } catch (_) {
          frog.classList.remove('jumping');
          if (frogImg) frogImg.src = 'assets/frogi.png';
          return false;
        }
        if (id !== this.session) {
          frog.classList.remove('jumping');
          if (frogImg) frogImg.src = 'assets/frogi.png';
          return false;
        }
        frog.style.left = toX + '%';
        frog.style.top = toY + '%';
        frog.style.transform = 'translate(-50%,-55%) rotate(' + this.facingAngle + 'deg)';
        motion.cancel();
      } else {
        frog.style.left = toX + '%';
        frog.style.top = toY + '%';
        frog.style.transform = 'translate(-50%,-55%) rotate(' + this.facingAngle + 'deg)';
      }
      this.triggerShockwave(toX, toY);
      frog.classList.remove('jumping');
      if (frogImg) frogImg.src = 'assets/frogi.png';
      return id === this.session;
    }

    async choose(choice) {
      if (!this.round || this.round.status !== 'playing' || this.paused || this.isAnswering) return false;
      this.isAnswering = true;
      const id = this.session;
      const question = this.round.question;
      const result = this.round.answer(choice);
      if (!result) {
        this.isAnswering = false;
        return false;
      }
      this.el.buttons.forEach(button => { button.disabled = true; });
      if (choice !== null) this.el.buttons[choice].classList.add('selected');
      tone(350, .07);
      if (choice !== null && (!await this.faceTarget(choice, id) || id !== this.session)) {
        this.isAnswering = false;
        return false;
      }
      if (!await this.jump(choice, id) || id !== this.session) {
        this.isAnswering = false;
        return false;
      }
      if (choice !== null) {
        const landedPad = this.el.buttons[choice];
        const landedImg = landedPad.querySelector('img');
        if (landedImg && !reducedMotion.matches) {
          landedPad.classList.add('landed');
          const cleanLanded = () => landedPad.classList.remove('landed');
          landedImg.addEventListener('animationend', cleanLanded, { once: true });
          setTimeout(cleanLanded, 900);
        }
      }
      const landing = this.lastLanding || { x: 50, y: 90 };
      const toX = landing.x, toY = landing.y;
      this.el.buttons.forEach((button, index) => {
        if (index === question.answer) {
          button.classList.add('correct');
        } else if (index === choice) {
          button.classList.add('incorrect');
          button.querySelector('.answer-symbol').textContent = '×';
        } else {
          button.classList.add('muted');
        }
      });
      this.hud();
      const points = this.round ? this.round.pointsPerQuestion : 10;
      const text = result.correct ? ('Benar! +' + points + ' poin') : result.timedOut ? 'Waktu habis. −1 nyawa' : 'Belum tepat. −1 nyawa';
      this.el.feedback.textContent = text;
      this.el.feedback.className = 'feedback visible' + (result.correct ? '' : ' error');
      if (result.correct) {
        correctSound();
        this.triggerCorrectFeedback(toX, toY, points);
      } else {
        wrongSound();
        this.el.frog.classList.add('sink');
        this.triggerWrongFeedback(toX, toY);
      }
      announce(this.label + ': ' + text + '. Jawaban benar: ' + cleanLatexForSpeech(question.options[question.answer]) + '.');
      if (!await this.waitActive(result.correct ? 1050 : 1700, id) || id !== this.session) {
        this.isAnswering = false;
        return false;
      }
      if (this.round.advance()) {
        this.isAnswering = false;
        this.showQuestion();
      } else {
        this.isAnswering = false;
        this.showResult();
      }
      return true;
    }

    showResult() {
      if (!this.round) return;
      this.round.finish();
      this.paused = false;
      this.isAnswering = false;
      ensureLoop();
      if (this.el.startCountdown) {
        this.el.startCountdown.classList.remove('active', 'fade-out');
        this.el.startCountdown.hidden = true;
      }
      this.el.answerField.hidden = true;
      this.el.questionBox.hidden = true;
      this.el.timeGroup.hidden = true;
      this.el.settingsButton.hidden = true;
      this.el.feedback.className = 'feedback';
      this.el.resultScreen.hidden = false;
      if (this.el.resultPlayerName) {
        this.el.resultPlayerName.textContent = this.playerName || getStoredPlayerName() || 'Pemain';
      }

      const bonusInfo = this.round.calculateBonus(this.elapsedMs);
      const isWon = this.round.isWon;

      this.el.resultTitle.textContent = isWon ? 'KAMU MENANG!' : 'COBA LAGI!';
      if (isWon) {
        this.el.resultMessage.textContent = this.round.correct === this.round.questions.length
          ? 'Sempurna! Semua jawabanmu benar.'
          : 'Hebat! Kamu berhasil menang.';
      } else {
        if (this.round.lives === 0) {
          this.el.resultMessage.textContent = 'Nyawa habis. Pelajari pembahasan, lalu coba lagi.';
        } else {
          this.el.resultMessage.textContent = 'Nilai belum mencapai batas tuntas (minimal 60%). Ayo pelajari pembahasan, lalu coba lagi.';
        }
      }

      if (this.el.resultIcon) this.el.resultIcon.textContent = isWon ? '🏆' : '♡';
      this.el.resultScore.textContent = this.round.score;

      if (this.el.resultScoreDetail) {
        if (isWon && bonusInfo.total > 0) {
          this.el.resultScoreDetail.textContent = '(Dasar ' + this.round.baseScore + ' + Bonus ' + bonusInfo.total + ')';
          this.el.resultScoreDetail.hidden = false;
        } else if (!isWon) {
          this.el.resultScoreDetail.textContent = '(Belum tuntas · KKM 60%)';
          this.el.resultScoreDetail.hidden = false;
        } else {
          this.el.resultScoreDetail.hidden = true;
        }
      }

      this.el.resultCorrect.textContent = this.round.correct + ' / ' + this.round.questions.length;
      this.el.resultTime.textContent = formatTime(this.elapsedMs);
      this.el.resultTitle.focus({ preventScroll: true });
      finishSound(isWon);
      this.makeConfetti(isWon);
      const winStatus = isWon ? 'Kamu menang!' : 'Coba lagi.';
      announce(this.label + ': permainan selesai. ' + winStatus + ' Skor ' + this.round.score + '. ' + this.round.correct + ' dari ' + this.round.questions.length + ' jawaban benar.');
      this.hud();
    }

    makeConfetti(enabled) {
      const holder = this.el.confetti;
      holder.replaceChildren();
      if (!enabled || reducedMotion.matches) return;
      const colors = ['#d5fa8e', '#ffdb40', '#72ceec', '#fff8cf', '#b094e8'];
      for (let index = 0; index < 28; index += 1) {
        const piece = document.createElement('i');
        piece.style.setProperty('--x', ((index * 37) % 100) + '%');
        piece.style.setProperty('--c', colors[index % 5]);
        piece.style.setProperty('--d', (3 + index % 4) + 's');
        piece.style.setProperty('--delay', (-index * .21) + 's');
        piece.style.setProperty('--r', (index * 23) + 'deg');
        holder.append(piece);
      }
    }

    pause() {
      if (!this.isActive()) return;
      this.paused = true;
      this.el.frog.getAnimations?.({ subtree: true }).forEach(animation => animation.pause());
      ensureLoop();
    }

    resume() {
      if (!this.isActive() || document.hidden) return;
      this.paused = false;
      this.lastFrame = performance.now();
      this.el.frog.getAnimations?.({ subtree: true }).forEach(animation => animation.play());
      ensureLoop();
    }

    tick(now) {
      const delta = this.lastFrame ? Math.min(now - this.lastFrame, 100) : 0;
      this.lastFrame = now;
      if (!this.isActive() || this.paused || document.hidden) return;
      if (this.round.status === 'countdown') return;
      this.elapsedMs += delta;
      if (this.round.status === 'playing') {
        this.remainingMs = Math.max(0, this.remainingMs - delta);
        if (this.remainingMs === 0) void this.choose(null);
      }
      this.clock();
    }

    snapshot() {
      return {
        team: this.team.number,
        teamLabel: this.label,
        status: this.round ? this.round.status : 'ready',
        level: this.round ? this.round.level : this.selectedLevel,
        levelLabel: levelInfo[this.round ? this.round.level : this.selectedLevel].label,
        shape: this.selectedShape,
        shapeLabel: window.FROG_SHAPES?.[this.selectedShape]?.label || '',
        paused: this.paused,
        score: this.round ? this.round.score : 0,
        lives: this.round ? this.round.lives : CONFIG.lives,
        correct: this.round ? this.round.correct : 0,
        total: this.round ? this.round.questions.length : window.FROG_QUESTIONS[this.selectedLevel].filter(q => q.shape === this.selectedShape).length,
        elapsed: formatTime(this.elapsedMs),
        secondsRemaining: Math.ceil(this.remainingMs / 1000),
        question: this.isActive() ? {
          id: this.round.question.id,
          number: this.round.index + 1,
          text: this.round.question.text,
          options: this.round.question.options.map((text, index) => ({ index, label: labels[index], text }))
        } : null
      };
    }
  }

  const teamDefinitions = [
    { number: 1, label: 'Pemain', className: 'team-one', color: '#d5fb91' }
  ];

  teamDefinitions.forEach(team => {
    const root = template.content.firstElementChild.cloneNode(true);
    stage.append(root);
    try {
      boards.push(new GameBoard(root, team));
    } catch (error) {
      console.error('Gagal memuat papan permainan:', error);
      root.innerHTML = '<div style="padding:32px;text-align:center;color:#fff;font-family:sans-serif;">' +
        '<p style="font-size:18px;font-weight:bold;margin-bottom:8px;">Game gagal dimuat</p>' +
        '<p style="opacity:.85;">Silakan muat ulang halaman. Jika masalah berlanjut, hubungi pengelola.</p>' +
        '</div>';
    }
  });

  const settingsDialog = document.querySelector('#settings-dialog');
  const helpDialog = document.querySelector('#help-dialog');
  const reportDialog = document.querySelector('#report-dialog');
  const dialogs = [settingsDialog, helpDialog, reportDialog];
  const pausedForDialog = new Map();
  let dialogBoard = null;

  // Dialog berada di dalam elemen split-stage agar ikut tampil ketika dua papan dibuat layar penuh.
  dialogs.forEach(dialog => stage.appendChild(dialog));

  function openDialog(dialog, board = null) {
    if (dialog.open) return;
    const toPause = dialog === helpDialog ? boards.filter(item => item.isActive()) : board?.isActive() ? [board] : [];
    toPause.forEach(item => item.pause());
    pausedForDialog.set(dialog, toPause);
    dialogBoard = board;
    if (dialog === settingsDialog) {
      document.querySelector('#pause-note').textContent = board?.isActive() ? board.label + ' dijeda. Waktu tidak berjalan.' : 'Atur suara permainan.';
      document.querySelector('#quit-button').hidden = !board?.isActive();
    }
    dialog.showModal();
  }

  function closeDialog(dialog) {
    if (dialog.open) dialog.close();
  }

  dialogs.forEach(dialog => dialog.addEventListener('close', () => {
    const toResume = pausedForDialog.get(dialog) || [];
    pausedForDialog.delete(dialog);
    if (!document.hidden && !dialogs.some(item => item.open)) toResume.forEach(item => item.resume());
    if (dialog === settingsDialog || dialog === reportDialog) dialogBoard = null;
    ensureLoop();
  }));

  document.querySelector('#help-button').addEventListener('click', () => openDialog(helpDialog));
  document.querySelector('#close-settings').addEventListener('click', () => closeDialog(settingsDialog));
  document.querySelector('#continue-button').addEventListener('click', () => { initAudio(); closeDialog(settingsDialog); });
  document.querySelector('#close-help').addEventListener('click', () => closeDialog(helpDialog));
  document.querySelector('#help-done').addEventListener('click', () => closeDialog(helpDialog));
  document.querySelector('#close-report').addEventListener('click', () => closeDialog(reportDialog));
  document.querySelector('#sound-toggle').addEventListener('change', event => {
    sound = event.target.checked;
    if (sound) initAudio();
  });
  document.querySelector('#quit-button').addEventListener('click', () => {
    const board = dialogBoard;
    if (!board) return;
    board.session += 1;
    board.isAnswering = false;
    board.el.frog.getAnimations?.({ subtree: true }).forEach(animation => animation.cancel());
    closeDialog(settingsDialog);
    board.showResult();
  });

  function getFullscreenElement() {
    return document.fullscreenElement || document.webkitFullscreenElement || null;
  }

  const fullscreenBtn = document.querySelector('#fullscreen-button');
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', async () => {
      try {
        if (getFullscreenElement()) {
          if (document.exitFullscreen) await document.exitFullscreen();
          else if (document.webkitExitFullscreen) await document.webkitExitFullscreen();
        } else {
          if (stage.requestFullscreen) await stage.requestFullscreen();
          else if (stage.webkitRequestFullscreen) await stage.webkitRequestFullscreen();
          else announce('Layar penuh tidak didukung oleh browser ini.');
        }
      } catch (_) {
        announce('Layar penuh tidak diizinkan oleh browser ini.');
      }
    });
  }

  ['fullscreenchange', 'webkitfullscreenchange'].forEach(evt => {
    document.addEventListener(evt, () => {
      const isFullscreen = Boolean(getFullscreenElement());
      if (fullscreenBtn) {
        fullscreenBtn.setAttribute('aria-label', isFullscreen ? 'Keluar layar penuh' : 'Layar penuh');
        fullscreenBtn.title = isFullscreen ? 'Keluar layar penuh' : 'Layar penuh';
      }
    });
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      boards.forEach(board => board.pause());
    } else if (!dialogs.some(dialog => dialog.open)) {
      boards.forEach(board => board.resume());
    }
    ensureLoop();
  });

  document.addEventListener('keydown', event => {
    if (event.repeat || event.ctrlKey || event.metaKey || event.altKey || dialogs.some(dialog => dialog.open) || /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName)) return;
    const board = focusedBoard?.isActive() ? focusedBoard : boards.find(item => item.isActive());
    const key = event.key.toLowerCase();
    if (board?.isActive() && !board.paused) {
      const index = { a: 0, b: 1, c: 2, d: 3, '1': 0, '2': 1, '3': 2, '4': 3 }[key];
      if (index !== undefined && board.round?.status === 'playing') {
        event.preventDefault();
        initAudio();
        void board.choose(index);
      } else if (key === 'escape') {
        event.preventDefault();
        openDialog(settingsDialog, board);
      }
    }
  });

  function buildReport(board) {
    if (!board?.round) return;
    const content = document.querySelector('#report-content');
    content.replaceChildren();

    const shapeLabel = window.FROG_SHAPES?.[board.selectedShape]?.label;
    const playerName = board.playerName || getStoredPlayerName() || board.label || 'Pemain';
    const total = board.round.questions.length;
    const correct = board.round.correct;
    const wrong = total - correct;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
    const isWon = board.round.isWon;

    // Header ringkasan edukatif
    const summaryCard = document.createElement('div');
    summaryCard.className = 'report-summary-card';
    summaryCard.innerHTML = `
      <div class="report-summary-stat"><span>SKOR AKHIR</span><b>${board.round.score}</b></div>
      <div class="report-summary-stat"><span>BENAR</span><b>${correct} / ${total}</b></div>
      <div class="report-summary-stat"><span>AKURASI</span><b>${accuracy}%</b></div>
      <div class="report-summary-stat"><span>WAKTU</span><b>${formatTime(board.elapsedMs)}</b></div>
      <div class="report-summary-badge ${isWon ? 'passed' : 'failed'}">
        ${isWon ? '🏆 Tuntas (KKM 60%)' : '♡ Belum Tuntas (KKM 60%)'}
      </div>
    `;
    content.append(summaryCard);

    // Filter interaktif untuk pembahasan
    const filterContainer = document.createElement('div');
    filterContainer.className = 'report-filters';
    filterContainer.setAttribute('role', 'tablist');
    filterContainer.setAttribute('aria-label', 'Filter pembahasan');

    const btnAll = document.createElement('button');
    btnAll.className = 'report-filter-btn active';
    btnAll.type = 'button';
    btnAll.textContent = `Semua Soal (${total})`;

    const btnWrong = document.createElement('button');
    btnWrong.className = 'report-filter-btn';
    btnWrong.type = 'button';
    btnWrong.textContent = `Perlu Dipelajari / Salah (${wrong})`;

    const btnCorrect = document.createElement('button');
    btnCorrect.className = 'report-filter-btn';
    btnCorrect.type = 'button';
    btnCorrect.textContent = `Sudah Benar (${correct})`;

    filterContainer.append(btnAll, btnWrong, btnCorrect);
    content.append(filterContainer);

    const itemElements = [];

    board.round.questions.forEach((question, index) => {
      const result = board.round.answers[index];
      const isCorrect = Boolean(result && result.correct);
      const item = document.createElement('article');
      item.className = 'report-item';
      item.dataset.status = isCorrect ? 'correct' : 'wrong';

      const itemInner = document.createElement('div');
      itemInner.className = 'report-item-inner';

      if (question.illustration && window.FrogIllustrations) {
        const svg = window.FrogIllustrations.getIllustration(question.illustration);
        if (svg) {
          const illCard = document.createElement('div');
          illCard.className = 'report-illustration';
          illCard.setAttribute('aria-hidden', 'true');
          illCard.innerHTML = svg;
          itemInner.append(illCard);
        }
      }

      const body = document.createElement('div');
      body.className = 'report-body';

      const title = document.createElement('h3');
      const badge = document.createElement('span');
      badge.className = 'report-status' + (!result ? ' unanswered' : !result.correct ? ' wrong' : '');
      badge.textContent = !result ? 'Belum dijawab' : result.correct ? 'Benar' : result.timedOut ? 'Waktu habis' : 'Belum tepat';
      title.append(badge);

      const titleText = document.createElement('span');
      formatMath(titleText, (index + 1) + '. ' + question.text);
      title.append(titleText);

      const answer = document.createElement('p');
      const yourAns = !result ? '—' : result.choice === null ? 'Tidak menjawab' : question.options[result.choice];
      answer.textContent = 'Jawabanmu: ';
      const ansSpan = document.createElement('span');
      formatMath(ansSpan, yourAns);
      answer.append(ansSpan);

      const correctP = document.createElement('p');
      const strong = document.createElement('strong');
      strong.textContent = 'Jawaban benar: ';
      const correctSpan = document.createElement('span');
      formatMath(correctSpan, question.options[question.answer]);
      strong.append(correctSpan);
      correctP.append(strong);

      const explanation = document.createElement('p');
      explanation.className = 'explanation';
      formatMath(explanation, question.explanation);

      body.append(title, answer, correctP, explanation);
      itemInner.append(body);
      item.append(itemInner);
      content.append(item);
      itemElements.push(item);
    });

    const setFilter = (type) => {
      [btnAll, btnWrong, btnCorrect].forEach(b => b.classList.remove('active'));
      if (type === 'all') btnAll.classList.add('active');
      if (type === 'wrong') btnWrong.classList.add('active');
      if (type === 'correct') btnCorrect.classList.add('active');

      itemElements.forEach(el => {
        if (type === 'all') {
          el.hidden = false;
        } else if (type === 'wrong') {
          el.hidden = el.dataset.status !== 'wrong';
        } else if (type === 'correct') {
          el.hidden = el.dataset.status !== 'correct';
        }
      });
    };

    btnAll.addEventListener('click', () => setFilter('all'));
    btnWrong.addEventListener('click', () => setFilter('wrong'));
    btnCorrect.addEventListener('click', () => setFilter('correct'));

    openDialog(reportDialog, board);
  }

  function registerTools() {
    const context = document.modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    const getBoard = () => boards[0];
    const specs = [
      {
        name: 'get_game_state',
        title: 'Lihat status permainan',
        description: 'Membaca soal, pilihan jawaban, skor, nyawa, dan timer untuk papan permainan.',
        inputSchema: { type: 'object', properties: {}, additionalProperties: false },
        annotations: { readOnlyHint: true, untrustedContentHint: false },
        execute: () => getBoard().snapshot()
      },
      {
        name: 'start_game',
        title: 'Mulai permainan',
        description: 'Memulai permainan baru.',
        inputSchema: {
          type: 'object',
          properties: {
            level: { type: 'string', enum: ['mudah', 'sedang', 'sulit'] },
            shape: { type: 'string', enum: ['semua', 'kubus', 'balok', 'prisma', 'limas'] }
          },
          additionalProperties: false
        },
        annotations: { readOnlyHint: false, untrustedContentHint: false },
        execute: input => {
          const board = getBoard();
          if (board.isActive()) throw new Error('Permainan masih berjalan.');
          if (input?.shape) board.selectShape(input.shape, false);
          board.startGame(input?.level || board.selectedLevel);
          return board.snapshot();
        }
      },
      {
        name: 'answer_question',
        title: 'Pilih jawaban',
        description: 'Memilih satu daun untuk soal yang sedang ditampilkan.',
        inputSchema: { type: 'object', properties: { questionId: { type: 'string' }, optionIndex: { type: 'integer', minimum: 0, maximum: 3 } }, required: ['questionId', 'optionIndex'], additionalProperties: false },
        annotations: { readOnlyHint: false, untrustedContentHint: false },
        execute: async input => {
          const board = getBoard();
          if (!input || typeof input.questionId !== 'string' || !Number.isInteger(input.optionIndex) || input.optionIndex < 0 || input.optionIndex > 3) throw new Error('Pilihan tidak valid.');
          if (!board.round || board.round.status !== 'playing' || board.paused || board.round.question.id !== input.questionId) throw new Error('Soal sudah berubah atau permainan sedang dijeda.');
          await board.choose(input.optionIndex);
          return board.snapshot();
        }
      }
    ];
    specs.forEach(tool => {
      try { Promise.resolve(context.registerTool(tool, { signal: lifecycle.signal })).catch(() => {}); } catch (_) { /* Browser tanpa dukungan tetap berfungsi. */ }
    });
    window.addEventListener('pagehide', () => lifecycle.abort(), { once: true });
  }

  let animFrameId = null;

  function isAnyBoardActive() {
    return boards.some(b => b.isActive() && !b.paused);
  }

  function startLoop() {
    if (animFrameId !== null) return;
    function loop(now) {
      animFrameId = null;
      if (!isAnyBoardActive() || document.hidden) {
        return;
      }
      boards.forEach(board => board.tick(now));
      animFrameId = requestAnimationFrame(loop);
    }
    animFrameId = requestAnimationFrame(loop);
  }

  function stopLoop() {
    if (animFrameId !== null) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }
  }

  function ensureLoop() {
    if (isAnyBoardActive() && !document.hidden) {
      startLoop();
    } else {
      stopLoop();
    }
  }

  registerTools();
  ensureLoop();
})();
