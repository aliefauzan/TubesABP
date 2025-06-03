# 🚀 KeretaXpress Deployment Guide

## Overview
This guide covers deploying the KeretaXpress web application to various platforms including Google Cloud Run, Vercel, Netlify, and traditional hosting providers.

## 🏗️ Google Cloud Run (Production Ready)

### Prerequisites
- Google Cloud Project: `tubesabp-459213`
- Google Cloud SDK installed and configured
- Docker installed locally (for testing)
- Artifact Registry enabled
- Cloud Run API enabled
- Cloud Build API enabled

### Deployment Files
The following files are pre-configured for Google Cloud Run deployment:

#### 1. `Dockerfile`
- Multi-stage Node.js 18 Alpine build
- Optimized for Next.js standalone output
- Production-ready with security best practices
- Non-root user configuration
- Port 3000 exposed

#### 2. `cloudbuild.yaml`
- Automated CI/CD pipeline
- Builds Docker image
- Pushes to Artifact Registry
- Deploys to Cloud Run
- Configured with proper resource limits:
  - Memory: 1Gi
  - CPU: 1
  - Min instances: 0
  - Max instances: 10
  - Port: 3000

#### 3. `.dockerignore`
- Optimized build context
- Excludes development files and dependencies

### Quick Deployment Steps

1. **Build and Test Locally**
   ```bash
   # Test the build
   npm run build
   
   # Test Docker build (optional)
   docker build -t keretaxpress-test .
   docker run -p 3000:3000 keretaxpress-test
   ```

2. **Deploy via Cloud Build**
   ```bash
   # Ensure you're in the web_version directory
   cd web_version
   
   # Submit build to Cloud Build
   gcloud builds submit --config cloudbuild.yaml .
   ```

3. **Manual Deployment (Alternative)**
   ```bash
   # Build and push image
   docker build -t asia-southeast2-docker.pkg.dev/tubesabp-459213/cloud-run-source-deploy/keretaxpress-frontend .
   docker push asia-southeast2-docker.pkg.dev/tubesabp-459213/cloud-run-source-deploy/keretaxpress-frontend
   
   # Deploy to Cloud Run
   gcloud run deploy keretaxpress-frontend \
     --image=asia-southeast2-docker.pkg.dev/tubesabp-459213/cloud-run-source-deploy/keretaxpress-frontend \
     --region=asia-southeast2 \
     --platform=managed \
     --port=3000 \
     --memory=1Gi \
     --cpu=1 \
     --min-instances=0 \
     --max-instances=10 \
     --allow-unauthenticated
   ```

### Configuration Details

- **Project ID**: `tubesabp-459213`
- **Region**: `asia-southeast2` (Jakarta)
- **Service Name**: `keretaxpress-frontend`
- **Artifact Registry**: `cloud-run-source-deploy`
- **Public Access**: Enabled (--allow-unauthenticated)

### Monitoring and Logs
- **Cloud Console**: https://console.cloud.google.com/run
- **Logs**: `gcloud logs read --service=keretaxpress-frontend`
- **Metrics**: Available in Cloud Monitoring

### Environment Variables (Optional)
Add environment variables via Cloud Run console or CLI:
```bash
gcloud run services update keretaxpress-frontend \
  --set-env-vars="NODE_ENV=production,NEXT_PUBLIC_API_URL=https://your-api-url.com" \
  --region=asia-southeast2
```

### 1. Vercel (Recommended)

Vercel is the recommended platform for Next.js applications, offering seamless integration and automatic optimizations.

#### Quick Deploy
```bash
npm install -g vercel
vercel
```

#### Configuration
Create `vercel.json` in the root directory:
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "https://your-backend-api.com/api/$1"
    }
  ]
}
```

#### Environment Variables
Set in Vercel Dashboard:
- `NEXT_PUBLIC_API_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`

### 2. Netlify

#### Deploy Process
1. Build the application:
   ```bash
   npm run build
   npm run export
   ```

2. Create `netlify.toml`:
   ```toml
   [build]
     publish = "out"
     command = "npm run build && npm run export"

   [[redirects]]
     from = "/api/*"
     to = "https://your-backend-api.com/api/:splat"
     status = 200
   ```

3. Deploy to Netlify:
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=out
   ```

### 3. AWS Amplify

#### Configuration
Create `amplify.yml`:
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

### 4. Traditional Hosting (cPanel/VPS)

#### Build for Static Export
1. Update `next.config.js`:
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     trailingSlash: true,
     images: {
       unoptimized: true
     }
   }
   
   module.exports = nextConfig
   ```

2. Build and export:
   ```bash
   npm run build
   ```

3. Upload the `out` folder contents to your web server.

## 🔧 Environment Configuration

### Production Environment Variables
```env
# API Configuration
NEXT_PUBLIC_API_URL=https://api.keretaxpress.com/api
NEXT_PUBLIC_APP_URL=https://keretaxpress.com

