'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import Image from 'next/image';

export default function LandingPage() {
  const { signInWithGoogle } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignIn = async () => {
    setIsSigningIn(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#007367] to-[#2c2c2c] text-white py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <div className="flex items-center mb-6">
                <Image 
                  src="/gitam-logo.png" 
                  alt="GITAM University Logo" 
                  width={80} 
                  height={80}
                  className="mr-4"
                />
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold mb-2">
                    GITAM Achievement Portal
                  </h1>
                  <p className="text-xl text-blue-200">
                    Empowering Excellence Through Recognition
                  </p>
                </div>
              </div>
              
              <p className="text-lg mb-8 leading-relaxed">
                A comprehensive platform for GITAM students and faculty to submit, 
                track, and celebrate academic achievements, activities, and milestones. 
                Join thousands of achievers in building your success story.
              </p>
              
              <div className="space-y-4">
                <button
                  onClick={handleSignIn}
                  disabled={isSigningIn}
                  className="bg-white text-[#007367] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  {isSigningIn ? (
                    <span className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#007367] mr-3"></div>
                      Signing in...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      🚀 Get Started with GITAM Email
                    </span>
                  )}
                </button>
                
                <p className="text-sm text-blue-200">
                  Valid domains: @gitam.in, @*.gitam.edu, @gitam.edu
                </p>
              </div>
            </div>
            
            <div className="lg:w-1/2 lg:pl-12">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6 text-center">Quick Access</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-3xl mb-2">🎓</div>
                    <div className="font-semibold">Students</div>
                    <div className="text-sm text-blue-200">Submit Achievements</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-3xl mb-2">👨‍🏫</div>
                    <div className="font-semibold">Faculty</div>
                    <div className="text-sm text-blue-200">Track Activities</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-3xl mb-2">📊</div>
                    <div className="font-semibold">Reports</div>
                    <div className="text-sm text-blue-200">Analytics & Insights</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-3xl mb-2">🏆</div>
                    <div className="font-semibold">Recognition</div>
                    <div className="text-sm text-blue-200">Celebrate Success</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#2c2c2c] mb-4">
              Why Choose GITAM Achievement Portal?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Streamline your academic journey with our comprehensive platform designed 
              specifically for the GITAM community.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#007367] rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl text-white">📝</span>
              </div>
              <h3 className="text-xl font-bold text-[#2c2c2c] mb-4 text-center">Easy Submission</h3>
              <p className="text-gray-600 text-center">
                Submit your achievements and activities with our intuitive form system. 
                Upload certificates and track your progress seamlessly.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#007367] rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl text-white">🔒</span>
              </div>
              <h3 className="text-xl font-bold text-[#2c2c2c] mb-4 text-center">Secure & Verified</h3>
              <p className="text-gray-600 text-center">
                Your data is protected with enterprise-grade security. Only verified 
                GITAM email accounts can access the platform.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#007367] rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl text-white">📈</span>
              </div>
              <h3 className="text-xl font-bold text-[#2c2c2c] mb-4 text-center">Real-time Analytics</h3>
              <p className="text-gray-600 text-center">
                Generate comprehensive reports and gain insights into achievements 
                across branches, years, and categories.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#007367] rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl text-white">👥</span>
              </div>
              <h3 className="text-xl font-bold text-[#2c2c2c] mb-4 text-center">Community Driven</h3>
              <p className="text-gray-600 text-center">
                Connect with fellow students and faculty. View and get inspired 
                by achievements from across the GITAM community.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#007367] rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl text-white">📱</span>
              </div>
              <h3 className="text-xl font-bold text-[#2c2c2c] mb-4 text-center">Mobile Responsive</h3>
              <p className="text-gray-600 text-center">
                Access your achievements anytime, anywhere. Our platform works 
                seamlessly across all devices and screen sizes.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#007367] rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl text-white">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-[#2c2c2c] mb-4 text-center">Goal Tracking</h3>
              <p className="text-gray-600 text-center">
                Set and track your academic goals. Monitor your progress and 
                celebrate milestones along your educational journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#007367] text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Achievements by Numbers</h2>
            <p className="text-xl text-blue-200">
              Join thousands of successful GITAM students and faculty
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">1000+</div>
              <div className="text-blue-200">Active Students</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-blue-200">Faculty Members</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">5000+</div>
              <div className="text-blue-200">Achievements Tracked</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">50+</div>
              <div className="text-blue-200">Achievement Categories</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-[#2c2c2c] mb-6">
            Ready to Showcase Your Achievements?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join the GITAM Achievement Portal today and start building your digital 
            portfolio of success. Your achievements deserve recognition.
          </p>
          
          <button
            onClick={handleSignIn}
            disabled={isSigningIn}
            className="bg-[#007367] text-white px-12 py-4 rounded-lg font-semibold text-lg hover:bg-[#005a52] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {isSigningIn ? (
              <span className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Signing in...
              </span>
            ) : (
              'Start Your Journey Today'
            )}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2c2c2c] text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-6 md:mb-0">
              <Image 
                src="/gitam-logo.png" 
                alt="GITAM University Logo" 
                width={40} 
                height={40}
                className="mr-3"
              />
              <div>
                <div className="font-bold text-lg">GITAM Achievement Portal</div>
                <div className="text-gray-400 text-sm">Empowering Excellence</div>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <div className="text-gray-400 text-sm">
                © 2024 GITAM University. All rights reserved.
              </div>
              <div className="text-gray-400 text-sm mt-1">
                Designed for the GITAM Community
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}