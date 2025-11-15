import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { analyticsService } from '../services/analyticsService';
import { toast } from 'sonner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  ClicksByDayChart,
  DeviceTypesChart,
  CountriesChart,
  BrowsersChart
} from '../components/AnalyticsChart';
import { Loader2, ArrowLeft, BarChart3, Globe, Monitor, MousePointer } from 'lucide-react';

const AnalyticsPage = () => {
  const { shortCode } = useParams();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState(shortCode ? 'url' : 'user');

  useEffect(() => {
    fetchAnalytics();
  }, [shortCode]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      let data;
      if (shortCode) {
        data = await analyticsService.getUrlAnalytics(shortCode);
        setViewMode('url');
      } else {
        data = await analyticsService.getUserAnalytics();
        setViewMode('user');
      }
      setAnalytics(data);
    } catch (error) {
      toast.error('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="card text-center">
            <p className="text-gray-600">No analytics data available.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="mb-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="h-8 w-8" />
            Analytics
            {viewMode === 'url' && analytics.url && (
              <span className="text-lg font-normal text-gray-600">
                - {analytics.url.shortCode}
              </span>
            )}
          </h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Clicks</p>
                <p className="text-3xl font-bold">{analytics.totalClicks}</p>
              </div>
              <MousePointer className="h-12 w-12 opacity-50" />
            </div>
          </div>

          {viewMode === 'user' && (
            <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Total URLs</p>
                  <p className="text-3xl font-bold">{analytics.totalUrls}</p>
                </div>
                <Globe className="h-12 w-12 opacity-50" />
              </div>
            </div>
          )}

          <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Device Types</p>
                <p className="text-3xl font-bold">
                  {Object.keys(analytics.deviceTypes || {}).length}
                </p>
              </div>
              <Monitor className="h-12 w-12 opacity-50" />
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Clicks by Day</h2>
            {analytics.clicksByDay && Object.keys(analytics.clicksByDay).length > 0 ? (
              <ClicksByDayChart data={analytics.clicksByDay} />
            ) : (
              <p className="text-gray-500 text-center py-12">No data available</p>
            )}
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Device Types</h2>
            {analytics.deviceTypes && Object.keys(analytics.deviceTypes).length > 0 ? (
              <DeviceTypesChart data={analytics.deviceTypes} />
            ) : (
              <p className="text-gray-500 text-center py-12">No data available</p>
            )}
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Top Countries</h2>
            {analytics.countries && Object.keys(analytics.countries).length > 0 ? (
              <CountriesChart data={analytics.countries} />
            ) : (
              <p className="text-gray-500 text-center py-12">No data available</p>
            )}
          </div>

          {analytics.browsers && Object.keys(analytics.browsers).length > 0 && (
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Top Browsers</h2>
              <BrowsersChart data={analytics.browsers} />
            </div>
          )}
        </div>

        {/* URL Summary (for user analytics) */}
        {viewMode === 'user' && analytics.urlSummaries && (
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">URL Performance</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Short Code
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Long URL
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Clicks
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {analytics.urlSummaries.map((url) => (
                    <tr key={url._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {url.shortCode}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">
                        {url.longUrl}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {url.clickCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(url.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Link
                          to={`/analytics/${url.shortCode}`}
                          className="text-primary-600 hover:text-primary-700"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Recent Clicks (for URL analytics) */}
        {viewMode === 'url' && analytics.recentClicks && analytics.recentClicks.length > 0 && (
          <div className="card mt-6">
            <h2 className="text-xl font-semibold mb-4">Recent Clicks</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Country
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Device
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Browser
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Referrer
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {analytics.recentClicks.map((click, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(click.timestamp).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {click.country}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {click.deviceType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {click.browser}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">
                        {click.referrer}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AnalyticsPage;

