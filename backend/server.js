const dotenv = require('dotenv');
dotenv.config();
const client = require('prom-client');
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const generateRoutes = require('./routes/generate');
const otpRoutes = require('./routes/otp');
const paymentRoutes = require('./routes/payment');
const rateLimit = require('express-rate-limit');

const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Trust first proxy
app.set('trust proxy', 1);

const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { error: 'Too many requests, please try again later.' }
});

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: (req) => {
        const tier = req.body.userTier || req.body.tier || 'free';
        const tierLower = tier.toLowerCase();
        if (tierLower === 'elite' || tierLower === 'architect') return 50;
        if (tierLower === 'pro' || tierLower === 'innovator') return 15;
        return 5; // Hobbyist / Free
    },
    keyGenerator: (req) => {
        return req.body.userId || req.ip;
    },
    message: { 
        error: 'Generation limit reached for your current tier. Upgrade to Innovator or Architect for higher limits!' 
    },
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(generalLimiter);
app.use('/api/otp', apiLimiter);
app.use('/api/generate', apiLimiter);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/generate', generateRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api/payment', paymentRoutes);

app.get('/health', (req, res) => {
    res.send('AI Project Idea Generator API is running');
});

app.get('/metrics', async (req, res) => {
    try {
        res.set('Content-Type', client.register.contentType);
        res.end(await client.register.metrics());
    } catch (ex) {
        res.status(500).end(ex);
    }
});

// Final catch-all for API routing
app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
        return res.status(404).json({ error: 'API route not found' });
    }
    // Return API status for other paths
    res.json({ message: "AI Project Idea Generator API is running", status: "ok" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
