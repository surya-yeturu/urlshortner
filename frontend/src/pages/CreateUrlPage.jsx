import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { urlService } from '../services/urlService';
import { toast } from 'sonner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import QRModal from '../components/QRModal';
import { Loader2 } from 'lucide-react';

const CreateUrlPage = () => {
  const [formData, setFormData] = useState({
    longUrl: '',
    customAlias: '',
    expiration: '',
    customExpiration: '',
    isPrivate: false
  });
  const [loading, setLoading] = useState(false);
  const [createdUrl, setCreatedUrl] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.longUrl) {
      toast.error('Please enter a URL');
      return;
    }

    // Validate URL format
    try {
      new URL(formData.longUrl);
    } catch {
      toast.error('Please enter a valid URL (must start with http:// or https://)');
      return;
    }

    setLoading(true);
    try {
      const data = await urlService.createUrl(
        formData.longUrl,
        formData.customAlias || undefined,
        formData.expiration || undefined,
        formData.isPrivate,
        formData.customExpiration || undefined
      );
      setCreatedUrl(data);
      toast.success('URL created successfully!');
      // Reset form
      setFormData({
        longUrl: '',
        customAlias: '',
        expiration: '',
        customExpiration: '',
        isPrivate: false
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create URL');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <h1 className="text-3xl font-bold mb-8">Create Short URL</h1>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Long URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                name="longUrl"
                value={formData.longUrl}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="https://example.com/very/long/url"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom Alias (Optional)
              </label>
              <input
                type="text"
                name="customAlias"
                value={formData.customAlias}
                onChange={handleChange}
                className="input-field"
                placeholder="my-custom-link"
                pattern="[a-zA-Z0-9-_]+"
                minLength={3}
                maxLength={20}
              />
              <p className="text-xs text-gray-500 mt-1">
                3-20 characters, letters, numbers, hyphens, and underscores only
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiration
              </label>
              <select
                name="expiration"
                value={formData.expiration}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Never</option>
                <option value="1h">1 Hour</option>
                <option value="24h">24 Hours</option>
                <option value="7d">7 Days</option>
                <option value="custom">Custom Date</option>
              </select>
            </div>

            {formData.expiration === 'custom' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Expiration Date
                </label>
                <input
                  type="datetime-local"
                  name="customExpiration"
                  value={formData.customExpiration}
                  onChange={handleChange}
                  className="input-field"
                  min={new Date().toISOString().slice(0, 16)}
                />
              </div>
            )}

            <div className="flex items-center">
              <input
                type="checkbox"
                name="isPrivate"
                id="isPrivate"
                checked={formData.isPrivate}
                onChange={handleChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="isPrivate" className="ml-2 block text-sm text-gray-700">
                Make this URL private
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Creating...
                </span>
              ) : (
                'Create Short URL'
              )}
            </button>
          </form>
        </div>

        {createdUrl && (
          <div className="card mt-6 bg-green-50 border-2 border-green-200">
            <h2 className="text-xl font-semibold mb-4 text-green-800">URL Created Successfully!</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Short URL
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={createdUrl.shortUrl}
                    readOnly
                    className="flex-1 input-field bg-white"
                  />
                  <button
                    onClick={() => copyToClipboard(createdUrl.shortUrl)}
                    className="btn-primary"
                  >
                    Copy
                  </button>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowQR(true)}
                  className="btn-primary"
                >
                  View QR Code
                </button>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="btn-secondary"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />

      {showQR && createdUrl && (
        <QRModal
          qrCode={createdUrl.qrCode}
          shortUrl={createdUrl.shortUrl}
          onClose={() => setShowQR(false)}
        />
      )}
    </div>
  );
};

export default CreateUrlPage;

