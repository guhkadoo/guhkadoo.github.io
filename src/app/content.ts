export const person = {
  name: 'Gustavo Kadooka',
  fullName: 'Gustavo Yujii Silva Kadooka',
  email: 'gustavo@kadooka.io',
  phone: '+55 18 99716-8326',
  phoneHref: 'tel:+5518997168326',
  linkedin: 'https://www.linkedin.com/in/gustavo-kadooka',
  github: 'https://github.com/guhkadoo',
  resume: 'curriculo.pdf',
};

export interface Highlight {
  value: string;
  label: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  place: string;
  mode: string;
  summary: string;
  points: string[];
  stack: string[];
}

export interface Project {
  title: string;
  kicker: string;
  description: string;
  tags: string[];
  result?: string;
  link?: { label: string; href: string };
  featured?: boolean;
}

export interface SkillGroup {
  label: string;
  note: string;
  items: string[];
}

export interface SectionCopy {
  label: string;
  aside: string;
  titleA: string;
  titleB: string;
  intro: string;
}

export interface Content {
  meta: { title: string };
  nav: {
    home: string;
    sections: string;
    about: string;
    experience: string;
    projects: string;
    skills: string;
    contact: string;
    talk: string;
    openMenu: string;
    closeMenu: string;
    skip: string;
    language: string;
    role: string;
  };
  theme: {
    blackHole: string;
    whiteDwarf: string;
    collapseHint: string;
    reigniteHint: string;
    toDark: string;
    toLight: string;
  };
  hero: {
    kicker: string;
    titleLead: string;
    titleAccent: string;
    lede: string;
    ledeStrong: string;
    ledeRest: string;
    explore: string;
    resume: string;
    badgeKicker: string;
    badgeText: string;
    panelLabel: string;
    ring: string;
    footnote: string;
    scroll: string;
  };
  marquee: string[];
  about: SectionCopy & {
    text: string[];
    highlights: Highlight[];
    eduKicker: string;
    degree: string;
    campus: string;
    period: string;
    notes: string[];
  };
  experience: SectionCopy & { jobs: Experience[] };
  projects: SectionCopy & {
    items: Project[];
    chaosName: string;
    chaosCaption: string;
    chaosOverlayKicker: string;
    chaosOverlayTitle: string;
    more: string;
    moreLink: string;
  };
  skills: SectionCopy & {
    groups: SkillGroup[];
    legend: string;
    extrasTitle: string;
    extras: string[];
  };
  contact: SectionCopy & {
    phone: string;
    rights: string;
    toTop: string;
    writeMe: string;
  };
}

export const coreSkills = new Set(['TypeScript', 'Python', 'Angular', 'Django', 'APIs', 'Git']);

