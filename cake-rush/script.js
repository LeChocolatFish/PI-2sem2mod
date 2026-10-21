const scene = document.getElementById('scene');
const overlay = document.getElementById('overlay');
const hud = document.getElementById('hud');
const scoreEl = document.getElementById('score');
const stepEl = document.getElementById('step-label');
const recipeNameEl = document.getElementById('recipe-name');
const toastEl = document.getElementById('toast');
const logoTop = document.getElementById('logo-top');

const recipes = [
  {
    id:'vanilla', name:'Bolo de Baunilha', emoji:'🍰', flavorClass:'vanilla', form:'round', formName:'Forma redonda',
    description:'Massa clássica e fofinha, com uma decoração delicada em tons pastel.',
    ingredients:[
      {id:'farinha', name:'Farinha', emoji:'🌾', source:'cabinet'}, {id:'acucar', name:'Açúcar', emoji:'🍚', source:'cabinet'}, {id:'fermento', name:'Fermento', emoji:'🧂', source:'cabinet'},
      {id:'ovos', name:'Ovos', emoji:'🥚', source:'fridge'}, {id:'leite', name:'Leite', emoji:'🥛', source:'fridge'}, {id:'manteiga', name:'Manteiga', emoji:'🧈', source:'fridge'}
    ],
    decor:{frosting:'#ffd9e7', pattern:'smooth', syrup:'#f3b64a', toppings:['🍓','✨'], piping:'dot'}
  },

  {
    id:'chocolate', name:'Bolo de Chocolate', emoji:'🍫', flavorClass:'choc', form:'square', formName:'Forma quadrada',
    description:'Chocolate intenso para uma cobertura cremosa e calda brilhante.',
    ingredients:[
      {id:'farinha', name:'Farinha', emoji:'🌾', source:'cabinet'}, {id:'acucar', name:'Açúcar', emoji:'🍚', source:'cabinet'}, {id:'cacau', name:'Cacau', emoji:'🍫', source:'cabinet'}, {id:'fermento', name:'Fermento', emoji:'🧂', source:'cabinet'},
      {id:'ovos', name:'Ovos', emoji:'🥚', source:'fridge'}, {id:'leite', name:'Leite', emoji:'🥛', source:'fridge'}, {id:'manteiga', name:'Manteiga', emoji:'🧈', source:'fridge'}
    ],
    decor:{frosting:'#6f3b2a', pattern:'stripes', syrup:'#3e2317', toppings:['🍫','🍓'], piping:'ruffle'}
  },

  {
    id:'strawberry', name:'Bolo de Morango', emoji:'🍓', flavorClass:'straw', form:'heart', formName:'Forma de coração',
    description:'Uma sequência romântica, com morangos e tons rosados.',
    ingredients:[
      {id:'farinha', name:'Farinha', emoji:'🌾', source:'cabinet'}, {id:'acucar', name:'Açúcar', emoji:'🍚', source:'cabinet'}, {id:'fermento', name:'Fermento', emoji:'🧂', source:'cabinet'},
      {id:'ovos', name:'Ovos', emoji:'🥚', source:'fridge'}, {id:'leite', name:'Leite', emoji:'🥛', source:'fridge'}, {id:'manteiga', name:'Manteiga', emoji:'🧈', source:'fridge'}, {id:'morango', name:'Morango', emoji:'🍓', source:'fridge'}
    ],
    decor:{frosting:'#ff97b6', pattern:'dots', syrup:'#c73d63', toppings:['🍓','💗'], piping:'dot'}
  },

  {
    id:'cinnamon', name:'Bolo de Canela', emoji:'🧁', flavorClass:'vanilla', form:'ring', formName:'Forma de furo',
    description:'Canela, especiarias e uma decoração com fios de glacê.',
    ingredients:[
      {id:'farinha', name:'Farinha', emoji:'🌾', source:'cabinet'}, {id:'acucar', name:'Açúcar', emoji:'🍚', source:'cabinet'}, {id:'fermento', name:'Fermento', emoji:'🧂', source:'cabinet'}, {id:'canela', name:'Canela', emoji:'🫙', source:'cabinet'},
      {id:'ovos', name:'Ovos', emoji:'🥚', source:'fridge'}, {id:'leite', name:'Leite', emoji:'🥛', source:'fridge'}, {id:'manteiga', name:'Manteiga', emoji:'🧈', source:'fridge'}
    ],
    decor:{frosting:'#f5d29f', pattern:'ruffle', syrup:'#b57332', toppings:['✨','🍪'], piping:'zigzag'}
  },

  {
    id:'lemon', name:'Bolo de Limão', emoji:'🍋', flavorClass:'vanilla', form:'flower', formName:'Forma de flor',
    description:'Limão e glacê cítrico para um bolo com formato divertido.',
    ingredients:[
      {id:'farinha', name:'Farinha', emoji:'🌾', source:'cabinet'}, {id:'acucar', name:'Açúcar', emoji:'🍚', source:'cabinet'}, {id:'fermento', name:'Fermento', emoji:'🧂', source:'cabinet'}, {id:'raspas', name:'Raspas de limão', emoji:'🍋', source:'cabinet'},
      {id:'ovos', name:'Ovos', emoji:'🥚', source:'fridge'}, {id:'leite', name:'Leite', emoji:'🥛', source:'fridge'}, {id:'manteiga', name:'Manteiga', emoji:'🧈', source:'fridge'}
    ],
    decor:{frosting:'#fff0a2', pattern:'dots', syrup:'#f0c441', toppings:['🍋','✨'], piping:'dot'}
  },

  {
    id:'redvelvet', name:'Red Velvet', emoji:'❤️', flavorClass:'straw', form:'star', formName:'Forma de estrela',
    description:'Massa vermelha e decoração chamativa com chocolate e frutas.',
    ingredients:[
      {id:'farinha', name:'Farinha', emoji:'🌾', source:'cabinet'}, {id:'acucar', name:'Açúcar', emoji:'🍚', source:'cabinet'}, {id:'cacau', name:'Cacau', emoji:'🍫', source:'cabinet'},
      {id:'ovos', name:'Ovos', emoji:'🥚', source:'fridge'}, {id:'leite', name:'Leite', emoji:'🥛', source:'fridge'}, {id:'manteiga', name:'Manteiga', emoji:'🧈', source:'fridge'}, {id:'creme', name:'Creme', emoji:'🥛', source:'fridge'}
    ],
    decor:{frosting:'#f7d7d5', pattern:'stripes', syrup:'#b52d38', toppings:['🍓','🍫','✨'], piping:'ruffle'}
  }
];