# Authentication
NEXTAUTH_URL=https://keretaxpress.com
NEXTAUTH_SECRET=your-super-secure-secret-key

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=GA-XXXXXXXXX
NEXT_PUBLIC_HOTJAR_ID=XXXXXXX

# Payment Gateway (When integrated)
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...

# Notification Services
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your-vapid-public-key
VAPID_PRIVATE_KEY=your-vapid-private-key
```

### Development vs Production
Create different environment files:
- `.env.local` - Development
- `.env.production` - Production values

## 🚀 PWA Deployment

### Service Worker Setup
1. Create `public/sw.js`:
   ```javascript
   const CACHE_NAME = 'keretaxpress-v1';
   const urlsToCache = [
     '/',
     '/static/css/',
     '/static/js/',
     '/images/'
   ];

   self.addEventListener('install', (event) => {
     event.waitUntil(
       caches.open(CACHE_NAME)
         .then((cache) => cache.addAll(urlsToCache))
     );
   });
   ```

2. Update `public/manifest.json`:
   ```json
   {
     "name": "KeretaXpress",
     "short_name": "KeretaXpress",
     "description": "Modern Train Booking Platform",
     "start_url": "/",
     "display": "standalone",
     "background_color": "#1e40af",
     "theme_color": "#1e40af",
     "icons": [
       {
         "src": "/icons/icon-192.png",
         "sizes": "192x192",
         "type": "image/png"
       },
       {
         "src": "/icons/icon-512.png",
         "sizes": "512x512",
         "type": "image/png"
       }
     ]
   }
   ```

## 📊 Performance Optimization

### Build Optimization
```bash
# Analyze bundle size
npm install -g @next/bundle-analyzer
ANALYZE=true npm run build
```

### Image Optimization
- Use Next.js Image component for automatic optimization
- Provide WebP format alternatives
- Implement lazy loading for better performance

### Code Splitting
- Utilize dynamic imports for large components
- Implement route-based code splitting
- Use React.lazy for component-level splitting

## 🔒 Security Configuration

### HTTPS Setup
Ensure HTTPS is enabled on your hosting platform:
- Vercel: Automatic HTTPS
- Netlify: Automatic HTTPS
- Custom hosting: Configure SSL certificate

### Content Security Policy
Add to `next.config.js`:
```javascript
const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'"
  }
];

module.exports = {
  headers: async () => [
    {
      source: '/(.*)',
      headers: securityHeaders
    }
  ]
};
```

## 📈 Monitoring & Analytics

### Performance Monitoring
- Set up Core Web Vitals tracking
- Implement error boundary reporting
- Monitor API response times
- Track user engagement metrics

### Error Tracking
Consider integrating:
- Sentry for error tracking
- LogRocket for session replay
- Google Analytics for user behavior

## 🔄 CI/CD Pipeline

### GitHub Actions Example
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm install
        
      - name: Build application
        run: npm run build
        env:
          NEXT_PUBLIC_API_URL: ${{ secrets.API_URL }}
          
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 🧪 Testing Before Deployment

### Manual Testing Checklist
- [ ] All pages load correctly
- [ ] Forms submit successfully
- [ ] Responsive design works on all devices
- [ ] Animations perform smoothly
- [ ] Search functionality works
- [ ] Notifications display properly
- [ ] PWA features work (if applicable)

### Automated Testing
```bash
# Build test
npm run build

# Lint check
npm run lint

# Type checking
npx tsc --noEmit
```

## 🚀 Go Live Checklist

### Pre-Launch
- [ ] Domain configured and pointing to hosting
- [ ] SSL certificate active
- [ ] Environment variables set
- [ ] API endpoints accessible
- [ ] Database connections working
- [ ] Payment gateway configured (if applicable)

### Post-Launch
- [ ] Monitor error logs
- [ ] Check performance metrics
- [ ] Verify all functionality
- [ ] Update DNS records if needed
- [ ] Set up monitoring alerts

## 📚 Additional Resources

- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Vercel Platform Documentation](https://vercel.com/docs)
- [PWA Best Practices](https://web.dev/pwa-checklist/)
- [Web Performance Optimization](https://web.dev/performance/)

## 🆘 Troubleshooting

### Common Issues

1. **Build Errors**
   - Check TypeScript errors: `npx tsc --noEmit`
   - Verify all imports are correct
   - Ensure environment variables are set

2. **Runtime Errors**
   - Check browser console for errors
   - Verify API endpoints are accessible
   - Check network requests in DevTools

3. **Performance Issues**
   - Analyze bundle size
   - Check for memory leaks
   - Optimize images and assets

### Support
For deployment issues, check:
- Platform-specific documentation
- Community forums
- Error logs and monitoring tools

---

**Ready to launch your KeretaXpress application! 🚄**
