window.CakeRush = window.CakeRush || {};

(function (CR) {
  const tutorialText = 'COMO JOGAR: PRIMEIRO, ABRA A RECEITA E CONFIRA OS INGREDIENTES, A FORMA E O ESTILO DE DECORAÇÃO. DEPOIS PEGUE OS INGREDIENTES NO ARMÁRIO E NA GELADEIRA, ESCOLHA A FORMA CORRETA E MISTURE NA BATEDEIRA OU NA VASILHA. EM SEGUIDA ASSE O BOLO. DEPOIS DO FORNO, ENTRE NA DECORAÇÃO: ESCOLHA A COBERTURA, FAÇA A CALDA E COLOQUE TOPPINGS E DETALHES DE GLACÊ.';

  CR.showSplash = function () {
    CR.clearTimers();
    CR.stopSpeech();
    CR.state.screen = 'splash';
    CR.clearOverlay();
    CR.updateHud(false);
    CR.logoTop.classList.add('hidden');
    CR.setScene('bg-splash');
    CR.overlay.innerHTML = `<img class="splash-image" src="assets/p1.PNG" alt="CAKE RUSH">
      <button type="button" class="full-click" aria-label="TOQUE PARA CONTINUAR"></button>
      <button type="button" class="splash-continue-btn" aria-label="TOQUE PARA CONTINUAR">TOQUE PARA CONTINUAR</button>`;
    const splashButton = CR.overlay.querySelector('.full-click');
    const splashContinueBtn = CR.overlay.querySelector('.splash-continue-btn');
    const continueOnce = () => {
      if (CR.state.screen !== 'splash') return;
      CR.continueSplash();
    };
    splashButton.addEventListener('click', continueOnce, { once: true });
    splashContinueBtn?.addEventListener('click', continueOnce, { once: true });
    CR.overlay.onclick = (e) => {
      if (CR.state.screen === 'splash' && !e.target.closest('.splash-continue-btn')) continueOnce();
    };
  };

  CR.continueSplash = function () {
    CR.showLoading();
  };

  CR.showLoading = function () {
    CR.clearTimers();
    CR.state.screen = 'loading';
    CR.clearOverlay();
    CR.updateHud(false);
    CR.setScene('bg-load');
    CR.logoTop.classList.remove('hidden');
    CR.overlay.innerHTML = `<div class="center-card load-card">
      <div class="load-logo">Cake<br><span>Rush</span></div>
      <h2>CARREGANDO...</h2>
      <div class="progress"><div id="loadbar"></div></div>
      <p id="loadtext">Preparando a cozinha, receitas e decoração…</p>
    </div>`;
    requestAnimationFrame(() => {
      const bar = document.getElementById('loadbar');
      if (!bar) return;
      bar.style.transition = 'width 1500ms ease';
      bar.style.width = '100%';
    });
    CR.state.loadingTimer = setTimeout(() => {
      CR.state.loadingTimer = null;
      CR.showMenu();
    }, 1600);
  };

  CR.showMenu = function () {
    CR.stopSpeech();
    CR.state.screen = 'menu';
    CR.clearOverlay();
    CR.updateHud(false);
    CR.setScene('bg-menu');
    CR.logoTop.classList.remove('hidden');
    CR.overlay.innerHTML = `<div class="center-card" style="top:54%">
      <h2>Vamos assar?</h2>
      <p>Escolha uma sequência de bolo para começar.</p>
      ${CR.button('JOGAR', 'recipeSelect')} ${CR.button('COMO JOGAR', 'tutorial', 'secondary')}
    </div>`;
    CR.bindActions(CR.overlay);
  };

  CR.showRecipeSelect = function () {
    CR.stopSpeech();
    CR.state.screen = 'recipeSelect';
    CR.clearOverlay();
    CR.updateHud(false);
    CR.setScene('bg-select');
    CR.logoTop.classList.remove('hidden');
    CR.overlay.innerHTML = `<div class="panel recipe-select">
      <div class="recipe-head">
        <div>
          <h2>ESCOLHA O BOLO</h2>
          <p>ESCOLHA UMA SEQUÊNCIA E DEPOIS DEFINA A FORMA DA RODADA.</p>
        </div>
        <div class="cake-emoji">🎂</div>
      </div>
      <div class="recipe-cards">${CR.recipes.map((r, i) =>
        `<div class="recipe-card" data-action="selectRecipe" data-recipe-index="${i}">
          <div class="card-top"><div class="card-emoji">${r.emoji}</div><h3>${r.name}</h3></div>
          <p>${r.description}</p>
          <span class="recipe-tag">${r.ingredients.length} INGREDIENTES · FORMA VARIÁVEL</span>
        </div>`
      ).join('')}</div>
      <div style="text-align:center;margin-top:14px">${CR.button('VOLTAR', 'menu', 'secondary small')}</div>
    </div>`;
    CR.bindActions(CR.overlay);
  };

  CR.selectRecipe = function (el) {
    const idx = Number(el.dataset.recipeIndex);
    if (!Number.isInteger(idx) || !CR.recipes[idx]) return;
    CR.state.recipeIndex = idx;
    CR.resetProgress(true);
    CR.startGame();
  };

  CR.speakTutorial = function () {
    if (!('speechSynthesis' in window)) {
      CR.toast('Seu navegador não disponibiliza voz neste modo.');
      return;
    }
    speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(tutorialText);
    utter.lang = 'pt-BR';
    utter.rate = 0.96;
    utter.pitch = 1.05;
    CR.state.speechOn = true;
    document.querySelector('.voice-button')?.classList.add('active');
    utter.onend = () => {
      CR.state.speechOn = false;
      document.querySelector('.voice-button')?.classList.remove('active');
    };
    speechSynthesis.speak(utter);
  };

  CR.toggleVoice = function () {
    if (CR.state.speechOn) {
      CR.stopSpeech();
      return;
    }
    CR.speakTutorial();
  };

  CR.showTutorial = function () {
    CR.state.screen = 'tutorial';
    CR.clearOverlay();
    CR.updateHud(false);
    CR.setScene('bg-tutorial');
    CR.logoTop.classList.remove('hidden');
    CR.overlay.innerHTML = `<div class="tutorial-scene">
      <img class="chef-character tutorial-chef" src="assets/chef-page53-normal.png" alt="">
      <div class="speech-bubble tutorial-speech">
        <strong>COMO JOGAR?</strong>
        <span>VEJA A RECEITA, PEGUE OS INGREDIENTES, ESCOLHA A FORMA, MISTURE, ASSE E DECORE O BOLO.</span>
      </div>
      <div class="tutorial-card">
        <div class="tutorial-text">
          <p>1. VEJA A RECEITA E CONFIRA OS INGREDIENTES.</p>
          <p>2. PEGUE TUDO NO ARMÁRIO E NA GELADEIRA.</p>
          <p>3. ESCOLHA A FORMA CORRETA.</p>
          <p>4. MISTURE NA BATEDEIRA OU NA VASILHA.</p>
          <p>5. ASSE O BOLO.</p>
          <p>6. DECORE EM 3 ETAPAS: COBERTURA, CALDA E TOPPINGS.</p>
        </div>
        <button class="voice-button" data-action="toggleVoice" title="OUVIR AS INSTRUÇÕES">🔊</button>
        <div class="small-copy">CLIQUE NO ALTO-FALANTE PARA OUVIR AS INSTRUÇÕES.</div>
        <div class="tutorial-actions">${CR.button('ESCOLHER BOLO', 'recipeSelect', 'green')} ${CR.button('VOLTAR', 'menu', 'secondary small')}</div>
      </div>
    </div>`;
    CR.bindActions(CR.overlay);
  };

  CR.chooseAnotherCake = function () {
    CR.bankCurrentRound();
    CR.showRecipeSelect();
  };

  CR.finish = function () {
    CR.clearTimers();
    CR.clearOverlay();
    CR.setScene('bg-result');
    CR.updateHud(true);
    CR.logoTop.classList.remove('hidden');
    const roundScore = CR.state.roundScore;
    const grandTotal = CR.state.totalScore + CR.state.roundScore;
    CR.overlay.innerHTML = `<div class="final-scene">
      <img class="chef-character final-chef" src="assets/chef-page53-normal.png" alt="">
      <div class="speech-bubble final-speech">
        <strong>VOCÊ FEZ UM ÓTIMO TRABALHO!</strong>
        <span>DESEJA FAZER OUTRO BOLO OU FINALIZAR?</span>
      </div>
      <div class="center-card finish-card">
        ${CR.finalCakeMarkup()}
        <h2>PERFEITO!</h2>
        <p>${CR.currentRecipe().name.toUpperCase()} CONCLUÍDO E DECORADO!</p>
        <p style="font-size:28px;color:var(--red);font-weight:900">${roundScore} PTS NESTA RODADA</p>
        <p class="total-score-line">TOTAL ACUMULADO ATÉ AQUI: ${grandTotal} PTS</p>
        <div class="finish-actions">
          ${CR.button('FAZER OUTRO BOLO', 'chooseAnotherCake', 'green')}
          ${CR.button('REFAZER ESTE', 'replayCurrent', 'gold')}
          ${CR.button('FINALIZAR', 'complete', 'secondary')}
        </div>
      </div>
    </div>`;
    CR.bindActions(CR.overlay);
  };

  CR.restartFromSplash = function () {
    CR.state.totalScore = 0;
    CR.state.roundScore = 0;
    CR.state.score = 0;
    CR.state.step = 1;
    CR.showSplash();
  };

  CR.replayCurrent = function () {
    CR.resetProgress(true);
    CR.startGame();
  };

  CR.complete = function () {
    CR.bankCurrentRound();
    CR.clearTimers();
    CR.clearOverlay();
    CR.updateHud(false);
    CR.setScene('bg-finish');
    CR.logoTop.classList.remove('hidden');
    const grandTotal = CR.state.totalScore;
    CR.overlay.innerHTML = `<div class="final-scene complete-scene" id="complete-screen">
      <img class="chef-character final-chef complete-chef" src="assets/chef-page53-normal.png" alt="">
      <div class="speech-bubble final-speech complete-speech">
        <strong>PARABÉNS!</strong>
        <span>VOCÊ COMPLETOU O CAKE RUSH COM ${grandTotal} PTS.</span>
      </div>
      <div class="center-card">
        <h2>PARABÉNS!</h2>
        <p>VOCÊ COMPLETOU ESTA RODADA DO CAKE RUSH.</p>
        <p class="small-copy">CLIQUE EM QUALQUER LUGAR DA TELA PARA VOLTAR AO INÍCIO.</p>
      </div>
    </div>`;
    CR.overlay.onclick = () => CR.restartFromSplash();
  };
})(window.CakeRush);
