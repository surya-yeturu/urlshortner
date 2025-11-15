import { useState } from 'react';
import { Copy, Trash2, QrCode, BarChart3, ExternalLink, Calendar } from 'lucide-react';
import { urlService } from '../services/urlService';
import { toast } from 'sonner';
import QRModal from './QRModal';

const URLCard = ({ url, onDelete }) => {
  const [showQR, setShowQR] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this URL?')) {
      return;
    }

    setIsDeleting(true);
    try {
      await urlService.deleteUrl(url._id);
      toast.success('URL deleted successfully');
      onDelete(url._id);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete URL');
    } finally {
      setIsDeleting(false);
    }
  };

  const isExpired = url.expiresAt && new Date(url.expiresAt) < new Date();

  return (
    <>
      <div className="card hover:shadow-lg transition-shadow">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg truncate">
                {url.shortCode}
              </h3>
              {url.isPrivate && (
                <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
                  Private
                </span>
              )}
              {isExpired && (
                <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded">
                  Expired
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 truncate mb-2">{url.longUrl}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <ExternalLink className="h-4 w-4" />
                {url.clickCount} clicks
              </span>
              {url.expiresAt && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(url.expiresAt).toLocaleDateString()}
                </span>
              )}
            </div>
            <div className="mt-2">
              <div className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                <input
                  type="text"
                  value={url.shortUrl}
                  readOnly
                  className="flex-1 bg-transparent text-sm text-gray-700 focus:outline-none"
                />
                <button
                  onClick={() => copyToClipboard(url.shortUrl)}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                  title="Copy URL"
                >
                  <Copy className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowQR(true)}
              className="p-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors"
              title="View QR Code"
            >
              <QrCode className="h-5 w-5" />
            </button>
            <a
              href={`/analytics/${url.shortCode}`}
              className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
              title="View Analytics"
            >
              <BarChart3 className="h-5 w-5" />
            </a>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50"
              title="Delete URL"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {showQR && (
        <QRModal
          qrCode={url.qrCode}
          shortUrl={url.shortUrl}
          onClose={() => setShowQR(false)}
        />
      )}
    </>
  );
};

export default URLCard;

