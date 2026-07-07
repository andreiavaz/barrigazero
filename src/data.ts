export interface DailyMissionData {
  dayNum: number;
  title: string;
  description: string;
  quote?: string;
  tasks: string[];
  hasInputs?: boolean;
  inputs?: string[];
  recipe?: {
    title: string;
    ingredients: string[];
    preparation: string[];
  };
}

export const FAQ_LIST = [
  {
    question: 'Não tenho tempo para assistir o Desafio. Como posso me beneficiar?',
    answer: 'Sim. O curso é estruturado para que você possa assisti-lo de uma vez ou em um ritmo muito mais lento. Independentemente de como você escolher acessar o curso, ele é dividido em etapas pequenas e fáceis de implementar que facilitam a digestão e o ajuste à sua programação.'
  },
  {
    question: 'E se eu não gostar do desafio?',
    answer: 'Acho que você vai adorar aprender com o curso e gostar de pertencer a uma comunidade solidária de mulheres que pensam como você. No entanto, se você não estiver satisfeita, entre em contato conosco nos primeiros 14 dias e eu o reembolsarei - sem perguntas.'
  },
  {
    question: 'Por quanto tempo tenho acesso ao curso?',
    answer: 'Você terá acesso vitalício. Atualizarei regularmente o curso para acompanhar as mudanças do setor e você receberá essas atualizações como parte de seu acesso vitalício.'
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Aluna Anônima',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120',
    tag: 'Voltou a usar o shorts que não servia',
    screenshotText: {
      time: '09:45',
      messages: [
        'Oii Andreia estou bem e você como está? Não me pesei ontem e nem hoje mais vou me pesar amanhã e te conto.',
        'Mas foi uma experiência muito boa porque eu estou conseguindo usar um shorts que não me servia e agora ele está largo pra mim.',
        'E as calças diminuíram para numeração 40.'
      ]
    }
  },
  {
    id: 2,
    name: 'Aluna Eliminou 5cm',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
    tag: 'Ela eliminou 5cm em 15 dias',
    screenshotText: {
      time: '09:41',
      messages: [
        'Foi muito bom, embora tenha me esforçado bastante durante a semana, no dois finais de semana do Desafio, tive aniversário e confraternização. Acredito que o resultado não foi melhor devido à esses eventos.',
        'Mas estou satisfeita, reduzi a cintura em 5cm e o peso em apenas 1 kg. Mas preciso perder mais peso, por isso estou ainda bem focada, tomando os chás diariamente, mantendo a disciplina com as refeições e reduzindo os carboidratos. Agradeço imensamente! Valeu muito a pena. 🥰😘💪'
      ]
    }
  },
  {
    id: 3,
    name: 'Aluna Eliminou 6cm',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=120',
    tag: 'Ela eliminou 6cm em 15 dias',
    screenshotText: {
      time: '11:31',
      messages: [
        'A nutri quer saber!!! Vocês se pesaram? Mediram? Qual foi o seu resultado até aqui?',
        'Sim. Peso perdido: 2,600 kg. Cintura: -6 cm. Quadril: -4 cm. Busto: -3 cm. Braço: -3 cm.'
      ]
    }
  },
  {
    id: 4,
    name: 'Mãe da Nutri (69 anos)',
    avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=120',
    tag: 'Eliminou 5cm de abdômen com 69 anos',
    screenshotText: {
      time: '22:05',
      messages: [
        'Olá meninas! Esse desafio me fez muitíssimo bem.',
        'Olha só: cheguei com 70,100 kg, abdômen 113 cm.',
        'Saí com 68,400 kg, abdômen 108 cm. (Eliminou 5 cm!)',
        'Obrigada filha pelo seu trabalho competente, amor, carinho e dedicação com cada uma de nós! ❤️'
      ]
    }
  }
];

