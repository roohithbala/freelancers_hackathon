const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// In-memory OTP store: email → { otp, expiresAt, attempts }
const otpStore = new Map();

// Rate limit store: email → { count, resetAt }
const rateLimitStore = new Map();

const OTP_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_SENDS_PER_WINDOW = 5;

// Create reusable transporter using port 587 (TLS) — less likely to be blocked
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // use STARTTLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Generate 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Check rate limit
function isRateLimited(email) {
  const entry = rateLimitStore.get(email);
  if (!entry) return false;
  if (Date.now() > entry.resetAt) {
    rateLimitStore.delete(email);
    return false;
  }
  return entry.count >= MAX_SENDS_PER_WINDOW;
}

// POST /api/otp/send
router.post('/send', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Rate limit check
  if (isRateLimited(email)) {
    return res.status(429).json({ error: 'Too many OTP requests. Please wait before trying again.' });
  }

  const otp = generateOTP();
  
  // Store OTP
  otpStore.set(email, {
    otp,
    expiresAt: Date.now() + OTP_EXPIRY_MS,
    attempts: 0
  });

  // Update rate limit
  const rateEntry = rateLimitStore.get(email);
  if (rateEntry) {
    rateEntry.count++;
  } else {
    rateLimitStore.set(email, { count: 1, resetAt: Date.now() + RATE_LIMIT_WINDOW_MS });
  }

  // Send email
  try {
    await transporter.sendMail({
      from: `"IdeaForge Security" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '🔐 Your IdeaForge Login Verification Code',
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 30px; background: #0f172a; border-radius: 24px; color: white;">
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="display: inline-block; background: #4f46e5; padding: 14px; border-radius: 16px; margin-bottom: 16px;">
              <span style="font-size: 28px;">🔐</span>
            </div>
            <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">IdeaForge</h1>
            <p style="color: #94a3b8; margin-top: 4px; font-size: 13px;">Login Verification</p>
          </div>
          
          <p style="color: #cbd5e1; font-size: 15px; line-height: 1.6; margin-bottom: 24px;">
            Use the following code to complete your login. This code expires in <strong style="color: white;">5 minutes</strong>.
          </p>
          
          <div style="background: #1e293b; border: 2px solid #334155; border-radius: 16px; padding: 24px; text-align: center; margin-bottom: 24px;">
            <div style="font-size: 36px; font-weight: 900; letter-spacing: 12px; color: #818cf8; font-family: 'Courier New', monospace;">
              ${otp}
            </div>
          </div>
          
          <p style="color: #64748b; font-size: 12px; line-height: 1.5; text-align: center;">
            If you didn't request this code, please ignore this email.<br/>
            Never share this code with anyone.
          </p>
        </div>
      `
    });

    console.log(`OTP sent to ${email}`);
    res.json({ success: true, message: 'OTP sent successfully' });
  } catch (err) {
    console.error('Failed to send OTP email:', err);
    otpStore.delete(email);
    res.status(500).json({ error: 'Failed to send verification email. Please try again.' });
  }
});

// POST /api/otp/verify
router.post('/verify', (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: 'Email and OTP are required' });
  }

  const entry = otpStore.get(email);

  if (!entry) {
    return res.status(400).json({ error: 'No OTP found. Please request a new one.' });
  }

  // Check expiry
  if (Date.now() > entry.expiresAt) {
    otpStore.delete(email);
    return res.status(400).json({ error: 'OTP has expired. Please request a new one.' });
  }

  // Check attempts (max 5)
  if (entry.attempts >= 5) {
    otpStore.delete(email);
    return res.status(400).json({ error: 'Too many failed attempts. Please request a new OTP.' });
  }

  // Verify
  entry.attempts++;
  if (entry.otp === otp.trim()) {
    otpStore.delete(email);
    return res.json({ success: true, message: 'OTP verified successfully' });
  }

  return res.status(400).json({ error: 'Invalid verification code. Please try again.' });
});

module.exports = router;
