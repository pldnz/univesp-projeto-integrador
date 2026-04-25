import amora from "../assets/animais/unipa/amora-cao-femea-5-anos.jpg";
import camaro from "../assets/animais/unipa/camaro-cao-macho-6-anos.jpg";
import dika from "../assets/animais/unipa/dika-gato-femea-3-anos.jpg";
import hortencia from "../assets/animais/unipa/hortencia-gato-femea-10-anos.jpg";
import matheo from "../assets/animais/unipa/matheo-cao-macho-2-anos.jpg";
import mia from "../assets/animais/unipa/mia-gato-femea-4-anos.jpg";
import pacoca from "../assets/animais/unipa/pacoca-cao-macho-3-anos.jpg";
import rocambole from "../assets/animais/unipa/rocambole-gato-macho-3-anos.jpg";
import tarzan from "../assets/animais/unipa/tarzan-gato-macho-4-anos.jpg";
import todinho from "../assets/animais/unipa/todinho-cao-macho-4-anos.jpg";
import vida from "../assets/animais/unipa/vida-cao-femea-3-anos.jpg";
import zeus from "../assets/animais/unipa/zeus-cao-macho-6-anos.jpg";

const UNIPA_INFO = {
  institution_name: "UNIPA",
  owner_phone: "5515997321279",
  location: "Itararé, SP",
};

const mockPets = [
  {
    id: 901,
    name: "Amora",
    type: "Cachorro",
    gender: "Fêmea",
    age: 60,
    size: "Porte Médio",
    image_url: amora,
    description:
      "A Amora é uma cadela muito dócil e companheira. Adora passear e se dá bem com outros cães. Está em busca de um lar cheio de amor.",
    status: "disponível",
    ...UNIPA_INFO,
  },
  {
    id: 902,
    name: "Camaro",
    type: "Cachorro",
    gender: "Macho",
    age: 72,
    size: "Grande",
    image_url: camaro,
    description:
      "Camaro é um cão imponente e muito protetor. Ideal para quem busca um guarda fiel e um amigo para todas as horas.",
    status: "disponível",
    ...UNIPA_INFO,
  },
  {
    id: 903,
    name: "Dika",
    type: "Gato",
    gender: "Fêmea",
    age: 36,
    size: "Pequeno",
    image_url: dika,
    description:
      "Dika é uma gatinha calma que adora um colo. Perfeita para apartamentos e ambientes tranquilos.",
    status: "disponível",
    ...UNIPA_INFO,
  },
  {
    id: 904,
    name: "Hortência",
    type: "Gato",
    gender: "Fêmea",
    age: 120,
    size: "Pequeno",
    image_url: hortencia,
    description:
      "Hortência é uma gata sênior que busca um final de vida digno e com muito carinho. É muito silenciosa e educada.",
    status: "disponível",
    ...UNIPA_INFO,
  },
  {
    id: 905,
    name: "Matheo",
    type: "Cachorro",
    gender: "Macho",
    age: 24,
    size: "Porte Médio",
    image_url: matheo,
    description:
      "Matheo é pura energia! Adora correr e brincar com bolinhas. Ideal para famílias ativas.",
    status: "disponível",
    ...UNIPA_INFO,
  },
  {
    id: 906,
    name: "Mia",
    type: "Gato",
    gender: "Fêmea",
    age: 48,
    size: "Pequeno",
    image_url: mia,
    description:
      "Mia é uma gata independente mas que não dispensa um bom petisco. Adora observar o movimento pela janela.",
    status: "disponível",
    ...UNIPA_INFO,
  },
  {
    id: 907,
    name: "Paçoca",
    type: "Cachorro",
    gender: "Macho",
    age: 36,
    size: "Pequeno",
    image_url: pacoca,
    description:
      "Paçoca é um cachorrinho muito carinhoso que cabe em qualquer lugar. Ótimo com crianças.",
    status: "disponível",
    ...UNIPA_INFO,
  },
  {
    id: 908,
    name: "Rocambole",
    type: "Gato",
    gender: "Macho",
    age: 36,
    size: "Pequeno",
    image_url: rocambole,
    description:
      "Rocambole é um gato brincalhão e muito curioso. Está sempre explorando novos cantos da casa.",
    status: "disponível",
    ...UNIPA_INFO,
  },
  {
    id: 909,
    name: "Tarzan",
    type: "Gato",
    gender: "Macho",
    age: 48,
    size: "Pequeno",
    image_url: tarzan,
    description:
      "Tarzan é um gato corajoso e muito ágil. Gosta de lugares altos e de caçar brinquedos.",
    status: "disponível",
    ...UNIPA_INFO,
  },
  {
    id: 910,
    name: "Todinho",
    type: "Cachorro",
    gender: "Macho",
    age: 48,
    size: "Porte Médio",
    image_url: todinho,
    description:
      "Todinho é um cão muito inteligente e aprende comandos rápido. Um ótimo companheiro para caminhadas.",
    status: "disponível",
    ...UNIPA_INFO,
  },
  {
    id: 911,
    name: "Vida",
    type: "Cachorro",
    gender: "Fêmea",
    age: 36,
    size: "Porte Médio",
    image_url: vida,
    description:
      "A Vida é uma cadela que superou muitos desafios e agora só quer um sofá quentinho e muito amor.",
    status: "disponível",
    ...UNIPA_INFO,
  },
  {
    id: 912,
    name: "Zeus",
    type: "Cachorro",
    gender: "Macho",
    age: 72,
    size: "Grande",
    image_url: zeus,
    description:
      "Zeus é um cão calmo apesar do seu tamanho. Muito obediente e fiel ao seu dono.",
    status: "disponível",
    ...UNIPA_INFO,
  },
];

export default mockPets;
