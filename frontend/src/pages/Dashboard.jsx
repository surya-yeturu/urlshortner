import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { urlService } from '../services/urlService';
import { toast } from 'sonner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import URLCard from '../components/URLCard';
import { Plus, Loader2 } from 'lucide-react';

const Dashboard = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      setLoading(true);
      const data = await urlService.getUserUrls();
      setUrls(data);
    } catch (error) {
      toast.error('Failed to load URLs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (urlId) => {
    setUrls(urls.filter(url => url._id !== urlId));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My URLs</h1>
          <Link to="/create" className="btn-primary flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create New URL
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
          </div>
        ) : urls.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-gray-600 mb-4">You haven't created any URLs yet.</p>
            <Link to="/create" className="btn-primary inline-block">
              Create Your First URL
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {urls.map((url) => (
              <URLCard key={url._id} url={url} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;

