window.CakeRush = window.CakeRush || {};

(function (CR) {
  CR.actions = {
    continueSplash: CR.continueSplash,
    menu: CR.showMenu,
    tutorial: CR.showTutorial,
    recipeSelect: CR.showRecipeSelect,
    chooseAnotherCake: CR.chooseAnotherCake,
    selectRecipe: CR.selectRecipe,
    startGame: CR.startGame,
    recipe: CR.recipeModal,
    closeRecipe: CR.closeRecipe,
    cabinet: CR.openCabinet,
    fridge: CR.openFridge,
    chooseCabinet: CR.chooseCabinet,
    chooseFridge: CR.chooseFridge,
    closePanel: CR.closePanel,
    molds: CR.showMolds,
    pickMold: CR.pickMold,
    mixMixer: CR.mixMixer,
    mixSpoon: CR.mixSpoon,
    backToKitchen: CR.backToKitchen,
    oven: CR.showOven,
    beginDecoration: CR.beginDecoration,
    backFromDecor: CR.backFromDecor,
    pickFrosting: CR.pickFrosting,
    pickPattern: CR.pickPattern,
    finishCoating: CR.finishCoating,
    pickSyrup: CR.pickSyrup,
    clearSyrup: CR.clearSyrup,
    finishSyrup: CR.finishSyrup,
    selectTopping: CR.selectTopping,
    pickPiping: CR.pickPiping,
    finishDecoration: CR.finishDecoration,
    replayCurrent: CR.replayCurrent,
    complete: CR.complete,
    toggleVoice: CR.toggleVoice
  };

  document.addEventListener('DOMContentLoaded', () => {
    CR.bindActions(CR.hud);
    CR.showSplash();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    document.querySelector('.modal')?.remove();
    if (CR.state.screen === 'game') CR.renderKitchen();
    else if (CR.state.screen === 'mix') CR.backToKitchen();
  });
})(window.CakeRush);
