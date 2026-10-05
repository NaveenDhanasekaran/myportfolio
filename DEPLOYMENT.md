# Deployment Guide

## Before Deploying

### Checklist
- [ ] Added your profile image
- [ ] Updated email address
- [ ] Added project links/images
- [ ] Tested locally (`npm start`)
- [ ] Built successfully (`npm run build`)
- [ ] Updated meta tags in `public/index.html`

## Option 1: Netlify (Easiest)

### Method A: Drag & Drop
1. Build your project:
   ```bash
   npm run build
   ```
2. Go to [Netlify Drop](https://app.netlify.com/drop)
3. Drag the `build` folder onto the page
4. Done! Your site is live

### Method B: GitHub Integration
1. Push your code to GitHub
2. Go to [Netlify](https://app.netlify.com)
3. Click "New site from Git"
4. Connect your GitHub repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
6. Click "Deploy site"

### Custom Domain on Netlify
1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow the DNS configuration instructions

## Option 2: Vercel

### Deploy with Vercel CLI
1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts:
   - Set up and deploy? Yes
   - Which scope? Your account
   - Link to existing project? No
   - Project name? naveen-portfolio
   - Directory? ./
   - Override settings? No

4. Your site is live!

### Deploy from GitHub
1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "Import Project"
4. Import your GitHub repository
5. Vercel auto-detects React and deploys

### Custom Domain on Vercel
1. Go to Project Settings → Domains
2. Add your domain
3. Configure DNS records as shown

## Option 3: GitHub Pages

### Setup
1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Update `package.json`:
   ```json
   {
     "homepage": "https://yourusername.github.io/naveen-portfolio",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

4. Enable GitHub Pages:
   - Go to repository Settings → Pages
   - Source: gh-pages branch
   - Save

### Custom Domain on GitHub Pages
1. Add `CNAME` file to `public` folder with your domain
2. In GitHub: Settings → Pages → Custom domain
3. Configure DNS:
   - Add A records pointing to GitHub IPs
   - Or CNAME record pointing to `yourusername.github.io`

## Option 4: Firebase Hosting

### Setup
1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login:
   ```bash
   firebase login
   ```

3. Initialize:
   ```bash
   firebase init hosting
   ```
   - Select: Use existing project or create new
   - Public directory: `build`
   - Single-page app: Yes
   - GitHub integration: Optional

4. Build and deploy:
   ```bash
   npm run build
   firebase deploy
   ```

## Option 5: AWS S3 + CloudFront

### Setup S3 Bucket
1. Create S3 bucket
2. Enable static website hosting
3. Set bucket policy for public access

### Deploy
1. Build:
   ```bash
   npm run build
   ```

2. Upload to S3:
   ```bash
   aws s3 sync build/ s3://your-bucket-name
   ```

### Setup CloudFront (Optional)
1. Create CloudFront distribution
2. Point to S3 bucket
3. Configure SSL certificate
4. Update DNS

## Environment Variables

If you need environment variables (API keys, etc.):

### Create `.env` file:
```
REACT_APP_API_KEY=your-api-key
REACT_APP_API_URL=https://api.example.com
```

### Access in code:
```javascript
const apiKey = process.env.REACT_APP_API_KEY;
```

### Platform-specific:

**Netlify:**
- Site settings → Build & deploy → Environment variables

**Vercel:**
- Project Settings → Environment Variables

**GitHub Pages:**
- Use GitHub Secrets for sensitive data
- Access via GitHub Actions

## Post-Deployment

### Test Your Site
- [ ] All pages load correctly
- [ ] Images display properly
- [ ] Links work
- [ ] Animations run smoothly
- [ ] Mobile responsive
- [ ] Fast loading times

### Monitor Performance
- Use [Google PageSpeed Insights](https://pagespeed.web.dev/)
- Check [GTmetrix](https://gtmetrix.com/)
- Monitor with Google Analytics

### SEO
- Submit sitemap to Google Search Console
- Verify site ownership
- Check mobile usability
- Monitor search performance

## Continuous Deployment

### Netlify/Vercel with GitHub
Once connected, every push to main branch automatically deploys!

### GitHub Actions for GitHub Pages
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install and Build
        run: |
          npm install
          npm run build
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@4.1.5
        with:
          branch: gh-pages
          folder: build
```

## Troubleshooting

### Build Fails
- Check Node version: `node --version` (should be 14+)
- Clear cache: `npm cache clean --force`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

### 404 Errors on Refresh
For single-page apps, configure redirects:

**Netlify:** Create `public/_redirects`:
```
/*    /index.html   200
```

**Vercel:** Create `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

### Images Not Loading
- Check paths start with `/` for public folder
- Verify images are in `public` folder before build
- Check browser console for errors

## Cost Comparison

| Platform | Free Tier | Custom Domain | SSL | CDN |
|----------|-----------|---------------|-----|-----|
| Netlify | 100GB/month | ✅ | ✅ | ✅ |
| Vercel | Unlimited | ✅ | ✅ | ✅ |
| GitHub Pages | 100GB/month | ✅ | ✅ | ✅ |
| Firebase | 10GB/month | ✅ | ✅ | ✅ |
| AWS S3 | Pay as you go | ✅ | ✅ (CloudFront) | ✅ |

## Recommended: Netlify or Vercel

Both offer:
- Free tier perfect for portfolios
- Automatic HTTPS
- Global CDN
- Easy custom domains
- Continuous deployment from Git
- Excellent performance

Choose Netlify for simplicity, Vercel for Next.js compatibility (future upgrades).

## Need Help?

- Netlify Docs: https://docs.netlify.com
- Vercel Docs: https://vercel.com/docs
- GitHub Pages: https://pages.github.com
