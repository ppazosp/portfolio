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
    title: "Pablo Pazos Parada — CTO y Co-Fundador, OSIX Tech",
    description: "CTO que construyo una startup de IA de 7 personas desde cero. Diseno, construyo y despliego sistemas de agentes IA en produccion para clientes empresariales.",
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
    tagline: "CTO y Co-Fundador — OSIX Tech",
    description: "Diseno, construyo y despliego sistemas de agentes IA en produccion, incluyendo plataformas RAG, flujos multi-agente y pipelines automatizados, desplegados en pilotos empresariales con grandes clientes industriales."
  },

  about: {
    headline: "Integrando inteligencia en flujos empresariales",
    description: "CTO y Co-Fundador que construyo una startup de IA de 7 personas desde cero. Trabajo directamente con clientes para definir soluciones, iterar en pilotos y llevar a produccion. Mentalidad fundadora: equilibro calidad, responsabilidad y velocidad.",
    stats: [
      { value: 21, label: "Anos", suffix: "" },
      { value: 7, label: "Ingenieros", suffix: "" },
      { value: 5, label: "Productos", suffix: "+" },
      { value: 150, label: "Usuarios", suffix: "+" }
    ]
  },

  projects: [
    {
      name: "Nessie",
      tagline: "Plataforma B2B de Agentes IA",
      description: "Plataforma RAG en produccion con busqueda hibrida avanzada, agentes especializados e ingesta de documentos multi-fuente. Desplegada en pilotos empresariales en sectores de servicios profesionales. Disenada Nessie Industrial para Pescanova — un sistema de grado industrial combinando recuperacion de conocimiento y verificacion automatizada de etiquetas.",
      tech: ["Python", "TypeScript", "PostgreSQL", "pgvector", "RAG"],
      color: "#FF4D00"
    },
    {
      name: "APEC",
      tagline: "CMO Automatizado",
      description: "Sistema multi-agente interno que actua como un CMO automatizado. Combina agentes de scraping para investigacion de mercado (NORA) y extraccion de datos financieros (SARA) para alimentar un pipeline completo de outreach por email frio con segmentacion de prospectos, mensajes personalizados y seguimientos automaticos.",
      tech: ["Python", "Multi-Agent", "LLM APIs", "Automation"],
      color: "#FF6B35"
    },
    {
      name: "IRIS",
      tagline: "Inteligencia de Email",
      description: "Sistema multi-agente de gestion de email que clasifica correos entrantes por cliente, proveedor, intencion y prioridad. Genera respuestas contextuales conectadas a la base de datos de productos y extrae contexto del CRM para informar cada interaccion.",
      tech: ["Python", "NLP", "CRM Integration", "LLM APIs"],
      color: "#E63946"
    },
    {
      name: "ACTA",
      tagline: "Plataforma de Reuniones",
      description: "Plataforma interna de reuniones que gestiona transcripcion, diarizacion de hablantes, generacion de resumenes y asignacion automatica de tareas por miembro del equipo.",
      tech: ["Python", "Whisper", "Pyannote", "Voice AI"],
      color: "#F4A261"
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
      description: "Arquitecto y lider del desarrollo de multiples plataformas de agentes IA en produccion. Consolide un equipo de 7 ingenieros, actuando como lider tecnico y principal tomador de decisiones en arquitectura, logica de negocio y direccion de producto."
    },
    {
      company: "Freelance",
      role: "Desarrollador de Software",
      period: "Verano 2023 y 2024",
      location: "O Grove, Espana",
      description: "Identifique una necesidad comunitaria y disene e implemente de forma independiente un sistema digital de reservas de pistas de padel, adoptado por mas de 150 usuarios."
    },
    {
      company: "USC",
      role: "Grado en Ingenieria Informatica",
      period: "2022 – 2026",
      location: "Santiago de Compostela",
      description: "Grado en Ingenieria Informatica con enfoque en algoritmos, arquitectura de sistemas, ingenieria de software y fundamentos de ciencias de la computacion."
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