export const MISSIONS_DATA: DailyMissionData[] = [
  {
    dayNum: 1,
    title: 'Ponto de partida',
    description: 'Se você não sabe onde está, não dá pra saber o quanto andou. E olha, excesso de informação também trava. Você já sabe muita coisa sobre alimentação e mesmo assim está aqui. Então guarda esse conhecimento todo num potinho por 15 dias e só executa. Sem julgar o antes, sem cobrar o depois.',
    quote: 'Mulher, vamos conversar com sinceridade?',
    tasks: [
      'Me pesei e tirei minhas medidas',
      'Escolhi meus 3 hábitos inegociáveis',
      'Anotei os 3 hábitos em lugar visível'
    ],
    hasInputs: true,
    inputs: [
      'O que eu quero?',
      'O que eu preciso?',
      'O que eu de fato consigo fazer agora?'
    ]
  },
  {
    dayNum: 2,
    title: 'Chá e a técnica da toalha',
    description: 'O corpo se acostuma e o ponteiro para de mexer. Isso é efeito platô, não é fracasso seu. Os chás certos ajudam a destravar, e marcar aquele check vale muito mais do que parece pra sua cabeça.',
    quote: 'Confia na nutri.',
    tasks: [
      'Tomei meu chá longe das refeições (até 500 ml)',
      'Fiz o exercício da toalha (ou pulei com segurança)',
      'Marquei o check da planilha de hábitos'
    ],
    recipe: {
      title: 'Chá Chapa Barriga (Chá de Maçã)',
      ingredients: [
        '1 maçã picada',
        '12 cravos da Índia',
        '1 pedaço de canela em pau',
        '1 anis estrelado',
        '500 ml de água',
        '1 colher de sopa de cavalinha (opcional)'
      ],
      preparation: [
        'Coloque a água numa panela e leve ao fogo alto até ferver.',
        'Adicione a maçã picada, os cravos, a canela e o anis à água fervente.',
        'Deixe cozinhar por cerca de 10 minutos, até o aroma ficar intenso.',
        'Desligue o fogo e acrescente a cavalinha, se for usar.',
        'Deixe descansar alguns minutos antes de servir.'
      ]
    }
  },
  {
    dayNum: 3,
    title: 'Jejum intermitente',
    description: 'Jejum não é privação, é dar um descanso pro corpo e aprender a diferenciar fome de sede, fome de vontade, fome de ansiedade.',
    quote: 'Atenção: Se você é gestante, amamenta, tem histórico de compulsão, diabetes ou condição médica, converse com seu médico antes.',
    tasks: [
      'Confirmei que posso seguir esse dia com segurança',
      'Defini meu horário de início e fim da janela',
      'Fiquei atenta à hidratação adequada'
    ]
  },
  {
    dayNum: 4,
    title: 'Sentar pra comer, ficar em pé pro celular',
    description: 'O que a gente come em pé, sem perceber, entra e ninguém vê a conta no fim do dia. Comer sentada traz de volta a escolha consciente, sem virar mais uma regra rígida.',
    quote: 'Seu corpo não precisa virar castigo.',
    tasks: [
      'Comi tudo sentada hoje, sem exceção',
      'Usei o celular em pé nos momentos de distração',
      'Percebi algum momento de comer em pé sem perceber'
    ]
  },
  {
    dayNum: 5,
    title: 'Qualidade do que você bebe',
    description: 'Suco de caixinha, refrigerante, água com gás e álcool em excesso estufam a barriga e travam o resultado, mesmo quando você está fazendo tudo certo na comida.',
    quote: 'Confia na nutri.',
    tasks: [
      'Troquei suco de caixinha ou refrigerante por fruta de verdade ou suco natural',
      'Se bebi álcool, apliquei a regra de 1 copo de água para cada copo de bebida',
      'Percebi se realmente precisava daquela bebida'
    ]
  },
  {
    dayNum: 6,
    title: 'Sua quantidade ideal de água',
    description: 'Falta de água causa indisposição, falta de concentração, prisão de ventre e trava o emagrecimento. Água não é substituível por chá, suco ou café.',
    quote: 'Cálculo de Água: Seu peso × 35 (ideal × 40) em ml por dia.',
    tasks: [
      'Calculei minha quantidade ideal de água hoje',
      'Bati a meta de água do dia',
      'Configurei lembretes se precisei para não esquecer'
    ]
  },
  {
    dayNum: 7,
    title: 'Fontes de prazer',
    description: 'Você não vai emagrecer só com cardápio bonito se sua mente ainda associa prazer só com comida. Quando o dia é estressante, o cérebro pede recompensa. Isso não é falta de força de vontade, é mecanismo de sobrevivência emocional.',
    quote: 'A culpa nunca foi falta de força.',
    tasks: [
      'Anotei 3 fontes de prazer que não sejam comida',
      'Coloquei pelo menos 1 fonte em prática hoje',
      'Percebi um momento de "eu mereço" e o troquei por outra fonte saudável'
    ],
    hasInputs: true,
    inputs: [
      'Prazer Alternativo 1',
      'Prazer Alternativo 2',
      'Prazer Alternativo 3'
    ]
  },
  {
    dayNum: 8,
    title: 'Própolis verde',
    description: 'O própolis verde é um anti-inflamatório natural extraordinário e pode ajudar em vários aspectos no organismo, não só no emagrecimento rápido.',
    quote: 'Dica: Consuma de 10 a 20 gotas todos os dias. Prefira à base de água se gestante ou amamentando.',
    tasks: [
      'Avaliei se posso incluir o própolis na minha rotina',
      'Tomei minha primeira dose (se decidi seguir)',
      'Defini o horário ideal do dia para consumo'
    ]
  },
  {
    dayNum: 9,
    title: 'Reinventando o jantar',
    description: 'Jantar não é vilão. Pular o jantar é que empurra você pro delivery ou para beliscar besteira a noite toda. Isso engorda mais do que um jantar bem montado e equilibrado.',
    quote: 'Confia na nutri.',
    tasks: [
      'Deixei a salada lavada e pronta na geladeira',
      'Montei o prato com proteína, carboidrato integral e salada',
      'Evitei beliscar besteiras no lugar do jantar'
    ]
  },
  {
    dayNum: 10,
    title: 'O diário alimentar',
    description: 'Quem não anota, se sabota. Um estudo com 1.200 mulheres mostrou que quem registra o que come perde em média 1kg a mais por semana. Isso não é para te vigiar, é para dar clareza.',
    quote: 'Sem julgamentos, apenas registro.',
    tasks: [
      'Anotei tudo que comi no café da manhã e almoço hoje',
      'Anotei o lanche e o jantar com quantidades e horários',
      'Olhei para o dia inteiro sem me culpar pelo que vi'
    ]
  },
  {
    dayNum: 11,
    title: 'O prato completo',
    description: 'Fruta sozinha não segura fome por muito tempo. Fibra e proteína seguram. A saciedade usa o mesmo princípio que a fibra e a proteína fazem de graça no seu prato.',
    quote: 'Nunca coma fruta pelada. Combine sempre com fibras ou proteínas.',
    tasks: [
      'Combinei fruta com fibra (chia, linhaça, aveia) ou proteína em 2 refeições',
      'Aumentei a ingestão de água porque aumentei as fibras',
      'Garanti que meu prato principal continha fibras e proteínas'
    ]
  },
  {
    dayNum: 12,
    title: 'A varredura',
    description: 'Ambiente errado sabota decisão certa. Se a tentação está na prateleira fácil, ela vai vencer em algum momento. Isso não é fraqueza sua, é o ambiente jogando contra você.',
    quote: 'Facilite o caminho certo.',
    tasks: [
      'Fiz a varredura da despensa e tirei ultraprocessados',
      'Criei uma lista de compras saudável e inteligente',
      'Anotei 5 hábitos saudáveis a mudar com soluções práticas'
    ],
    hasInputs: true,
    inputs: [
      'Hábito para mudar 1',
      'Hábito para mudar 2',
      'Solução para o ambiente'
    ]
  },
  {
    dayNum: 13,
    title: 'Caprichar na salada',
    description: 'Salada não emagrece sozinha e feijoada não engorda sozinha. Mas a salada nutre, traz saciedade imediata e isso muda o resultado e a digestão do seu dia inteiro.',
    quote: 'Quanto mais colorido for seu prato, melhor.',
    tasks: [
      'Fiz uma salada colorida e caprichada no almoço',
      'Fiz salada ou bebi suco verde no jantar',
      'Variei os ingredientes e folhas no dia de hoje'
    ]
  },
  {
    dayNum: 14,
    title: 'Constância',
    description: 'Quem é constante desenvolve o hábito de forma automática. Constância não é a coisa mais fácil do mundo, por isso vamos com estrutura e amor, não com cobrança pesada.',
    quote: 'Mulher... respira.',
    tasks: [
      'Dividi meu dia em blocos organizados',
      'Escolhi 1 pessoa querida para envolver no meu processo',
      'Defini meu plano B para hoje caso a rotina falhasse'
    ]
  },
  {
    dayNum: 15,
    title: 'Errar sem culpa',
    description: 'Regime severo é ditadura. Reeducação alimentar de verdade aceita o erro e segue em frente. Quem se culpa desiste. Quem entende o erro, continua. A culpa nunca foi falta de força.',
    quote: 'Emagrecer não deveria custar sua paz.',
    tasks: [
      'Identifiquei um momento em que exagerei e não me culpei',
      'Voltei ao plano alimentar logo na refeição seguinte',
      'Refleti com carinho sobre o que estava sentindo quando exagerei'
    ]
  }
];

