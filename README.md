# GITAM Student Achievement Portal

A Next.js web application for GITAM students and faculty to submit and track achievements, activities, and generate reports. Migrated from a static HTML/JS application to a modern Next.js app with Firebase authentication and Firestore data persistence.

## Features

### Authentication
- Firebase Google OAuth integration with GITAM email domain validation
- Supports @gitam.in, @*.gitam.edu, @gitam.edu domains
- Profile photo and name display from Google account

### User Management
- **Students**: Roll number, year of study, branch selection
- **Faculty**: Employee ID, department, branch information
- Automatic user profile creation and validation

### Student Achievement Form
- Comprehensive achievement tracking (March 1 - May 31, 2025)
- Categories: Curricular, Co-curricular, Extracurricular activities
- Achievement levels: College, State, National, International
- Position tracking and event details
- Data stored in Firestore

### Faculty Activity Form
- Guest lectures submission
- Reviews and editorial member activities
- UGC project tracking
- Activity data stored in Firestore

### Response Management
- View personal submission history
- Browse other users' responses (filtered)
- Filter by branch, year, type
- Real-time data from Firestore

### Reporting
- Year-end report generation
- Statistics by branch, level, category
- Data aggregation and analysis

## Tech Stack

- **Frontend**: Next.js 15.5.4 with TypeScript
- **Styling**: Tailwind CSS with custom CSS for components
- **Authentication**: Firebase Auth with Google Sign-In
- **Database**: Firestore for real-time data persistence
- **Storage**: Firebase Storage (for future file uploads)

## Setup Instructions

### 1. Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Enable Authentication and set up Google Sign-In provider
4. Enable Firestore Database
5. Optionally enable Storage for file uploads
6. Get your Firebase configuration keys

### 2. Environment Configuration
1. Copy `.env.local.example` to `.env.local`
2. Fill in your Firebase configuration:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Local Development
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see above)
4. Run development server: `npm run dev`
5. Open in browser: `http://localhost:3000`

### 4. Deployment
- Build the project: `npm run build`
- Deploy to any static hosting service (Vercel, Netlify, etc.)
- Ensure Firebase configuration is properly set in production environment
- Update Firebase Auth authorized domains in Firebase Console

## Migration Changes

### What Changed
- **Framework**: Migrated from static HTML/JS to Next.js with TypeScript
- **Authentication**: Replaced Google OAuth gapi with Firebase Auth
- **Data Persistence**: Replaced localStorage with Firestore
- **Routing**: Implemented Next.js App Router for navigation
- **Components**: Converted HTML sections to React components
- **Styling**: Maintained original styling with Tailwind CSS integration

### What Stayed the Same
- **UI/UX**: Preserved original design and user experience
- **Functionality**: All original features maintained
- **Validation**: GITAM email domain validation preserved
- **Forms**: Same form structures and data models
- **User Flows**: Identical user journey and workflows

## File Structure
```
mini-project/
├── app/                    # Next.js App Router pages
│   ├── achievement-form/   # Student achievement form page
│   ├── faculty-form/       # Faculty activity form page
│   ├── responses/          # View responses page
│   ├── profile/            # User profile page
│   ├── layout.tsx          # Root layout with auth provider
│   ├── page.tsx            # Home page with navigation logic
│   └── globals.css         # Global styles
├── components/             # React components
│   ├── Header.tsx          # Navigation header
│   ├── LoginSection.tsx    # Login page component
│   ├── UserTypeSelection.tsx # Role selection component
│   ├── ProfileSetup.tsx    # Profile creation component
│   └── Dashboard.tsx       # Main dashboard component
├── contexts/               # React contexts
│   └── AuthContext.tsx     # Authentication state management
├── lib/                    # Utility libraries
│   └── firebase.ts         # Firebase configuration
├── types/                  # TypeScript type definitions
│   └── index.ts            # Application types
├── public/                 # Static assets
├── next.config.ts          # Next.js configuration
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## Firebase Collections

### profiles
- User profile information (student/faculty details)
- Document ID: userId

### achievements  
- Student achievement submissions
- Auto-generated document IDs

### faculty_activities
- Faculty activity submissions  
- Auto-generated document IDs

## Development Notes

- Firebase is initialized only on client-side to avoid SSR issues
- All Firebase operations include proper error handling
- TypeScript types ensure data consistency
- Responsive design maintained from original application
- Authentication state persists across browser sessions

## Support
For technical issues or feature requests, please contact the development team or create an issue in the repository.

## License
This project is developed for GITAM University internal use.