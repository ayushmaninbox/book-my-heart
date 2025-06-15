import React from 'react';
import { Link } from 'react-router-dom';
import { generateUserId } from '../../utils/generateUserId';

const Home = () => {
  React.useEffect(() => {
    generateUserId();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating Hearts Background */}
      <div className="floating-hearts">
        <div className="heart">💖</div>
        <div className="heart">💕</div>
        <div className="heart">💗</div>
        <div className="heart">💖</div>
        <div className="heart">💕</div>
        <div className="heart">💗</div>
        <div className="heart">💖</div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">💖</span>
          <span className="text-xl font-bold text-gray-800">BookMyHeart</span>
        </div>
        <Link to="/my-dates" className="btn-secondary">
          My Dates
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                Schedule dates.
                <br />
                <span className="text-pink-500">Surprise your</span>
                <br />
                <span className="text-pink-500">soulmate.</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Make your long-distance love feel closer, one click at a time.
              </p>
            </div>
            
            <Link to="/plan" className="btn-primary inline-block">
              Start Now
            </Link>
          </div>

          {/* Right Side - Illustration */}
          <div className="relative">
            <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl p-8 shadow-2xl">
              <div className="flex justify-center items-center space-x-8">
                {/* Female Character */}
                <div className="text-center">
                  <div className="w-24 h-24 bg-pink-300 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse-soft">
                    <span className="text-4xl">👩🏻‍💻</span>
                  </div>
                  <div className="w-32 h-20 bg-purple-200 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">💖</span>
                  </div>
                </div>

                {/* Male Character */}
                <div className="text-center">
                  <div className="w-24 h-24 bg-purple-300 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse-soft">
                    <span className="text-4xl">👨🏻‍💻</span>
                  </div>
                  <div className="w-32 h-20 bg-purple-200 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">💖</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="card text-center">
            <div className="text-4xl mb-4">🎮</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Game Nights</h3>
            <p className="text-gray-600">Play together online and create memories</p>
          </div>
          
          <div className="card text-center">
            <div className="text-4xl mb-4">🎬</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Movie Dates</h3>
            <p className="text-gray-600">Watch movies together from anywhere</p>
          </div>
          
          <div className="card text-center">
            <div className="text-4xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Dinner Dates</h3>
            <p className="text-gray-600">Share meals across the distance</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;