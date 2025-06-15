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
            <p className="text-sm text-gray-500 handwriting">where love meets technology</p>
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
                <span className="text-sm text-gray-600">Connecting hearts worldwide</span>
              </div>
              
              <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-gray-800">Schedule</span>
                <br />
                <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                  magical moments
                </span>
                <br />
                <span className="text-gray-800">with your</span>
                <br />
                <span className="handwriting text-rose-500 text-5xl lg:text-6xl">soulmate ✨</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Distance means nothing when someone means everything. Create unforgettable virtual dates that bring you closer together, one heartbeat at a time.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/plan" className="btn-primary group">
                <span className="mr-3">💕</span>
                Start Your Love Story
                <span className="ml-3 transform group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <button className="btn-secondary group">
                <span className="mr-2">🎥</span>
                Watch Demo
                <span className="ml-2 transform group-hover:scale-110 transition-transform">▶</span>
              </button>
            </div>

            {/* Stats */}
            <div className="flex space-x-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
                  10K+
                </div>
                <div className="text-sm text-gray-500">Couples Connected</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
                  50K+
                </div>
                <div className="text-sm text-gray-500">Dates Planned</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
                  99%
                </div>
                <div className="text-sm text-gray-500">Happy Hearts</div>
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
                    <div className="handwriting text-lg text-gray-600">Sarah in NYC</div>
                    <div className="text-sm text-gray-400">Missing you 💕</div>
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
                    <div className="handwriting text-lg text-gray-600">Alex in LA</div>
                    <div className="text-sm text-gray-400">Can't wait! 😍</div>
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

        {/* Features Section */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Make Every Moment <span className="handwriting text-rose-500">Special</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our curated date experiences designed to bring you closer, no matter the distance
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="feature-card group">
              <div className="feature-icon">🎮</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Game Nights</h3>
              <p className="text-gray-600 leading-relaxed">
                Challenge each other in online games, share laughs, and create competitive memories together
              </p>
              <div className="mt-6 flex justify-center space-x-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
              </div>
            </div>
            
            <div className="feature-card group">
              <div className="feature-icon">🎬</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Movie Dates</h3>
              <p className="text-gray-600 leading-relaxed">
                Sync up your favorite films, share popcorn virtually, and cuddle through the screen
              </p>
              <div className="mt-6 flex justify-center space-x-2">
                <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
              </div>
            </div>
            
            <div className="feature-card group">
              <div className="feature-icon">🍽️</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Dinner Dates</h3>
              <p className="text-gray-600 leading-relaxed">
                Cook the same meal, light candles, and share intimate conversations over virtual dinner
              </p>
              <div className="mt-6 flex justify-center space-x-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span className="w-2 h-2 bg-teal-400 rounded-full"></span>
                <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="mt-32">
          <div className="card max-w-4xl mx-auto text-center">
            <div className="text-6xl mb-6">💕</div>
            <blockquote className="text-2xl text-gray-700 handwriting mb-8">
              "BookMyHeart helped us stay connected during our long-distance relationship. 
              Every virtual date felt like we were in the same room together!"
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">M&J</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-800">Maya & James</div>
                <div className="text-sm text-gray-500">Together for 3 years, 2 continents apart</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;