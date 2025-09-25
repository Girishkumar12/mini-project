'use client';

interface UserTypeSelectionProps {
  onSelectType: (type: 'student' | 'faculty') => void;
}

export default function UserTypeSelection({ onSelectType }: UserTypeSelectionProps) {
  return (
    <section className="section">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Select Your Role</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <button
              onClick={() => onSelectType('student')}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-left border-2 border-transparent hover:border-blue-500"
            >
              <div className="text-6xl mb-4">👨‍🎓</div>
              <h3 className="text-2xl font-bold mb-4 text-blue-600">Student</h3>
              <p className="text-gray-600">
                Submit achievement forms and view responses. Track your curricular, 
                co-curricular, and extracurricular activities.
              </p>
            </button>
            
            <button
              onClick={() => onSelectType('faculty')}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-left border-2 border-transparent hover:border-blue-500"
            >
              <div className="text-6xl mb-4">👨‍🏫</div>
              <h3 className="text-2xl font-bold mb-4 text-blue-600">Faculty</h3>
              <p className="text-gray-600">
                Submit faculty activity forms including guest lectures, reviews, 
                and UGC projects. Manage your professional activities.
              </p>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}