const cabinetItems = [
  {id:'farinha',emoji:'🌾',label:'Farinha'}, {id:'acucar',emoji:'🍚',label:'Açúcar'}, {id:'fermento',emoji:'🧂',label:'Fermento'}, {id:'cacau',emoji:'🍫',label:'Cacau'},
  {id:'canela',emoji:'🫙',label:'Canela'}, {id:'raspas',emoji:'🍋',label:'Raspas de limão'}, {id:'coco',emoji:'🥥',label:'Coco ralado'}, {id:'sal',emoji:'🧂',label:'Sal'}
];

const fridgeItems = [
  {id:'ovos',emoji:'🥚',label:'Ovos'}, {id:'leite',emoji:'🥛',label:'Leite'}, {id:'manteiga',emoji:'🧈',label:'Manteiga'}, {id:'morango',emoji:'🍓',label:'Morango'},
  {id:'creme',emoji:'🥛',label:'Creme'}, {id:'banana',emoji:'🍌',label:'Banana'}
];

const moldItems = [
  {id:'round',emoji:'⭕',label:'Forma redonda'}, {id:'square',emoji:'▣',label:'Forma quadrada'}, {id:'heart',emoji:'♥',label:'Forma de coração'},
  {id:'ring',emoji:'🍩',label:'Forma de furo'}, {id:'flower',emoji:'✿',label:'Forma de flor'}, {id:'star',emoji:'★',label:'Forma de estrela'}, {id:'rect',emoji:'▭',label:'Forma retangular'}
];


const decoration = {
  colors:[['#ffd9e7','Rosa'],['#fff0a2','Baunilha'],['#b7e8ff','Azul céu'],['#cdb7ff','Lavanda'],['#f7d7d5','Rosé'],['#9de29b','Menta'],['#f5d29f','Caramelo'],['#6f3b2a','Chocolate']],
  patterns:[['smooth','Liso'],['stripes','Listras'],['dots','Poás'],['ruffle','Ondinhas']],
  syrups:[['#f3b64a','Caramelo'],['#c73d63','Morango'],['#3e2317','Chocolate'],['#f0c441','Limão'],['#8b4de8','Uva']],
  toppings:[['🍓','Morango'],['🍫','Chocolate'],['🍒','Cereja'],['🫐','Frutas'],['🥥','Coco'],['✨','Brilho'],['🍪','Biscoito'],['🍋','Limão']],
  piping:[['dot','Pontinhos'],['ruffle','Babado'],['zigzag','Zigue-zague']]
};

const state = {
  score:0, totalScore:0, roundScore:0, step:1, screen:'splash', recipeIndex:0, form:null, collected:new Set(), moldOk:false, mixOk:false, baked:false,
  mixTimer:null, ovenTimer:null, loadingTimer:null, speechOn:false,
  decorStage:1, frosting:'#ffd9e7', sidePattern:'smooth', syrup:'#f3b64a', piping:'dot',
  syrupPaths:[], toppings:[], availableToppings:[], pipingDots:[], topDrawing:false, lastPoint:null, selectedTopping:null, decorationDone:[false,false,false], syrupCleanup:null
};