export const FOOD_GUIDE = {
  waterCalc: {
    title: 'Sua água sem enrolação',
    description: 'Esquece calculadora complicada. É só multiplicar seu peso por 35.',
    formula: 'Seu peso (kg) × 35 = SUA META DE ÁGUA EM ML, POR DIA',
    example: 'Exemplo: 60kg × 35 = 2,1 litros por dia (cerca de 4 garrafinhas de 500ml).',
    tip: 'Chá conta à parte, até 500ml por dia. Água é água, chá é chá, suco é suco. Ninguém substitui ninguém.'
  },
  meals: [
    {
      title: 'Café da Manhã',
      subtitle: 'Metade do prato é a base (proteína ou gordura boa), a outra metade é o carboidrato leve.',
      bases: ['Ovos mexidos', 'Patê de abacate', 'Patê de biomassa', 'Hommus'],
      carbs: ['Torrada integral', 'Biscoito de arroz', 'Pão caseiro integral', 'Crepioca / tapioca'],
      notes: 'Sempre com chá ou café sem açúcar, mais uma fruta de sua escolha.'
    },
    {
      title: 'Lanches',
      subtitle: 'Duas versões: uma para a manhã, outra para a tarde. Fruta ou carboidrato leve + fonte de gordura boa ou proteína.',
      morning: ['Fruta + oleaginosa', 'Sementes de Chia', 'Sementes de Linhaça', 'Barrinha de sementes caseira'],
      afternoon: ['Iogurte natural', 'Ovos mexidos', 'Gergelim', 'Tomate cereja'],
      tip: 'Dica da Nutri: Nunca coma fruta pelada, sempre acompanhada de fibra ou proteína. É isso que sustenta a saciedade.'
    },
    {
      title: 'Almoço e Jantar',
      subtitle: 'Divisão em 4 grupos: metade de hortaliças, outra metade dividida entre proteína e carboidrato.',
      greens: ['Folhas verdes', 'Legumes coloridos', 'Vegetais crus'],
      proteinAndCarb: ['Ovo, frango, peixe', 'Arroz integral', 'Batata doce'],
      lunchOnly: 'SÓ NO ALMOÇO: Leguminosas (feijão, lentilha, grão de bico, ervilha) entram como extra.'
    }
  ],
  priorities: [
    {
      category: 'FRUTAS',
      items: '3 a 4 porções por dia: maçã, banana, laranja, morango, mamão, uva, abacate'
    },
    {
      category: 'LEGUMES E VERDURAS',
      items: 'Metade do prato no almoço e jantar: folhas, brócolis, cenoura, abobrinha, tomate'
    },
    {
      category: 'CEREAIS E RAÍZES',
      items: '1 a 2 porções por dia: batata doce, arroz integral, quinoa, inhame'
    },
    {
      category: 'PROTEÍNA ANIMAL',
      items: 'Ovo, frango, peixe, carne vermelha com moderação, iogurte sem açúcar'
    },
    {
      category: 'LEGUMINOSAS',
      items: 'Feijão, lentilha, grão de bico, ervilha, tofu'
    },
    {
      category: 'GORDURAS BOAS',
      items: 'Azeite de oliva extra virgem, abacate, castanhas, óleo de coco, manteiga ghee'
    }
  ],
  pauses: [
    { name: 'Ultraprocessados e frituras de imersão', text: 'Salgadinhos, frituras pesadas' },
    { name: 'Pão industrializado, macarrão instantâneo, sopa de pacote', text: 'Carboidratos refinados rápidos' },
    { name: 'Álcool', text: 'Retém líquido e paralisa a queima de gordura' },
    { name: 'Congelados prontos (pizza, hambúrguer, nuggets)', text: 'Cheios de sódio e conservantes' },
    { name: 'Embutidos, salsicha, molhos e temperos prontos', text: 'Altamente inflamatórios' },
    { name: 'Suco de caixinha, refrigerante, iogurte aromatizado', text: 'Calorias líquidas cheias de açúcar' },
    { name: 'Biscoito recheado, salgadinho de pacote, cereal açucarado', text: 'Gatilho para picos de insulina' }
  ],
  routine: {
    movement: '30 minutos, 4x por semana ou mais. Caminhada, dança, musculação, o que você gostar e puder fazer. Separe a roupa do treino na véspera!',
    sleep: 'Durma mais cedo ou por mais horas quando possível. Evite tela perto da hora de dormir. Sono ruim sabota o resultado tanto quanto comer errado.',
    quote: '"Seu resultado é proporcional à sua constância, não à sua perfeição."'
  }
};
