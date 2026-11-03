export const person = {
  name: 'Gustavo Kadooka',
  fullName: 'Gustavo Yujii Silva Kadooka',
  role: 'Desenvolvedor fullstack',
  headline: 'Ciência da Computação · UNESP',
  lede: 'Desenvolvo e modernizo sistemas web. Angular, Django, APIs e automação — com passagem por construção civil, cooperativas de crédito e infraestrutura municipal.',
  location: 'São Paulo',
  email: 'gustavo@kadooka.io',
  phone: '+55 18 99716-8326',
  phoneHref: 'tel:+5518997168326',
  linkedin: 'https://www.linkedin.com/in/gustavo-kadooka',
  github: 'https://github.com/guhkadoo',
};

export const profile =
  'Profissional de TI, bacharelando em Ciência da Computação pela UNESP, com experiência em desenvolvimento, sustentação e modernização de sistemas corporativos. Trabalho com aplicações web, integração por APIs, automação de processos e manipulação de dados. Versátil: aprendo a linguagem, o framework e o ambiente que o problema pedir.';

export const education = {
  school: 'Universidade Estadual Paulista “Júlio de Mesquita Filho”',
  campus: 'UNESP Bauru',
  degree: 'Bacharelado em Ciência da Computação',
  period: '2022 – 2026',
  notes: ['CR 9,13 / 10', '3º colocado da turma', 'IC premiada no XXXVIII CIC'],
};

export interface Experience {
  company: string;
  role: string;
  period: string;
  place: string;
  mode: string;
  points: string[];
}

export const experience: Experience[] = [
  {
    company: 'Loop 4 Solutions',
    role: 'Desenvolvedor fullstack júnior',
    period: 'Ago 2025 – Mar 2026',
    place: 'Indaiatuba, SP',
    mode: 'Híbrido',
    points: [
      'Aplicações web fullstack com Angular e Django.',
      'Migração de Angular 8 para Angular 20: arquitetura mais enxuta, bundle menor, deploy mais rápido.',
      'Sistema de monitoramento e gestão de concretagem para construção civil, com MQTT.',
      'Interfaces responsivas e integração de serviços via API, em ritmo Scrum.',
    ],
  },
  {
    company: 'NEXUM',
    role: 'Estagiário de desenvolvimento',
    period: 'Jun 2025 – Ago 2025',
    place: 'Bauru, SP',
    mode: 'Presencial',
    points: [
      'Processos corporativos na plataforma BPM LECOM, com JavaScript e Java (Maven).',
      'Automação de fluxos usados por cooperativas de crédito em todo o Brasil.',
      'Integração com sistemas externos e plataformas ECM, incluindo processamento de documentos.',
    ],
  },
  {
    company: 'Câmara Municipal de Bauru',
    role: 'Estagiário de TI',
    period: 'Abr 2024 – Jun 2025',
    place: 'Bauru, SP',
    mode: 'Presencial',
    points: [
      'Suporte, instalação e manutenção de Windows 11, backup e redes locais.',
      'Scripts em Bash para tarefas administrativas.',
      'Monitoramento de infraestrutura com Zabbix e Grafana.',
    ],
  },
];

export interface Project {
  title: string;
  kicker: string;
  description: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    title: 'Otimização e caos em FPO',
    kicker: 'Pesquisa premiada',
    description:
      'Iniciação científica PIBIC/UNESP: implementação em Python do Algoritmo de Otimização e Caos aplicado ao Fluxo de Potência Ótimo Reativo, com redes IEEE e benchmark contra DE, PSO e GA. Melhor IC do curso no XXXVIII CIC da UNESP.',
    tags: ['Python', 'pandapower', 'scikit-opt'],
  },
];

export interface SkillGroup {
  label: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: 'Linguagens',
    items: ['C', 'C++', 'C#', 'Java', 'Python', 'JavaScript', 'TypeScript'],
  },
  {
    label: 'Frontend',
    items: ['Angular', 'Angular Material', 'HTML', 'CSS'],
  },
  {
    label: 'Backend',
    items: ['Django', 'Node.js', 'APIs', 'MQTT'],
  },
  {
    label: 'Infra e método',
    items: ['Git', 'Linux', 'Bash', 'CI/CD', 'Zabbix', 'Grafana', 'Scrum'],
  },
];

export const extras = [
  'FCE Cambridge — B2 (177)',
  'Monitoria de Dispositivos e Circuitos Eletrônicos, UNESP, 2023',
  'Maratona SBC de Programação — 2022 e 2023',
  'OBI 2022',
];