const currentRecipe=()=>recipes[state.recipeIndex];
const currentForm=()=>state.form || currentRecipe().form;
const currentFormName=()=>moldItems.find(m=>m.id===currentForm())?.label || currentRecipe().formName;
const required=()=>currentRecipe().ingredients.map(x=>x.id);
function setScene(cls){scene.className='scene';scene.classList.add(cls);} 
function clearOverlay(){overlay.innerHTML='';overlay.onclick=null;}
function clearTimers(){if(state.mixTimer){clearInterval(state.mixTimer);state.mixTimer=null;}if(state.ovenTimer){clearInterval(state.ovenTimer);state.ovenTimer=null;}if(state.loadingTimer){clearTimeout(state.loadingTimer);state.loadingTimer=null;}if(state.syrupCleanup){state.syrupCleanup();}}
function updateHud(show=true){hud.classList.toggle('hidden',!show);scoreEl.textContent=state.score;stepEl.textContent=state.step;recipeNameEl.textContent=currentRecipe().name;}
function addScore(n,animate=false){const before=state.roundScore;const next=Math.min(100,Math.max(0,state.roundScore+n));const gained=next-before;state.roundScore=next;state.score=state.totalScore+state.roundScore;scoreEl.textContent=state.score;if(animate&&gained!==0){const el=document.getElementById('score-fly');if(el){el.textContent=`${gained>0?'+':''}${gained}`;el.classList.remove('show');void el.offsetWidth;el.classList.add('show');}}}
function toast(msg){toastEl.textContent=msg;toastEl.classList.add('show');clearTimeout(toast._t);toast._t=setTimeout(()=>toastEl.classList.remove('show'),1600);} 
function button(label,action,cls=''){return `<button class="btn ${cls}" data-action="${action}">${label}</button>`;}
function bindActions(root=document){root.querySelectorAll('[data-action]').forEach(el=>{if(el.dataset.bound==='1')return;el.dataset.bound='1';el.addEventListener('click',e=>{e.stopPropagation();el.classList.remove('click-pulse');void el.offsetWidth;el.classList.add('click-pulse');const action=el.dataset.action;if(actions[action])actions[action](el);});});}
function shuffleArray(arr){const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function resetProgress(keepScore=false){clearTimers();state.collected=new Set();state.form=moldItems[Math.floor(Math.random()*moldItems.length)].id;state.moldOk=false;state.mixOk=false;state.baked=false;state.decorStage=1;state.frosting=currentRecipe().decor.frosting;state.sidePattern='smooth';state.syrup=currentRecipe().decor.syrup;state.piping=currentRecipe().decor.piping;state.syrupPaths=[];state.toppings=[];state.availableToppings=shuffleArray(decoration.toppings).slice(0,6);state.selectedTopping=null;state.decorationDone=[false,false,false];state.syrupDragging=false;state.roundScore=0;if(!keepScore)state.totalScore=0;state.score=state.totalScore;state.step=1;}
function showSplash(){
  clearTimers();
  state.screen='splash';
  clearOverlay();
  updateHud(false);
  logoTop.classList.add('hidden');
  setScene('bg-splash');
  overlay.innerHTML=`<img class="splash-image" src="assets/p1.png" alt="CAKE RUSH">
    <button type="button" class="full-click" aria-label="TOQUE PARA CONTINUAR"></button>
    <button type="button" class="splash-continue-btn" aria-label="TOQUE PARA CONTINUAR">TOQUE PARA CONTINUAR</button>`;
  const splashButton=overlay.querySelector('.full-click');
  const splashContinueBtn=overlay.querySelector('.splash-continue-btn');
  const continueOnce=()=>{
    if(state.screen!=='splash') return;
    continueSplash();
  };
  splashButton.addEventListener('click',continueOnce,{once:true});
  splashContinueBtn?.addEventListener('click',continueOnce,{once:true});
  overlay.onclick=(e)=>{
    if(state.screen==='splash' && !e.target.closest('.splash-continue-btn')) continueOnce();
  };
} 
function continueSplash(){showLoading();}
function showLoading(){clearTimers();state.screen='loading';clearOverlay();updateHud(false);setScene('bg-load');logoTop.classList.remove('hidden');overlay.innerHTML=`<div class="center-card load-card"><div class="load-logo">Cake<br><span>Rush</span></div><h2>CARREGANDO...</h2><div class="progress"><div id="loadbar"></div></div><p id="loadtext">Preparando a cozinha, receitas e decoração…</p></div>`;requestAnimationFrame(()=>{const bar=document.getElementById('loadbar');bar.style.transition='width 1500ms ease';bar.style.width='100%';});state.loadingTimer=setTimeout(()=>{state.loadingTimer=null;showMenu();},1600);}
function showMenu(){state.screen='menu';clearOverlay();updateHud(false);setScene('bg-menu');logoTop.classList.remove('hidden');overlay.innerHTML=`<div class="center-card" style="top:54%"><h2>Vamos assar?</h2><p>Escolha uma sequência de bolo para começar.</p>${button('JOGAR','recipeSelect')} ${button('COMO JOGAR','tutorial','secondary')}</div>`;bindActions(overlay);}
function showRecipeSelect(){state.screen='recipeSelect';clearOverlay();updateHud(false);setScene('bg-select');logoTop.classList.remove('hidden');overlay.innerHTML=`<div class="panel recipe-select"><div class="recipe-head"><div><h2>ESCOLHA O BOLO</h2><p>ESCOLHA UMA SEQUÊNCIA E DEPOIS DEFINA A FORMA DA RODADA.</p></div><div class="cake-emoji">🎂</div></div><div class="recipe-cards">${recipes.map((r,i)=>`<div class="recipe-card" data-action="selectRecipe" data-recipe-index="${i}"><div class="card-top"><div class="card-emoji">${r.emoji}</div><h3>${r.name}</h3></div><p>${r.description}</p><span class="recipe-tag">${r.ingredients.length} INGREDIENTES · FORMA VARIÁVEL</span></div>`).join('')}</div><div style="text-align:center;margin-top:14px">${button('VOLTAR','menu','secondary small')}</div></div>`;bindActions(overlay);}
function selectRecipe(el){const idx=Number(el.dataset.recipeIndex);if(!Number.isInteger(idx)||!recipes[idx])return;state.recipeIndex=idx;resetProgress(true);startGame();}
const tutorialText='COMO JOGAR: PRIMEIRO, ABRA A RECEITA E CONFIRA OS INGREDIENTES, A FORMA E O ESTILO DE DECORAÇÃO. DEPOIS PEGUE OS INGREDIENTES NO ARMÁRIO E NA GELADEIRA, ESCOLHA A FORMA CORRETA E MISTURE NA BATEDEIRA OU NA VASILHA. EM SEGUIDA ASSE O BOLO. DEPOIS DO FORNO, ENTRE NA DECORAÇÃO: ESCOLHA A COBERTURA, FAÇA A CALDA E COLOQUE TOPPINGS E DETALHES DE GLACÊ.';
function speakTutorial(){if(!('speechSynthesis'in window)){toast('Seu navegador não disponibiliza voz neste modo.');return;}speechSynthesis.cancel();const utter=new SpeechSynthesisUtterance(tutorialText);utter.lang='pt-BR';utter.rate=.96;utter.pitch=1.05;state.speechOn=true;document.querySelector('.voice-button')?.classList.add('active');utter.onend=()=>{state.speechOn=false;document.querySelector('.voice-button')?.classList.remove('active');};speechSynthesis.speak(utter);}
function toggleVoice(){if(state.speechOn){speechSynthesis.cancel();state.speechOn=false;document.querySelector('.voice-button')?.classList.remove('active');return;}speakTutorial();}
function showTutorial(){state.screen='tutorial';clearOverlay();updateHud(false);setScene('bg-tutorial');logoTop.classList.remove('hidden');overlay.innerHTML=`<div class="tutorial-scene"><img class="chef-character tutorial-chef" src="assets/chef-page53-normal.png" alt="CHEF"><div class="speech-bubble tutorial-speech"><strong>COMO JOGAR?</strong><span>VEJA A RECEITA, PEGUE OS INGREDIENTES, ESCOLHA A FORMA, MISTURE, ASSE E DECORE O BOLO.</span></div><div class="tutorial-card"><div class="tutorial-text"><p>1. VEJA A RECEITA E CONFIRA OS INGREDIENTES.</p><p>2. PEGUE TUDO NO ARMÁRIO E NA GELADEIRA.</p><p>3. ESCOLHA A FORMA CORRETA.</p><p>4. MISTURE NA BATEDEIRA OU NA VASILHA.</p><p>5. ASSE O BOLO.</p><p>6. DECORE EM 3 ETAPAS: COBERTURA, CALDA E TOPPINGS.</p></div><button class="voice-button" data-action="toggleVoice" title="OUVIR AS INSTRUÇÕES">🔊</button><div class="small-copy">CLIQUE NO ALTO-FALANTE PARA OUVIR AS INSTRUÇÕES.</div><div class="tutorial-actions">${button('ESCOLHER BOLO','recipeSelect','green')} ${button('VOLTAR','menu','secondary small')}</div></div></div>`;bindActions(overlay);} 
function startGame(){state.screen='game';clearTimers();clearOverlay();updateHud(true);setScene('bg-kitchen');logoTop.classList.add('hidden');renderKitchen();}
function renderKitchen(){clearTimers();setScene('bg-kitchen');const needed=required().length;const hint=state.collected.size<needed?'Pegue os ingredientes. Depois escolha a forma e misture.':(!state.moldOk?'Ingredientes completos! Agora escolha a forma.':(!state.mixOk?'Clique na batedeira ou na vasilha para misturar.':(!state.baked?'Clique no forno para assar o bolo.':'O bolo está pronto. Agora decore!')));overlay.innerHTML=`<div class="kitchen-ui"><div class="hotspot hotspot-cabinet" data-action="cabinet" title="Abrir armário"></div><div class="hotspot hotspot-fridge" data-action="fridge" title="Abrir geladeira"></div><div class="hotspot hotspot-mold" data-action="molds" title="Escolher forma"></div><div class="hotspot hotspot-mixer ${!state.mixOk&&state.moldOk?'pulse':''}" data-action="mixMixer" title="Misturar na batedeira"></div><div class="hotspot hotspot-bowl ${!state.mixOk&&state.moldOk?'pulse':''}" data-action="mixSpoon" title="Misturar na vasilha"></div><div class="hotspot hotspot-oven ${state.mixOk&&!state.baked?'pulse':''}" data-action="oven" title="Assar"></div><div class="tooltip" style="left:3%;top:84%;max-width:430px">${hint}</div><div class="inventory-note">${currentRecipe().emoji} ${currentRecipe().name} · Ingredientes: ${state.collected.size}/${needed} · Forma: ${state.moldOk?'✓':'—'} · Massa: ${state.mixOk?'✓':'—'} · Forno: ${state.baked?'✓':'—'}</div></div>`;updateHud(true);bindActions(overlay);}
function recipeModal(){if(document.getElementById('recipe-modal'))return;const r={...currentRecipe(),form:currentForm(),formName:currentFormName()};const decor=r.decor;overlay.insertAdjacentHTML('beforeend',`<div class="modal" id="recipe-modal"><div class="panel"><div class="recipe-head"><div><h2>${r.emoji} ${r.name}</h2><p>${r.description}</p></div><div class="cake-emoji">📖</div></div><div class="recipe-layout"><div><h3 style="margin:0 0 10px;color:var(--red)">Ingredientes</h3><div class="recipe-grid">${r.ingredients.map(i=>`<div class="ingredient ${state.collected.has(i.id)?'done':''}"><div class="ingredient-text"><span class="ingredient-photo">${i.emoji}</span><span>${i.name}</span></div><span class="badge">${state.collected.has(i.id)?'OK':'pendente'}</span></div>`).join('')}</div></div><div class="recipe-preview-card"><h3>Forma + decoração desejada</h3><div class="preview-row"><div class="form-preview"><div class="form-shape ${r.form}" title="${r.formName}"></div><strong>${r.formName.toUpperCase()}</strong></div><div class="decor-preview">${recipeTopPreviewMarkup(r)}<strong>TOPPINGS DISPONÍVEIS: ${previewToppingChoices(r).join(' ')} + CALDA</strong><span class="small-copy">GLACÊ: ${decor.piping.toUpperCase()} · COBERTURA: ${decor.frosting}</span></div></div><div class="recipe-steps"><b>Sequência:</b> coletar ingredientes → ${r.formName} → batedeira ou vasilha → forno → cobertura → calda → toppings/glacê.</div></div></div><div style="text-align:center;margin-top:18px">${button('FECHAR','closeRecipe','secondary')}</div></div></div>`);bindActions(document.getElementById('recipe-modal'));}
function closeRecipe(){document.getElementById('recipe-modal')?.remove();}
function panel(title,desc,items,actionName){overlay.insertAdjacentHTML('beforeend',`<div class="modal" id="panel-modal"><div class="panel"><h2>${title}</h2><p>${desc}</p><div class="item-grid">${items.map(i=>`<div class="item" data-pick="${i.id}" data-action="${actionName}"><div class="emoji">${i.emoji}</div><strong>${i.label}</strong></div>`).join('')}</div><div style="text-align:center;margin-top:16px">${button('FECHAR','closePanel','secondary small')}</div></div></div>`);bindActions(document.getElementById('panel-modal'));}
function closePanel(){document.getElementById('panel-modal')?.remove();}
function ingredientRequired(id){return required().includes(id);}function expectedSource(id){return currentRecipe().ingredients.find(i=>i.id===id)?.source;}
function ingredientAward(){const n=required().length;const base=Math.floor(30/n);const used=base*(n-1);return state.collected.size===n-1?30-used:base;}
function chooseIngredient(el,source){const id=el.dataset.pick;const correct=ingredientRequired(id)&&expectedSource(id)===source;if(correct){if(!state.collected.has(id)){const pts=ingredientAward();state.collected.add(id);addScore(pts,true);toast(`Boa! ${currentRecipe().ingredients.find(i=>i.id===id)?.name} +${pts} PTS`);}el.classList.add('correct');setTimeout(()=>{closePanel();renderKitchen();},420);}else{el.classList.add('wrong');addScore(-5,true);toast('OPS! ESSE ITEM ESTÁ ERRADO! -5 PTS');}}
function openCabinet(){panel('ARMÁRIO','Pegue os ingredientes em pó desta receita.',cabinetItems,'chooseCabinet');}
function openFridge(){panel('GELADEIRA','Pegue os ingredientes frios desta receita.',fridgeItems,'chooseFridge');}
function chooseCabinet(el){chooseIngredient(el,'cabinet');}function chooseFridge(el){chooseIngredient(el,'fridge');}
function showMolds(){panel('FORMAS',`Escolha a forma correta para esta rodada: <b>${currentFormName()}</b>.`,moldItems,'pickMold');}
function pickMold(el){if(el.dataset.pick===currentForm()){if(!state.moldOk){state.moldOk=true;addScore(15,true);}el.classList.add('correct');toast(`BOA! FORMA CORRETA +15 PTS`);setTimeout(()=>{closePanel();renderKitchen();},500);}else{el.classList.add('wrong');addScore(-10,true);toast('OPS! ESSA NÃO É A FORMA DA RECEITA! -10 PTS');}}
function canMix(){if(state.collected.size<required().length){toast('Ainda faltam ingredientes da receita.');return false;}if(!state.moldOk){toast('Escolha a forma correta antes de misturar.');return false;}if(state.mixOk){toast('A massa desta receita já foi misturada.');return false;}return true;}
function mixScene(kind){
  if(!canMix())return;
  clearTimers();
  state.step=4;
  updateHud(true);
  clearOverlay();
  setScene('bg-kitchen');
  const isMixer=kind==='mixer';
  overlay.innerHTML=`<div class="mix-interactive ${isMixer?'mix-interactive-mixer':'mix-interactive-bowl'}">
    <div class="mix-title">${isMixer?'BATEDEIRA':'VASILHA'} · <span id="mixPct">0%</span></div>
    <div class="mix-workbench">
      ${isMixer?`<div class="custom-mixer" id="customMixer"><div class="mixer-head"><div class="mixer-body"></div><div class="mixer-lever"></div></div><div class="mixer-bowl"><div class="mixer-batter"></div><div class="whisk" id="mixerWhisk"><i></i><i></i><i></i></div></div><div class="mixer-base"></div><button class="mixer-start" id="mixerStart">LIGAR BATEDEIRA</button></div>`:
      `<div class="custom-bowl-wrap"><div class="custom-bowl" id="customBowl"><div class="bowl-batter"></div><div class="bowl-ripple"></div></div><div class="hand-spoon" id="handSpoon" role="button" tabindex="0" aria-label="ARRASTE A COLHER"><span class="spoon-handle"></span><span class="spoon-head"></span></div><div class="bowl-help">SEGURE A COLHER E FAÇA MOVIMENTOS CIRCULARES DENTRO DA MASSA.</div></div>`}
    </div>
    <div class="mix-progress"><div class="mix-fill" id="mixFill"></div></div>
    <div class="mix-hint" id="mixHint">${isMixer?'CLIQUE EM LIGAR E DEIXE A BATEDEIRA MISTURAR.':'ARRASTE A COLHER EM CÍRCULOS SOBRE A MASSA.'}</div>
    <button class="btn secondary mix-back" data-action="backToKitchen">VOLTAR</button>
  </div>`;
  bindActions(overlay);
  const countEl=document.getElementById('mixPct'),fillEl=document.getElementById('mixFill');
  let progress=0,done=false,dragging=false,lastAngle=null,lastTime=0,raf=null;
  const finishMix=()=>{if(done)return;done=true;state.mixOk=true;addScore(20,true);toast('BOA! VOCÊ MISTUROU A MASSA +20 PTS');setTimeout(()=>{state.step=5;renderKitchen();},650);};
  const setProgress=v=>{progress=Math.min(100,Math.max(0,v));if(countEl)countEl.textContent=Math.round(progress)+'%';if(fillEl)fillEl.style.width=progress+'%';if(progress>=100)finishMix();};
  if(isMixer){
    const startBtn=document.getElementById('mixerStart'),whisk=document.getElementById('mixerWhisk');
    startBtn?.addEventListener('click',()=>{if(done)return;startBtn.disabled=true;startBtn.textContent='BATEDEIRA LIGADA';whisk.classList.add('spinning');document.getElementById('customMixer')?.classList.add('running');let t=0;state.mixTimer=setInterval(()=>{t+=5;setProgress(t);if(t>=100){clearInterval(state.mixTimer);state.mixTimer=null;}},180);});
  }else{
    const spoon=document.getElementById('handSpoon'),bowl=document.getElementById('customBowl');
    const center=()=>{const r=bowl.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2};};
    const onMove=ev=>{if(!dragging)return;spoon.style.left=(ev.clientX-18)+'px';spoon.style.top=(ev.clientY-24)+'px';const c=center();const dx=ev.clientX-c.x,dy=ev.clientY-c.y;const inside=Math.hypot(dx,dy)<Math.min(bowl.clientWidth,bowl.clientHeight)*.43;if(!inside){lastAngle=null;return;}const a=Math.atan2(dy,dx);if(lastAngle!==null){let d=a-lastAngle;if(d>Math.PI)d-=Math.PI*2;if(d<-Math.PI)d+=Math.PI*2;setProgress(progress+Math.abs(d)*11);}lastAngle=a;bowl.classList.add('stirring');};
    const onUp=()=>{dragging=false;lastAngle=null;spoon.classList.remove('dragging');bowl.classList.remove('stirring');};
    const onDown=e=>{e.preventDefault();dragging=true;lastAngle=null;spoon.classList.add('dragging');spoon.setPointerCapture?.(e.pointerId);};
    spoon.addEventListener('pointerdown',onDown);document.addEventListener('pointermove',onMove);document.addEventListener('pointerup',onUp);
    state.syrupCleanup=()=>{spoon.removeEventListener('pointerdown',onDown);document.removeEventListener('pointermove',onMove);document.removeEventListener('pointerup',onUp);state.syrupCleanup=null;};
  }
}
function mixMixer(){mixScene('mixer');}function mixSpoon(){mixScene('spoon');}function backToKitchen(){clearTimers();renderKitchen();}
function showOven(){if(!state.mixOk){toast('MISTURE A MASSA ANTES DE ASSAR.');return;}if(state.baked){ovenReady();return;}clearTimers();state.step=6;updateHud(true);clearOverlay();setScene('bg-oven');logoTop.classList.add('hidden');overlay.innerHTML=`<div class="oven-character-layer"><div aria-hidden="true"></div><img class="chef-character oven-chef" src="assets/chef-page53-oven-sticker.png" alt="CHEF"><div class="speech-bubble oven-speech"><strong>ESPERE O BOLO ASSAR!</strong><span>A MASSA ESTÁ NO FORNO.</span></div></div><div class="oven-ui"><strong>ESPERE O ${currentRecipe().name.toUpperCase()} ASSAR!</strong><div class="progress"><div id="ovenBar"></div></div><div class="small-copy" id="ovenText" style="margin-top:8px">O FORNO ESTÁ TRABALHANDO...</div></div>`;let pct=0;const bar=document.getElementById('ovenBar');state.ovenTimer=setInterval(()=>{pct+=5;if(bar)bar.style.width=pct+'%';if(pct>=100){clearInterval(state.ovenTimer);state.ovenTimer=null;state.baked=true;addScore(20,true);setTimeout(ovenReady,500);}},180);}
function ovenReady(){clearTimers();state.step=7;updateHud(true);clearOverlay();setScene('bg-oven-ready');overlay.innerHTML=`<div class="oven-character-layer ready"><div  aria-hidden="true"></div><img class="chef-character oven-chef" src="assets/chef-page53-oven-sticker.png" alt="CHEF"><div class="speech-bubble oven-speech"><strong>O BOLO ESTÁ PRONTO!</strong><span>TIRE ELE DO FORNO E COMECE A DECORAÇÃO.</span></div></div><div class="center-card oven-ready-card">${button('TIRAR BOLO','beginDecoration','green')}</div>`;bindActions(overlay);}
function beginDecoration(){if(!state.baked){toast('Asse o bolo primeiro.');return;}clearTimers();state.step=8;state.decorStage=1;setScene('bg-decor');renderDecoration();}
function cakeMarkup(extra='',id='decorCake'){const form=currentForm();return `<div class="cake-3d form-${form}" id="${id}" style="--frosting:${state.frosting}"><div class="cake-side form-${form}"><div class="cake-pattern pattern-${state.sidePattern}"></div>${extra}</div><div class="cake-top form-${form}"></div><div class="cake-base"></div></div>`;}
function pipingSvg(form,pipeClass,preserve='xMidYMid meet'){if(pipeClass==='piping-none')return '';const paths={round:'<ellipse cx="170" cy="125" rx="154" ry="109"/>',square:'<rect x="16" y="16" width="308" height="218" rx="24"/>',rect:'<rect x="12" y="24" width="316" height="202" rx="26"/>',flower:'<path d="M170 14 C215 0 232 34 264 24 C304 12 318 50 300 78 C328 102 318 140 290 151 C310 187 279 218 247 205 C226 236 190 239 170 216 C140 239 105 229 93 201 C55 218 24 187 43 151 C10 137 3 99 35 78 C17 46 43 13 76 25 C107 36 124 4 170 14 Z"/>',heart:'<path d="M170 226 L34 95 C4 50 29 14 72 14 C108 14 132 36 170 67 C208 36 232 14 268 14 C311 14 336 50 306 95 Z"/>',star:'<path d="M170 10 L205 82 L285 94 L226 146 L242 226 L170 187 L98 226 L114 146 L55 94 L135 82 Z"/>',ring:'<path d="M170 16 A108 108 0 1 1 169.9 16 M170 66 A58 58 0 1 0 170.1 66" fill-rule="evenodd"/>'};return `<svg class="piping-svg ${pipeClass}" viewBox="0 0 340 250" preserveAspectRatio="${preserve}" aria-hidden="true">${paths[form]||paths.round}</svg>`;}
function syrupSvg(){return state.syrupPaths.map(path=>{const pts=path.points.map(p=>`${p.x},${p.y}`).join(' ');return `<polyline points="${pts}" stroke="${path.color}"/>`;}).join('');}
function previewToppingChoices(r){return state.availableToppings.length?state.availableToppings.map(x=>x[0]):(r.decor.toppings||[]);}
function recipeTopPreviewMarkup(r){const choices=previewToppingChoices(r);const tops=choices.slice(0,5).map((t,i)=>`<span class="topping" style="left:${28+(i*23)%50}%;top:${30+(i*17)%44}%">${t}</span>`).join('');const syrup=r.decor.syrup?`<svg class="syrup-svg preview-syrup" viewBox="0 0 340 250"><path d="M55 84 C88 62 118 98 150 82 M188 84 C218 60 250 98 286 79 M72 138 C106 112 136 150 168 132 M202 140 C232 116 264 150 294 130 M88 186 C118 162 148 194 178 178 M210 180 C236 160 260 194 282 176" stroke="${r.decor.syrup}" fill="none" stroke-width="10" stroke-linecap="round"/></svg>`:'';return `<div class="top-cake-wrap mini recipe-top-preview"><div class="top-cake form-${r.form}" style="--frosting:${r.decor.frosting}"><div class="top-cake-shine"></div>${pipingSvg(r.form,'piping-'+r.decor.piping)}${syrup}${tops}</div></div>`;}
function topCakeMarkup(extra='',id='topCake',mini=false){const form=currentForm();const placements=state.toppings.map(t=>`<span class="topping" style="left:${t.x}%;top:${t.y}%">${t.kind}</span>`).join('');return `<div class="top-cake-wrap ${mini?'mini':''}"><div class="top-cake form-${form}" id="${id}" style="--frosting:${state.frosting}"><div class="top-cake-shine"></div><svg class="syrup-svg" viewBox="0 0 340 250" aria-hidden="true">${syrupSvg()}</svg>${placements}${pipingSvg(form,'piping-'+state.piping)}${extra}</div></div>`;}
function renderDecoration(){if(state.syrupCleanup)state.syrupCleanup();clearOverlay();setScene('bg-decor');updateHud(true);const stage=state.decorStage;if(stage===1)renderDecorStage1();else if(stage===2)renderDecorStage2();else renderDecorStage3();}
function renderDecorationShell(content,active){return `<div class="decor-shell"><div class="decor-topbar"><div class="decor-title">${currentRecipe().emoji} DECORAÇÃO</div><div class="stage-steps"><span class="${active===1?'active':''}">1 · COBERTURA</span><span class="${active===2?'active':''}">2 · CALDA</span><span class="${active===3?'active':''}">3 · TOPPINGS + GLACÊ</span></div><button class="btn secondary small" data-action="recipe">🍰 RECEITA</button></div>${content}</div>`;}
function renderDecorStage1(){const colors=decoration.colors.map(([c,n])=>`<button class="swatch ${state.frosting===c?'selected':''}" title="${n}" style="background:${c}" data-color="${c}" data-action="pickFrosting"><span>${n}</span></button>`).join('');const pats=decoration.patterns.map(([id,n])=>`<button class="mini-choice ${state.sidePattern===id?'selected':''}" data-pattern="${id}" data-action="pickPattern">${n}</button>`).join('');const content=`<div class="decor-content"><div class="decor-panel"><h3>1 · COBRIR O BOLO</h3><div class="control-label">COR DA COBERTURA</div><div class="swatches">${colors}</div><div class="control-label">ACABAMENTO AO REDOR</div><div class="pattern-grid">${pats}</div><div class="decor-actions">${button('APLICAR +5 PTS','finishCoating','green')}</div></div><div class="cake-area"><div class="camera-rig">${cakeMarkup()}</div><div class="camera-note">ESCOLHA A COR E O ACABAMENTO DA COBERTURA.</div></div><div class="decor-panel"><h3>PRÉVIA DA RECEITA</h3><p>ESSA É A APARÊNCIA BASE DO BOLO ANTES DA CALDA E DOS TOPPINGS.</p>${recipeTopPreviewMarkup({...currentRecipe(),form:currentForm(),formName:currentFormName()})}</div></div>`;overlay.innerHTML=renderDecorationShell(content,1);bindActions(overlay);}
function pickFrosting(el){state.frosting=el.dataset.color;renderDecoration();}function pickPattern(el){state.sidePattern=el.dataset.pattern;renderDecoration();}
function finishCoating(){if(!state.decorationDone[0]){state.decorationDone[0]=true;addScore(5,true);toast('COBERTURA PRONTA! +5 PTS');}state.step=9;state.decorStage=2;setTimeout(renderDecoration,450);}
function renderDecorStage2(){const content=`<div class="decor-content"><div class="decor-panel"><h3>2 · CALDA NO TOPO</h3><div class="control-label">ESCOLHA A CALDA</div><div class="swatches">${decoration.syrups.map(([c,n])=>`<button class="swatch ${state.syrup===c?'selected':''}" title="${n}" style="background:${c}" data-color="${c}" data-action="pickSyrup"><span>${n}</span></button>`).join('')}</div><div class="syrup-tool-card"><div class="syrup-bottle" id="syrupBottle" style="--syrup:${state.syrup}"><span class="bottle-cap"></span><span class="bottle-body"></span><span class="bottle-nozzle"></span></div><div><strong>ARRASTE A BISNAGA</strong><p>MOVA A BISNAGA SOBRE O BOLO PARA DESENHAR A CALDA.</p></div></div><div class="decor-actions">${button('LIMPAR CALDA','clearSyrup','gold')} ${button('CONFIRMAR +5 PTS','finishSyrup','green')}</div></div><div class="cake-area"><div class="camera-transition"><div class="camera-label">CÂMERA DE CIMA</div>${topCakeMarkup()}</div><div class="camera-note">ARRASTE A BISNAGA PELO BOLO. A CALDA FICA EXATAMENTE ONDE VOCÊ PASSAR.</div></div><div class="decor-panel"><h3>MOVIMENTO DA CÂMERA</h3><p>A VISÃO MUDA DE LADO PARA CIMA SEM ACHATAR O BOLO.</p><div class="camera-mini-arrow">↻</div><div class="camera-mini-text">VISÃO LATERAL → VISÃO SUPERIOR</div></div></div>`;overlay.innerHTML=renderDecorationShell(content,2);bindActions(overlay);setTimeout(setupSyrupInteraction,80);}
function pickSyrup(el){state.syrup=el.dataset.color;const b=document.getElementById('syrupBottle');if(b)b.style.setProperty('--syrup',state.syrup);}
function setupSyrupInteraction(){
  if(state.syrupCleanup)state.syrupCleanup();
  const bottle=document.getElementById('syrupBottle'),cake=document.getElementById('topCake');
  if(!bottle||!cake)return;
  let dragging=false,current=null,last=null;
  const point=e=>{const r=cake.getBoundingClientRect();return{x:(e.clientX-r.left)*(340/r.width),y:(e.clientY-r.top)*(250/r.height)};};
  const inside=e=>{const r=cake.getBoundingClientRect();return e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom;};
  const onMove=ev=>{if(!dragging)return;bottle.style.left=(ev.clientX-38)+'px';bottle.style.top=(ev.clientY-60)+'px';if(!inside(ev)){last=null;current=null;return;}const p=point(ev);if(!current){current={color:state.syrup,points:[p]};state.syrupPaths.push(current);}else{current.points.push(p);}last=p;cake.classList.add('syrup-active');renderSyrupLayer();};
  const onUp=()=>{dragging=false;last=null;current=null;bottle.classList.remove('dragging');cake.classList.remove('syrup-active');};
  const onDown=e=>{e.preventDefault();dragging=true;current=null;last=null;bottle.classList.add('dragging');};
  bottle.addEventListener('pointerdown',onDown);document.addEventListener('pointermove',onMove);document.addEventListener('pointerup',onUp);
  state.syrupCleanup=()=>{bottle.removeEventListener('pointerdown',onDown);document.removeEventListener('pointermove',onMove);document.removeEventListener('pointerup',onUp);state.syrupCleanup=null;};
}
function renderSyrupLayer(){const svg=document.querySelector('#topCake .syrup-svg');if(!svg)return;svg.innerHTML=syrupSvg();}
function clearSyrup(){state.syrupPaths=[];setupSyrupInteraction();}
function finishSyrup(){if(!state.decorationDone[1]){state.decorationDone[1]=true;addScore(5,true);toast('CALDA APLICADA! +5 PTS');}state.step=10;state.decorStage=3;setTimeout(renderDecoration,500);}
function pipingCard(id,n){const sample={none:'—',dot:'● ● ●',ruffle:'≋≋≋',zigzag:'⌁⌁⌁'}[id]||'~~~';return `<button class="piping-card ${state.piping===id?'selected':''}" data-piping="${id}" data-action="pickPiping"><div class="piping-photo"><div class="piping-nozzle"></div><div class="piping-sample">${sample}</div></div><strong>${n}</strong></button>`;}
function renderDecorStage3(){const available=state.availableToppings.length?state.availableToppings:shuffleArray(decoration.toppings).slice(0,6);const tops=available.map(([e,n])=>`<button class="topping-card ${state.selectedTopping===e?'selected':''}" data-topping="${e}" data-action="selectTopping"><span>${e}</span><strong>${n}</strong></button>`).join('');const pip=[['none','Nenhum'],...decoration.piping].map(([id,n])=>pipingCard(id,n)).join('');const content=`<div class="decor-content"><div class="decor-panel"><h3>3 · TOPPINGS + GLACÊ</h3><div class="control-label">TOPPINGS</div><div class="topping-grid">${tops}</div><div class="control-label">GLACÊ AUTOMÁTICO NAS BORDAS</div><div class="piping-grid">${pip}</div><p class="small-copy">ESCOLHA UM TOPPING E CLIQUE NO BOLO. O GLACÊ É APLICADO AUTOMATICAMENTE NA PARTE SUPERIOR E INFERIOR DA LATERAL.</p><div class="decor-actions">${button('FINALIZAR +5 PTS','finishDecoration','green')}</div></div><div class="cake-area"><div class="camera-transition final-top-view">${topCakeMarkup()}</div><div class="camera-note">CLIQUE NO BOLO PARA COLOCAR ${state.selectedTopping||'UM TOPPING'}.</div></div><div class="decor-panel"><h3>PRÉVIA DO TOPO</h3><p>VEJA O QUE PODE SER COLOCADO NA PARTE DE CIMA DO BOLO.</p><div class="preview-list">${previewToppingChoices(currentRecipe()).map(x=>`<span>${x}</span>`).join(' ')} ${currentRecipe().decor.syrup?`<span>CALDA</span>`:''}</div>${topCakeMarkup('', 'previewTopCake', true)}</div></div>`;overlay.innerHTML=renderDecorationShell(content,3);bindActions(overlay);setTimeout(wireToppingCake,20);}
function selectTopping(el){state.selectedTopping=el.dataset.topping;toast(`SELECIONADO ${state.selectedTopping}. CLIQUE NO BOLO.`);renderDecorStage3();}
function pickPiping(el){state.piping=el.dataset.piping;renderDecorStage3();toast(`GLACÊ ${el.textContent.trim()} APLICADO NAS BORDAS.`);}
function placeDecorationClick(e){const cake=document.getElementById('topCake');if(!cake||!state.selectedTopping)return;const r=cake.getBoundingClientRect();const x=Math.max(8,Math.min(92,((e.clientX-r.left)/r.width)*100));const y=Math.max(10,Math.min(90,((e.clientY-r.top)/r.height)*100));state.toppings.push({kind:state.selectedTopping,x,y});toast(`${state.selectedTopping} COLOCADO!`);renderDecorStage3();}
function wireToppingCake(){document.getElementById('topCake')?.addEventListener('click',placeDecorationClick);}
function finishDecoration(){if(!state.decorationDone[2]){state.decorationDone[2]=true;addScore(5,true);toast('DECORAÇÃO FINALIZADA! +5 PTS');}state.step=10;setTimeout(finish,550);}
function backFromDecor(){clearTimers();state.screen='game';state.decorStage=1;state.step=7;renderKitchen();}
function finalCakeMarkup(){
  const form=currentForm();
  const tops=state.toppings.map(t=>`<span class="final-top-topping" style="left:${t.x}%;top:${t.y}%">${t.kind}</span>`).join('');
  const syrup=state.syrupPaths.length?`<svg class="final-syrup-svg" viewBox="0 0 340 250">${syrupSvg()}</svg>`:'';
  const pipe=pipingSvg(form,'piping-'+state.piping,'none');
  return `<div class="final-cake-preview"><div class="final-cake-body form-${form}" style="--frosting:${state.frosting}"><div class="final-cake-top form-${form}">${syrup}${tops}${pipe}</div><div class="final-cake-side form-${form}"><div class="cake-pattern pattern-${state.sidePattern}"></div></div><div class="final-cake-base form-${form}"></div></div></div>`;
}
function finish(){clearTimers();clearOverlay();setScene('bg-result');updateHud(true);logoTop.classList.remove('hidden');overlay.innerHTML=`<div class="final-scene"><img class="chef-character final-chef" src="assets/chef-page53-normal.png" alt="CHEF"><div class="speech-bubble final-speech"><strong>VOCÊ FEZ UM ÓTIMO TRABALHO!</strong><span>DESEJA FAZER OUTRO BOLO OU FINALIZAR?</span></div><div class="center-card finish-card">${finalCakeMarkup()}<h2>PERFEITO!</h2><p>${currentRecipe().name.toUpperCase()} CONCLUÍDO E DECORADO!</p><p style="font-size:28px;color:var(--red);font-weight:900">${state.roundScore} PTS NESTA RODADA</p><p class="total-score-line">TOTAL ACUMULADO ATÉ AQUI: ${state.totalScore} PTS</p><div class="finish-actions">${button('FAZER OUTRO BOLO','recipeSelect','green')} ${button('REFAZER ESTE','replayCurrent','gold')} ${button('FINALIZAR','complete','secondary')}</div></div></div>`;bindActions(overlay);}
function bankCurrentRound(){state.totalScore+=state.roundScore;state.roundScore=0;state.score=state.totalScore;}
function restartFromSplash(){state.totalScore=0;state.roundScore=0;state.score=0;state.step=1;showSplash();}
function replayCurrent(){resetProgress(true);startGame();}function complete(){clearTimers();clearOverlay();updateHud(false);setScene('bg-finish');logoTop.classList.remove('hidden');const completedRound=state.roundScore;overlay.innerHTML=`<div class="final-scene complete-scene" id="complete-screen"><img class="chef-character final-chef complete-chef" src="assets/chef-page53-normal.png" alt="CHEF"><div class="speech-bubble final-speech complete-speech"><strong>PARABÉNS!</strong><span>VOCÊ COMPLETOU O CAKE RUSH COM ${completedRound} PTS.</span></div><div class="center-card"><h2>PARABÉNS!</h2><p>VOCÊ COMPLETOU ESTA RODADA DO CAKE RUSH.</p><p class="small-copy">CLIQUE EM QUALQUER LUGAR DA TELA PARA VOLTAR AO INÍCIO.</p></div></div>`;overlay.onclick=()=>restartFromSplash();}
function chooseAnotherCake(){bankCurrentRound();showRecipeSelect();}
const actions={continueSplash,menu:showMenu,tutorial:showTutorial,recipeSelect:chooseAnotherCake,selectRecipe,startGame,recipe:recipeModal,closeRecipe,cabinet:openCabinet,fridge:openFridge,chooseCabinet,chooseFridge,closePanel,molds:showMolds,pickMold,mixMixer,mixSpoon,backToKitchen,oven:showOven,beginDecoration,backFromDecor,pickFrosting,pickPattern,finishCoating,pickSyrup,clearSyrup,finishSyrup,selectTopping,pickPiping,finishDecoration,replayCurrent,complete,toggleVoice};

document.addEventListener('DOMContentLoaded',()=>{bindActions(hud);showSplash();});
window.addEventListener('keydown',e=>{if(e.key==='Escape'){document.querySelector('.modal')?.remove();if(state.screen==='game')renderKitchen();else if(state.screen==='mix')backToKitchen();}});
