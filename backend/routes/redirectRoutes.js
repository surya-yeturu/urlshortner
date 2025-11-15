import express from 'express';
import Url from '../models/Url.js';
import Analytics from '../models/Analytics.js';
import { parseUserAgent } from '../utils/parseUserAgent.js';
import { getCountryFromIP } from '../utils/getCountryFromIP.js';

const router = express.Router();

// @desc    Redirect short URL to long URL
// @route   GET /:shortCode
// @access  Public
router.get('/:shortCode', async (req, res, next) => {
  try {
    const { shortCode } = req.params;

    // Find URL
    const url = await Url.findOne({ shortCode });
    
    if (!url) {
      return res.status(404).json({ message: 'URL not found' });
    }

    // Check if URL is expired
    if (url.expiresAt && new Date() > url.expiresAt) {
      return res.status(410).json({ message: 'This URL has expired' });
    }

    // Get client IP
    const ip = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for']?.split(',')[0] || 'Unknown';
    
    // Get referrer
    const referrer = req.headers.referer || req.headers.referrer || 'Direct';
    
    // Parse user agent
    const userAgentString = req.headers['user-agent'] || '';
    const { browser, os, deviceType } = parseUserAgent(userAgentString);
    
    // Get country from IP
    const country = getCountryFromIP(ip);

    // Create analytics record
    await Analytics.create({
      url: url._id,
      user: url.user,
      ipAddress: ip,
      userAgent: userAgentString,
      country,
      referrer,
      deviceType,
      browser,
      os
    });

    // Update click count
    url.clickCount += 1;
    await url.save();

    // Redirect to long URL
    res.redirect(url.longUrl);
  } catch (error) {
    next(error);
  }
});

export default router;

