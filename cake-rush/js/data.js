window.CakeRush = window.CakeRush || {};

(function (CR) {
  CR.recipes = [
    {
      id: 'vanilla',
      name: 'Bolo de Baunilha',
      emoji: '🍰',
      flavorClass: 'vanilla',
      form: 'round',
      formName: 'Forma redonda',
      description: 'Massa clássica e fofinha, com uma decoração delicada em tons pastel.',
      ingredients: [
        { id: 'farinha', name: 'Farinha', emoji: '🌾', source: 'cabinet' },
        { id: 'acucar', name: 'Açúcar', emoji: '🍚', source: 'cabinet' },
        { id: 'fermento', name: 'Fermento', emoji: '🧂', source: 'cabinet' },
        { id: 'ovos', name: 'Ovos', emoji: '🥚', source: 'fridge' },
        { id: 'leite', name: 'Leite', emoji: '🥛', source: 'fridge' },
        { id: 'manteiga', name: 'Manteiga', emoji: '🧈', source: 'fridge' }
      ],
      decor: { frosting: '#ffd9e7', pattern: 'smooth', syrup: '#f3b64a', toppings: ['🍓', '✨'], piping: 'dot' }
    },
    {
      id: 'chocolate',
      name: 'Bolo de Chocolate',
      emoji: '🍫',
      flavorClass: 'choc',
      form: 'square',
      formName: 'Forma quadrada',
      description: 'Chocolate intenso para uma cobertura cremosa e calda brilhante.',
      ingredients: [
        { id: 'farinha', name: 'Farinha', emoji: '🌾', source: 'cabinet' },
        { id: 'acucar', name: 'Açúcar', emoji: '🍚', source: 'cabinet' },
        { id: 'cacau', name: 'Cacau', emoji: '🍫', source: 'cabinet' },
        { id: 'fermento', name: 'Fermento', emoji: '🧂', source: 'cabinet' },
        { id: 'ovos', name: 'Ovos', emoji: '🥚', source: 'fridge' },
        { id: 'leite', name: 'Leite', emoji: '🥛', source: 'fridge' },
        { id: 'manteiga', name: 'Manteiga', emoji: '🧈', source: 'fridge' }
      ],
      decor: { frosting: '#6f3b2a', pattern: 'stripes', syrup: '#3e2317', toppings: ['🍫', '🍓'], piping: 'ruffle' }
    },
    {
      id: 'strawberry',
      name: 'Bolo de Morango',
      emoji: '🍓',
      flavorClass: 'straw',
      form: 'heart',
      formName: 'Forma de coração',
      description: 'Uma sequência romântica, com morangos e tons rosados.',
      ingredients: [
        { id: 'farinha', name: 'Farinha', emoji: '🌾', source: 'cabinet' },
        { id: 'acucar', name: 'Açúcar', emoji: '🍚', source: 'cabinet' },
        { id: 'fermento', name: 'Fermento', emoji: '🧂', source: 'cabinet' },
        { id: 'ovos', name: 'Ovos', emoji: '🥚', source: 'fridge' },
        { id: 'leite', name: 'Leite', emoji: '🥛', source: 'fridge' },
        { id: 'manteiga', name: 'Manteiga', emoji: '🧈', source: 'fridge' },
        { id: 'morango', name: 'Morango', emoji: '🍓', source: 'fridge' }
      ],
      decor: { frosting: '#ff97b6', pattern: 'dots', syrup: '#c73d63', toppings: ['🍓', '💗'], piping: 'dot' }
    },
    {
      id: 'cinnamon',
      name: 'Bolo de Canela',
      emoji: '🧁',
      flavorClass: 'vanilla',
      form: 'ring',
      formName: 'Forma de furo',
      description: 'Canela, especiarias e uma decoração com fios de glacê.',
      ingredients: [
        { id: 'farinha', name: 'Farinha', emoji: '🌾', source: 'cabinet' },
        { id: 'acucar', name: 'Açúcar', emoji: '🍚', source: 'cabinet' },
        { id: 'fermento', name: 'Fermento', emoji: '🧂', source: 'cabinet' },
        { id: 'canela', name: 'Canela', emoji: '🫙', source: 'cabinet' },
        { id: 'ovos', name: 'Ovos', emoji: '🥚', source: 'fridge' },
        { id: 'leite', name: 'Leite', emoji: '🥛', source: 'fridge' },
        { id: 'manteiga', name: 'Manteiga', emoji: '🧈', source: 'fridge' }
      ],
      decor: { frosting: '#f5d29f', pattern: 'ruffle', syrup: '#b57332', toppings: ['✨', '🍪'], piping: 'zigzag' }
    },
    {
      id: 'lemon',
      name: 'Bolo de Limão',
      emoji: '🍋',
      flavorClass: 'vanilla',
      form: 'flower',
      formName: 'Forma de flor',
      description: 'Limão e glacê cítrico para um bolo com formato divertido.',
      ingredients: [
        { id: 'farinha', name: 'Farinha', emoji: '🌾', source: 'cabinet' },
        { id: 'acucar', name: 'Açúcar', emoji: '🍚', source: 'cabinet' },
        { id: 'fermento', name: 'Fermento', emoji: '🧂', source: 'cabinet' },
        { id: 'raspas', name: 'Raspas de limão', emoji: '🍋', source: 'cabinet' },
        { id: 'ovos', name: 'Ovos', emoji: '🥚', source: 'fridge' },
        { id: 'leite', name: 'Leite', emoji: '🥛', source: 'fridge' },
        { id: 'manteiga', name: 'Manteiga', emoji: '🧈', source: 'fridge' }
      ],
      decor: { frosting: '#fff0a2', pattern: 'dots', syrup: '#f0c441', toppings: ['🍋', '✨'], piping: 'dot' }
    },
    {
      id: 'redvelvet',
      name: 'Red Velvet',
      emoji: '❤️',
      flavorClass: 'straw',
      form: 'star',
      formName: 'Forma de estrela',
      description: 'Massa vermelha e decoração chamativa com chocolate e frutas.',
      ingredients: [
        { id: 'farinha', name: 'Farinha', emoji: '🌾', source: 'cabinet' },
        { id: 'acucar', name: 'Açúcar', emoji: '🍚', source: 'cabinet' },
        { id: 'cacau', name: 'Cacau', emoji: '🍫', source: 'cabinet' },
        { id: 'ovos', name: 'Ovos', emoji: '🥚', source: 'fridge' },
        { id: 'leite', name: 'Leite', emoji: '🥛', source: 'fridge' },
        { id: 'manteiga', name: 'Manteiga', emoji: '🧈', source: 'fridge' },
        { id: 'creme', name: 'Creme', emoji: '🥛', source: 'fridge' }
      ],
      decor: { frosting: '#f7d7d5', pattern: 'stripes', syrup: '#b52d38', toppings: ['🍓', '🍫', '✨'], piping: 'ruffle' }
    }
  ];

  CR.cabinetItems = [
    { id: 'farinha', emoji: '🌾', label: 'Farinha' },
    { id: 'acucar', emoji: '🍚', label: 'Açúcar' },
    { id: 'fermento', emoji: '🧂', label: 'Fermento' },
    { id: 'cacau', emoji: '🍫', label: 'Cacau' },
    { id: 'canela', emoji: '🫙', label: 'Canela' },
    { id: 'raspas', emoji: '🍋', label: 'Raspas de limão' },
    { id: 'coco', emoji: '🥥', label: 'Coco ralado' },
    { id: 'sal', emoji: '🧂', label: 'Sal' }
  ];

  CR.fridgeItems = [
    { id: 'ovos', emoji: '🥚', label: 'Ovos' },
    { id: 'leite', emoji: '🥛', label: 'Leite' },
    { id: 'manteiga', emoji: '🧈', label: 'Manteiga' },
    { id: 'morango', emoji: '🍓', label: 'Morango' },
    { id: 'creme', emoji: '🥛', label: 'Creme' },
    { id: 'banana', emoji: '🍌', label: 'Banana' }
  ];

  CR.moldItems = [
    { id: 'round', emoji: '⭕', label: 'Forma redonda' },
    { id: 'square', emoji: '▣', label: 'Forma quadrada' },
    { id: 'heart', emoji: '♥', label: 'Forma de coração' },
    { id: 'ring', emoji: '🍩', label: 'Forma de furo' },
    { id: 'flower', emoji: '✿', label: 'Forma de flor' },
    { id: 'star', emoji: '★', label: 'Forma de estrela' },
    { id: 'rect', emoji: '▭', label: 'Forma retangular' }
  ];

  CR.decoration = {
    colors: [
      ['#ffd9e7', 'Rosa'],
      ['#fff0a2', 'Baunilha'],
      ['#b7e8ff', 'Azul céu'],
      ['#cdb7ff', 'Lavanda'],
      ['#f7d7d5', 'Rosé'],
      ['#9de29b', 'Menta'],
      ['#f5d29f', 'Caramelo'],
      ['#6f3b2a', 'Chocolate']
    ],
    patterns: [
      ['smooth', 'Liso'],
      ['stripes', 'Listras'],
      ['dots', 'Poás'],
      ['ruffle', 'Ondinhas']
    ],
    syrups: [
      ['#f3b64a', 'Caramelo'],
      ['#c73d63', 'Morango'],
      ['#3e2317', 'Chocolate'],
      ['#f0c441', 'Limão'],
      ['#8b4de8', 'Uva']
    ],
    toppings: [
      ['🍓', 'Morango'],
      ['🍫', 'Chocolate'],
      ['🍒', 'Cereja'],
      ['🫐', 'Frutas'],
      ['🥥', 'Coco'],
      ['✨', 'Brilho'],
      ['🍪', 'Biscoito'],
      ['🍋', 'Limão']
    ],
    piping: [
      ['dot', 'Pontinhos'],
      ['ruffle', 'Babado'],
      ['zigzag', 'Zigue-zague']
    ]
  };
})(window.CakeRush);
