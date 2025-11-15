import Analytics from '../models/Analytics.js';
import Url from '../models/Url.js';

// @desc    Get analytics for a specific URL
// @route   GET /api/analytics/:shortCode
// @access  Private
export const getUrlAnalytics = async (req, res, next) => {
  try {
    const { shortCode } = req.params;
    const userId = req.user._id;

    // Find URL and verify ownership
    const url = await Url.findOne({ shortCode, user: userId });
    if (!url) {
      return res.status(404).json({ message: 'URL not found' });
    }

    // Get all analytics for this URL
    const analytics = await Analytics.find({ url: url._id })
      .sort({ timestamp: -1 });

    // Aggregate data
    const totalClicks = analytics.length;
    
    // Clicks by day
    const clicksByDay = {};
    analytics.forEach(click => {
      const date = new Date(click.timestamp).toISOString().split('T')[0];
      clicksByDay[date] = (clicksByDay[date] || 0) + 1;
    });

    // Device types
    const deviceTypes = {};
    analytics.forEach(click => {
      deviceTypes[click.deviceType] = (deviceTypes[click.deviceType] || 0) + 1;
    });

    // Countries
    const countries = {};
    analytics.forEach(click => {
      countries[click.country] = (countries[click.country] || 0) + 1;
    });

    // Browsers
    const browsers = {};
    analytics.forEach(click => {
      browsers[click.browser] = (browsers[click.browser] || 0) + 1;
    });

    // OS
    const os = {};
    analytics.forEach(click => {
      os[click.os] = (os[click.os] || 0) + 1;
    });

    // Referrers
    const referrers = {};
    analytics.forEach(click => {
      const ref = click.referrer === 'Direct' ? 'Direct' : new URL(click.referrer).hostname;
      referrers[ref] = (referrers[ref] || 0) + 1;
    });

    res.json({
      url: {
        _id: url._id,
        longUrl: url.longUrl,
        shortCode: url.shortCode,
        shortUrl: `${process.env.SERVER_URL || 'http://localhost:5000'}/${url.shortCode}`,
        createdAt: url.createdAt
      },
      totalClicks,
      clicksByDay,
      deviceTypes,
      countries,
      browsers,
      os,
      referrers,
      recentClicks: analytics.slice(0, 50).map(click => ({
        timestamp: click.timestamp,
        country: click.country,
        deviceType: click.deviceType,
        browser: click.browser,
        os: click.os,
        referrer: click.referrer
      }))
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get analytics for all user URLs
// @route   GET /api/analytics/user
// @access  Private
export const getUserAnalytics = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Get all URLs for user
    const urls = await Url.find({ user: userId });

    // Get analytics for all URLs
    const urlIds = urls.map(url => url._id);
    const analytics = await Analytics.find({ url: { $in: urlIds } })
      .sort({ timestamp: -1 });

    // Aggregate data across all URLs
    const totalClicks = analytics.length;
    
    // Clicks by day
    const clicksByDay = {};
    analytics.forEach(click => {
      const date = new Date(click.timestamp).toISOString().split('T')[0];
      clicksByDay[date] = (clicksByDay[date] || 0) + 1;
    });

    // Device types
    const deviceTypes = {};
    analytics.forEach(click => {
      deviceTypes[click.deviceType] = (deviceTypes[click.deviceType] || 0) + 1;
    });

    // Countries
    const countries = {};
    analytics.forEach(click => {
      countries[click.country] = (countries[click.country] || 0) + 1;
    });

    // Per URL summary
    const urlSummaries = await Promise.all(
      urls.map(async (url) => {
        const urlAnalytics = await Analytics.find({ url: url._id });
        return {
          _id: url._id,
          shortCode: url.shortCode,
          longUrl: url.longUrl,
          shortUrl: `${process.env.SERVER_URL || 'http://localhost:5000'}/${url.shortCode}`,
          clickCount: urlAnalytics.length,
          createdAt: url.createdAt
        };
      })
    );

    res.json({
      totalClicks,
      totalUrls: urls.length,
      clicksByDay,
      deviceTypes,
      countries,
      urlSummaries: urlSummaries.sort((a, b) => b.clickCount - a.clickCount)
    });
  } catch (error) {
    next(error);
  }
};