const pt: Content = {
  meta: { title: 'Gustavo Kadooka · Desenvolvedor fullstack' },
  nav: {
    home: 'Gustavo Kadooka, início',
    sections: 'Seções',
    about: 'Sobre',
    experience: 'Experiência',
    projects: 'Projetos',
    skills: 'Habilidades',
    contact: 'Contato',
    talk: 'Vamos conversar',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    skip: 'Pular para o conteúdo',
    language: 'Idioma',
    role: 'Desenvolvedor fullstack',
  },
  theme: {
    blackHole: 'Buraco negro',
    whiteDwarf: 'Anã branca',
    collapseHint: 'Clique para colapsar',
    reigniteHint: 'Clique para reacender',
    toDark: 'Ativar modo escuro: buraco negro',
    toLight: 'Ativar modo claro: anã branca',
  },
  hero: {
    kicker: 'Gustavo Kadooka · São Paulo, BR',
    titleLead: 'Código que entra em',
    titleAccent: 'órbita',
    lede: 'Sou Gustavo,',
    ledeStrong: 'desenvolvedor fullstack',
    ledeRest:
      'Desenvolvo e modernizo sistemas web com Angular, Django, APIs e automação, com passagem por construção civil, cooperativas de crédito e infraestrutura municipal.',
    explore: 'Explorar projetos',
    resume: 'Baixar currículo',
    badgeKicker: 'Pesquisa premiada',
    badgeText: 'Melhor IC do curso · XXXVIII CIC',
    panelLabel: 'Objeto em observação',
    ring: 'Do legado ao deploy · Angular · Django · ',
    footnote: 'Sistemas modernos, do commit ao deploy.',
    scroll: 'Role para explorar',
  },
  marquee: ['Fullstack', 'Angular', 'Django', 'APIs', 'Automação', 'Modernização'],
  about: {
    label: 'Sobre',
    aside: 'Ciência da Computação · UNESP',
    titleA: 'Aprendo o que o problema pede.',
    titleB: 'Entrego o que ele precisa.',
    intro: '',
    text: [
      'Sou profissional de TI e estou terminando o bacharelado em Ciência da Computação na UNESP. Tenho experiência em desenvolvimento, sustentação e modernização de sistemas corporativos.',
      'Trabalho com aplicações web, integração por APIs, automação de processos e manipulação de dados. Aprendo a linguagem, o framework e o ambiente que o problema pedir.',
    ],
    highlights: [
      { value: '3', label: 'empresas em TI' },
      { value: '9,13', label: 'CR na UNESP' },
      { value: '3º', label: 'colocado da turma' },
      { value: '2×', label: 'Maratona SBC' },
    ],
    eduKicker: 'Formação',
    degree: 'Bacharelado em Ciência da Computação',
    campus: 'UNESP Bauru',
    period: '2022 – 2026',
    notes: ['CR 9,13 / 10', '3º colocado da turma', 'IC premiada no XXXVIII CIC'],
  },
  experience: {
    label: 'Experiência',
    aside: 'Construção civil · Crédito · Setor público',
    titleA: 'Da obra à cooperativa.',
    titleB: 'Do legado ao Angular 20.',
    intro:
      'Sistemas que rodam em operações reais, de concretagem monitorada por sensores a fluxos de crédito usados no Brasil inteiro.',
    jobs: [
      {
        company: 'Loop 4 Solutions',
        role: 'Desenvolvedor fullstack júnior',
        period: 'Ago 2025 – Mar 2026',
        place: 'Indaiatuba, SP',
        mode: 'Híbrido',
        summary: 'Aplicações web fullstack e modernização de plataforma para construção civil.',
        points: [
          'Migração de Angular 8 para Angular 20: arquitetura mais enxuta, bundle menor, deploy mais rápido.',
          'Sistema de monitoramento e gestão de concretagem para construção civil, com MQTT.',
          'Interfaces responsivas e integração de serviços via API, em ritmo Scrum.',
        ],
        stack: ['Angular', 'TypeScript', 'Django', 'Python', 'MQTT'],
      },
      {
        company: 'NEXUM',
        role: 'Estagiário de desenvolvimento',
        period: 'Jun 2025 – Ago 2025',
        place: 'Bauru, SP',
        mode: 'Presencial',
        summary: 'Automação de processos para cooperativas de crédito de todo o Brasil.',
        points: [
          'Processos corporativos na plataforma BPM LECOM, com JavaScript e Java (Maven).',
          'Integração com sistemas externos e plataformas ECM, incluindo processamento de documentos.',
        ],
        stack: ['LECOM BPM', 'JavaScript', 'Java', 'Maven'],
      },
      {
        company: 'Câmara Municipal de Bauru',
        role: 'Estagiário de TI',
        period: 'Abr 2024 – Jun 2025',
        place: 'Bauru, SP',
        mode: 'Presencial',
        summary: 'Infraestrutura, suporte e monitoramento no legislativo municipal.',
        points: [
          'Suporte, instalação e manutenção de Windows 11, backup e redes locais.',
          'Scripts em Bash para tarefas administrativas.',
          'Monitoramento de infraestrutura com Zabbix e Grafana.',
        ],
        stack: ['Windows', 'Redes', 'Bash', 'Zabbix', 'Grafana'],
      },
    ],
  },
  projects: {
    label: 'Projetos',
    aside: 'Ideia → código → resultado',
    titleA: 'Ideias testadas.',
    titleB: 'Resultados medidos.',
    intro: 'Pesquisa, produto e experimentos. O mesmo cuidado em cada entrega.',
    items: [
      {
        title: 'Otimização e caos em FPO',
        kicker: 'Pesquisa · Otimização',
        description:
          'Iniciação científica PIBIC/UNESP: implementação em Python do Algoritmo de Otimização e Caos aplicado ao Fluxo de Potência Ótimo Reativo, com redes IEEE e benchmark contra DE, PSO e GA.',
        tags: ['Python', 'pandapower', 'scikit-opt'],
        result: 'Melhor IC do curso no XXXVIII CIC da UNESP',
        featured: true,
      },
    ],
    chaosName: 'Mapa logístico',
    chaosCaption: 'ordem → caos',
    chaosOverlayKicker: 'Iniciação científica',
    chaosOverlayTitle: 'Caos a favor da otimização.',
    more: 'Outros experimentos e código aberto.',
    moreLink: 'Explore meu GitHub',
  },
  skills: {
    label: 'Habilidades',
    aside: 'Em destaque: uso no dia a dia',
    titleA: 'Ferramentas certas.',
    titleB: 'Para cada problema.',
    intro: '',
    groups: [
      {
        label: 'Linguagens',
        note: 'A base de tudo.',
        items: ['C', 'C++', 'C#', 'Java', 'Python', 'JavaScript', 'TypeScript'],
      },
      {
        label: 'Frontend',
        note: 'Da ideia à interação.',
        items: ['Angular', 'Angular Material', 'HTML', 'CSS'],
      },
      {
        label: 'Backend',
        note: 'Estrutura para crescer.',
        items: ['Django', 'Node.js', 'APIs', 'MQTT'],
      },
      {
        label: 'Infra e método',
        note: 'Do commit à produção.',
        items: ['Git', 'Linux', 'Bash', 'CI/CD', 'Zabbix', 'Grafana', 'Scrum'],
      },
    ],
    legend: 'Uso no dia a dia',
    extrasTitle: 'Certificações e competições',
    extras: [
      'FCE Cambridge — B2 (177)',
      'Monitoria de Dispositivos e Circuitos Eletrônicos, UNESP, 2023',
      'Maratona SBC de Programação — 2022 e 2023',
      'OBI 2022',
    ],
  },
  contact: {
    label: 'Contato',
    aside: 'São Paulo, BR → órbita',
    titleA: 'Tem um sistema para modernizar?',
    titleB: 'Vamos colocar em órbita.',
    intro: 'Um produto novo, um legado que precisa evoluir ou uma boa ideia. Quero ouvir o que você está construindo.',
    phone: 'Telefone',
    rights: '© 2026 Gustavo Yujii Silva Kadooka',
    toTop: 'De volta ao topo',
    writeMe: 'Enviar um e-mail',
  },
};

