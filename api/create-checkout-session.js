/**
 * BIRDTURDS v43 - FIX38 Stripe Checkout API (Node.js/Express)
 * Server-side checkout - works even when Stripe.js is blocked
 * 
 * USAGE:
 *   npm install stripe express
 *   Set STRIPE_SECRET_KEY and STRIPE_PUBLISHABLE_KEY env vars
 *   node api/create-checkout-session.js  (standalone)
 *   OR mount in Express app: app.use('/api', require('./api/create-checkout-session'))
 */

const express = require('express');
const router = express.Router();

// Initialize Stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const PUBLIC_URL = process.env.PUBLIC_URL || 'https://birdturds.com';
const PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY;

/**
 * POST /api/create-checkout-session
 * Body: { priceId: 'price_xxx' }
 * Returns: { checkoutUrl, sessionId, publishableKey }
 */
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { priceId } = req.body;
    
    // Validate
    if (!priceId) {
      return res.status(400).json({ error: 'priceId is required' });
    }
    
    if (!/^price_[a-zA-Z0-9]+$/.test(priceId)) {
      return res.status(400).json({ error: 'Invalid priceId format' });
    }
    
    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: [{
        price: priceId,
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${PUBLIC_URL}/play.html?purchase=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${PUBLIC_URL}/play.html?purchase=canceled`,
    });
    
    // Return URL for redirect + session details for Stripe.js fallback
    return res.json({
      checkoutUrl: session.url,
      url: session.url,
      sessionId: session.id,
      publishableKey: PUBLISHABLE_KEY,
    });
    
  } catch (err) {
    console.error('Stripe checkout error:', err);
    
    if (err.type === 'StripeInvalidRequestError') {
      return res.status(400).json({ error: 'Invalid request', message: err.message });
    }
    
    if (err.type === 'StripeAuthenticationError') {
      return res.status(500).json({ error: 'Stripe authentication failed' });
    }
    
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

// ============================================================
// STANDALONE SERVER
// ============================================================
if (require.main === module) {
  const app = express();
  
  app.use(express.json());
  
  // CORS
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
  });
  
  app.use('/api', router);
  app.get('/health', (req, res) => res.json({ status: 'ok' }));
  
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Stripe API running on port ${PORT}`);
    console.log(`POST http://localhost:${PORT}/api/create-checkout-session`);
  });
}
