# Shiftclick Portfolio

A minimal, creative portfolio website featuring:

- 🎨 Custom animated cursor
- 📦 3D rotating cubes with CSS transforms
- ✨ Parallax scrolling effects
- 🎭 Smooth scroll reveal animations
- 📱 Fully responsive design

## Deployment

This site is designed to be deployed on GitHub Pages.

### Quick Deploy

1. Push this repository to GitHub
2. Go to Settings → Pages
3. Select "Deploy from a branch"
4. Choose `main` branch and `/ (root)` folder
5. Save and your site will be live!

### Local Development

Just open `index.html` in your browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve
```

## Structure

```
├── index.html      # Main landing page
├── work.html       # Projects showcase
├── styles.css      # All styling and animations
├── script.js       # Interactive features
├── logo.png        # Your logo
├── 404.html        # Custom 404 page
└── .nojekyll       # Bypass Jekyll on GitHub Pages
```

## Customization

### Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --blue-primary: #1b68cf;
    --blue-bright: #3086f8;
    --blue-dark: #0d3f82;
    --black: #000000;
    --white: #ffffff;
}
```

### Projects

Edit `work.html` to add your own projects. Each project card follows this structure:

```html
<article class="project-card" data-project="N">
    <div class="project-number">0N</div>
    <div class="project-content">
        <h2 class="project-title">Project Name</h2>
        <p class="project-description">Description...</p>
        <div class="project-tags">
            <span class="tag">Tech</span>
        </div>
        <a href="#" class="project-link">View Project</a>
    </div>
    <!-- 3D cube visual -->
</article>
```

---

Built with 💙 by Shiftclick

