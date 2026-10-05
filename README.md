# Naveen's Portfolio Website

A professional freelance portfolio showcasing skills in AI Engineering, Full-Stack Development, and Machine Learning.

## Features

- **Dark Theme**: Pure black background (#000000) with neon blue accents (#00D4FF)
- **Smooth Animations**: Framer Motion animations throughout
- **Responsive Design**: Works on all devices
- **Single Page Application**: Smooth scroll navigation
- **Sections**:
  - Hero with typewriter effect
  - Core Expertise (6 skill cards)
  - Freelance Experience (timeline)
  - Featured Projects (9 projects)

## Getting Started

### Installation

```bash
cd naveen-portfolio
npm install
```

### Run Development Server

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

## Customization

### Add Your Profile Image

Replace the placeholder in `src/App.js`:

```javascript
// Find this line in the hero section:
<div className="profile-placeholder">N</div>

// Replace with:
<img src="/path-to-your-image.jpg" alt="Naveen" />
```

Then add your image to the `public` folder.

### Update Contact Email

In `src/App.js`, find the "Hire Me" button and update the email:

```javascript
<button className="secondary-btn" onClick={() => window.location.href = 'mailto:your-email@example.com'}>
  Hire Me
</button>
```

### Add Project Links

To make projects clickable, wrap the project cards with links or add click handlers:

```javascript
<motion.div
  className="project-card"
  onClick={() => window.open('https://your-project-url.com', '_blank')}
  // ... rest of the code
>
```

### Customize Colors

Edit `src/App.css` to change the color scheme:

- Background: `#000000` (pure black)
- Accent: `#00D4FF` (neon blue)
- Text: `#FFFFFF` (white)
- Secondary text: `#CCCCCC` (light gray)

## Technologies Used

- React 18
- Framer Motion (animations)
- React Type Animation (typewriter effect)
- CSS3 (custom styling)

## Deployment

### Deploy to Netlify

1. Build the project: `npm run build`
2. Drag the `build` folder to [Netlify Drop](https://app.netlify.com/drop)

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Deploy to GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to `package.json`:
   ```json
   "homepage": "https://yourusername.github.io/naveen-portfolio",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
3. Run: `npm run deploy`

## License

MIT License - feel free to use this template for your own portfolio!
