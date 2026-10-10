export type Property = {
  id: string;
  name: string;
  location: string;
  price: number;
  area: number;
  beds: number;
  status: string;
  availability: string;
  image: string;
  description: string;
  customizable: boolean;
};
export type Project = {
  id: string;
  name: string;
  phase: string;
  description: string;
};
export type Post = {
  id: string;
  title: string;
  category: string;
  body: string;
};
export type Inquiry = {
  id: string;
  kind: string;
  name: string;
  email: string;
  message: string;
  status: string;
  createdAt: string;
};
export type Options = Record<string, string[]>;
export type DemoData = {
  properties: Property[];
  projects: Project[];
  posts: Post[];
  inquiries: Inquiry[];
  options: Options;
};
export const seed: DemoData = {
  properties: [
    {
      id: "patio-de-luz",
      name: "Patio de luz",
      location: "Santa Cruz · Centro",
      price: 189000,
      area: 62,
      beds: 1,
      status: "Estudio conceptual",
      availability: "No disponible",
      image: "/images/salon.jpg",
      description:
        "Un espacio abierto que imagina una nueva forma de habitar la ciudad. Materiales naturales, una zona de día conectada y un patio como centro de la vida cotidiana. Ejemplo ficticio: no corresponde a un inmueble identificado ni a un proyecto autorizado.",
      customizable: true,
    },
    {
      id: "casa-calma",
      name: "Casa calma",
      location: "Santa Cruz · La Salle",
      price: 245000,
      area: 86,
      beds: 2,
      status: "Diseño ilustrativo",
      availability: "No disponible",
      image: "/images/cocina.jpg",
      description:
        "Una propuesta de dos dormitorios, cocina abierta y rincones para desconectar. Una exploración del potencial de los espacios existentes, con luz y funcionalidad como punto de partida. Ejemplo ficticio sin viabilidad técnica o urbanística acreditada.",
      customizable: true,
    },
    {
      id: "espacio-salvia",
      name: "Espacio salvia",
      location: "Santa Cruz · Los Gladiolos",
      price: 279000,
      area: 103,
      beds: 3,
      status: "Estudio conceptual",
      availability: "No disponible",
      image: "/images/interior.jpg",
      description:
        "Tres dormitorios y una zona de estar flexible para distintas maneras de vivir. Esta propuesta visual explora una distribución adaptable; superficies, precios y acabados son únicamente demostrativos.",
      customizable: true,
    },
  ],
  projects: [
    {
      id: "centro",
      name: "Reimaginar el centro",
      phase: "Concepto demo",
      description:
        "Exploración ilustrativa de un local a vivienda con patio. No existe una adquisición, licencia ni obra en curso.",
    },
    {
      id: "la-salle",
      name: "Nuevas formas de habitar",
      phase: "Concepto demo",
      description:
        "Estudio visual de espacios flexibles en Santa Cruz. La conversión real exigiría estudios y autorizaciones específicos.",
    },
  ],
  posts: [
    {
      id: "luz-natural",
      title: "La luz como punto de partida",
      category: "Diseño",
      body: "Antes de elegir un acabado, imaginamos cómo se vive un espacio a lo largo del día. La orientación, los huecos y la relación entre estancias guían esa conversación.\n\nEn SPARTIAN queremos partir de las condiciones reales de cada local. Estas ideas son editoriales y no acreditan la viabilidad de ninguna conversión concreta.",
    },
    {
      id: "materiales",
      title: "Materiales que invitan a quedarse",
      category: "Interiorismo",
      body: "Texturas naturales, tonos suaves y detalles sencillos pueden construir una sensación de calma. La elección también debe atender al mantenimiento, el uso y el presupuesto.\n\nNuestro configurador permite explorar combinaciones ilustrativas. Los materiales finales dependerán del proyecto técnico y de su disponibilidad.",
    },
    {
      id: "nueva-mirada",
      title: "Una nueva mirada a los espacios existentes",
      category: "SPARTIAN",
      body: "Un local vacío plantea preguntas: ¿qué puede llegar a ser? ¿Qué necesita su barrio? Nuestra propuesta empresarial comienza con ese análisis.\n\nSPARTIAN está en desarrollo. No anunciamos operaciones abiertas ni proyectos aprobados. Cada oportunidad necesitará evaluación técnica, económica y urbanística independiente.",
    },
  ],
  inquiries: [],
  options: {
    Distribución: ["Abierta", "Con estudio"],
    Materiales: ["Roble natural", "Piedra clara", "Nogal"],
    Pavimentación: ["Madera", "Microcemento", "Porcelánico"],
    Colores: ["Marfil", "Salvia", "Arena"],
    Acabados: ["Mate", "Satinado"],
    Cocina: ["Mediterránea", "Minimalista", "Contemporánea"],
  },
};
export const nav = [
  ["Inicio", "/"],
  ["Viviendas", "/viviendas"],
  ["Proyectos", "/proyectos"],
  ["Qué hacemos", "/que-hacemos"],
  ["Inversores", "/inversores"],
  ["La empresa", "/la-empresa"],
  ["Blog", "/blog"],
  ["Contacto", "/contacto"],
];
export const euro = (n: number) =>
  new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
export const locales = ["es", "it", "en"] as const;
export const activeLocale = "es";
export const steps = [
  [
    "01",
    "Encontrar el potencial",
    "Identificamos espacios con posibilidades y estudiamos su entorno.",
  ],
  [
    "02",
    "Estudiar cada detalle",
    "Evaluamos la viabilidad económica, técnica y urbanística antes de avanzar.",
  ],
  [
    "03",
    "Transformar con sentido",
    "Proyectamos y reformamos, sujetos a las autorizaciones necesarias.",
  ],
  [
    "04",
    "Hacerlo tuyo",
    "Exploramos acabados y opciones dentro de los límites del proyecto aprobado.",
  ],
];
