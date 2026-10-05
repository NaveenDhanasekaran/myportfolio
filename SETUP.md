# Quick Setup Guide

## Step 1: Install Dependencies

Already done! The project has all necessary packages installed.

## Step 2: Add Your Profile Image

1. Add your profile photo to the `public` folder (e.g., `public/profile.jpg`)
2. Open `src/App.js`
3. Find line with `<div className="profile-placeholder">N</div>`
4. Replace with: `<img src="/profile.jpg" alt="Naveen" />`

## Step 3: Update Contact Information

In `src/App.js`, update the email in the "Hire Me" button:
- Find: `mailto:naveen@example.com`
- Replace with your actual email

## Step 4: Add Project Images (Optional)

For each project, you can add actual images:

1. Add images to `public/projects/` folder
2. In `src/App.js`, find the projects array
3. Add `image: "/projects/your-image.jpg"` to each project
4. Update the project card to use the image instead of icon

## Step 5: Add Project Links

To make projects clickable:

1. Add `link: "https://your-project.com"` to each project in the array
2. Add onClick handler to project cards:
   ```javascript
   onClick={() => project.link && window.open(project.link, '_blank')}
   ```

## Step 6: Run the Development Server

```bash
npm start
```

Visit http://localhost:3000 to see your portfolio!

## Step 7: Customize Content

All content is in `src/App.js`:
- Skills: Edit the skills array
- Experience: Edit the experience array
- Projects: Edit the projects array

## Step 8: Deploy

When ready, build and deploy:

```bash
npm run build
```

Then deploy the `build` folder to:
- Netlify (drag & drop)
- Vercel (vercel CLI)
- GitHub Pages (gh-pages package)

## Need Help?

- Check the main README.md for detailed instructions
- All styling is in `src/App.css`
- Animations use Framer Motion (already configured)
