# Deployment Guide

This guide covers deploying the Psychoanalytically Speaking website to various hosting platforms.

---

## Pre-Deployment Checklist

### 1. **Content Review**
- [ ] All pages have correct content
- [ ] Contact information is accurate
- [ ] Links work correctly (internal and external)
- [ ] Topmate booking link is correct
- [ ] Email address is correct

### 2. **Technical Review**
- [ ] HTML validation (W3C Validator)
- [ ] CSS validation
- [ ] JavaScript console has no errors
- [ ] All images load correctly
- [ ] Mobile responsiveness tested

### 3. **SEO & Meta Tags**
- [ ] All pages have unique `<title>` tags
- [ ] Meta descriptions are present
- [ ] Open Graph tags added (optional)
- [ ] Favicon added (optional)

### 4. **Performance**
- [ ] Images optimized (consider WebP format)
- [ ] CSS/JS minified (optional)
- [ ] Lighthouse score >90

### 5. **Analytics & Tracking**
- [ ] Analytics code added (Google Analytics, Plausible, etc.)
- [ ] Privacy policy updated if using analytics

---

## Option 1: Netlify (Recommended)

**Best for**: Quick deployment, automatic CI/CD

### Steps

1. **Create Netlify Account**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub/GitLab/Bitbucket

2. **Deploy via Drag & Drop** (Fastest)
   - Zip your project folder (exclude `.git` if present)
   - Go to Netlify dashboard
   - Drag & drop the folder to "Sites"
   - Done! Site is live

3. **Deploy via Git** (Automatic Updates)
   
   ```bash
   # Initialize Git (if not already done)
   git init
   git add .
   git commit -m "Initial commit"
   
   # Push to GitHub
   git remote add origin https://github.com/yourusername/your-repo.git
   git branch -M main
   git push -u origin main
   ```
   
   - In Netlify: New site from Git → Select repo
   - Build settings: Leave empty (no build needed)
   - Deploy!

4. **Custom Domain** (Optional)
   - Netlify dashboard → Domain settings
   - Add custom domain
   - Update DNS records as instructed

### netlify.toml Configuration

Create `netlify.toml` in root:

```toml
[build]
  publish = "."
  
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
    
[[headers]]
  for = "/css/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
    
[[headers]]
  for = "/js/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
    
[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

## Option 2: Vercel

**Best for**: Modern hosting, edge network

### Steps

1. **Install Vercel CLI** (Optional)
   ```bash
   npm install -g vercel
   ```

2. **Deploy via Web** (Easiest)
   - Go to [vercel.com](https://vercel.com)
   - Sign up
   - Import Git repository
   - Deploy!

3. **Deploy via CLI**
   ```bash
   vercel
   # Follow prompts
   # Choose project name
   # Deploy!
   
   # Production deployment
   vercel --prod
   ```

### vercel.json Configuration

Create `vercel.json`:

```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

---

## Option 3: GitHub Pages

**Best for**: Free hosting for personal/organization sites

### Steps

1. **Create GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/psychoanalytically-speaking.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Repository → Settings → Pages
   - Source: Deploy from branch → `main`
   - Folder: `/ (root)`
   - Save

3. **Access Site**
   - URL: `https://yourusername.github.io/psychoanalytically-speaking/`

4. **Custom Domain** (Optional)
   - Add `CNAME` file in root with domain name
   - Update DNS records:
     ```
     Type: CNAME
     Name: www (or @)
     Value: yourusername.github.io
     ```

---

## Option 4: Traditional Web Hosting

**Best for**: cPanel hosting, shared hosting

### Steps

1. **Connect via FTP/SFTP**
   - Use FileZilla, Cyberduck, or cPanel File Manager
   - Connect to your hosting

2. **Upload Files**
   - Upload all files to `public_html` or `www` directory
   - Maintain folder structure

3. **Set Permissions**
   - HTML files: 644
   - CSS/JS files: 644
   - Images: 644
   - Directories: 755

4. **Test**
   - Visit your domain
   - Check all pages load correctly

---

## Post-Deployment Tasks

### 1. **Test the Live Site**

- [ ] All pages load correctly
- [ ] Navigation works
- [ ] Images display
- [ ] Forms submit (if backend configured)
- [ ] Mobile responsive
- [ ] Cross-browser testing

### 2. **Set Up Analytics**

**Google Analytics**:
```html
<!-- Add before </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Plausible (Privacy-friendly)**:
```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

### 3. **SEO Setup**

