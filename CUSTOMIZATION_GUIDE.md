# Customization Guide

## Adding Your Profile Image

### Option 1: Simple Replacement
1. Save your profile photo as `profile.jpg` in the `public` folder
2. Open `src/App.js`
3. Find this code (around line 150):
```javascript
<div className="profile-placeholder">N</div>
```
4. Replace with:
```javascript
<img src="/profile.jpg" alt="Naveen" />
```

### Option 2: Keep the Glow Effect
If you want to maintain the circular glow border, just replace the placeholder div - the container already has the styling!

## Adding Project Images

### Step 1: Prepare Images
- Create a folder: `public/projects/`
- Add your project images (recommended size: 800x600px)
- Name them descriptively: `retail-app.jpg`, `healthcare.jpg`, etc.

### Step 2: Update Projects Array
In `src/App.js`, find the projects array and add image property:

```javascript
{
  title: "Location-Intelligent Retail App",
  description: "Smart product discovery platform...",
  icon: "🛍️",
  image: "/projects/retail-app.jpg"  // Add this line
}
```

### Step 3: Update Project Card Rendering
Replace the project-image div content:

```javascript
<div className="project-image">
  {project.image ? (
    <img src={project.image} alt={project.title} />
  ) : (
    <span>{project.icon}</span>
  )}
  {project.comingSoon && <div className="coming-soon">COMING SOON</div>}
</div>
```

## Adding Project Links

### Make Projects Clickable

In `src/App.js`, add links to your projects array:

```javascript
{
  title: "Location-Intelligent Retail App",
  description: "...",
  icon: "🛍️",
  link: "https://your-project-url.com"  // Add this
}
```

Then update the project card:

```javascript
<motion.div
  className="project-card"
  onClick={() => project.link && window.open(project.link, '_blank')}
  style={{ cursor: project.link ? 'pointer' : 'default' }}
  // ... rest of props
>
```

## Updating Contact Information

### Email
Find and replace in `src/App.js`:
```javascript
onClick={() => window.location.href = 'mailto:your-email@example.com'}
```

### Add Social Links

Add this to your navbar or hero section:

```javascript
<div className="social-links">
  <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
    GitHub
  </a>
  <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
    LinkedIn
  </a>
  <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">
    Twitter
  </a>
</div>
```

Add styling in `src/App.css`:

```css
.social-links {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
}

.social-links a {
  color: #00D4FF;
  text-decoration: none;
  transition: all 0.3s;
}

.social-links a:hover {
  color: #FFFFFF;
  text-shadow: 0 0 10px #00D4FF;
}
```

## Customizing Colors

### Change Accent Color
In `src/App.css`, find and replace all instances of `#00D4FF` with your preferred color.

Quick find & replace:
- `#00D4FF` → Your new accent color (e.g., `#FF00FF` for magenta)

### Change Background
- `#000000` → Your new background color
- For a softer look, try `#0a0a0a` or `#121212`

## Adding More Sections

### Example: Add a Contact Section

1. Add to `src/App.js` before the closing `</div>`:

```javascript
<AnimatedSection id="contact" className="section">
  <motion.h2 className="section-title">
    Get In Touch
  </motion.h2>
  <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
    <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: '#CCCCCC' }}>
      Have a project in mind? Let's work together to bring your ideas to life.
    </p>
    <button 
      className="primary-btn"
      onClick={() => window.location.href = 'mailto:your-email@example.com'}
    >
      Send Message
    </button>
  </div>
</AnimatedSection>
```

2. Add to navbar:
```javascript
<li><a href="#contact" onClick={() => scrollToSection('contact')}>CONTACT</a></li>
```

## Performance Optimization

### Lazy Load Images
Install: `npm install react-lazy-load-image-component`

Then use:
```javascript
import { LazyLoadImage } from 'react-lazy-load-image-component';

<LazyLoadImage
  src="/projects/your-image.jpg"
  alt="Project"
  effect="blur"
/>
```

### Optimize Images
Before adding images:
1. Resize to appropriate dimensions (800x600 for projects)
2. Compress using tools like TinyPNG or ImageOptim
3. Use WebP format for better compression

## Adding Analytics

### Google Analytics

1. Install: `npm install react-ga4`

2. In `src/index.js`:
```javascript
import ReactGA from 'react-ga4';

ReactGA.initialize('YOUR-GA-MEASUREMENT-ID');
```

3. Track page views in `src/App.js`:
```javascript
useEffect(() => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
}, []);
```

## SEO Optimization

### Update Meta Tags

Edit `public/index.html`:

```html
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <meta name="description" content="Naveen - Freelance AI Engineer & Full-Stack Developer. Building innovative web apps, GenAI chatbots, and intelligent automation solutions." />
  <meta name="keywords" content="AI Engineer, Full-Stack Developer, GenAI, Machine Learning, Web Development" />
  <meta property="og:title" content="Naveen - AI Engineer & Full-Stack Developer" />
  <meta property="og:description" content="Building innovative web apps, GenAI chatbots, and intelligent automation solutions" />
  <meta property="og:image" content="%PUBLIC_URL%/og-image.jpg" />
  <title>Naveen - AI Engineer & Full-Stack Developer</title>
</head>
```

## Troubleshooting

### Animations Not Working
- Check that framer-motion is installed: `npm list framer-motion`
- Ensure you're using the latest version: `npm update framer-motion`

### Images Not Loading
- Check file paths (should start with `/` for public folder)
- Verify images are in the `public` folder
- Check browser console for 404 errors

### Styling Issues
- Clear browser cache
- Check for CSS syntax errors
- Ensure no conflicting styles

## Need More Help?

Check the main README.md or create an issue on GitHub!
