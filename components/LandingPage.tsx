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
      <section className="bg-gradient-to-br from-[#007367] via-[#008A7B] to-[#2c2c2c] text-white py-20 relative overflow-hidden">
        {/* Background Animation Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-blue-200 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-green-200 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-40 right-1/3 w-8 h-8 bg-white rounded-full animate-bounce" style={{animationDelay: '3s'}}></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-12 lg:mb-0 animate-fade-in-up">
              <div className="flex items-center mb-6">
                <div className="relative">
                  <Image 
                    src="/gitam-logo.png" 
                    alt="GITAM University Logo" 
                    width={80} 
                    height={80}
                    className="mr-4 drop-shadow-lg hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute -inset-2 bg-white/20 rounded-full blur-lg opacity-50"></div>
                </div>
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                    GITAM Achievement Portal
                  </h1>
                  <p className="text-xl text-blue-200 font-medium">
                    ✨ Empowering Excellence Through Recognition
                  </p>
                </div>
              </div>
              
              <p className="text-lg mb-8 leading-relaxed text-blue-50">
                🚀 A comprehensive platform for GITAM students and faculty to submit, 
                track, and celebrate academic achievements, activities, and milestones. 
                <span className="font-semibold text-white">Join thousands of achievers</span> in building your success story.
              </p>
              
              <div className="space-y-6">
                <button
                  onClick={handleSignIn}
                  disabled={isSigningIn}
                  className="group bg-white text-[#007367] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  {isSigningIn ? (
                    <span className="flex items-center justify-center relative z-10">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#007367] mr-3"></div>
                      🔄 Signing in...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center relative z-10">
                      🚀 Get Started with GITAM Email
                    </span>
                  )}
                </button>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <p className="text-sm text-blue-100 text-center flex items-center justify-center">
                    <span className="mr-2">🔐</span>
                    <span>Secure access with domains: @gitam.in, @*.gitam.edu, @gitam.edu</span>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 lg:pl-12 animate-fade-in-right">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:bg-white/15">
                <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  🎯 Quick Access Portal
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 cursor-pointer group">
                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">🎓</div>
                    <div className="font-semibold text-white">Students</div>
                    <div className="text-sm text-blue-200">Submit Achievements</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 cursor-pointer group">
                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">👨‍🏫</div>
                    <div className="font-semibold text-white">Faculty</div>
                    <div className="text-sm text-blue-200">Track Activities</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 cursor-pointer group">
                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">📊</div>
                    <div className="font-semibold text-white">Reports</div>
                    <div className="text-sm text-blue-200">Analytics & Insights</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 cursor-pointer group">
                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">🏆</div>
                    <div className="font-semibold text-white">Recognition</div>
                    <div className="text-sm text-blue-200">Celebrate Success</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#007367] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#2c2c2c] mb-6 bg-gradient-to-r from-[#007367] to-[#2c2c2c] bg-clip-text text-transparent">
              🌟 Why Choose GITAM Achievement Portal?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Streamline your academic journey with our comprehensive platform designed 
              specifically for the <span className="font-semibold text-[#007367]">GITAM community</span>. 
              Experience excellence at every step.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 border border-gray-100 hover:border-[#007367]/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#007367]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-16 h-16 bg-gradient-to-br from-[#007367] to-[#008A7B] rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 relative z-10">
                <span className="text-2xl text-white">📝</span>
              </div>
              <h3 className="text-xl font-bold text-[#2c2c2c] mb-4 text-center group-hover:text-[#007367] transition-colors duration-300 relative z-10">✨ Easy Submission</h3>
              <p className="text-gray-600 text-center leading-relaxed relative z-10">
                Submit your achievements and activities with our <span className="font-semibold">intuitive form system</span>. 
                Upload certificates and track your progress seamlessly with real-time updates.
              </p>
            </div>
            
            <div className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 border border-gray-100 hover:border-[#007367]/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#007367]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-16 h-16 bg-gradient-to-br from-[#007367] to-[#008A7B] rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 relative z-10">
                <span className="text-2xl text-white">🔒</span>
              </div>
              <h3 className="text-xl font-bold text-[#2c2c2c] mb-4 text-center group-hover:text-[#007367] transition-colors duration-300 relative z-10">🛡️ Secure & Verified</h3>
              <p className="text-gray-600 text-center leading-relaxed relative z-10">
                Your data is protected with <span className="font-semibold">enterprise-grade security</span>. Only verified 
                GITAM email accounts can access the platform with complete privacy assurance.
              </p>
            </div>
            
            <div className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 border border-gray-100 hover:border-[#007367]/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#007367]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-16 h-16 bg-gradient-to-br from-[#007367] to-[#008A7B] rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 relative z-10">
                <span className="text-2xl text-white">📈</span>
              </div>
              <h3 className="text-xl font-bold text-[#2c2c2c] mb-4 text-center group-hover:text-[#007367] transition-colors duration-300 relative z-10">📊 Real-time Analytics</h3>
              <p className="text-gray-600 text-center leading-relaxed relative z-10">
                Generate <span className="font-semibold">comprehensive reports</span> and gain insights into achievements 
                across branches, years, and categories with dynamic visualizations.
              </p>
            </div>
            
            <div className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 border border-gray-100 hover:border-[#007367]/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#007367]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-16 h-16 bg-gradient-to-br from-[#007367] to-[#008A7B] rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 relative z-10">
                <span className="text-2xl text-white">👥</span>
              </div>
              <h3 className="text-xl font-bold text-[#2c2c2c] mb-4 text-center group-hover:text-[#007367] transition-colors duration-300 relative z-10">🤝 Community Driven</h3>
              <p className="text-gray-600 text-center leading-relaxed relative z-10">
                Connect with fellow students and faculty. <span className="font-semibold">View and get inspired</span> 
                by achievements from across the vibrant GITAM community.
              </p>
            </div>
            
            <div className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 border border-gray-100 hover:border-[#007367]/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#007367]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-16 h-16 bg-gradient-to-br from-[#007367] to-[#008A7B] rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 relative z-10">
                <span className="text-2xl text-white">📱</span>
              </div>
              <h3 className="text-xl font-bold text-[#2c2c2c] mb-4 text-center group-hover:text-[#007367] transition-colors duration-300 relative z-10">📲 Mobile Responsive</h3>
              <p className="text-gray-600 text-center leading-relaxed relative z-10">
                Access your achievements <span className="font-semibold">anytime, anywhere</span>. Our platform works 
                seamlessly across all devices and screen sizes for optimal experience.
              </p>
            </div>
            
            <div className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 border border-gray-100 hover:border-[#007367]/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#007367]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-16 h-16 bg-gradient-to-br from-[#007367] to-[#008A7B] rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 relative z-10">
                <span className="text-2xl text-white">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-[#2c2c2c] mb-4 text-center group-hover:text-[#007367] transition-colors duration-300 relative z-10">🚀 Goal Tracking</h3>
              <p className="text-gray-600 text-center leading-relaxed relative z-10">
                Set and track your <span className="font-semibold">academic goals</span>. Monitor your progress and 
                celebrate milestones along your transformative educational journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */} 
      <section className="py-20 bg-gradient-to-br from-[#007367] via-[#008A7B] to-[#006B60] text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              📊 Achievements by Numbers
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed">
              🎉 Join thousands of successful GITAM students and faculty members who are 
              already building their digital legacy of excellence
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="group transform hover:scale-110 transition-all duration-300 cursor-pointer">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300">
                <div className="text-5xl lg:text-6xl font-bold mb-3 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">1000+</div>
                <div className="text-blue-100 text-lg font-medium">🎓 Active Students</div>
                <div className="text-xs text-blue-200 mt-2">Growing every day</div>
              </div>
            </div>
            <div className="group transform hover:scale-110 transition-all duration-300 cursor-pointer">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300">
                <div className="text-5xl lg:text-6xl font-bold mb-3 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">500+</div>
                <div className="text-blue-100 text-lg font-medium">👨‍🏫 Faculty Members</div>
                <div className="text-xs text-blue-200 mt-2">Expert mentors</div>
              </div>
            </div>
            <div className="group transform hover:scale-110 transition-all duration-300 cursor-pointer">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300">
                <div className="text-5xl lg:text-6xl font-bold mb-3 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">5000+</div>
                <div className="text-blue-100 text-lg font-medium">🏆 Achievements Tracked</div>
                <div className="text-xs text-blue-200 mt-2">And counting</div>
              </div>
            </div>
            <div className="group transform hover:scale-110 transition-all duration-300 cursor-pointer">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300">
                <div className="text-5xl lg:text-6xl font-bold mb-3 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">50+</div>
                <div className="text-blue-100 text-lg font-medium">📋 Achievement Categories</div>
                <div className="text-xs text-blue-200 mt-2">Comprehensive coverage</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-1/4 w-40 h-40 bg-[#007367] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-1/4 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#2c2c2c] mb-6 bg-gradient-to-r from-[#007367] to-[#2c2c2c] bg-clip-text text-transparent">
              🚀 Ready to Showcase Your Achievements?
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join the <span className="font-bold text-[#007367]">GITAM Achievement Portal</span> today and start building your digital 
              portfolio of success. Your achievements deserve recognition and our platform provides 
              the perfect stage to shine! ✨
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleSignIn}
                disabled={isSigningIn}
                className="group bg-gradient-to-r from-[#007367] to-[#008A7B] text-white px-12 py-4 rounded-xl font-bold text-lg hover:from-[#005a52] hover:to-[#006B60] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                {isSigningIn ? (
                  <span className="flex items-center justify-center relative z-10">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    🔄 Signing in...
                  </span>
                ) : (
                  <span className="flex items-center justify-center relative z-10">
                    🌟 Start Your Journey Today
                  </span>
                )}
              </button>
              
              <div className="flex items-center text-gray-600">
                <span className="mr-2">⚡</span>
                <span className="text-sm">Free forever • No setup required</span>
              </div>
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center">
                <span className="mr-1">✅</span>
                <span>Instant setup</span>
              </div>
              <div className="flex items-center">
                <span className="mr-1">🔐</span>
                <span>Secure authentication</span>
              </div>
              <div className="flex items-center">
                <span className="mr-1">🎯</span>
                <span>Goal tracking</span>
              </div>
              <div className="flex items-center">
                <span className="mr-1">📊</span>
                <span>Real-time analytics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-[#2c2c2c] to-[#1a1a1a] text-white py-16 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Logo and Description */}
            <div className="md:col-span-1">
              <div className="flex items-center mb-6">
                <div className="relative">
                  <Image 
                    src="/gitam-logo.png" 
                    alt="GITAM University Logo" 
                    width={50} 
                    height={50}
                    className="mr-4 drop-shadow-lg hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute -inset-2 bg-[#007367]/20 rounded-full blur-lg opacity-50"></div>
                </div>
                <div>
                  <div className="font-bold text-xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    GITAM Achievement Portal
                  </div>
                  <div className="text-gray-400 text-sm font-medium">
                    ✨ Empowering Excellence
                  </div>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Building the future of academic recognition through innovative technology 
                and community-driven excellence at GITAM University.
              </p>
            </div>
            
            {/* Quick Links */}
            <div className="md:col-span-1">
              <h3 className="font-bold text-lg mb-4 text-white">🔗 Quick Links</h3>
              <div className="space-y-2">
                <div className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer text-sm">📋 Student Forms</div>
                <div className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer text-sm">👨‍🏫 Faculty Portal</div>
                <div className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer text-sm">📊 Analytics</div>
                <div className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer text-sm">🏆 Achievements</div>
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="md:col-span-1">
              <h3 className="font-bold text-lg mb-4 text-white">📞 Support</h3>
              <div className="space-y-2 text-sm">
                <div className="text-gray-300">📧 support@gitam.edu</div>
                <div className="text-gray-300">🌐 www.gitam.edu</div>
                <div className="text-gray-300">📍 GITAM University</div>
                <div className="text-gray-300">🎓 Educational Excellence</div>
              </div>
            </div>
          </div>
          
          {/* Divider */}
          <div className="border-t border-gray-600 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <div className="text-gray-400 text-sm">
                  © 2024 GITAM University. All rights reserved.
                </div>
                <div className="text-gray-500 text-xs mt-1">
                  🏛️ Designed with ❤️ for the GITAM Community
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="text-gray-400 text-xs hover:text-white transition-colors duration-300 cursor-pointer">Privacy Policy</div>
                <div className="text-gray-400 text-xs hover:text-white transition-colors duration-300 cursor-pointer">Terms of Service</div>
                <div className="text-gray-400 text-xs hover:text-white transition-colors duration-300 cursor-pointer">Help Center</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}