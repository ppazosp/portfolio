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
      url: "https://osixtech.com",
      displayUrl: "osixtech.com"
    }
  },

  seo: {
    title: "Pablo Pazos Parada — CTO & Co-Founder, OSIX Tech",
    description: "CTO who built a 7-person AI startup from zero. I design, build, and ship production AI agent systems for enterprise clients.",
    siteName: "Pablo Pazos Parada",
    ogImage: "/og-image.jpg"
  },

  navigation: {
    brand: "PP",
    links: [
      { href: "/#about", label: "About" },
      { href: "/#projects", label: "Projects" },
      { href: "/#stack", label: "Stack" },
      { href: "/#experience", label: "Experience" },
      { href: "/#contact", label: "Contact" }
    ]
  },

  hero: {
    tagline: "CTO & Co-Founder — OSIX Tech",
    description: "I design, build, and ship production AI agent systems, including RAG platforms, multi-agent workflows, and automated pipelines, deployed in enterprise pilots with large industrial clients."
  },

  about: {
    headline: "Building intelligence into enterprise workflows",
    description: "CTO and Co-Founder who built a 7-person AI startup from zero. I work directly with customers to scope solutions, iterate on pilots, and drive production deployment. Founder mindset: I balance craft, ownership, and speed.",
    stats: [
      { value: 21, label: "Years old", suffix: "" },
      { value: 7, label: "Engineers", suffix: "" },
      { value: 5, label: "Products shipped", suffix: "+" },
      { value: 150, label: "Users", suffix: "+" }
    ]
  },

  projects: [
    {
      name: "Nessie",
      tagline: "B2B AI Agent Platform",
      description: "Production RAG platform featuring advanced hybrid search, specialized agents, and multi-source document ingestion. Deployed in enterprise pilots across professional services sectors. Designed Nessie Industrial for Pescanova — a factory-grade system combining knowledge retrieval and automated label verification.",
      tech: ["Python", "TypeScript", "PostgreSQL", "pgvector", "RAG"],
      color: "#00F5D4"
    },
    {
      name: "APEC",
      tagline: "Automated CMO",
      description: "Internal multi-agent system that acts as an automated CMO. Combines scraping agents for market research (NORA) and financial data extraction (SARA) to feed an end-to-end cold email outreach pipeline with prospect targeting, personalized messaging, and automated follow-ups.",
      tech: ["Python", "Multi-Agent", "LLM APIs", "Automation"],
      color: "#FF4D00"
    },
    {
      name: "IRIS",
      tagline: "Email Intelligence",
      description: "Multi-agent email management system that classifies incoming emails by client, provider, intent, and priority. Generates context-aware responses connected to product database and pulls client context from CRM to inform every interaction.",
      tech: ["Python", "NLP", "CRM Integration", "LLM APIs"],
      color: "#A855F7"
    },
    {
      name: "ACTA",
      tagline: "Meeting Platform",
      description: "Internal meeting platform handling transcription, speaker diarization, summary generation, and automatic task assignment per team member.",
      tech: ["Python", "Whisper", "Pyannote", "Voice AI"],
      color: "#22C55E"
    },
    {
      name: "Padel Courts",
      tagline: "Booking System",
      description: "Identified a community need while working as a security guard and independently designed and shipped a digital booking system for padel courts, adopted by 150+ users, automating scheduling and eliminating manual processes.",
      tech: ["Full-Stack", "React", "Node.js", "PostgreSQL"],
      color: "#EAB308"
    }
  ],

  techStack: [
    { category: "Languages", items: ["Python", "TypeScript", "JavaScript"] },
    { category: "Frontend", items: ["React", "Next.js", "Astro", "Tailwind CSS"] },
    { category: "Backend", items: ["Node.js", "FastAPI", "PostgreSQL", "pgvector"] },
    { category: "AI & ML", items: ["LLM APIs", "RAG Pipelines", "Multi-Agent", "Prompt Engineering"] },
    { category: "Voice AI", items: ["Whisper", "Pyannote"] },
    { category: "Infrastructure", items: ["Docker", "Git", "CI/CD"] }
  ],

  experience: [
    {
      company: "OSIX Tech",
      role: "CTO & Co-Founder",
      period: "June 2025 – Present",
      location: "Santiago de Compostela",
      description: "Architected and lead development of multiple production AI agent platforms. Consolidated a 7-person engineering team, acting as technical lead and primary decision-maker across architecture, business logic, and product direction."
    },
    {
      company: "Freelance",
      role: "Software Developer",
      period: "Summer 2023 & 2024",
      location: "O Grove, Spain",
      description: "Identified a community need and independently designed and shipped a digital booking system for padel courts, adopted by 150+ users, automating scheduling and eliminating manual processes."
    },
    {
      company: "USC",
      role: "B.Sc. Computer Engineering",
      period: "2022 – 2026",
      location: "Santiago de Compostela",
      description: "Computer Engineering degree focusing on algorithms, systems architecture, software engineering, and computer science fundamentals."
    }
  ],

  contact: {
    headline: "Let's build something",
    cv: "/docs/pablo-pazos-parada-cv.pdf"
  },

  footer: {
    location: "O Grove, Spain",
    sourceCode: {
      text: "Source",
      url: "https://github.com/ppazosp/portfolio"
    }
  }
};
