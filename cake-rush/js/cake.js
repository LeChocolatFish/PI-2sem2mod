window.CakeRush = window.CakeRush || {};

(function (CR) {
  CR.cakeMarkup = function (extra = '', id = 'decorCake') {
    const form = CR.currentForm();
    const { state } = CR;
    return `<div class="cake-3d form-${form}" id="${id}" style="--frosting:${state.frosting}">
      <div class="cake-side form-${form}">
        <div class="cake-pattern pattern-${state.sidePattern}"></div>${extra}
      </div>
      <div class="cake-top form-${form}"></div>
      <div class="cake-base"></div>
    </div>`;
  };

  CR.pipingSvg = function (form, pipeClass, preserve = 'xMidYMid meet') {
    if (pipeClass === 'piping-none') return '';
    const paths = {
      round: '<ellipse cx="170" cy="125" rx="154" ry="109"/>',
      square: '<rect x="16" y="16" width="308" height="218" rx="24"/>',
      rect: '<rect x="12" y="24" width="316" height="202" rx="26"/>',
      flower: '<path d="M170 14 C215 0 232 34 264 24 C304 12 318 50 300 78 C328 102 318 140 290 151 C310 187 279 218 247 205 C226 236 190 239 170 216 C140 239 105 229 93 201 C55 218 24 187 43 151 C10 137 3 99 35 78 C17 46 43 13 76 25 C107 36 124 4 170 14 Z"/>',
      heart: '<path d="M170 226 L34 95 C4 50 29 14 72 14 C108 14 132 36 170 67 C208 36 232 14 268 14 C311 14 336 50 306 95 Z"/>',
      star: '<path d="M170 10 L205 82 L285 94 L226 146 L242 226 L170 187 L98 226 L114 146 L55 94 L135 82 Z"/>',
      ring: '<path d="M170 16 A108 108 0 1 1 169.9 16 M170 66 A58 58 0 1 0 170.1 66" fill-rule="evenodd"/>'
    };
    return `<svg class="piping-svg ${pipeClass}" viewBox="0 0 340 250" preserveAspectRatio="${preserve}" aria-hidden="true">${paths[form] || paths.round}</svg>`;
  };

  CR.syrupSvg = function () {
    return CR.state.syrupPaths.map((path) => {
      const pts = path.points.map((p) => `${p.x},${p.y}`).join(' ');
      return `<polyline points="${pts}" stroke="${path.color}"/>`;
    }).join('');
  };

  CR.previewToppingChoices = function (r) {
    return CR.state.availableToppings.length
      ? CR.state.availableToppings.map((x) => x[0])
      : (r.decor.toppings || []);
  };

  CR.recipeTopPreviewMarkup = function (r) {
    const choices = CR.previewToppingChoices(r);
    const tops = choices.slice(0, 5).map((t, i) =>
      `<span class="topping" style="left:${28 + (i * 23) % 50}%;top:${30 + (i * 17) % 44}%">${t}</span>`
    ).join('');
    const syrup = r.decor.syrup
      ? `<svg class="syrup-svg preview-syrup" viewBox="0 0 340 250"><path d="M55 84 C88 62 118 98 150 82 M188 84 C218 60 250 98 286 79 M72 138 C106 112 136 150 168 132 M202 140 C232 116 264 150 294 130 M88 186 C118 162 148 194 178 178 M210 180 C236 160 260 194 282 176" stroke="${r.decor.syrup}" fill="none" stroke-width="10" stroke-linecap="round"/></svg>`
      : '';
    return `<div class="top-cake-wrap mini recipe-top-preview">
      <div class="top-cake form-${r.form}" style="--frosting:${r.decor.frosting}">
        <div class="top-cake-shine"></div>
        ${CR.pipingSvg(r.form, 'piping-' + r.decor.piping)}${syrup}${tops}
      </div>
    </div>`;
  };

  CR.topCakeMarkup = function (extra = '', id = 'topCake', mini = false) {
    const form = CR.currentForm();
    const { state } = CR;
    const placements = state.toppings.map((t) =>
      `<span class="topping" style="left:${t.x}%;top:${t.y}%">${t.kind}</span>`
    ).join('');
    return `<div class="top-cake-wrap ${mini ? 'mini' : ''}">
      <div class="top-cake form-${form}" id="${id}" style="--frosting:${state.frosting}">
        <div class="top-cake-shine"></div>
        <svg class="syrup-svg" viewBox="0 0 340 250" aria-hidden="true">${CR.syrupSvg()}</svg>
        ${placements}${CR.pipingSvg(form, 'piping-' + state.piping)}${extra}
      </div>
    </div>`;
  };

  CR.finalCakeMarkup = function () {
    const form = CR.currentForm();
    const { state } = CR;
    const tops = state.toppings.map((t) =>
      `<span class="final-top-topping" style="left:${t.x}%;top:${t.y}%">${t.kind}</span>`
    ).join('');
    const syrup = state.syrupPaths.length
      ? `<svg class="final-syrup-svg" viewBox="0 0 340 250">${CR.syrupSvg()}</svg>`
      : '';
    const pipe = CR.pipingSvg(form, 'piping-' + state.piping, 'none');
    return `<div class="final-cake-preview">
      <div class="final-cake-body form-${form}" style="--frosting:${state.frosting}">
        <div class="final-cake-top form-${form}">${syrup}${tops}${pipe}</div>
        <div class="final-cake-side form-${form}"><div class="cake-pattern pattern-${state.sidePattern}"></div></div>
        <div class="final-cake-base form-${form}"></div>
      </div>
    </div>`;
  };
})(window.CakeRush);
