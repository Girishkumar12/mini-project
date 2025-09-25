// Configuration file for GITAM Achievement Portal

const CONFIG = {
    // Google OAuth Configuration
    GOOGLE_CLIENT_ID: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
    
    // Valid GITAM email domains
    VALID_DOMAINS: [
        'gitam.in',
        'gitam.edu'
    ],
    
    // Form date range for achievements
    ACHIEVEMENT_DATE_RANGE: {
        START: '2025-03-01',
        END: '2025-05-31'
    },
    
    // File upload limits
    FILE_LIMITS: {
        CERTIFICATE: {
            MAX_FILES: 5,
            MAX_SIZE_MB: 100,
            ALLOWED_TYPES: ['.pdf', '.jpg', '.jpeg', '.png']
        },
        PHOTOS: {
            MAX_FILES: 10,
            MAX_SIZE_MB: 10,
            ALLOWED_TYPES: ['.jpg', '.jpeg', '.png']
        },
        FACULTY_DOCUMENTS: {
            MAX_FILES: 5,
            MAX_SIZE_MB: 50,
            ALLOWED_TYPES: ['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx']
        }
    },
    
    // Available branches
    BRANCHES: [
        'CSE Core',
        'AIML',
        'CS',
        'DS',
        'IOT',
        'CSBS'
    ],
    
    // Achievement categories
    ACHIEVEMENT_CATEGORIES: [
        'Curricular Activities',
        'Co-curricular Activities',
        'Extracurricular Activities',
        'Other'
    ],
    
    // Achievement levels
    ACHIEVEMENT_LEVELS: [
        'College Level',
        'State Level',
        'National Level',
        'International Level'
    ],
    
    // Faculty activity types
    FACULTY_ACTIVITY_TYPES: [
        'Guest Lecture',
        'Review',
        'Editorial Member',
        'UGC Project'
    ],
    
    // Faculty activity levels
    FACULTY_ACTIVITY_LEVELS: [
        'Department Level',
        'College Level',
        'State Level',
        'National Level',
        'International Level'
    ],
    
    // Position options
    POSITIONS: [
        '1st Place',
        '2nd Place',
        '3rd Place',
        'Participation',
        'Other'
    ],
    
    // Application settings
    APP_SETTINGS: {
        AUTO_SAVE_INTERVAL: 30000, // 30 seconds
        MAX_RESPONSES_PER_PAGE: 20,
        ENABLE_NOTIFICATIONS: true,
        DEBUG_MODE: false
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}