import Url from '../models/Url.js';
import { generateShortCode } from '../utils/generateShortCode.js';
import QRCode from 'qrcode';
import { validationResult } from 'express-validator';

// @desc    Create short URL
// @route   POST /api/urls
// @access  Private
export const createShortUrl = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { longUrl, customAlias, expiration } = req.body;
    const userId = req.user._id;

    // Generate short code
    let shortCode;
    if (customAlias) {
      // Check if custom alias already exists
      const existingUrl = await Url.findOne({ shortCode: customAlias.toLowerCase() });
      if (existingUrl) {
        return res.status(400).json({ message: 'Custom alias already exists' });
      }
      shortCode = customAlias.toLowerCase().trim();
    } else {
      shortCode = generateShortCode(8);
      // Ensure uniqueness
      let exists = await Url.findOne({ shortCode });
      while (exists) {
        shortCode = generateShortCode(8);
        exists = await Url.findOne({ shortCode });
      }
    }

    // Calculate expiration date
    let expiresAt = null;
    if (expiration) {
      const now = new Date();
      switch (expiration) {
        case '1h':
          expiresAt = new Date(now.getTime() + 60 * 60 * 1000);
          break;
        case '24h':
          expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);
          break;
        case '7d':
          expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
          break;
        case 'custom':
          if (req.body.customExpiration) {
            expiresAt = new Date(req.body.customExpiration);
          }
          break;
        default:
          expiresAt = null;
      }
    }

    // Create URL
    const url = await Url.create({
      longUrl,
      shortCode,
      user: userId,
      isPrivate: req.body.isPrivate || false,
      expiresAt
    });

    // Generate QR code
    const qrCodeDataURL = await QRCode.toDataURL(
      `${process.env.SERVER_URL || 'http://localhost:5000'}/${shortCode}`
    );

    res.status(201).json({
      _id: url._id,
      longUrl: url.longUrl,
      shortCode: url.shortCode,
      shortUrl: `${process.env.SERVER_URL || 'http://localhost:5000'}/${url.shortCode}`,
      qrCode: qrCodeDataURL,
      isPrivate: url.isPrivate,
      expiresAt: url.expiresAt,
      createdAt: url.createdAt
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all URLs for user
// @route   GET /api/urls
// @access  Private
export const getUserUrls = async (req, res, next) => {
  try {
    const urls = await Url.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .select('-__v');

    const urlsWithQR = await Promise.all(
      urls.map(async (url) => {
        const qrCodeDataURL = await QRCode.toDataURL(
          `${process.env.SERVER_URL || 'http://localhost:5000'}/${url.shortCode}`
        );
        return {
          ...url.toObject(),
          shortUrl: `${process.env.SERVER_URL || 'http://localhost:5000'}/${url.shortCode}`,
          qrCode: qrCodeDataURL
        };
      })
    );

    res.json(urlsWithQR);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single URL
// @route   GET /api/urls/:id
// @access  Private
export const getUrl = async (req, res, next) => {
  try {
    const url = await Url.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!url) {
      return res.status(404).json({ message: 'URL not found' });
    }

    const qrCodeDataURL = await QRCode.toDataURL(
      `${process.env.SERVER_URL || 'http://localhost:5000'}/${url.shortCode}`
    );

    res.json({
      ...url.toObject(),
      shortUrl: `${process.env.SERVER_URL || 'http://localhost:5000'}/${url.shortCode}`,
      qrCode: qrCodeDataURL
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete URL
// @route   DELETE /api/urls/:id
// @access  Private
export const deleteUrl = async (req, res, next) => {
  try {
    const url = await Url.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!url) {
      return res.status(404).json({ message: 'URL not found' });
    }

    await Url.deleteOne({ _id: req.params.id });
    res.json({ message: 'URL deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get QR code for URL
// @route   GET /api/urls/:id/qr
// @access  Private
export const getQRCode = async (req, res, next) => {
  try {
    const url = await Url.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!url) {
      return res.status(404).json({ message: 'URL not found' });
    }

    const qrCodeDataURL = await QRCode.toDataURL(
      `${process.env.SERVER_URL || 'http://localhost:5000'}/${url.shortCode}`
    );

    res.json({ qrCode: qrCodeDataURL });
  } catch (error) {
    next(error);
  }
};

