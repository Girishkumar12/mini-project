'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Achievement, ACHIEVEMENT_CATEGORIES, ACHIEVEMENT_LEVELS, POSITIONS } from '@/types';
import Header from '@/components/Header';

export default function AchievementForm() {
  const { user, userProfile } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    eventName: '',
    category: '',
    level: '',
    position: '',
    eventDate: '',
    eventPlace: '',
    organizer: '',
    achievements: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !userProfile || typeof window === 'undefined' || !db) return;

    setIsSubmitting(true);
    try {
      const achievement: Omit<Achievement, 'id'> = {
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        userPhoto: user.imageUrl,
        type: 'achievement',
        submittedAt: new Date().toISOString(),
        userProfile,
        data: formData
      };

      await addDoc(collection(db, 'achievements'), achievement);
      alert('Achievement submitted successfully!');
      router.push('/');
    } catch (error) {
      console.error('Error submitting achievement:', error);
      alert('Error submitting achievement. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user || !userProfile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container py-8">
          <div className="text-center">
            <p>Please complete your profile to access forms.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container py-8">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Student Achievement Form</h2>
          <p className="text-gray-600 mb-6">Submit your achievements for March-May 2025</p>
          
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="form-group">
                <label htmlFor="eventName">Event Name *</label>
                <input
                  type="text"
                  id="eventName"
                  value={formData.eventName}
                  onChange={(e) => setFormData({...formData, eventName: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  required
                >
                  <option value="">Select Category</option>
                  {ACHIEVEMENT_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="level">Level *</label>
                <select
                  id="level"
                  value={formData.level}
                  onChange={(e) => setFormData({...formData, level: e.target.value})}
                  required
                >
                  <option value="">Select Level</option>
                  {ACHIEVEMENT_LEVELS.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="position">Position *</label>
                <select
                  id="position"
                  value={formData.position}
                  onChange={(e) => setFormData({...formData, position: e.target.value})}
                  required
                >
                  <option value="">Select Position</option>
                  {POSITIONS.map(pos => (
                    <option key={pos} value={pos}>{pos}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="eventDate">Event Date *</label>
                <input
                  type="date"
                  id="eventDate"
                  value={formData.eventDate}
                  onChange={(e) => setFormData({...formData, eventDate: e.target.value})}
                  min="2025-03-01"
                  max="2025-05-31"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="eventPlace">Event Place *</label>
                <input
                  type="text"
                  id="eventPlace"
                  value={formData.eventPlace}
                  onChange={(e) => setFormData({...formData, eventPlace: e.target.value})}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="organizer">Organizer *</label>
              <input
                type="text"
                id="organizer"
                value={formData.organizer}
                onChange={(e) => setFormData({...formData, organizer: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="achievements">Achievement Description *</label>
              <textarea
                id="achievements"
                value={formData.achievements}
                onChange={(e) => setFormData({...formData, achievements: e.target.value})}
                placeholder="Describe your achievement in detail..."
                required
              />
            </div>
            
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary text-lg px-8 py-3 mr-4"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </span>
                ) : (
                  'Submit Achievement'
                )}
              </button>
              <button
                type="button"
                onClick={() => router.push('/')}
                className="btn btn-secondary text-lg px-8 py-3"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}