import { X, Download } from 'lucide-react';
import { toast } from 'sonner';

const QRModal = ({ qrCode, shortUrl, onClose }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = `qr-code-${shortUrl.split('/').pop()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('QR code downloaded!');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold mb-4">QR Code</h2>
        <p className="text-sm text-gray-600 mb-4">{shortUrl}</p>

        <div className="flex justify-center mb-4">
          <img
            src={qrCode}
            alt="QR Code"
            className="w-64 h-64 border-2 border-gray-200 rounded-lg"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleDownload}
            className="flex-1 btn-primary flex items-center justify-center gap-2"
          >
            <Download className="h-5 w-5" />
            Download QR Code
          </button>
          <button
            onClick={onClose}
            className="btn-secondary"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRModal;

