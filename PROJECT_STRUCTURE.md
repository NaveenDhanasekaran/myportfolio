# Project Structure

```
naveen-portfolio/
├── public/
│   ├── index.html          # Main HTML file (update meta tags here)
│   ├── favicon.ico         # Website icon
│   ├── manifest.json       # PWA manifest
│   └── robots.txt          # SEO robots file
│   └── [Add your images here]
│       ├── profile.jpg     # Your profile photo
│       └── projects/       # Project images folder
│           ├── project1.jpg
│           ├── project2.jpg
│           └── ...
│
├── src/
│   ├── App.js              # 🎯 MAIN FILE - All content here
│   ├── App.css             # 🎨 All styling here
│   ├── index.js            # React entry point
│   ├── index.css           # Global styles
│   └── components/
│       └── AnimatedComponents.js  # Reusable animation components
│
├── node_modules/           # Dependencies (auto-generated)
├── package.json            # Project configuration
├── package-lock.json       # Dependency lock file
│
└── Documentation/
    ├── README.md           # Project overview
    ├── QUICK_START.md      # ⚡ Start here!
    ├── SETUP.md            # Detailed setup
    ├── CUSTOMIZATION_GUIDE.md  # How to customize
    ├── DEPLOYMENT.md       # How to deploy
    └── PROJECT_STRUCTURE.md    # This file
```

## 📁 Key Files to Edit

### 1. `src/App.js` - Main Content File
This is where ALL your content lives:

```javascript
// Line ~80: Hero Section
<h1>Hi, I'm Naveen</h1>
<p className="subtitle">Your tagline here...</p>

// Line ~150: Profile Image
<div className="profile-placeholder">N</div>
// Replace with: <img src="/profile.jpg" alt="Naveen" />

// Line ~180: Skills Array
const skills = [
  { title: "...", description: "..." },
  // Edit these
];

// Line ~220: Experience Array
const experience = [
  { company: "...", duration: "...", description: "..." },
  // Edit these
];

// Line ~260: Projects Array
const projects = [
  { title: "...", description: "...", icon: "..." },
  // Edit these
];
```

### 2. `src/App.css` - All Styling
Contains all CSS for the entire site:

```css
/* Line 1-20: Global styles */
/* Line 21-60: Navigation */
/* Line 61-150: Hero section */
/* Line 151-200: Section styles */
/* Line 201-250: Skills section */
/* Line 251-320: Experience timeline */
/* Line 321-400: Projects grid */
/* Line 401-500: Responsive styles */
```

### 3. `public/index.html` - SEO & Meta Tags
Update for better SEO:

```html
<title>Your Name - Portfolio</title>
<meta name="description" content="Your description" />
<meta property="og:title" content="Your Name" />
```

## 🎯 Where to Add Things

### Add Profile Image
**Location:** `public/profile.jpg`
**Edit:** `src/App.js` line ~150

### Add Project Images
**Location:** `public/projects/`
**Edit:** `src/App.js` projects array

### Change Colors
**Edit:** `src/App.css`
- Find: `#00D4FF` (neon blue)
- Replace with your color

### Add Social Links
**Edit:** `src/App.js` hero section
**Add CSS:** `src/App.css`

### Update Email
**Edit:** `src/App.js`
- Find: `mailto:naveen@example.com`
- Replace with your email

### Add New Section
**Edit:** `src/App.js`
- Copy an existing `<AnimatedSection>`
- Modify content
- Add to navbar

## 📦 Dependencies

### Production Dependencies
```json
{
  "react": "^19.2.1",              // React framework
  "react-dom": "^19.2.1",          // React DOM
  "framer-motion": "^12.23.25",    // Animations
  "react-type-animation": "^3.2.0" // Typewriter effect
}
```

### Development Dependencies
```json
{
  "react-scripts": "5.0.1"  // Build tools
}
```

## 🔧 Configuration Files

