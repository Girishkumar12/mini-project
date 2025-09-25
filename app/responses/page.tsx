'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { FormResponse, BRANCHES } from '@/types';
import Header from '@/components/Header';
import Image from 'next/image';

export default function Responses() {
  const { user, userProfile } = useAuth();
  const [responses, setResponses] = useState<FormResponse[]>([]);
  const [filteredResponses, setFilteredResponses] = useState<FormResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: '',
    branch: ''
  });

  useEffect(() => {
    const fetchResponses = async () => {
      if (typeof window === 'undefined' || !db) {
        setLoading(false);
        return;
      }

      try {
        const achievementsQuery = query(
          collection(db, 'achievements'),
          orderBy('submittedAt', 'desc')
        );
        const activitiesQuery = query(
          collection(db, 'faculty_activities'),
          orderBy('submittedAt', 'desc')
        );

        const [achievementsSnapshot, activitiesSnapshot] = await Promise.all([
          getDocs(achievementsQuery),
          getDocs(activitiesQuery)
        ]);

        const allResponses: FormResponse[] = [
          ...achievementsSnapshot.docs.map(doc => ({ 
            id: doc.id, 
            ...doc.data() 
          } as FormResponse)),
          ...activitiesSnapshot.docs.map(doc => ({ 
            id: doc.id, 
            ...doc.data() 
          } as FormResponse))
        ];

        // Sort by submission date
        allResponses.sort((a, b) => 
          new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
        );

        setResponses(allResponses);
        setFilteredResponses(allResponses);
      } catch (error) {
        console.error('Error fetching responses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, []);

  useEffect(() => {
    let filtered = responses;

    if (filters.type) {
      filtered = filtered.filter(response => response.type === filters.type);
    }

    if (filters.branch) {
      filtered = filtered.filter(response => 
        response.userProfile.branch === filters.branch
      );
    }

    setFilteredResponses(filtered);
  }, [filters, responses]);

  if (!user || !userProfile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container py-8">
          <div className="text-center">
            <p>Please complete your profile to view responses.</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Loading responses...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container py-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Form Responses</h2>
          
          {/* Filters */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h3 className="text-xl font-bold mb-4">Filter Responses</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="form-group">
                <label htmlFor="typeFilter">Type</label>
                <select
                  id="typeFilter"
                  value={filters.type}
                  onChange={(e) => setFilters({...filters, type: e.target.value})}
                >
                  <option value="">All Types</option>
                  <option value="achievement">Student Achievements</option>
                  <option value="faculty_activity">Faculty Activities</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="branchFilter">Branch</label>
                <select
                  id="branchFilter"
                  value={filters.branch}
                  onChange={(e) => setFilters({...filters, branch: e.target.value})}
                >
                  <option value="">All Branches</option>
                  {BRANCHES.map(branch => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Results */}
          <div className="mb-4">
            <p className="text-gray-600">
              Showing {filteredResponses.length} of {responses.length} responses
            </p>
          </div>
          
          {filteredResponses.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <p className="text-gray-500">No responses found matching your filters.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredResponses.map((response) => (
                <div key={response.id} className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex items-start gap-4">
                    <Image
                      src={response.userPhoto}
                      alt={response.userName}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold text-lg">{response.userName}</h4>
                          <p className="text-sm text-gray-600">
                            {response.userProfile.branch} • 
                            {response.type === 'achievement' ? ' Student' : ' Faculty'} • 
                            {new Date(response.submittedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          response.type === 'achievement' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {response.type === 'achievement' ? 'Achievement' : 'Faculty Activity'}
                        </span>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        {response.type === 'achievement' ? (
                          <div>
                            <h5 className="font-semibold mb-2">{response.data.eventName}</h5>
                            <div className="grid md:grid-cols-2 gap-2 text-sm">
                              <p><strong>Category:</strong> {response.data.category}</p>
                              <p><strong>Level:</strong> {response.data.level}</p>
                              <p><strong>Position:</strong> {response.data.position}</p>
                              <p><strong>Date:</strong> {response.data.eventDate}</p>
                              <p><strong>Place:</strong> {response.data.eventPlace}</p>
                              <p><strong>Organizer:</strong> {response.data.organizer}</p>
                            </div>
                            {response.data.achievements && (
                              <div className="mt-2">
                                <strong>Description:</strong>
                                <p className="text-sm mt-1">{response.data.achievements}</p>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div>
                            <h5 className="font-semibold mb-2">{response.data.activityName}</h5>
                            <div className="grid md:grid-cols-2 gap-2 text-sm">
                              <p><strong>Type:</strong> {response.data.activityType}</p>
                              <p><strong>Level:</strong> {response.data.level}</p>
                              <p><strong>Date:</strong> {response.data.activityDate}</p>
                              <p><strong>Venue:</strong> {response.data.venue}</p>
                              <p><strong>Organizer:</strong> {response.data.organizer}</p>
                            </div>
                            {response.data.description && (
                              <div className="mt-2">
                                <strong>Description:</strong>
                                <p className="text-sm mt-1">{response.data.description}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}