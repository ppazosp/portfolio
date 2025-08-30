// Portfolio Configuration
// This file contains all the customizable data for the portfolio
// Replace the values below with your own information

export const portfolioConfig = {
  // Personal Information
  personal: {
    name: "Pablo Pazos",
    location: "Santiago, ES",
    timezone: "UTC+1",
    email: "pablopazosp3@gmail.com",
    github: "ppazosp",
    linkedin: "pablo-pazos-portela",
    company: {
      name: "OSIX Tech",
      url: "https://osixtech.com",
      displayUrl: "osix.tech"
    }
  },

  // SEO and Meta
  seo: {
    title: "Pablo Pazos - Student & CTO at OSIX Tech",
    description: "Pablo Pazos - Computer Science Student at USC & CTO at OSIX Tech. Passionate about software architecture, AI adoption, and building real-world solutions.",
    siteName: "Pablo Pazos Portfolio",
    ogImage: "/og-image.jpg"
  },

  // About Section
  about: {
    role1: "Computer Science student at USC",
    role2: "CTO & Co-founder at OSIX Tech",
    paragraphs: [
      "Balancing my role as CTO of a growing startup with my Computer Engineering studies. This dual path sharpens both my academic foundation and my real-world leadership experience.",
      "Passionate about software architecture, I enjoy understanding the full spectrum of technologies without locking myself into a single specialization. This broad vision allows me to design systems that are flexible, scalable, and future-proof.",
      "Specialized in applying and integrating AI across workflows, I focus on solving real problems and evaluating solutions with a pragmatic, impact-driven mindset. My strength lies in turning complex challenges into clear, actionable architectures."
    ]
  },

  // Navigation
  navigation: {
    brand: "ppazosp",
    links: [
      { href: "#expertise", label: "Expertise" },
      { href: "#versatility", label: "Versatility" },
      { href: "#principles", label: "Principles" },
      { href: "#projects", label: "Projects" },
      { href: "#experience", label: "Experience" }
    ]
  },

  // Expertise Hierarchy
  expertise: {
    primary: {
      title: "Software Architecture",
      description: "System design, problem-solving, finding optimal solutions for any scenario",
      level: "Primary Expertise"
    },
    secondary: [
      {
        title: "AI-Powered Development",
        description: "Agent architectures, AI adoption, prompt engineering, workflow optimization"
      },
      {
        title: "Full-Stack Development", 
        description: "Frontend and backend, high and low level, modern web technologies"
      }
    ],
    tertiary: [
      {
        title: "Team Leadership",
        description: "CTO role, workflow optimization, technical mentoring, productivity coaching"
      },
      {
        title: "Entrepreneurial Mindset",
        description: "Turning ideas into impact, aligning business and technology"
      },
      {
        title: "Continuous Learning",
        description: "Adaptability, staying ahead of new tools, and evolving with tech"
      }
    ]
  },

  // Skills for the progress chart
  skills: [
    { name: 'Backend', percentage: 72 },
    { name: 'Frontend', percentage: 75 },
    { name: 'UI/UX Design', percentage: 61 },
    { name: 'AI', percentage: 84 },
    { name: 'DevOps', percentage: 53 },
    { name: 'Security', percentage: 67 },
  ],

  // Philosophy/Principles
  principles: [
    {
      title: "AI as a Multiplier",
      description: "Leverage AI to accelerate development and eliminate repetitive tasks. Transform hours of coding into minutes of intelligent prompting."
    },
    {
      title: "Jack of All Trades", 
      description: "Breadth over depth enables better architecture decisions. Understanding the full stack prevents siloed thinking."
    },
    {
      title: "Systems Over Syntax",
      description: "Prioritize architectural patterns and problem-solving approaches over language-specific knowledge. Design the blueprint, not the bricks."
    },
    {
      title: "Rapid Iteration",
      description: "Ship fast, ship often, improve continuously. Modern tools enable rapid prototyping and testing of ideas."
    },
    {
      title: "Pragmatic Innovation",
      description: "Embrace new technologies when they solve real problems, not for novelty. Every tool choice should have clear business justification."
    },
    {
      title: "Continuous Evolution",
      description: "Adapt quickly to changing requirements and technologies. What works today might be obsolete tomorrow - build with flexibility in mind."
    }
  ],

  // Experience Timeline
  experience: [
    {
      company: "OSIX Tech",
      role: "CTO & Co-founder",
      period: "July 2025 - Present",
      impacts: [
        "Led technical architecture and AI adoption strategy",
        "Achieved an immeasurable productivity boost  through AI integration", 
        "Built team of 6 engineers from university colleagues"
      ],
      skills: [
        "Technical Leadership",
        "AI Strategy & Integration", 
        "Team Building & Scaling"
      ]
    },
    {
      company: "Residential Community",
      role: "Security Guard", 
      period: "Summer 2023 & 2024",
      impacts: [
        "Developed court reservation system for the community",
        "Discovered passion for solving real-world problems",
        "Transitioned from academic to modern software practices"
      ],
      skills: [
        "Full-Stack Development",
        "Academic to Real-World Transition",
        "Opportunity Spotting"
      ]
    },
    {
      company: "University of Santiago",
      role: "Computer Engineering Student",
      period: "Sep 2022 - Jun 2026 (Expected)", 
      impacts: [
        "Explored all areas of computer science fundamentals",
        "Participated in multiple hackathons with team",
        "Self-taught modern software architecture principles"
      ],
      skills: [
        "Computer Science Fundamentals",
        "Software Engineering Principles",
        "Work Ethic",
      ]
    }
  ],

  // Footer
  footer: {
    location: "Santiago de Compostela, Spain · UTC+1",
    sourceCode: {
      text: "View Source",
      url: "https://github.com/ppazosp/portfolio"
    }
  }
};