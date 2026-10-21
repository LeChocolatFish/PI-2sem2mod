window.CakeRush = window.CakeRush || {};

(function (CR) {
  CR.beginDecoration = function () {
    if (!CR.state.baked) {
      CR.toast('Asse o bolo primeiro.');
      return;
    }
    CR.clearTimers();
    CR.state.step = 8;
    CR.state.decorStage = 1;
    CR.setScene('bg-decor');
    CR.renderDecoration();
  };

  CR.renderDecoration = function () {
    if (CR.state.pointerCleanup) CR.state.pointerCleanup();
    CR.clearOverlay();
    CR.setScene('bg-decor');
    CR.updateHud(true);
    const stage = CR.state.decorStage;
    if (stage === 1) CR.renderDecorStage1();
    else if (stage === 2) CR.renderDecorStage2();
    else CR.renderDecorStage3();
  };

  CR.renderDecorationShell = function (content, active) {
    return `<div class="decor-shell">
      <div class="decor-topbar">
        <div class="decor-title">${CR.currentRecipe().emoji} DECORAÇÃO</div>
        <div class="stage-steps">
          <span class="${active === 1 ? 'active' : ''}">1 · COBERTURA</span>
          <span class="${active === 2 ? 'active' : ''}">2 · CALDA</span>
          <span class="${active === 3 ? 'active' : ''}">3 · TOPPINGS + GLACÊ</span>
        </div>
        <button class="btn secondary small" data-action="recipe">🍰 RECEITA</button>
      </div>
      ${content}
    </div>`;
  };

  CR.renderDecorStage1 = function () {
    const colors = CR.decoration.colors.map(([c, n]) =>
      `<button class="swatch ${CR.state.frosting === c ? 'selected' : ''}" title="${n}" style="background:${c}" data-color="${c}" data-action="pickFrosting"><span>${n}</span></button>`
    ).join('');
    const pats = CR.decoration.patterns.map(([id, n]) =>
      `<button class="mini-choice ${CR.state.sidePattern === id ? 'selected' : ''}" data-pattern="${id}" data-action="pickPattern">${n}</button>`
    ).join('');
    const content = `<div class="decor-content">
      <div class="decor-panel">
        <h3>1 · COBRIR O BOLO</h3>
        <div class="control-label">COR DA COBERTURA</div>
        <div class="swatches">${colors}</div>
        <div class="control-label">ACABAMENTO AO REDOR</div>
        <div class="pattern-grid">${pats}</div>
        <div class="decor-actions">${CR.button('APLICAR +5 PTS', 'finishCoating', 'green')}</div>
      </div>
      <div class="cake-area">
        <div class="camera-rig">${CR.cakeMarkup()}</div>
        <div class="camera-note">ESCOLHA A COR E O ACABAMENTO DA COBERTURA.</div>
      </div>
      <div class="decor-panel">
        <h3>PRÉVIA DA RECEITA</h3>
        <p>ESSA É A APARÊNCIA BASE DO BOLO ANTES DA CALDA E DOS TOPPINGS.</p>
        ${CR.recipeTopPreviewMarkup({ ...CR.currentRecipe(), form: CR.currentForm(), formName: CR.currentFormName() })}
      </div>
    </div>`;
    CR.overlay.innerHTML = CR.renderDecorationShell(content, 1);
    CR.bindActions(CR.overlay);
  };

  CR.pickFrosting = function (el) {
    CR.state.frosting = el.dataset.color;
    CR.renderDecoration();
  };

  CR.pickPattern = function (el) {
    CR.state.sidePattern = el.dataset.pattern;
    CR.renderDecoration();
  };

  CR.finishCoating = function () {
    if (!CR.state.decorationDone[0]) {
      CR.state.decorationDone[0] = true;
      CR.addScore(5, true);
      CR.toast('COBERTURA PRONTA! +5 PTS');
    }
    CR.state.step = 9;
    CR.state.decorStage = 2;
    setTimeout(CR.renderDecoration, 450);
  };

  CR.renderDecorStage2 = function () {
    const content = `<div class="decor-content">
      <div class="decor-panel">
        <h3>2 · CALDA NO TOPO</h3>
        <div class="control-label">ESCOLHA A CALDA</div>
        <div class="swatches">${CR.decoration.syrups.map(([c, n]) =>
          `<button class="swatch ${CR.state.syrup === c ? 'selected' : ''}" title="${n}" style="background:${c}" data-color="${c}" data-action="pickSyrup"><span>${n}</span></button>`
        ).join('')}</div>
        <div class="syrup-tool-card">
          <div class="syrup-bottle" id="syrupBottle" style="--syrup:${CR.state.syrup}">
            <span class="bottle-cap"></span><span class="bottle-body"></span><span class="bottle-nozzle"></span>
          </div>
          <div>
            <strong>ARRASTE A BISNAGA</strong>
            <p>MOVA A BISNAGA SOBRE O BOLO PARA DESENHAR A CALDA.</p>
          </div>
        </div>
        <div class="decor-actions">${CR.button('LIMPAR CALDA', 'clearSyrup', 'gold')} ${CR.button('CONFIRMAR +5 PTS', 'finishSyrup', 'green')}</div>
      </div>
      <div class="cake-area">
        <div class="camera-transition">
          <div class="camera-label">CÂMERA DE CIMA</div>
          ${CR.topCakeMarkup()}
        </div>
        <div class="camera-note">ARRASTE A BISNAGA PELO BOLO. A CALDA FICA EXATAMENTE ONDE VOCÊ PASSAR.</div>
      </div>
      <div class="decor-panel">
        <h3>MOVIMENTO DA CÂMERA</h3>
        <p>A VISÃO MUDA DE LADO PARA CIMA SEM ACHATAR O BOLO.</p>
        <div class="camera-mini-arrow">↻</div>
        <div class="camera-mini-text">VISÃO LATERAL → VISÃO SUPERIOR</div>
      </div>
    </div>`;
    CR.overlay.innerHTML = CR.renderDecorationShell(content, 2);
    CR.bindActions(CR.overlay);
    setTimeout(CR.setupSyrupInteraction, 80);
  };

  CR.pickSyrup = function (el) {
    CR.state.syrup = el.dataset.color;
    const b = document.getElementById('syrupBottle');
    if (b) b.style.setProperty('--syrup', CR.state.syrup);
  };

  CR.setupSyrupInteraction = function () {
    if (CR.state.pointerCleanup) CR.state.pointerCleanup();
    const bottle = document.getElementById('syrupBottle');
    const cake = document.getElementById('topCake');
    if (!bottle || !cake) return;
    let dragging = false;
    let current = null;
    const point = (e) => {
      const r = cake.getBoundingClientRect();
      return { x: (e.clientX - r.left) * (340 / r.width), y: (e.clientY - r.top) * (250 / r.height) };
    };
    const inside = (e) => {
      const r = cake.getBoundingClientRect();
      return e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    };
    const onMove = (ev) => {
      if (!dragging) return;
      bottle.style.left = (ev.clientX - 38) + 'px';
      bottle.style.top = (ev.clientY - 60) + 'px';
      if (!inside(ev)) {
        current = null;
        return;
      }
      const p = point(ev);
      if (!current) {
        current = { color: CR.state.syrup, points: [p] };
        CR.state.syrupPaths.push(current);
      } else {
        current.points.push(p);
      }
      cake.classList.add('syrup-active');
      CR.renderSyrupLayer();
    };
    const onUp = () => {
      dragging = false;
      current = null;
      bottle.classList.remove('dragging');
      cake.classList.remove('syrup-active');
    };
    const onDown = (e) => {
      e.preventDefault();
      dragging = true;
      current = null;
      bottle.classList.add('dragging');
    };
    bottle.addEventListener('pointerdown', onDown);
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
    CR.state.pointerCleanup = () => {
      bottle.removeEventListener('pointerdown', onDown);
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
      CR.state.pointerCleanup = null;
    };
  };

  CR.renderSyrupLayer = function () {
    const svg = document.querySelector('#topCake .syrup-svg');
    if (!svg) return;
    svg.innerHTML = CR.syrupSvg();
  };

  CR.clearSyrup = function () {
    CR.state.syrupPaths = [];
    CR.renderSyrupLayer();
    CR.setupSyrupInteraction();
  };

  CR.finishSyrup = function () {
    if (!CR.state.decorationDone[1]) {
      CR.state.decorationDone[1] = true;
      CR.addScore(5, true);
      CR.toast('CALDA APLICADA! +5 PTS');
    }
    CR.state.step = 10;
    CR.state.decorStage = 3;
    setTimeout(CR.renderDecoration, 500);
  };

  CR.pipingCard = function (id, n) {
    const sample = { none: '—', dot: '● ● ●', ruffle: '≋≋≋', zigzag: '⌁⌁⌁' }[id] || '~~~';
    return `<button class="piping-card ${CR.state.piping === id ? 'selected' : ''}" data-piping="${id}" data-action="pickPiping">
      <div class="piping-photo"><div class="piping-nozzle"></div><div class="piping-sample">${sample}</div></div>
      <strong>${n}</strong>
    </button>`;
  };

  CR.renderDecorStage3 = function () {
    const available = CR.state.availableToppings.length
      ? CR.state.availableToppings
      : CR.shuffleArray(CR.decoration.toppings).slice(0, 6);
    const tops = available.map(([e, n]) =>
      `<button class="topping-card ${CR.state.selectedTopping === e ? 'selected' : ''}" data-topping="${e}" data-action="selectTopping"><span>${e}</span><strong>${n}</strong></button>`
    ).join('');
    const pip = [['none', 'Nenhum'], ...CR.decoration.piping].map(([id, n]) => CR.pipingCard(id, n)).join('');
    const content = `<div class="decor-content">
      <div class="decor-panel">
        <h3>3 · TOPPINGS + GLACÊ</h3>
        <div class="control-label">TOPPINGS</div>
        <div class="topping-grid">${tops}</div>
        <div class="control-label">GLACÊ AUTOMÁTICO NAS BORDAS</div>
        <div class="piping-grid">${pip}</div>
        <p class="small-copy">ESCOLHA UM TOPPING E CLIQUE NO BOLO. O GLACÊ É APLICADO AUTOMATICAMENTE NA PARTE SUPERIOR E INFERIOR DA LATERAL.</p>
        <div class="decor-actions">${CR.button('FINALIZAR +5 PTS', 'finishDecoration', 'green')}</div>
      </div>
      <div class="cake-area">
        <div class="camera-transition final-top-view">${CR.topCakeMarkup()}</div>
        <div class="camera-note">CLIQUE NO BOLO PARA COLOCAR ${CR.state.selectedTopping || 'UM TOPPING'}.</div>
      </div>
      <div class="decor-panel">
        <h3>PRÉVIA DO TOPO</h3>
        <p>VEJA O QUE PODE SER COLOCADO NA PARTE DE CIMA DO BOLO.</p>
        <div class="preview-list">${CR.previewToppingChoices(CR.currentRecipe()).map((x) => `<span>${x}</span>`).join(' ')} ${CR.currentRecipe().decor.syrup ? '<span>CALDA</span>' : ''}</div>
        ${CR.topCakeMarkup('', 'previewTopCake', true)}
      </div>
    </div>`;
    CR.overlay.innerHTML = CR.renderDecorationShell(content, 3);
    CR.bindActions(CR.overlay);
    setTimeout(CR.wireToppingCake, 20);
  };

  CR.selectTopping = function (el) {
    CR.state.selectedTopping = el.dataset.topping;
    CR.toast(`SELECIONADO ${CR.state.selectedTopping}. CLIQUE NO BOLO.`);
    CR.renderDecorStage3();
  };

  CR.pickPiping = function (el) {
    CR.state.piping = el.dataset.piping;
    CR.renderDecorStage3();
    CR.toast(`GLACÊ ${el.textContent.trim()} APLICADO NAS BORDAS.`);
  };

  CR.placeDecorationClick = function (e) {
    const cake = document.getElementById('topCake');
    if (!cake || !CR.state.selectedTopping) return;
    const r = cake.getBoundingClientRect();
    const x = Math.max(8, Math.min(92, ((e.clientX - r.left) / r.width) * 100));
    const y = Math.max(10, Math.min(90, ((e.clientY - r.top) / r.height) * 100));
    CR.state.toppings.push({ kind: CR.state.selectedTopping, x, y });
    CR.toast(`${CR.state.selectedTopping} COLOCADO!`);
    CR.renderDecorStage3();
  };

  CR.wireToppingCake = function () {
    document.getElementById('topCake')?.addEventListener('click', CR.placeDecorationClick);
  };

  CR.finishDecoration = function () {
    if (!CR.state.decorationDone[2]) {
      CR.state.decorationDone[2] = true;
      CR.addScore(5, true);
      CR.toast('DECORAÇÃO FINALIZADA! +5 PTS');
    }
    CR.state.step = 10;
    setTimeout(CR.finish, 550);
  };

  CR.backFromDecor = function () {
    CR.clearTimers();
    CR.state.screen = 'game';
    CR.state.decorStage = 1;
    CR.state.step = 7;
    CR.renderKitchen();
  };
})(window.CakeRush);
