import { getAge } from './portfolio.config';

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
    title: "Pablo Pazos Parada - Applied AI Engineer",
    description: "Forward Deployed AI Engineer who takes projects from idea to production. I build and ship AI agent systems end-to-end for enterprise clients.",
    siteName: "Pablo Pazos Parada",
    ogImage: "/og-image.png"
  },

  navigation: {
    brand: "PP",
    links: [
      { href: "/#about", label: "About" },
      { href: "/#projects", label: "Projects" },
      { href: "/#stack", label: "Stack" },
      { href: "/#experience", label: "Journey" },
      { href: "/#contact", label: "Contact" }
    ]
  },

  hero: {
    tagline: "Applied AI Engineer - Forward Deployed",
    description: "I take AI agent systems from idea to production and beyond. RAG platforms, multi-agent workflows, and automated pipelines scoped with clients, built end-to-end, deployed and maintained in enterprise environments."
  },

  about: {
    headline: ["Idea", "to", "production"],
    description: "I embed with clients to understand their problem, architect the solution, build it, ship it, and keep it running. From first whiteboard session to production monitoring, I own every step. Co-Founded a 7-member AI startup where I led engineering and worked directly with enterprise clients end-to-end.",
    stats: [
      { value: getAge(), label: "Years old", suffix: "" },
      { value: 5, label: "Systems in prod", suffix: "+" },
      { value: 6, label: "Engineers led", suffix: "" },
      { value: 3, label: "Clients served", suffix: "+" }
    ]
  },

  projects: [
    {
      name: "APEC",
      tagline: "OSIX · Automated CMO",
      description: "Multi-agent sales intelligence platform. An orchestrator, a research agent with headless browser scraping, and a financial data extractor feed a real-time campaign dashboard. End-to-end cold email pipeline: prospect targeting, personalized messaging, open/click tracking, and anti-detection scheduling. Live agent coordination via Realtime subscriptions.",
      tech: ["Python", "Next.js", "Supabase", "Playwright", "Anthropic API", "Gmail API"],
      color: "#9B7DFF"
    },
    {
      name: "IRIS",
      tagline: "OSIX · Email Intelligence",
      description: "Multi-agent email management system shipped for a B2B client. One model handles classification and tool-calling across six functions (product search, stock check, client history, payment info) while a second generates context-aware email drafts. Plugged directly into the client's ERP for real-time product, invoice, and client data. Near-instant email ingestion via push notifications, live processing updates streamed to the dashboard.",
      tech: ["FastAPI", "React", "Supabase", "OpenAI API", "Anthropic API", "ERP Integration"],
      color: "#6448D6"
    },
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
      description: "Built +5 production AI systems end-to-end, from client scoping to architecture to deployment to maintenance. Led a 7-member engineering team while working directly with enterprise clients as the forward deployed engineer translating business needs into shipped products."
    },
    {
      company: "Freelance",
      role: "Software Developer",
      period: "Summer 2023 & 2024",
      location: "O Grove, Spain",
      description: "Spotted a real-world problem, designed the solution, built it solo, shipped it, and supported 150+ users. Digital booking system for padel courts, full lifecycle from idea to production."
    },
    {
      company: "USC",
      role: "B.Sc. Computer Engineering",
      period: "2022 – 2026",
      location: "Santiago de Compostela",
      description: "Computer Engineering degree covering algorithms, systems architecture, software engineering, and CS fundamentals."
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