### `package.json`
- Project metadata
- Dependencies
- Scripts (start, build, test)
- Don't edit unless adding new packages

### `.gitignore`
- Specifies files Git should ignore
- Already configured correctly

## 🚀 Build Output

When you run `npm run build`:

```
build/
├── static/
│   ├── css/
│   │   └── main.[hash].css
│   ├── js/
│   │   └── main.[hash].js
│   └── media/
│       └── [images]
├── index.html
└── [other files]
```

This `build` folder is what you deploy!

## 📝 Content Organization

### Hero Section
- Name and title
- Tagline/description
- Profile image
- CTA buttons

### Skills Section
- 6 skill cards
- Title and description for each
- Hover animations

### Experience Section
- Timeline layout
- Company, duration, description
- Alternating left/right

### Projects Section
- 3x3 grid (9 projects)
- Title, description, icon/image
- Hover effects
- Coming soon badge

## 🎨 Styling Architecture

### CSS Organization
1. **Global Styles** - Reset, body, app container
2. **Navigation** - Navbar, links, buttons
3. **Hero** - Hero section, profile image
4. **Sections** - Common section styles
5. **Skills** - Skill cards and grid
6. **Experience** - Timeline and cards
7. **Projects** - Project cards and grid
8. **Responsive** - Media queries

### Color Variables (Manual)
To use CSS variables, add to `App.css`:

```css
:root {
  --bg-color: #000000;
  --accent-color: #00D4FF;
  --text-color: #FFFFFF;
  --text-secondary: #CCCCCC;
}

/* Then use: */
background: var(--bg-color);
color: var(--accent-color);
```

## 🔄 Development Workflow

1. **Edit** `src/App.js` or `src/App.css`
2. **Save** - Changes auto-reload in browser
3. **Test** - Check in browser
4. **Repeat** until satisfied
5. **Build** - `npm run build`
6. **Deploy** - Upload `build` folder

## 📱 Responsive Design

### Breakpoints
- **Desktop:** 1024px and up
- **Tablet:** 768px - 1024px
- **Mobile:** Below 768px

### What Changes
- **Desktop:** Full layout, side-by-side
- **Tablet:** Adjusted spacing, smaller text
- **Mobile:** Stacked layout, simplified nav

## 🎯 Quick Reference

| Task | File | Line |
|------|------|------|
| Change name | App.js | ~80 |
| Update tagline | App.js | ~90 |
| Add profile image | App.js | ~150 |
| Edit skills | App.js | ~180 |
| Edit experience | App.js | ~220 |
| Edit projects | App.js | ~260 |
| Change colors | App.css | Throughout |
| Update meta tags | index.html | ~10 |
| Add social links | App.js | Hero section |

## 💡 Pro Tips

1. **Keep backups** - Copy files before major changes
2. **Test frequently** - Check browser after each change
3. **Use browser DevTools** - Inspect elements, test responsive
4. **Commit often** - Use Git to track changes
5. **Read comments** - Code has helpful comments

## 🐛 Common Issues

### Issue: Changes not showing
**Solution:** Hard refresh browser (Ctrl+Shift+R)

### Issue: Build fails
**Solution:** Check console for errors, fix syntax

### Issue: Images not loading
**Solution:** Check file paths, ensure in `public` folder

### Issue: Styling broken
**Solution:** Check CSS syntax, missing semicolons

## 📚 Learning Resources

- **React:** https://react.dev
- **Framer Motion:** https://www.framer.com/motion/
- **CSS:** https://developer.mozilla.org/en-US/docs/Web/CSS

## ✅ Checklist Before Deploy

- [ ] Profile image added
- [ ] Email updated
- [ ] Project links added
- [ ] Meta tags updated
- [ ] Tested on mobile
- [ ] Build successful
- [ ] No console errors

---

**Need help?** Check CUSTOMIZATION_GUIDE.md or DEPLOYMENT.md
