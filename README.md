# Modern Portfolio Template

A clean, high-performance personal portfolio built with Astro, featuring a pitch-black minimal design with subtle animations and interactive React components. Easily customizable for anyone to use.

## ✨ Features

- **Zero JavaScript by default** - Static sections ship no JS, React components hydrate only where needed
- **Performance optimized** - Lighthouse 95+ scores, tabular numbers, accessible design
- **Monochrome aesthetic** - Pitch-black UI with thin white lines and subtle accent colors
- **Content collections** - MDX-powered case studies and blog posts
- **SEO ready** - Open Graph, meta tags, sitemap, robots.txt
- **Mobile responsive** - Consistent design and density across all screen sizes
- **Easy customization** - Single configuration file for all personal data

## 🚀 Quick Start

### 1. **Install dependencies**
```bash
npm install
```

### 2. **Customize your portfolio**
Edit `src/config/portfolio.config.ts` with your information:

```typescript
export const portfolioConfig = {
  // Personal Information
  personal: {
    name: "Your Name",
    location: "Your City, Country",
    email: "your.email@example.com",
    github: "yourusername",
    linkedin: "your-linkedin-username",
    company: {
      name: "Your Company",
      url: "https://yourcompany.com",
      displayUrl: "yourcompany.com"
    }
  },
  // ... (see full config file for all options)
}
```

### 3. **Add your projects**
Create MDX files in `src/content/projects/`:

```yaml
---
title: "Your Project Name"
role: "Your Role"
problem: "Problem you solved"
approach: "How you solved it"
outcome: "Results achieved"
stack: ["Tech", "Stack", "Used"]
metrics:
  - label: "Performance Increase"
    value: "300%"
publishedAt: 2024-12-01
featured: true
---

## Additional Details
Extended project description...
```

### 4. **Start development server**
```bash
npm run dev
```

### 5. **Open in browser**
Navigate to `http://localhost:4321`

## 🎨 Customization

### Personal Data
All personal information is centralized in `src/config/portfolio.config.ts`. Update this single file to customize:

- **Personal details** (name, location, contact info)
- **About section** (roles, description paragraphs)
- **Skills** (with progress percentages)
- **Expertise hierarchy** (primary, secondary, tertiary skills)
- **Philosophy/principles**
- **Experience timeline**
- **SEO metadata**

### Colors and Design
Edit `src/styles/global.css` CSS variables:

```css
:root {
  --color-background: 0 0% 0%;        /* Black */
  --color-foreground: 0 0% 90.2%;     /* Light gray */
  --color-muted: 0 0% 60.4%;          /* Medium gray */
  --color-border: 0 0% 16.5%;         /* Dark gray */
  --color-accent: 174 100% 48%;       /* Teal accent */
}
```

### Content Collections

#### Projects
Add new projects in `src/content/projects/project-name.md`:

```yaml
---
title: "Project Name"
role: "Your Role"
problem: "Problem statement"
approach: "Solution approach"
outcome: "Quantified results"
stack: ["React", "Node.js", "PostgreSQL"]
metrics:
  - label: "Users"
    value: "10,000+"
  - label: "Performance"
    value: "2x faster"
links:
  - label: "GitHub"
    url: "https://github.com/..."
  - label: "Live Demo" 
    url: "https://demo.example.com"
featured: true
publishedAt: 2024-12-01
---
```

#### Blog Posts
Add posts in `src/content/posts/post-name.md`:

```yaml
---
title: "Post Title"
description: "Brief description"
publishedAt: 2024-12-01
tags: ["tag1", "tag2"]
url: "https://external-link.com"
featured: true
---
```

## 🏗️ Project Structure

```text
/
├── public/
│   ├── favicon.svg
│   ├── og-image.jpg
│   └── robots.txt
├── src/
│   ├── components/          # React components
│   │   ├── SkillsProgress.tsx
│   │   └── ProgressBar.tsx
│   ├── config/             # Configuration
│   │   └── portfolio.config.ts
│   ├── content/            # Content collections
│   │   ├── config.ts
│   │   ├── projects/       # Case study MDX files
│   │   └── posts/          # Blog post MDX files
│   ├── layouts/
│   │   └── Base.astro      # HTML head, nav, footer
│   ├── pages/
│   │   └── index.astro     # Landing page
│   └── styles/
│       └── global.css      # Design system & Tailwind
├── astro.config.mjs
├── tailwind.config.js
└── package.json
```

## 🛠️ Development Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run Astro type checking |

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

### Deploy Options

The built site (`dist/` folder) can be deployed to:

- **Netlify**: Drag and drop or connect repository
- **Vercel**: Import project from Git
- **GitHub Pages**: Use GitHub Actions workflow
- **Cloudflare Pages**: Connect repository
- **Any static hosting**: Upload `dist/` contents

### Environment Variables

No environment variables required for basic functionality. The contact form uses `mailto:` links.

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **JavaScript**: ~0KB for static sections
- **Images**: Optimized SVG icons and graphics
- **Fonts**: System fonts with fallbacks
- **Critical CSS**: Inlined automatically

## 🎯 Browser Support

- **Modern browsers**: Chrome, Firefox, Safari, Edge (last 2 versions)
- **Mobile**: iOS Safari, Android Chrome
- **Accessibility**: WCAG 2.1 AA compliant
- **Screen readers**: Semantic HTML structure

## 🤝 Contributing

This portfolio template is open source. Feel free to:

1. Fork the repository
2. Customize for your own use  
3. Share improvements via issues/PRs
4. Credit the original template

## 📄 License

MIT License - feel free to use this code for your own portfolio.

## 🙏 Acknowledgments

- **Astro**: For the excellent static site generator
- **Tailwind CSS**: For utility-first styling
- **Framer Motion**: For smooth animations
- **Lucide**: For clean iconography

---

## 🆕 What's New in This Version

### Clean Architecture
- Removed over-modularized components
- Simplified file structure
- Single configuration file for all data
- Easy to understand and customize

### Performance Optimizations
- Removed unused dependencies (`recharts`, `react-icons`)
- Consolidated React components
- Streamlined bundle size

### Better Developer Experience
- Clear separation of content and code
- Intuitive configuration structure
- Comprehensive documentation
- Ready-to-deploy template