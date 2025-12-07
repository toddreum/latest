# Server Configuration Guide

## Permissions-Policy Header Configuration

### Issue
Firebase and geolocation features may be blocked by incorrect Permissions-Policy headers, causing errors in browser console.

### Required Header

Add the following header to your server configuration:

```
Permissions-Policy: geolocation=(self)
```

Or if using specific origins:

```
Permissions-Policy: geolocation=(self "https://yourdomain.com")
```

### Implementation by Server Type

#### Apache (.htaccess or httpd.conf)

```apache
<IfModule mod_headers.c>
    Header always set Permissions-Policy "geolocation=(self)"
</IfModule>
```

#### Nginx (nginx.conf or site config)

```nginx
add_header Permissions-Policy "geolocation=(self)" always;
```

#### cPanel (via .htaccess in public_html)

1. Log into cPanel
2. Navigate to File Manager
3. Edit `.htaccess` in your public_html directory
4. Add:

```apache
<IfModule mod_headers.c>
    Header always set Permissions-Policy "geolocation=(self)"
</IfModule>
```

5. Save and test

#### Node.js/Express

```javascript
app.use((req, res, next) => {
  res.setHeader('Permissions-Policy', 'geolocation=(self)');
  next();
});
```

### Verification

Test your headers using browser developer tools:
1. Open DevTools (F12)
2. Go to Network tab
3. Refresh page
4. Click on the main document request
5. Check Response Headers for `Permissions-Policy`

Or use online tools:
- https://securityheaders.com/
- https://observatory.mozilla.org/

### Multiple Permissions

If you need to configure multiple permissions:

```
Permissions-Policy: geolocation=(self), camera=(), microphone=(), payment=()
```

### Troubleshooting

**Error:** `Permissions policy violation: geolocation is not allowed`
- Ensure header is set correctly
- Check for conflicting headers
- Clear browser cache
- Use quoted origins if testing on multiple domains

**Firebase Errors:**
- Ensure Firebase domains are not blocked by other security headers
- Check CORS configuration
- Verify API keys are correct

## Service Worker Configuration

### Cache Strategy

The service worker now uses:
- **Network-first** for `/game.js` and `/game_min.js` to prevent stale code
- **Cache-first** for static assets (sprites, logos, etc.)

### Cache Version

Current version: `birdturds-v38.0.0`

To force a cache refresh:
1. Increment the version number in `service-worker.js`
2. Deploy the updated file
3. Users will get fresh cache on next visit

### Testing Service Worker

1. Open DevTools → Application tab
2. Check "Service Workers" section
3. Verify version number
4. Use "Update on reload" during development
5. Check "Cache Storage" to see cached resources

## HTTPS Configuration

### Requirement

Service workers and many modern web features require HTTPS. Ensure your site is served over HTTPS.

### Let's Encrypt (Free SSL)

Most hosting providers offer free SSL certificates via Let's Encrypt. In cPanel:

1. Go to Security → SSL/TLS Status
2. Run AutoSSL
3. Or manually install Let's Encrypt certificate

### Testing

Verify HTTPS is working:
- Check for padlock icon in browser address bar
- Test all pages load over HTTPS
- Verify mixed content warnings are resolved

## Firebase Configuration

### Initialization

Firebase is initialized in `play.html` with:

```javascript
// Firebase SDK loaded via CDN
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-database-compat.js"></script>
```

### Security

- Never commit Firebase config with real API keys to public repos
- Use Firebase security rules to protect data
- Implement proper authentication

## CORS Configuration

If you're hosting assets on a CDN or separate domain:

### Apache

```apache
<IfModule mod_headers.c>
    Header set Access-Control-Allow-Origin "*"
    Header set Access-Control-Allow-Methods "GET, POST, OPTIONS"
    Header set Access-Control-Allow-Headers "Content-Type, Authorization"
</IfModule>
```

### Nginx

```nginx
add_header Access-Control-Allow-Origin "*" always;
add_header Access-Control-Allow-Methods "GET, POST, OPTIONS" always;
add_header Access-Control-Allow-Headers "Content-Type, Authorization" always;
```

## Performance Optimization

### Compression

Enable gzip/brotli compression for better performance:

#### Apache

```apache
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json
</IfModule>
```

#### Nginx

```nginx
gzip on;
gzip_types text/css text/javascript application/javascript application/json;
gzip_min_length 1000;
```

### Browser Caching

Set appropriate cache headers for static assets:

#### Apache

```apache
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 month"
    ExpiresByType text/css "access plus 1 week"
    ExpiresByType application/javascript "access plus 1 week"
</IfModule>
```

## Monitoring

### Error Logging

Monitor your server error logs for:
- Service worker registration failures
- Firebase connection issues
- Missing asset requests (404s)
- JavaScript errors

### Analytics

Consider implementing:
- Google Analytics for usage tracking
- Error tracking service (e.g., Sentry)
- Performance monitoring (e.g., Web Vitals)

## Support

For issues specific to your hosting provider:
- Contact your hosting support team
- Reference this configuration guide
- Provide specific error messages from browser console

For BirdTurds-specific issues:
- Check browser console for errors
- Verify all JavaScript files are loading
- Test hunter selection and game bootstrap
- Clear cache and try again