const en: Content = {
  meta: { title: 'Gustavo Kadooka · Full-stack developer' },
  nav: {
    home: 'Gustavo Kadooka, home',
    sections: 'Sections',
    about: 'About',
    experience: 'Experience',
    projects: 'Projects',
    skills: 'Skills',
    contact: 'Contact',
    talk: "Let's talk",
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    skip: 'Skip to content',
    language: 'Language',
    role: 'Full-stack developer',
  },
  theme: {
    blackHole: 'Black hole',
    whiteDwarf: 'White dwarf',
    collapseHint: 'Click to collapse',
    reigniteHint: 'Click to reignite',
    toDark: 'Switch to dark mode: black hole',
    toLight: 'Switch to light mode: white dwarf',
  },
  hero: {
    kicker: 'Gustavo Kadooka · São Paulo, BR',
    titleLead: 'Code that reaches',
    titleAccent: 'orbit',
    lede: "I'm Gustavo, a",
    ledeStrong: 'full-stack developer',
    ledeRest:
      'I build and modernize web systems with Angular, Django, APIs and automation, with experience in construction, credit unions and municipal infrastructure.',
    explore: 'Explore projects',
    resume: 'Download résumé',
    badgeKicker: 'Award-winning research',
    badgeText: 'Best undergraduate research · XXXVIII CIC',
    panelLabel: 'Object under observation',
    ring: 'From legacy to deploy · Angular · Django · ',
    footnote: 'Modern systems, from commit to deploy.',
    scroll: 'Scroll to explore',
  },
  marquee: ['Full-stack', 'Angular', 'Django', 'APIs', 'Automation', 'Modernization'],
  about: {
    label: 'About',
    aside: 'Computer Science · UNESP',
    titleA: 'I learn what the problem asks.',
    titleB: 'I deliver what it needs.',
    intro: '',
    text: [
      "I'm an IT professional finishing a B.Sc. in Computer Science at UNESP, with experience developing, maintaining and modernizing enterprise systems.",
      'I work with web applications, API integrations, process automation and data. I pick up whatever language, framework or environment the problem calls for.',
    ],
    highlights: [
      { value: '3', label: 'companies in IT' },
      { value: '9.13', label: 'GPA at UNESP' },
      { value: '3rd', label: 'in my class' },
      { value: '2×', label: 'ICPC Brazil' },
    ],
    eduKicker: 'Education',
    degree: 'B.Sc. in Computer Science',
    campus: 'UNESP Bauru',
    period: '2022 – 2026',
    notes: ['GPA 9.13 / 10', 'Ranked 3rd in my class', 'Award-winning research at XXXVIII CIC'],
  },
  experience: {
    label: 'Experience',
    aside: 'Construction · Credit · Public sector',
    titleA: 'From job sites to credit unions.',
    titleB: 'From legacy to Angular 20.',
    intro:
      'Systems that run real operations, from sensor-monitored concrete pours to credit workflows used across Brazil.',
    jobs: [
      {
        company: 'Loop 4 Solutions',
        role: 'Junior full-stack developer',
        period: 'Aug 2025 – Mar 2026',
        place: 'Indaiatuba, SP',
        mode: 'Hybrid',
        summary: 'Full-stack web apps and platform modernization for the construction industry.',
        points: [
          'Migrated Angular 8 to Angular 20: leaner architecture, smaller bundle, faster deploys.',
          'Concrete pour monitoring and management system for construction, using MQTT.',
          'Responsive interfaces and API service integrations in a Scrum team.',
        ],
        stack: ['Angular', 'TypeScript', 'Django', 'Python', 'MQTT'],
      },
      {
        company: 'NEXUM',
        role: 'Software development intern',
        period: 'Jun 2025 – Aug 2025',
        place: 'Bauru, SP',
        mode: 'On-site',
        summary: 'Process automation for credit unions across Brazil.',
        points: [
          'Enterprise processes on the LECOM BPM platform, with JavaScript and Java (Maven).',
          'Integrations with external systems and ECM platforms, including document processing.',
        ],
        stack: ['LECOM BPM', 'JavaScript', 'Java', 'Maven'],
      },
      {
        company: 'Bauru City Council',
        role: 'IT intern',
        period: 'Apr 2024 – Jun 2025',
        place: 'Bauru, SP',
        mode: 'On-site',
        summary: 'Infrastructure, support and monitoring for the municipal legislature.',
        points: [
          'Support, installation and maintenance of Windows 11, backups and local networks.',
          'Bash scripts for administrative tasks.',
          'Infrastructure monitoring with Zabbix and Grafana.',
        ],
        stack: ['Windows', 'Networking', 'Bash', 'Zabbix', 'Grafana'],
      },
    ],
  },
  projects: {
    label: 'Projects',
    aside: 'Idea → code → result',
    titleA: 'Ideas, tested.',
    titleB: 'Results, measured.',
    intro: 'Research, product and experiments. The same care in every delivery.',
    items: [
      {
        title: 'Chaos optimization for OPF',
        kicker: 'Research · Optimization',
        description:
          'PIBIC/UNESP undergraduate research: a Python implementation of the Chaos Optimization Algorithm applied to Reactive Optimal Power Flow, on IEEE test networks and benchmarked against DE, PSO and GA.',
        tags: ['Python', 'pandapower', 'scikit-opt'],
        result: 'Best undergraduate research in the program at UNESP’s XXXVIII CIC',
        featured: true,
      },
    ],
    chaosName: 'Logistic map',
    chaosCaption: 'order → chaos',
    chaosOverlayKicker: 'Undergraduate research',
    chaosOverlayTitle: 'Chaos, working for optimization.',
    more: 'More experiments and open source.',
    moreLink: 'Explore my GitHub',
  },
  skills: {
    label: 'Skills',
    aside: 'Highlighted: daily drivers',
    titleA: 'The right tools.',
    titleB: 'For every problem.',
    intro: '',
    groups: [
      {
        label: 'Languages',
        note: 'Where it all starts.',
        items: ['C', 'C++', 'C#', 'Java', 'Python', 'JavaScript', 'TypeScript'],
      },
      {
        label: 'Frontend',
        note: 'From idea to interaction.',
        items: ['Angular', 'Angular Material', 'HTML', 'CSS'],
      },
      {
        label: 'Backend',
        note: 'Structure that scales.',
        items: ['Django', 'Node.js', 'APIs', 'MQTT'],
      },
      {
        label: 'Infra & process',
        note: 'From commit to production.',
        items: ['Git', 'Linux', 'Bash', 'CI/CD', 'Zabbix', 'Grafana', 'Scrum'],
      },
    ],
    legend: 'Daily drivers',
    extrasTitle: 'Certifications and competitions',
    extras: [
      'Cambridge FCE — B2 (177)',
      'Teaching assistant, Electronic Devices and Circuits, UNESP, 2023',
      'ICPC Brazil (Maratona SBC) — 2022 and 2023',
      'Brazilian Olympiad in Informatics (OBI) 2022',
    ],
  },
  contact: {
    label: 'Contact',
    aside: 'São Paulo, BR → orbit',
    titleA: 'Got a system to modernize?',
    titleB: "Let's put it in orbit.",
    intro: "A new product, a legacy system that needs to evolve, or just a good idea. I'd love to hear what you're building.",
    phone: 'Phone',
    rights: '© 2026 Gustavo Yujii Silva Kadooka',
    toTop: 'Back to top',
    writeMe: 'Send an email',
  },
};

export const content: Record<'pt' | 'en', Content> = { pt, en };
