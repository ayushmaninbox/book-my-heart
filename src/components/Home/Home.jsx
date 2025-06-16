import React from 'react';
import { Link } from 'react-router-dom';
import { generateUserId } from '../../utils/generateUserId';

const Home = () => {
  React.useEffect(() => {
    generateUserId();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating Elements Background */}
      <div className="floating-elements">
        <div className="floating-element">💕</div>
        <div className="floating-element">✨</div>
        <div className="floating-element">💖</div>
        <div className="floating-element">🌙</div>
        <div className="floating-element">⭐</div>
        <div className="floating-element">💫</div>
        <div className="floating-element">🦋</div>
        <div className="floating-element">🌸</div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-8">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-rose-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-2xl">💖</span>
          </div>
          <div>
            <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
              BookMyHeart
            </span>
            <p className="text-sm text-gray-500 handwriting">where love meets simplicity</p>
          </div>
        </div>
        <Link to="/my-dates" className="btn-secondary">
          <span className="mr-2">📅</span>
          My Dates
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-rose-200">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-sm text-gray-600">New platform • Privacy first</span>
              </div>
              
              <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-gray-800">Plan virtual dates</span>
                <br />
                <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                  without the hassle
                </span>
                <br />
                <span className="handwriting text-rose-500 text-5xl lg:text-6xl">Simple. Private. Beautiful. ✨</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Create magical virtual date experiences in seconds. No accounts, no data collection, no complications. Just pure connection.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/plan" className="btn-primary group">
                <span className="mr-3">💕</span>
                Plan Your First Date
                <span className="ml-3 transform group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-6 pt-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-lg">🚫</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">No Login Required</div>
                  <div className="text-sm text-gray-500">Start planning instantly</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-lg">🔒</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Privacy First</div>
                  <div className="text-sm text-gray-500">Your data stays yours</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-lg">⚡</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Lightning Fast</div>
                  <div className="text-sm text-gray-500">Plan dates in under 2 minutes</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                  <span className="text-lg">📱</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Works Everywhere</div>
                  <div className="text-sm text-gray-500">Any device, any browser</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Illustration */}
          <div className="relative">
            <div className="illustration-container">
              {/* Love Particles */}
              <div className="love-particles">
                <div className="love-particle">💕</div>
                <div className="love-particle">✨</div>
                <div className="love-particle">💖</div>
                <div className="love-particle">🌟</div>
                <div className="love-particle">💫</div>
              </div>

              <div className="couple-illustration">
                {/* Female Character */}
                <div className="person">
                  <div className="person-avatar">
                    <div className="text-5xl animate-pulse">👩🏻‍💻</div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                  </div>
                  <div className="person-device">
                    <div className="text-3xl animate-bounce">💖</div>
                    <div className="absolute top-2 right-2 text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                      LIVE
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <div className="handwriting text-lg text-gray-600">Planning something special</div>
                    <div className="text-sm text-gray-400">No signup needed 💕</div>
                  </div>
                </div>

                {/* Connection Line */}
                <div className="connection-line"></div>

                {/* Male Character */}
                <div className="person">
                  <div className="person-avatar">
                    <div className="text-5xl animate-pulse">👨🏻‍💻</div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                  </div>
                  <div className="person-device">
                    <div className="text-3xl animate-bounce">💖</div>
                    <div className="absolute top-2 right-2 text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                      LIVE
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <div className="handwriting text-lg text-gray-600">Receiving the surprise</div>
                    <div className="text-sm text-gray-400">Just click to join! 😍</div>
                  </div>
                </div>
              </div>

              {/* Floating Date Ideas */}
              <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm shadow-lg">
                🎮 Game Night
              </div>
              <div className="absolute top-16 right-8 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm shadow-lg">
                🎬 Movie Date
              </div>
              <div className="absolute bottom-8 left-8 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm shadow-lg">
                🍽️ Dinner Together
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              How <span className="handwriting text-rose-500">BookMyHeart</span> Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to create unforgettable virtual date experiences
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="feature-card text-center">
              <div className="feature-icon">🎯</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">1. Choose Your Vibe</h3>
              <p className="text-gray-600 leading-relaxed">
                Pick from game nights, movie dates, dinner experiences, or create your own surprise date
              </p>
              <div className="mt-6 flex justify-center space-x-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
              </div>
            </div>
            
            <div className="feature-card text-center">
              <div className="feature-icon">💌</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">2. Add Personal Touch</h3>
              <p className="text-gray-600 leading-relaxed">
                Write a sweet message, set the date & time, and we'll generate a beautiful invitation
              </p>
              <div className="mt-6 flex justify-center space-x-2">
                <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
              </div>
            </div>
            
            <div className="feature-card text-center">
              <div className="feature-icon">🚀</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">3. Share & Connect</h3>
              <p className="text-gray-600 leading-relaxed">
                Send the magical invite link to your partner. They can join instantly - no downloads or accounts needed
              </p>
              <div className="mt-6 flex justify-center space-x-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span className="w-2 h-2 bg-teal-400 rounded-full"></span>
                <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Built for <span className="handwriting text-rose-500">Modern Love</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need for meaningful virtual connections, without the complexity
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card text-center bg-gradient-to-br from-blue-50 to-indigo-50">
              <div className="text-4xl mb-4">🔐</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Privacy by Design</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                No data collection, no tracking, no permanent storage. Your romantic moments stay between you two.
              </p>
            </div>

            <div className="card text-center bg-gradient-to-br from-green-50 to-teal-50">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Instant Access</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                No signups, no downloads, no waiting. Create and share date invitations in under 2 minutes.
              </p>
            </div>

            <div className="card text-center bg-gradient-to-br from-purple-50 to-pink-50">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Beautiful Invitations</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Gorgeous, personalized invites that make your partner feel special before the date even begins.
              </p>
            </div>

            <div className="card text-center bg-gradient-to-br from-rose-50 to-pink-50">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Works Everywhere</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Any device, any browser, anywhere in the world. Love knows no technical boundaries.
              </p>
            </div>

            <div className="card text-center bg-gradient-to-br from-amber-50 to-orange-50">
              <div className="text-4xl mb-4">🎵</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Spotify Integration</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Add the perfect playlist to set the mood for your virtual date experience.
              </p>
            </div>

            <div className="card text-center bg-gradient-to-br from-cyan-50 to-blue-50">
              <div className="text-4xl mb-4">📹</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Video Call Ready</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Pre-generated Google Meet links that work instantly - no login required for your partner.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-32">
          <div className="card max-w-4xl mx-auto text-center bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
            <div className="text-6xl mb-6">💕</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4 handwriting">
              Ready to create something beautiful?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join the new way of planning virtual dates. Simple, private, and designed for love.
            </p>
            <Link to="/plan" className="btn-primary text-xl px-12 py-5">
              <span className="mr-3">✨</span>
              Start Planning Your Date
              <span className="ml-3">💖</span>
            </Link>
            <p className="text-gray-500 mt-4 text-sm">
              No signup required • Takes less than 2 minutes • Completely free
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;