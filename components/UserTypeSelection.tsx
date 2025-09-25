'use client';

interface UserTypeSelectionProps {
  onSelectType: (type: 'student' | 'faculty') => void;
}

export default function UserTypeSelection({ onSelectType }: UserTypeSelectionProps) {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50/30 flex items-center justify-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-[#007367] rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-green-400 rounded-full blur-2xl animate-bounce" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Header Section */}
          <div className="mb-16 animate-fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-[#007367] to-[#2c2c2c] bg-clip-text text-transparent">
              🎯 Choose Your Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Welcome to GITAM Achievement Portal! Select your role to get started with a 
              <span className="font-semibold text-[#007367]"> personalized experience</span> tailored just for you.
            </p>
            
            {/* Progress indicator */}
            <div className="flex items-center justify-center mt-8 space-x-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-[#007367] rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                <div className="ml-2 text-sm text-gray-600">Choose Role</div>
              </div>
              <div className="w-8 h-0.5 bg-gray-300"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-sm font-bold">2</div>
                <div className="ml-2 text-sm text-gray-500">Setup Profile</div>
              </div>
              <div className="w-8 h-0.5 bg-gray-300"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-sm font-bold">3</div>
                <div className="ml-2 text-sm text-gray-500">Start Journey</div>
              </div>
            </div>
          </div>
          
          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <button
              onClick={() => onSelectType('student')}
              className="group bg-white p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 text-left border-2 border-transparent hover:border-[#007367]/30 transform hover:-translate-y-3 hover:scale-105 relative overflow-hidden"
            >
              {/* Background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="text-7xl mb-6 group-hover:scale-110 transition-transform duration-300">👨‍🎓</div>
                <h3 className="text-3xl font-bold mb-4 text-[#007367] group-hover:text-blue-600 transition-colors duration-300">
                  🎓 Student Portal
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Submit and track your <span className="font-semibold">academic achievements</span>, 
                  curricular activities, and extracurricular accomplishments. Build your digital portfolio of success.
                </p>
                
                <div className="space-y-3 text-left">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">✅</span>
                    <span>Achievement form submissions</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">📊</span>
                    <span>Progress tracking & analytics</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">🏆</span>
                    <span>Certificate uploads & verification</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">📈</span>
                    <span>Personal achievement reports</span>
                  </div>
                </div>
                
                <div className="mt-8 flex items-center justify-center">
                  <span className="text-[#007367] font-semibold group-hover:scale-110 transition-transform duration-300">
                    Continue as Student →
                  </span>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => onSelectType('faculty')}
              className="group bg-white p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 text-left border-2 border-transparent hover:border-[#007367]/30 transform hover:-translate-y-3 hover:scale-105 relative overflow-hidden"
            >
              {/* Background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="text-7xl mb-6 group-hover:scale-110 transition-transform duration-300">👨‍🏫</div>
                <h3 className="text-3xl font-bold mb-4 text-[#007367] group-hover:text-green-600 transition-colors duration-300">
                  🏛️ Faculty Portal
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Manage your <span className="font-semibold">professional activities</span>, 
                  submit faculty forms, and track your academic contributions. Showcase your expertise.
                </p>
                
                <div className="space-y-3 text-left">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">📝</span>
                    <span>Guest lectures & seminars</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">📚</span>
                    <span>Research & UGC projects</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">✏️</span>
                    <span>Reviews & editorial activities</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">📈</span>
                    <span>Professional activity reports</span>
                  </div>
                </div>
                
                <div className="mt-8 flex items-center justify-center">
                  <span className="text-[#007367] font-semibold group-hover:scale-110 transition-transform duration-300">
                    Continue as Faculty →
                  </span>
                </div>
              </div>
            </button>
          </div>
          
          {/* Additional Info */}
          <div className="mt-16 p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50">
            <p className="text-sm text-gray-600 flex items-center justify-center">
              <span className="mr-2">💡</span>
              <span>Don't worry! You can always access other features later from your dashboard.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}