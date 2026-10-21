window.CakeRush = window.CakeRush || {};

(function (CR) {
  const state = {
    score: 0,
    totalScore: 0,
    roundScore: 0,
    step: 1,
    screen: 'splash',
    recipeIndex: 0,
    form: null,
    collected: new Set(),
    moldOk: false,
    mixOk: false,
    baked: false,
    mixTimer: null,
    ovenTimer: null,
    loadingTimer: null,
    speechOn: false,
    decorStage: 1,
    frosting: '#ffd9e7',
    sidePattern: 'smooth',
    syrup: '#f3b64a',
    piping: 'dot',
    syrupPaths: [],
    toppings: [],
    availableToppings: [],
    pipingDots: [],
    topDrawing: false,
    lastPoint: null,
    selectedTopping: null,
    decorationDone: [false, false, false],
    pointerCleanup: null
  };

  CR.state = state;

  CR.currentRecipe = function () {
    return CR.recipes[state.recipeIndex];
  };

  CR.currentForm = function () {
    return state.form || CR.currentRecipe().form;
  };

  CR.currentFormName = function () {
    return CR.moldItems.find((m) => m.id === CR.currentForm())?.label || CR.currentRecipe().formName;
  };

  CR.required = function () {
    return CR.currentRecipe().ingredients.map((x) => x.id);
  };

  CR.shuffleArray = function (arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  CR.clearTimers = function () {
    if (state.mixTimer) {
      clearInterval(state.mixTimer);
      state.mixTimer = null;
    }
    if (state.ovenTimer) {
      clearInterval(state.ovenTimer);
      state.ovenTimer = null;
    }
    if (state.loadingTimer) {
      clearTimeout(state.loadingTimer);
      state.loadingTimer = null;
    }
    if (state.pointerCleanup) state.pointerCleanup();
  };

  CR.updateHud = function (show = true) {
    CR.hud.classList.toggle('hidden', !show);
    CR.scoreEl.textContent = state.score;
    CR.stepEl.textContent = state.step;
    CR.recipeNameEl.textContent = CR.currentRecipe().name;
  };

  CR.addScore = function (n, animate = false) {
    const before = state.roundScore;
    const next = Math.min(100, Math.max(0, state.roundScore + n));
    const gained = next - before;
    state.roundScore = next;
    state.score = state.totalScore + state.roundScore;
    CR.scoreEl.textContent = state.score;
    if (animate && gained !== 0) {
      const el = document.getElementById('score-fly');
      if (el) {
        el.textContent = `${gained > 0 ? '+' : ''}${gained}`;
        el.classList.remove('show');
        void el.offsetWidth;
        el.classList.add('show');
      }
    }
  };

  CR.bankCurrentRound = function () {
    state.totalScore += state.roundScore;
    state.roundScore = 0;
    state.score = state.totalScore;
  };

  CR.resetProgress = function (keepScore = false) {
    CR.clearTimers();
    state.collected = new Set();
    state.form = CR.moldItems[Math.floor(Math.random() * CR.moldItems.length)].id;
    state.moldOk = false;
    state.mixOk = false;
    state.baked = false;
    state.decorStage = 1;
    state.frosting = CR.currentRecipe().decor.frosting;
    state.sidePattern = 'smooth';
    state.syrup = CR.currentRecipe().decor.syrup;
    state.piping = CR.currentRecipe().decor.piping;
    state.syrupPaths = [];
    state.toppings = [];
    state.availableToppings = CR.shuffleArray(CR.decoration.toppings).slice(0, 6);
    state.selectedTopping = null;
    state.decorationDone = [false, false, false];
    state.roundScore = 0;
    if (!keepScore) state.totalScore = 0;
    state.score = state.totalScore;
    state.step = 1;
  };
})(window.CakeRush);
