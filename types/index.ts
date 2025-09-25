export interface User {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  signedIn: boolean;
}

export interface UserProfile {
  userId: string;
  type: 'student' | 'faculty';
  rollNo?: string;
  yearOfStudy?: string;
  branch: string;
  employeeId?: string;
  department?: string;
  createdAt: string;
}

export interface Achievement {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhoto: string;
  type: 'achievement';
  submittedAt: string;
  userProfile: UserProfile;
  data: {
    eventName: string;
    category: string;
    level: string;
    position: string;
    eventDate: string;
    eventPlace: string;
    organizer: string;
    achievements: string;
    certificateFiles?: File[];
    photoFiles?: File[];
  };
}

export interface FacultyActivity {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhoto: string;
  type: 'faculty_activity';
  submittedAt: string;
  userProfile: UserProfile;
  data: {
    activityType: string;
    activityName: string;
    level: string;
    activityDate: string;
    venue: string;
    organizer: string;
    description: string;
    supportingDocuments?: File[];
  };
}

export type FormResponse = Achievement | FacultyActivity;

export const VALID_DOMAINS = ['gitam.in', 'gitam.edu'];
export const BRANCHES = ['CSE Core', 'AIML', 'CS', 'DS', 'IOT', 'CSBS'];
export const ACHIEVEMENT_CATEGORIES = [
  'Curricular Activities',
  'Co-curricular Activities', 
  'Extracurricular Activities',
  'Other'
];
export const ACHIEVEMENT_LEVELS = [
  'College Level',
  'State Level', 
  'National Level',
  'International Level'
];
export const FACULTY_ACTIVITY_TYPES = [
  'Guest Lecture',
  'Review',
  'Editorial Member',
  'UGC Project'
];
export const FACULTY_ACTIVITY_LEVELS = [
  'Department Level',
  'College Level',
  'State Level',
  'National Level', 
  'International Level'
];
export const POSITIONS = [
  '1st Place',
  '2nd Place',
  '3rd Place',
  'Participation',
  'Other'
];