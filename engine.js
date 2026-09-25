/* Logika permainan murni, terpisah dari tampilan agar mudah diuji dan diedit. */
(function (root) {
  'use strict';
  const CONFIG = Object.freeze({
    lives: 5,
    questionsPerRound: 10,
    secondsPerQuestion: Object.freeze({
      mudah: 60,
      sedang: 90,
      sulit: 120
    }),
    defaultSecondsPerQuestion: 60,
    passingThresholdPercent: 60,
    pointsPerCorrect: 10,
    lifeBonusPoints: 2,
    maxSpeedBonusPoints: 10
  });
  function shuffled(items, random = Math.random) {
    const result = items.slice();
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
  function prepareQuestions(bank, random = Math.random, count = null) {
    if (!Array.isArray(bank) || !bank.length) throw new Error('Bank soal kosong.');
    const pool = shuffled(bank, random);
    const selected = (typeof count === 'number' && count > 0 && count < pool.length) ? pool.slice(0, count) : pool;
    return selected.map(q => {
      if (!q || typeof q.text !== 'string' || !Array.isArray(q.options) || q.options.length !== 4 || !Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3) throw new Error('Format soal tidak valid.');
      const choices = shuffled(q.options.map((text, index) => ({ text, index })), random);
      return { ...q, options: choices.map(c => c.text), answer: choices.findIndex(c => c.index === q.answer) };
    });
  }
  function selectBalancedQuestions(questionsList, count = 10, random = Math.random) {
    if (!Array.isArray(questionsList) || !questionsList.length) throw new Error('Bank soal kosong.');
    const grouped = {};
    for (const q of questionsList) {
      const key = q.shape || 'general';
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(q);
    }
    const keys = Object.keys(grouped);
    if (keys.length <= 1) {
      return prepareQuestions(questionsList, random, count);
    }
    const perGroup = Math.floor(count / keys.length);
    let remainder = count % keys.length;
    const selected = [];
    shuffled(keys, random).forEach(key => {
      const take = perGroup + (remainder > 0 ? 1 : 0);
      if (remainder > 0) remainder--;
      const groupShuffled = shuffled(grouped[key], random);
      selected.push(...groupShuffled.slice(0, take));
    });
    return prepareQuestions(selected, random, count);
  }
  class Round {
    constructor(questions, options = {}) {
      this.questions = questions;
      this.index = 0;
      this.lives = options.lives ?? CONFIG.lives;
      this.level = options.level || 'mudah';
      const secMap = CONFIG.secondsPerQuestion;
      const defaultSec = typeof secMap === 'object' ? (secMap[this.level] || CONFIG.defaultSecondsPerQuestion || 20) : (secMap || 20);
      this.secondsPerQuestion = options.secondsPerQuestion ?? defaultSec;
      this.correct = 0;
      this.answers = [];
      this.status = 'playing';
      this.bonus = 0;
      this.bonusDetails = { life: 0, speed: 0, total: 0 };
    }
    get pointsPerQuestion() {
      if (!this.questions || !this.questions.length) return 0;
      return Math.round(100 / this.questions.length);
    }
    get baseScore() {
      if (!this.questions || !this.questions.length) return 0;
      return Math.round((this.correct / this.questions.length) * 100);
    }
    get score() {
      return this.baseScore + (this.bonus || 0);
    }
    get percentage() {
      if (!this.questions || !this.questions.length) return 0;
      return Math.round((this.correct / this.questions.length) * 100);
    }
    get isWon() {
      const survived = this.lives > 0;
      const passed = this.percentage >= (CONFIG.passingThresholdPercent || 60);
      return Boolean(survived && passed);
    }
    calculateBonus(elapsedMs = 0) {
      if (!this.isWon) {
        this.bonus = 0;
        this.bonusDetails = { life: 0, speed: 0, total: 0 };
        return this.bonusDetails;
      }
      const lifeBonus = Math.max(0, this.lives) * (CONFIG.lifeBonusPoints || 2);
      const totalAllowedSec = this.questions.length * this.secondsPerQuestion;
      const elapsedSec = elapsedMs / 1000;
      const remainingSec = Math.max(0, totalAllowedSec - elapsedSec);
      const speedRatio = totalAllowedSec > 0 ? (remainingSec / totalAllowedSec) : 0;
      const speedBonus = Math.round(speedRatio * (CONFIG.maxSpeedBonusPoints || 10));
      this.bonus = lifeBonus + speedBonus;
      this.bonusDetails = { life: lifeBonus, speed: speedBonus, total: this.bonus };
      return this.bonusDetails;
    }
    get question(){return this.questions[this.index];}
    answer(choice){
      if(this.status!=='playing')return null;
      if(choice!==null&&(!Number.isInteger(choice)||choice<0||choice>3))throw new Error('Pilihan jawaban tidak valid.');
      const q=this.question;const isCorrect=choice===q.answer;
      if(isCorrect)this.correct++;else this.lives--;
      const result={questionId:q.id,choice,correct:isCorrect,timedOut:choice===null};
      this.answers.push(result);this.status='feedback';return result;
    }
    advance(){
      if(this.status!=='feedback')return false;
      if(this.lives<=0||this.index>=this.questions.length-1){this.status='ended';return false;}
      this.index++;this.status='playing';return true;
    }
    finish(){this.status='ended';}
  }
  const api = { CONFIG, prepareQuestions, selectBalancedQuestions, Round }; root.FrogEngine = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
