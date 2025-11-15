import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: [true, 'Long URL is required'],
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+/.test(v);
      },
      message: 'Please provide a valid URL starting with http:// or https://'
    }
  },
  shortCode: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isPrivate: {
    type: Boolean,
    default: false
  },
  expiresAt: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  clickCount: {
    type: Number,
    default: 0
  }
});

// Index for faster lookups
urlSchema.index({ shortCode: 1 });
urlSchema.index({ user: 1 });
urlSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model('Url', urlSchema);

