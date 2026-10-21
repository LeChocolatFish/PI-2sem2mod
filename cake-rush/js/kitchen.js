window.CakeRush = window.CakeRush || {};

(function (CR) {
  CR.startGame = function () {
    CR.stopSpeech();
    CR.state.screen = 'game';
    CR.clearTimers();
    CR.clearOverlay();
    CR.updateHud(true);
    CR.setScene('bg-kitchen');
    CR.logoTop.classList.add('hidden');
    CR.renderKitchen();
  };

  CR.renderKitchen = function () {
    CR.clearTimers();
    CR.state.screen = 'game';
    CR.setScene('bg-kitchen');
    const needed = CR.required().length;
    const hint = CR.state.collected.size < needed
      ? 'Pegue os ingredientes. Depois escolha a forma e misture.'
      : (!CR.state.moldOk
        ? 'Ingredientes completos! Agora escolha a forma.'
        : (!CR.state.mixOk
          ? 'Clique na batedeira ou na vasilha para misturar.'
          : (!CR.state.baked
            ? 'Clique no forno para assar o bolo.'
            : 'O bolo está pronto. Agora decore!')));
    CR.overlay.innerHTML = `<div class="kitchen-ui">
      <div class="hotspot hotspot-cabinet" data-action="cabinet" title="Abrir armário"></div>
      <div class="hotspot hotspot-fridge" data-action="fridge" title="Abrir geladeira"></div>
      <div class="hotspot hotspot-mold" data-action="molds" title="Escolher forma"></div>
      <div class="hotspot hotspot-mixer ${!CR.state.mixOk && CR.state.moldOk ? 'pulse' : ''}" data-action="mixMixer" title="Misturar na batedeira"></div>
      <div class="hotspot hotspot-bowl ${!CR.state.mixOk && CR.state.moldOk ? 'pulse' : ''}" data-action="mixSpoon" title="Misturar na vasilha"></div>
      <div class="hotspot hotspot-oven ${CR.state.mixOk && !CR.state.baked ? 'pulse' : ''}" data-action="oven" title="Assar"></div>
      <div class="tooltip" style="left:3%;top:84%;max-width:430px">${hint}</div>
      <div class="inventory-note">${CR.currentRecipe().emoji} ${CR.currentRecipe().name} · Ingredientes: ${CR.state.collected.size}/${needed} · Forma: ${CR.state.moldOk ? '✓' : '—'} · Massa: ${CR.state.mixOk ? '✓' : '—'} · Forno: ${CR.state.baked ? '✓' : '—'}</div>
    </div>`;
    CR.updateHud(true);
    CR.bindActions(CR.overlay);
  };

  CR.recipeModal = function () {
    if (document.getElementById('recipe-modal')) return;
    const r = { ...CR.currentRecipe(), form: CR.currentForm(), formName: CR.currentFormName() };
    const decor = r.decor;
    CR.overlay.insertAdjacentHTML('beforeend', `<div class="modal" id="recipe-modal">
      <div class="panel">
        <div class="recipe-head">
          <div><h2>${r.emoji} ${r.name}</h2><p>${r.description}</p></div>
          <div class="cake-emoji">📖</div>
        </div>
        <div class="recipe-layout">
          <div>
            <h3 style="margin:0 0 10px;color:var(--red)">Ingredientes</h3>
            <div class="recipe-grid">${r.ingredients.map((i) =>
              `<div class="ingredient ${CR.state.collected.has(i.id) ? 'done' : ''}">
                <div class="ingredient-text"><span class="ingredient-photo">${i.emoji}</span><span>${i.name}</span></div>
                <span class="badge">${CR.state.collected.has(i.id) ? 'OK' : 'pendente'}</span>
              </div>`
            ).join('')}</div>
          </div>
          <div class="recipe-preview-card">
            <h3>Forma + decoração desejada</h3>
            <div class="preview-row">
              <div class="form-preview">
                <div class="form-shape ${r.form}" title="${r.formName}"></div>
                <strong>${r.formName.toUpperCase()}</strong>
              </div>
              <div class="decor-preview">
                ${CR.recipeTopPreviewMarkup(r)}
                <strong>TOPPINGS DISPONÍVEIS: ${CR.previewToppingChoices(r).join(' ')} + CALDA</strong>
                <span class="small-copy">GLACÊ: ${decor.piping.toUpperCase()} · COBERTURA: ${decor.frosting}</span>
              </div>
            </div>
            <div class="recipe-steps"><b>Sequência:</b> coletar ingredientes → ${r.formName} → batedeira ou vasilha → forno → cobertura → calda → toppings/glacê.</div>
          </div>
        </div>
        <div style="text-align:center;margin-top:18px">${CR.button('FECHAR', 'closeRecipe', 'secondary')}</div>
      </div>
    </div>`);
    CR.bindActions(document.getElementById('recipe-modal'));
  };

  CR.closeRecipe = function () {
    document.getElementById('recipe-modal')?.remove();
  };

  CR.panel = function (title, desc, items, actionName) {
    CR.overlay.insertAdjacentHTML('beforeend', `<div class="modal" id="panel-modal">
      <div class="panel">
        <h2>${title}</h2>
        <p>${desc}</p>
        <div class="item-grid">${items.map((i) =>
          `<div class="item" data-pick="${i.id}" data-action="${actionName}">
            <div class="emoji">${i.emoji}</div>
            <strong>${i.label}</strong>
          </div>`
        ).join('')}</div>
        <div style="text-align:center;margin-top:16px">${CR.button('FECHAR', 'closePanel', 'secondary small')}</div>
      </div>
    </div>`);
    CR.bindActions(document.getElementById('panel-modal'));
  };

  CR.closePanel = function () {
    document.getElementById('panel-modal')?.remove();
  };

  CR.ingredientRequired = function (id) {
    return CR.required().includes(id);
  };

  CR.expectedSource = function (id) {
    return CR.currentRecipe().ingredients.find((i) => i.id === id)?.source;
  };

  CR.ingredientAward = function () {
    const n = CR.required().length;
    const base = Math.floor(30 / n);
    const used = base * (n - 1);
    return CR.state.collected.size === n - 1 ? 30 - used : base;
  };

  CR.chooseIngredient = function (el, source) {
    const id = el.dataset.pick;
    const correct = CR.ingredientRequired(id) && CR.expectedSource(id) === source;
    if (correct) {
      if (!CR.state.collected.has(id)) {
        const pts = CR.ingredientAward();
        CR.state.collected.add(id);
        CR.addScore(pts, true);
        CR.toast(`Boa! ${CR.currentRecipe().ingredients.find((i) => i.id === id)?.name} +${pts} PTS`);
      }
      el.classList.add('correct');
      setTimeout(() => {
        CR.closePanel();
        CR.renderKitchen();
      }, 420);
    } else {
      el.classList.add('wrong');
      CR.addScore(-5, true);
      CR.toast('OPS! ESSE ITEM ESTÁ ERRADO! -5 PTS');
    }
  };

  CR.openCabinet = function () {
    CR.panel('ARMÁRIO', 'Pegue os ingredientes em pó desta receita.', CR.cabinetItems, 'chooseCabinet');
  };

  CR.openFridge = function () {
    CR.panel('GELADEIRA', 'Pegue os ingredientes frios desta receita.', CR.fridgeItems, 'chooseFridge');
  };

  CR.chooseCabinet = function (el) {
    CR.chooseIngredient(el, 'cabinet');
  };

  CR.chooseFridge = function (el) {
    CR.chooseIngredient(el, 'fridge');
  };

  CR.showMolds = function () {
    CR.panel('FORMAS', `Escolha a forma correta para esta rodada: <b>${CR.currentFormName()}</b>.`, CR.moldItems, 'pickMold');
  };

  CR.pickMold = function (el) {
    if (el.dataset.pick === CR.currentForm()) {
      if (!CR.state.moldOk) {
        CR.state.moldOk = true;
        CR.addScore(15, true);
        CR.toast('BOA! FORMA CORRETA +15 PTS');
      }
      el.classList.add('correct');
      setTimeout(() => {
        CR.closePanel();
        CR.renderKitchen();
      }, 500);
    } else {
      el.classList.add('wrong');
      CR.addScore(-10, true);
      CR.toast('OPS! ESSA NÃO É A FORMA DA RECEITA! -10 PTS');
    }
  };

  CR.canMix = function () {
    if (CR.state.collected.size < CR.required().length) {
      CR.toast('Ainda faltam ingredientes da receita.');
      return false;
    }
    if (!CR.state.moldOk) {
      CR.toast('Escolha a forma correta antes de misturar.');
      return false;
    }
    if (CR.state.mixOk) {
      CR.toast('A massa desta receita já foi misturada.');
      return false;
    }
    return true;
  };

  CR.mixScene = function (kind) {
    if (!CR.canMix()) return;
    CR.clearTimers();
    CR.state.screen = 'mix';
    CR.state.step = 4;
    CR.updateHud(true);
    CR.clearOverlay();
    CR.setScene('bg-kitchen');
    const isMixer = kind === 'mixer';
    CR.overlay.innerHTML = `<div class="mix-interactive ${isMixer ? 'mix-interactive-mixer' : 'mix-interactive-bowl'}">
      <div class="mix-title">${isMixer ? 'BATEDEIRA' : 'VASILHA'} · <span id="mixPct">0%</span></div>
      <div class="mix-workbench">
        ${isMixer
          ? `<div class="custom-mixer" id="customMixer">
              <div class="mixer-head"><div class="mixer-body"></div><div class="mixer-lever"></div></div>
              <div class="mixer-bowl"><div class="mixer-batter"></div><div class="whisk" id="mixerWhisk"><i></i><i></i><i></i></div></div>
              <div class="mixer-base"></div>
              <button class="mixer-start" id="mixerStart">LIGAR BATEDEIRA</button>
            </div>`
          : `<div class="custom-bowl-wrap">
              <div class="custom-bowl" id="customBowl"><div class="bowl-batter"></div><div class="bowl-ripple"></div></div>
              <div class="hand-spoon" id="handSpoon" role="button" tabindex="0" aria-label="ARRASTE A COLHER">
                <span class="spoon-handle"></span><span class="spoon-head"></span>
              </div>
              <div class="bowl-help">SEGURE A COLHER E FAÇA MOVIMENTOS CIRCULARES DENTRO DA MASSA.</div>
            </div>`}
      </div>
      <div class="mix-progress"><div class="mix-fill" id="mixFill"></div></div>
      <div class="mix-hint" id="mixHint">${isMixer ? 'CLIQUE EM LIGAR E DEIXE A BATEDEIRA MISTURAR.' : 'ARRASTE A COLHER EM CÍRCULOS SOBRE A MASSA.'}</div>
      <button class="btn secondary mix-back" data-action="backToKitchen">VOLTAR</button>
    </div>`;
    CR.bindActions(CR.overlay);

    const countEl = document.getElementById('mixPct');
    const fillEl = document.getElementById('mixFill');
    let progress = 0;
    let done = false;
    let dragging = false;
    let lastAngle = null;

    const finishMix = () => {
      if (done) return;
      done = true;
      CR.state.mixOk = true;
      CR.addScore(20, true);
      CR.toast('BOA! VOCÊ MISTUROU A MASSA +20 PTS');
      setTimeout(() => {
        CR.state.step = 5;
        CR.renderKitchen();
      }, 650);
    };

    const setProgress = (v) => {
      progress = Math.min(100, Math.max(0, v));
      if (countEl) countEl.textContent = Math.round(progress) + '%';
      if (fillEl) fillEl.style.width = progress + '%';
      if (progress >= 100) finishMix();
    };

    if (isMixer) {
      const startBtn = document.getElementById('mixerStart');
      const whisk = document.getElementById('mixerWhisk');
      startBtn?.addEventListener('click', () => {
        if (done) return;
        startBtn.disabled = true;
        startBtn.textContent = 'BATEDEIRA LIGADA';
        whisk.classList.add('spinning');
        document.getElementById('customMixer')?.classList.add('running');
        let t = 0;
        CR.state.mixTimer = setInterval(() => {
          t += 5;
          setProgress(t);
          if (t >= 100) {
            clearInterval(CR.state.mixTimer);
            CR.state.mixTimer = null;
          }
        }, 180);
      });
      return;
    }

    const spoon = document.getElementById('handSpoon');
    const bowl = document.getElementById('customBowl');
    const center = () => {
      const r = bowl.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    };
    const onMove = (ev) => {
      if (!dragging) return;
      spoon.style.left = (ev.clientX - 18) + 'px';
      spoon.style.top = (ev.clientY - 24) + 'px';
      const c = center();
      const dx = ev.clientX - c.x;
      const dy = ev.clientY - c.y;
      const inside = Math.hypot(dx, dy) < Math.min(bowl.clientWidth, bowl.clientHeight) * 0.43;
      if (!inside) {
        lastAngle = null;
        return;
      }
      const a = Math.atan2(dy, dx);
      if (lastAngle !== null) {
        let d = a - lastAngle;
        if (d > Math.PI) d -= Math.PI * 2;
        if (d < -Math.PI) d += Math.PI * 2;
        setProgress(progress + Math.abs(d) * 11);
      }
      lastAngle = a;
      bowl.classList.add('stirring');
    };
    const onUp = () => {
      dragging = false;
      lastAngle = null;
      spoon.classList.remove('dragging');
      bowl.classList.remove('stirring');
    };
    const onDown = (e) => {
      e.preventDefault();
      dragging = true;
      lastAngle = null;
      spoon.classList.add('dragging');
      spoon.setPointerCapture?.(e.pointerId);
    };
    spoon.addEventListener('pointerdown', onDown);
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
    CR.state.pointerCleanup = () => {
      spoon.removeEventListener('pointerdown', onDown);
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
      CR.state.pointerCleanup = null;
    };
  };

  CR.mixMixer = function () {
    CR.mixScene('mixer');
  };

  CR.mixSpoon = function () {
    CR.mixScene('spoon');
  };

  CR.backToKitchen = function () {
    CR.clearTimers();
    CR.state.screen = 'game';
    CR.renderKitchen();
  };

  CR.showOven = function () {
    if (!CR.state.mixOk) {
      CR.toast('MISTURE A MASSA ANTES DE ASSAR.');
      return;
    }
    if (CR.state.baked) {
      CR.ovenReady();
      return;
    }
    CR.clearTimers();
    CR.state.step = 6;
    CR.updateHud(true);
    CR.clearOverlay();
    CR.setScene('bg-oven');
    CR.logoTop.classList.add('hidden');
    CR.overlay.innerHTML = `<div class="oven-character-layer">
      <div aria-hidden="true"></div>
      <img class="chef-character oven-chef" src="assets/chef-page53-oven-sticker.png" alt="">
      <div class="speech-bubble oven-speech">
        <strong>ESPERE O BOLO ASSAR!</strong>
        <span>A MASSA ESTÁ NO FORNO.</span>
      </div>
    </div>
    <div class="oven-ui">
      <strong>ESPERE O ${CR.currentRecipe().name.toUpperCase()} ASSAR!</strong>
      <div class="progress"><div id="ovenBar"></div></div>
      <div class="small-copy" id="ovenText" style="margin-top:8px">O FORNO ESTÁ TRABALHANDO...</div>
    </div>`;
    let pct = 0;
    const bar = document.getElementById('ovenBar');
    CR.state.ovenTimer = setInterval(() => {
      pct += 5;
      if (bar) bar.style.width = pct + '%';
      if (pct >= 100) {
        clearInterval(CR.state.ovenTimer);
        CR.state.ovenTimer = null;
        CR.state.baked = true;
        CR.addScore(20, true);
        setTimeout(CR.ovenReady, 500);
      }
    }, 180);
  };

  CR.ovenReady = function () {
    CR.clearTimers();
    CR.state.step = 7;
    CR.updateHud(true);
    CR.clearOverlay();
    CR.setScene('bg-oven-ready');
    CR.overlay.innerHTML = `<div class="oven-character-layer ready">
      <div aria-hidden="true"></div>
      <img class="chef-character oven-chef" src="assets/chef-page53-oven-sticker.png" alt="">
      <div class="speech-bubble oven-speech">
        <strong>O BOLO ESTÁ PRONTO!</strong>
        <span>TIRE ELE DO FORNO E COMECE A DECORAÇÃO.</span>
      </div>
    </div>
    <div class="center-card oven-ready-card">${CR.button('TIRAR BOLO', 'beginDecoration', 'green')}</div>`;
    CR.bindActions(CR.overlay);
  };
})(window.CakeRush);
