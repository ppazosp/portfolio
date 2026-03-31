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
    title: "Pablo Pazos Parada - Ingeniero de IA Aplicada",
    description: "Ingeniero de IA Aplicada y Co-Fundador que construyo una startup de IA de 7 personas desde cero. Diseno, construyo y despliego sistemas de agentes IA en produccion — plataformas RAG, flujos multi-agente y pipelines automatizados — desplegados en pilotos empresariales con grandes clientes industriales.",
    siteName: "Pablo Pazos Parada",
    ogImage: "/og-image.png"
  },

  navigation: {
    brand: "PP",
    links: [
      { href: "/es/#about", label: "Sobre mi" },
      { href: "/es/#projects", label: "Proyectos" },
      { href: "/es/#stack", label: "Stack" },
      { href: "/es/#experience", label: "Camino" },
      { href: "/es/#contact", label: "Contacto" }
    ]
  },

  hero: {
    tagline: "Ingeniero de IA Aplicada - Forward Deployed",
    description: "Llevo sistemas de agentes IA de la idea a produccion y mas alla. Plataformas RAG, flujos multi-agente y pipelines automatizados definidos con clientes, construidos end-to-end, desplegados y mantenidos en entornos empresariales."
  },

  about: {
    headline: ["De idea", "a", "produccion"],
    description: "Me integro con el cliente para entender su problema, diseno la solucion, la construyo, la despliego y la mantengo. Desde la primera reunion hasta el monitoreo en produccion, soy responsable de cada paso. Co-funde una startup de IA de 7 personas donde lidere ingenieria y trabaje directamente con clientes empresariales end-to-end.",
    stats: [
      { value: 21, label: "Anos", suffix: "" },
      { value: 4, label: "Sistemas en prod", suffix: "" },
      { value: 7, label: "Ingenieros", suffix: "" },
      { value: 150, label: "Usuarios", suffix: "+" }
    ]
  },

  projects: [
    {
      name: "APEC",
      tagline: "OSIX · CMO Automatizado",
      description: "Plataforma multi-agente de inteligencia comercial. Un orquestador, un investigador con scraping headless y un extractor financiero alimentan un dashboard de campanas en tiempo real. Pipeline completo de email frio: segmentacion, mensajes personalizados, tracking de apertura/click y scheduling anti-deteccion. Coordinacion en vivo entre agentes via suscripciones Realtime.",
      tech: ["Python", "Next.js", "Supabase", "Playwright", "Anthropic API", "Gmail API"],
      color: "#9B7DFF"
    },
    {
      name: "IRIS",
      tagline: "OSIX · Inteligencia de Email",
      description: "Sistema multi-agente de gestion de email para cliente B2B. Un modelo clasifica y ejecuta tool-calling en seis funciones (busqueda de productos, stock, historial de cliente, info de pagos) mientras otro genera borradores contextuales. Conectado directamente al ERP del cliente para datos en tiempo real de productos, facturas y clientes. Ingesta de email casi instantanea via push notifications, actualizaciones de procesamiento en vivo en el dashboard.",
      tech: ["FastAPI", "React", "Supabase", "OpenAI API", "Anthropic API", "ERP Integration"],
      color: "#6448D6"
    },
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
      description: "Construi +5 sistemas de IA en produccion end-to-end, desde la definicion con el cliente hasta la arquitectura, despliegue y mantenimiento. Lidere un equipo de 7 ingenieros mientras trabajaba directamente con clientes empresariales como ingeniero desplegado traduciendo necesidades de negocio en productos entregados."
    },
    {
      company: "Freelance",
      role: "Desarrollador de Software",
      period: "Verano 2023 y 2024",
      location: "O Grove, Espana",
      description: "Detecte un problema real, disene la solucion, la construi solo, la despliegue y di soporte a mas de 150 usuarios. Sistema digital de reservas de pistas de padel, ciclo completo de la idea a produccion."
    },
    {
      company: "USC",
      role: "Grado en Ingenieria Informatica",
      period: "2022 – 2026",
      location: "Santiago de Compostela",
      description: "Grado en Ingenieria Informatica cubriendo algoritmos, arquitectura de sistemas, ingenieria de software y fundamentos de CS."
    }
  ],

  contact: {
    headline: "Creemos algo",
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
