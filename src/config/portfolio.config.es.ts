// Portfolio Configuration - Español
// Este archivo contiene todos los datos personalizables del portafolio en español

export const portfolioConfig = {
  // Información Personal
  personal: {
    name: "Pablo Pazos",
    location: "Santiago, ES",
    timezone: "UTC+1",
    email: "pablopazosp3@gmail.com",
    github: "ppazosp",
    linkedin: "pablo-pazos-parada",
    company: {
      name: "OSIX Tech",
      url: "https://osixtech.com",
      displayUrl: "osix.tech"
    }
  },

  // SEO y Meta
  seo: {
    title: "Pablo Pazos - Estudiante y CTO en OSIX Tech",
    description: "Pablo Pazos - Estudiante de Ingeniería Informática en USC y CTO en OSIX Tech. Apasionado por la resolución de problemas, adopción de IA y construcción de soluciones reales.",
    siteName: "Portafolio de Pablo Pazos",
    ogImage: "/og-image.jpg"
  },

  // Sección Sobre Mí
  about: {
    role1: "Estudiante de Ingeniería Informática en USC",
    role2: "CTO y Co-fundador en OSIX Tech",
    paragraphs: [
      "Equilibrando mi rol como CTO de una startup en crecimiento con mis estudios de Ingeniería Informática. Este doble camino fortalece tanto mi base académica como mi experiencia de liderazgo en el mundo real.",
      "Apasionado por la resolución de problemas, disfruto comprendiendo todo el espectro de tecnologías sin limitarme a una sola especialización. Esta amplia base técnica me ayuda a abordar desafíos desde múltiples ángulos.",
      "Especializado en aplicar e integrar IA en los flujos de trabajo, me enfoco en resolver problemas reales y evaluar soluciones con una mentalidad pragmática orientada al impacto. Mi fortaleza radica en convertir desafíos complejos en soluciones claras y accionables."
    ]
  },

  // Navegación
  navigation: {
    brand: "ppazosp",
    links: [
      { href: "/es/#blog", label: "Blog" },
      { href: "/es/#expertise", label: "Experiencia" },
      { href: "/es/#versatility", label: "Versatilidad" },
      { href: "/es/#principles", label: "Principios" },
      { href: "/es/#projects", label: "Proyectos" },
      { href: "/es/#experience", label: "Trayectoria" }
    ]
  },

  // Jerarquía de Experiencia
  expertise: {
    primary: {
      title: "Resolución Técnica de Problemas",
      description: "Descomponiendo la complejidad, encontrando soluciones óptimas, convirtiendo desafíos en oportunidades",
      level: "Experiencia Principal"
    },
    secondary: [
      {
        title: "Desarrollo Potenciado por IA",
        description: "Arquitecturas de agentes, adopción de IA, ingeniería de prompts, optimización de flujos de trabajo"
      },
      {
        title: "Desarrollo Full-Stack",
        description: "Frontend y backend, alto y bajo nivel, tecnologías web modernas"
      }
    ],
    tertiary: [
      {
        title: "Liderazgo de Equipos",
        description: "Rol de CTO, optimización de flujos de trabajo, mentoría técnica, coaching de productividad"
      },
      {
        title: "Mentalidad Emprendedora",
        description: "Convertir ideas en impacto, alinear negocio y tecnología"
      },
      {
        title: "Aprendizaje Continuo",
        description: "Adaptabilidad, estar al día con nuevas herramientas y evolucionar con la tecnología"
      }
    ]
  },

  // Habilidades para el gráfico de progreso
  skills: [
    { name: 'Backend', percentage: 72 },
    { name: 'Frontend', percentage: 75 },
    { name: 'Diseño UI/UX', percentage: 61 },
    { name: 'IA', percentage: 84 },
    { name: 'DevOps', percentage: 53 },
    { name: 'Seguridad', percentage: 67 },
  ],

  // Filosofía/Principios
  principles: [
    {
      title: "IA como Multiplicador",
      description: "Aprovechar la IA para acelerar el desarrollo y eliminar tareas repetitivas. Transformar horas de programación en minutos de prompting inteligente."
    },
    {
      title: "Multidisciplinar",
      description: "La amplitud sobre la profundidad permite mejores decisiones de resolución de problemas y diseño. Comprender todo el stack previene el pensamiento aislado."
    },
    {
      title: "Sistemas sobre Sintaxis",
      description: "Priorizar patrones de diseño y enfoques de resolución de problemas sobre conocimiento específico de lenguajes. Diseñar el plano, no los ladrillos."
    },
    {
      title: "Iteración Rápida",
      description: "Lanzar rápido, lanzar a menudo, mejorar continuamente. Las herramientas modernas permiten prototipado y prueba rápida de ideas."
    },
    {
      title: "Innovación Pragmática",
      description: "Adoptar nuevas tecnologías cuando resuelven problemas reales, no por novedad. Cada elección de herramienta debe tener justificación de negocio clara."
    },
    {
      title: "Evolución Continua",
      description: "Adaptarse rápidamente a requisitos y tecnologías cambiantes. Lo que funciona hoy puede ser obsoleto mañana - construir con flexibilidad en mente."
    }
  ],

  // Línea de Tiempo de Experiencia
  experience: [
    {
      company: "OSIX Tech",
      role: "CTO y Co-fundador",
      period: "Julio 2025 - Presente",
      impacts: [
        "Lideré la estrategia técnica y adopción de IA en todo el equipo",
        "Logré un impulso de productividad inconmensurable mediante la integración de IA",
        "Construí un equipo de 6 ingenieros a partir de colegas universitarios"
      ],
      skills: [
        "Liderazgo Técnico",
        "Estrategia e Integración de IA",
        "Construcción y Escalado de Equipos"
      ]
    },
    {
      company: "Comunidad Residencial",
      role: "Vigilante de Seguridad",
      period: "Verano 2023 y 2024",
      impacts: [
        "Desarrollé un sistema de reserva de pistas para la comunidad",
        "Descubrí mi pasión por resolver problemas del mundo real",
        "Transición de prácticas académicas a prácticas de software moderno"
      ],
      skills: [
        "Desarrollo Full-Stack",
        "Transición Académica a Mundo Real",
        "Detección de Oportunidades"
      ]
    },
    {
      company: "Universidad de Santiago",
      role: "Estudiante de Ingeniería Informática",
      period: "Sep 2022 - Jun 2026 (Esperado)",
      impacts: [
        "Exploré todas las áreas de los fundamentos de ciencias de la computación",
        "Participé en múltiples hackathons con mi equipo",
        "Auto-aprendí diseño de software moderno y mejores prácticas"
      ],
      skills: [
        "Fundamentos de Ciencias de la Computación",
        "Principios de Ingeniería de Software",
        "Ética de Trabajo",
      ]
    }
  ],

  // Pie de página
  footer: {
    location: "Santiago de Compostela, España · UTC+1",
    sourceCode: {
      text: "Ver Código",
      url: "https://github.com/ppazosp/portfolio"
    }
  }
};
