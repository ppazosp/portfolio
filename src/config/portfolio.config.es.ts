export const portfolioConfig = {
  personal: {
    name: "Pablo Pazos Parada",
    firstName: "PABLO",
    lastName1: "PAZOS",
    lastName2: "PARADA",
    location: "O Grove, Spain",
    timezone: "UTC+1",
    email: "pablopazosp3@gmail.com",
    phone: "+34 605 89 30 51",
    github: "ppazosp",
    linkedin: "pablo-pazos-parada",
    company: {
      name: "OSIX Tech",
      url: "https://osix.tech",
      displayUrl: "osix.tech"
    }
  },

  seo: {
    title: "Pablo Pazos Parada — Ingeniero de IA Aplicada",
    description: "Ingeniero de IA desplegado con clientes que lleva proyectos de la idea a produccion. Construyo y despliego sistemas de agentes IA end-to-end para clientes empresariales.",
    siteName: "Pablo Pazos Parada",
    ogImage: "/og-image.jpg"
  },

  navigation: {
    brand: "PP",
    links: [
      { href: "/es/#about", label: "Sobre mi" },
      { href: "/es/#projects", label: "Proyectos" },
      { href: "/es/#stack", label: "Stack" },
      { href: "/es/#experience", label: "Experiencia" },
      { href: "/es/#contact", label: "Contacto" }
    ]
  },

  hero: {
    tagline: "Ingeniero de IA Aplicada — Forward Deployed",
    description: "Llevo sistemas de agentes IA de la idea a produccion y mas alla. Plataformas RAG, flujos multi-agente, pipelines automatizados — definidos con clientes, construidos end-to-end, desplegados y mantenidos en entornos empresariales."
  },

  about: {
    headline: "De idea a produccion",
    description: "Me integro con el cliente para entender su problema, diseno la solucion, la construyo, la despliego y la mantengo. Desde la primera reunion hasta el monitoreo en produccion — soy responsable de cada paso. Co-funde una startup de IA de 7 personas donde lidere ingenieria y trabaje directamente con clientes empresariales end-to-end.",
    stats: [
      { value: 21, label: "Anos", suffix: "" },
      { value: 4, label: "Sistemas en prod", suffix: "" },
      { value: 7, label: "Ingenieros", suffix: "" },
      { value: 150, label: "Usuarios", suffix: "+" }
    ]
  },

  projects: [
    {
      name: "Nessie",
      tagline: "Plataforma B2B de Agentes IA",
      description: "Definida directamente con clientes empresariales, arquitectada desde cero y desplegada en produccion. Plataforma RAG con busqueda hibrida, agentes especializados e ingesta multi-fuente. Disene Nessie Industrial para Pescanova — desde los requisitos de fabrica hasta un sistema en vivo combinando recuperacion de conocimiento y verificacion automatizada de etiquetas.",
      tech: ["Python", "TypeScript", "PostgreSQL", "pgvector", "RAG"],
      color: "#7B61FF"
    },
    {
      name: "APEC",
      tagline: "CMO Automatizado",
      description: "Identifique la necesidad internamente, disene la arquitectura, lo construi y lo despliegue end-to-end. Sistema multi-agente que combina agentes de scraping para investigacion de mercado (NORA) y extraccion financiera (SARA) para alimentar un pipeline completo de outreach por email frio — segmentacion, mensajes personalizados, seguimientos automaticos.",
      tech: ["Python", "Multi-Agent", "LLM APIs", "Automation"],
      color: "#9B7DFF"
    },
    {
      name: "IRIS",
      tagline: "Inteligencia de Email",
      description: "Entregado para un cliente B2B desde la toma de requisitos hasta el paso a produccion. Sistema multi-agente de email que clasifica por cliente, proveedor, intencion y prioridad — genera respuestas contextuales conectadas a su base de datos de productos y CRM. Mantenido e iterado post-lanzamiento.",
      tech: ["Python", "NLP", "CRM Integration", "LLM APIs"],
      color: "#6448D6"
    },
    {
      name: "ACTA",
      tagline: "Inteligencia de Reuniones",
      description: "Construido end-to-end como herramienta interna — desde la definicion de necesidades del equipo hasta el despliegue en produccion. Gestiona transcripcion, diarizacion de hablantes, generacion de resumenes y asignacion automatica de tareas por miembro del equipo.",
      tech: ["Python", "Whisper", "Pyannote", "Voice AI"],
      color: "#A78BFA"
    }
  ],

  techStack: [
    { category: "Lenguajes", items: ["Python", "TypeScript", "JavaScript"] },
    { category: "Frontend", items: ["React", "Next.js", "Astro", "Tailwind CSS"] },
    { category: "Backend", items: ["Node.js", "FastAPI", "PostgreSQL", "pgvector"] },
    { category: "IA & ML", items: ["LLM APIs", "RAG Pipelines", "Multi-Agent", "Prompt Engineering"] },
    { category: "Voz IA", items: ["Whisper", "Pyannote"] },
    { category: "Infraestructura", items: ["Docker", "Git", "CI/CD"] }
  ],

  experience: [
    {
      company: "OSIX Tech",
      role: "CTO y Co-Fundador",
      period: "Junio 2025 – Presente",
      location: "Santiago de Compostela",
      description: "Construi 4 sistemas de IA en produccion end-to-end — desde la definicion con el cliente hasta la arquitectura, despliegue y mantenimiento. Lidere un equipo de 7 ingenieros mientras trabajaba directamente con clientes empresariales como ingeniero desplegado traduciendo necesidades de negocio en productos entregados."
    },
    {
      company: "Freelance",
      role: "Desarrollador de Software",
      period: "Verano 2023 y 2024",
      location: "O Grove, Espana",
      description: "Detecte un problema real, disene la solucion, la construi solo, la despliegue y di soporte a mas de 150 usuarios. Sistema digital de reservas de pistas de padel — ciclo completo de la idea a produccion."
    },
    {
      company: "USC",
      role: "Grado en Ingenieria Informatica",
      period: "2022 – 2026",
      location: "Santiago de Compostela",
      description: "Grado en Ingenieria Informatica — algoritmos, arquitectura de sistemas, ingenieria de software y fundamentos de CS."
    }
  ],

  contact: {
    headline: "Construyamos algo",
    cv: "/docs/pablo-pazos-parada-cv.pdf"
  },

  footer: {
    location: "O Grove, Espana",
    sourceCode: {
      text: "Codigo fuente",
      url: "https://github.com/ppazosp/portfolio"
    }
  }
};
