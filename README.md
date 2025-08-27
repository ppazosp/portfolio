# Pablo Pazos - Portfolio

A high-performance personal portfolio built with Astro, featuring a pitch-black minimal design with subtle animations and interactive React islands.

## ✨ Features

- **Zero JavaScript by default** - Static sections ship no JS, React islands hydrate only where needed
- **Performance optimized** - Lighthouse 95+ scores, tabular numbers, accessible design
- **Monochrome aesthetic** - Pitch-black UI with thin white lines and subtle accent colors
- **Interactive islands** - Sparkline charts, ring meters, hover previews, contact form
- **Content collections** - MDX-powered case studies and blog posts
- **SEO ready** - Open Graph, meta tags, sitemap, robots.txt
- **Mobile responsive** - Consistent design and density across all screen sizes

## 🏗️ Project Structure

```text
/
├── public/
│   ├── favicon.svg
│   ├── og-image.jpg
│   └── robots.txt
├── src/
│   ├── components/          # Shared Astro components
│   │   ├── Card.astro
│   │   ├── KpiRow.astro
│   │   ├── SectionTitle.astro
│   │   └── Divider.astro
│   ├── content/            # Content collections
│   │   ├── config.ts
│   │   ├── projects/       # Case study MDX files
│   │   └── posts/          # Writing/blog MDX files
│   ├── islands/            # Interactive React components
│   │   ├── SparkBars.tsx
│   │   ├── RingMeter.tsx
│   │   ├── ProjectPreview.tsx
│   └── └── ContactForm.tsx
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

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Open in browser**
   Navigate to `http://localhost:4321`

## 📝 Content Management

### Adding New Projects

1. Create a new MDX file in `src/content/projects/`:
   ```bash
   touch src/content/projects/my-project.md
   ```

2. Add frontmatter and content:
   ```yaml
   ---
   title: "Project Name"
   role: "Your Role"
   problem: "Problem statement"
   approach: "How you solved it"
   outcome: "Quantified results"
   stack: ["Tech", "Stack", "Used"]
   metrics:
     - label: "Metric Name"
       value: "Quantified Value"
   links:
     - label: "GitHub"
       url: "https://github.com/..."
   featured: true
   publishedAt: 2024-12-01
   ---
   
   ## Additional Details
   Extended project description...
   ```

### Adding Blog Posts

1. Create MDX file in `src/content/posts/`:
   ```yaml
   ---
   title: "Post Title"
   description: "Brief description"
   publishedAt: 2024-12-01
   tags: ["tag1", "tag2"]
   url: "https://external-link.com"
   stars: 42
   featured: true
   ---
   ```

### Customizing Data

Replace mock data in `src/pages/index.astro`:

- **Hero metrics**: Update `heroMetrics` object
- **Capabilities**: Modify `capabilities` array
- **Experience**: Edit `experience` timeline
- **Principles**: Update `principles` array
- **Sparkline data**: Change `deploymentData` array

## 🎨 Design System

The portfolio uses a strict design system:

- **Colors**: Black background (#000000), light text (#E6E6E6), muted text (#9A9A9A), borders (#2A2A2A), accent (#00F5D4)
- **Typography**: System monospace with tabular numbers
- **Layout**: 12-column grid, 1px borders, 8px radius
- **Animations**: Subtle 6s idle animations, respects `prefers-reduced-motion`

### Customizing Colors

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

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

### Deploy Options

The built site (`dist/` folder) can be deployed to:

- **Netlify**: Drag and drop or connect repository
- **Vercel**: Import project from Git
- **GitHub Pages**: Use GitHub Actions
- **Cloudflare Pages**: Connect repository
- **Any static hosting**: Upload `dist/` contents

### Environment Variables

No environment variables required for basic functionality. The contact form uses `mailto:` links.

## 🛠️ Development Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run Astro type checking |

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **JavaScript**: ~0KB for static sections
- **Images**: Optimized SVG icons and graphics
- **Fonts**: System fonts with fallbacks
- **Critical CSS**: Inlined automatically

## 🔒 Security

- **Content Security Policy**: Configured for inline styles
- **External links**: `rel="noopener noreferrer"`
- **XSS protection**: Astro's built-in sanitization
- **HTTPS ready**: Works with any SSL certificate

## 🎯 Browser Support

- **Modern browsers**: Chrome, Firefox, Safari, Edge (last 2 versions)
- **Mobile**: iOS Safari, Android Chrome
- **Accessibility**: WCAG 2.1 AA compliant
- **Screen readers**: Semantic HTML structure

## 🤝 Contributing

This is a personal portfolio template. Feel free to:

1. Fork the repository
2. Customize for your own use
3. Share improvements via issues/PRs
4. Credit original design inspiration

## 📄 License

MIT License - feel free to use this code for your own portfolio.

## 🙏 Acknowledgments

- **Astro**: For the excellent static site generator
- **Tailwind CSS**: For utility-first styling
- **Framer Motion**: For smooth animations
- **Lucide**: For clean iconography