**robots.txt** (create in root):
```
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

**sitemap.xml** (create in root):
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <lastmod>2026-01-11</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/about.html</loc>
    <lastmod>2026-01-11</lastmod>
    <priority>0.8</priority>
  </url>
  <!-- Add all pages -->
</urlset>
```

### 4. **Security Headers**

If your host supports `.htaccess`:

```apache
# .htaccess
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "DENY"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

### 5. **Performance Optimization**

**Enable Gzip Compression** (`.htaccess`):
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>
```

**Browser Caching** (`.htaccess`):
```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType application/pdf "access plus 1 month"
</IfModule>
```

---

## Domain & DNS Setup

### 1. **Purchase Domain** (if needed)
- Namecheap
- Google Domains
- Cloudflare Registrar

### 2. **Configure DNS**

**For Netlify**:
```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: [your-site].netlify.app
```

**For Vercel**:
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**For GitHub Pages**:
```
Type: A
Name: @
Values:
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153

Type: CNAME
Name: www
Value: yourusername.github.io
```

### 3. **SSL Certificate**
- Most hosting platforms provide free SSL (Let's Encrypt)
- Usually automatic
- Force HTTPS in settings

---

## Monitoring & Maintenance

### 1. **Set Up Monitoring**

- **Uptime Monitoring**: UptimeRobot, Pingdom
- **Performance**: Google PageSpeed Insights, WebPageTest
- **Error Tracking**: Sentry (optional)

### 2. **Regular Backups**

- **Automated**: Set up weekly backups via hosting
- **Manual**: Download files periodically
- **Git**: Keep repository updated

### 3. **Update Schedule**

- **Monthly**: Check for broken links
- **Quarterly**: Review analytics, update content
- **Annually**: Major content refresh

---

## Troubleshooting

### Common Issues

**Issue**: Site not loading
- **Fix**: Check DNS propagation (can take 24-48 hours)
- **Tool**: https://dnschecker.org

**Issue**: Images not displaying
- **Fix**: Check file paths (case-sensitive on Linux servers)
- **Fix**: Verify images uploaded to correct directory

**Issue**: JavaScript not working
- **Fix**: Check browser console for errors
- **Fix**: Verify GSAP and Three.js loaded from CDN

**Issue**: Mobile menu not opening
- **Fix**: Check pill-nav.js is loaded
- **Fix**: Verify no JavaScript errors in console

---

## Rollback Plan

If deployment fails:

1. **Netlify/Vercel**: Use rollback feature in dashboard
2. **GitHub Pages**: Revert Git commit
   ```bash
   git revert HEAD
   git push
   ```
3. **Traditional Hosting**: Restore from backup

---

## Contact Form Backend Setup

The contact form needs a backend. Options:

### 1. **Formspree** (Recommended for static sites)
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <!-- form fields -->
</form>
```

### 2. **EmailJS**
```javascript
emailjs.send("service_id", "template_id", {
  from_name: formData.name,
  message: formData.message,
  reply_to: formData.email
});
```

### 3. **Netlify Forms**
```html
<form netlify>
  <!-- form fields -->
</form>
```

---

## Performance Checklist

- [ ] Images optimized (<200KB each)
- [ ] CSS/JS minified
- [ ] Gzip/Brotli compression enabled
- [ ] Browser caching configured
- [ ] CDN configured (if using traditional hosting)
- [ ] Lazy loading images (optional)
- [ ] Critical CSS inlined (optional)

---

## Launch Checklist

### Pre-Launch
- [ ] All content reviewed
- [ ] Mobile responsive tested
- [ ] Cross-browser tested
- [ ] Forms work
- [ ] Analytics installed
- [ ] SEO configured
- [ ] SSL enabled
- [ ] 404 page created (optional)

### Launch
- [ ] Deploy to production
- [ ] Test live site
- [ ] Submit to Google Search Console
- [ ] Share with stakeholders

### Post-Launch
- [ ] Monitor analytics
- [ ] Check error logs
- [ ] Gather feedback
- [ ] Plan updates

---

## Support Resources

- **Netlify Docs**: https://docs.netlify.com
- **Vercel Docs**: https://vercel.com/docs
- **GitHub Pages**: https://pages.github.com
- **Web.dev**: https://web.dev (performance guides)

---

## Conclusion

Your static website is easy to deploy and maintain. Choose the platform that best fits your workflow:

- **Netlify**: Best overall, great UI
- **Vercel**: Modern, edge network
- **GitHub Pages**: Free, simple
- **Traditional**: Full control

All provide excellent hosting for this static site!
