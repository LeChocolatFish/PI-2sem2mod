window.CakeRush = window.CakeRush || {};

(function (CR) {
  CR.scene = document.getElementById('scene');
  CR.overlay = document.getElementById('overlay');
  CR.hud = document.getElementById('hud');
  CR.scoreEl = document.getElementById('score');
  CR.stepEl = document.getElementById('step-label');
  CR.recipeNameEl = document.getElementById('recipe-name');
  CR.toastEl = document.getElementById('toast');
  CR.logoTop = document.getElementById('logo-top');

  let toastTimer = null;

  CR.setScene = function (cls) {
    CR.scene.className = 'scene';
    CR.scene.classList.add(cls);
  };

  CR.clearOverlay = function () {
    CR.overlay.innerHTML = '';
    CR.overlay.onclick = null;
  };

  CR.toast = function (msg) {
    CR.toastEl.textContent = msg;
    CR.toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => CR.toastEl.classList.remove('show'), 1600);
  };

  CR.button = function (label, action, cls = '') {
    return `<button class="btn ${cls}" data-action="${action}">${label}</button>`;
  };

  CR.bindActions = function (root = document) {
    root.querySelectorAll('[data-action]').forEach((el) => {
      if (el.dataset.bound === '1') return;
      el.dataset.bound = '1';
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        el.classList.remove('click-pulse');
        void el.offsetWidth;
        el.classList.add('click-pulse');
        const action = el.dataset.action;
        if (CR.actions[action]) CR.actions[action](el);
      });
    });
  };

  CR.stopSpeech = function () {
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    CR.state.speechOn = false;
    document.querySelector('.voice-button')?.classList.remove('active');
  };
})(window.CakeRush);
