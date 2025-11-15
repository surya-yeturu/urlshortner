import { Link } from 'react-router-dom';
import { Link2, BarChart3, QrCode, Shield, Zap, Globe } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Shortify Pro
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Advanced URL Shortener with Analytics, QR Codes, and More
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/register" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                Get Started Free
              </Link>
              <Link to="/login" className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600">
                Sign In
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="card text-center">
                <Link2 className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Custom Aliases</h3>
                <p className="text-gray-600">
                  Create memorable short links with custom aliases that reflect your brand.
                </p>
              </div>

              <div className="card text-center">
                <QrCode className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">QR Code Generation</h3>
                <p className="text-gray-600">
                  Automatically generate QR codes for every short URL. Download and share easily.
                </p>
              </div>

              <div className="card text-center">
                <BarChart3 className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Advanced Analytics</h3>
                <p className="text-gray-600">
                  Track clicks, locations, devices, browsers, and more with detailed insights.
                </p>
              </div>

              <div className="card text-center">
                <Shield className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Private URLs</h3>
                <p className="text-gray-600">
                  Keep your links private and secure. Control who can access your shortened URLs.
                </p>
              </div>

              <div className="card text-center">
                <Zap className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">URL Expiration</h3>
                <p className="text-gray-600">
                  Set expiration times for your links (1 hour, 24 hours, 7 days, or custom).
                </p>
              </div>

              <div className="card text-center">
                <Globe className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Global Tracking</h3>
                <p className="text-gray-600">
                  See where your clicks are coming from with country-level analytics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of users who trust Shortify Pro for their URL shortening needs.
            </p>
            <Link to="/register" className="btn-primary text-lg px-8 py-3">
              Create Your Free Account
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;

