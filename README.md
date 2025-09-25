# GITAM Student Achievement Portal

A web-based form application for GITAM students and faculty to submit and track achievements, activities, and generate reports.

## Features

### Authentication
- Google OAuth integration with GITAM email domain validation
- Supports @gitam.in, @*.gitam.edu, @gitam.edu domains
- Profile photo and name display from Google account

### User Management
- **Students**: Roll number, year of study, branch selection
- **Faculty**: Employee ID, department, branch information
- Automatic user profile creation and validation

### Student Achievement Form
- Comprehensive achievement tracking (March 1 - May 31, 2025)
- Categories: Curricular, Co-curricular, Extracurricular activities
- File uploads for certificates and event photos
- Achievement levels: College, State, National, International
- Position tracking and event details

### Faculty Activity Form
- Guest lectures submission
- Reviews and editorial member activities
- UGC project tracking
- Supporting document uploads

### Response Management
- View personal submission history
- Browse other users' responses (filtered)
- Filter by branch, year, type
- Real-time response updates

### Reporting
- Year-end report generation
- Statistics by branch, level, category
- Printable HTML reports
- Data aggregation and analysis

## Setup Instructions

### 1. Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add your domain to authorized origins
6. Replace `YOUR_GOOGLE_CLIENT_ID` in both `index.html` and `script.js` with your actual client ID

### 2. Domain Configuration
The application validates the following GITAM email domains:
- @gitam.in
- @*.gitam.edu (subdomains)
- @gitam.edu

### 3. File Structure
```
mini-project/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
└── README.md           # This file
```

### 4. Local Development
1. Clone the repository
2. Update Google OAuth client ID
3. Serve files using a local web server:
   - Python: `python -m http.server 8000`
   - Node.js: `npx serve`
   - PHP: `php -S localhost:8000`
4. Open in browser: `http://localhost:8000`

### 5. Deployment
- Deploy to any static web hosting service
- Ensure HTTPS is enabled for Google OAuth
- Update authorized origins in Google Cloud Console

## Usage

### For Students
1. Sign in with GITAM email
2. Complete profile setup (roll number, year, branch)
3. Submit achievement forms
4. View and filter other students' achievements
5. Generate reports

### For Faculty
1. Sign in with GITAM email
2. Complete profile setup (employee ID, department, branch)
3. Submit activity forms (lectures, reviews, projects)
4. View submissions and generate reports

## Data Storage
- Uses browser localStorage for data persistence
- No server-side database required
- Data remains on local device
- Export functionality for backup

## Browser Support
- Modern browsers with localStorage support
- Google OAuth compatible browsers
- File upload API support required

## Security Features
- Domain-based email validation
- Client-side data storage
- No sensitive data transmission
- Google OAuth security layer

## Future Enhancements
- Server-side database integration
- Advanced reporting features
- Email notifications
- Mobile application
- Bulk data import/export

## Technical Requirements
- HTML5 compatible browser
- JavaScript enabled
- Google APIs access
- Local storage support

## Support
For technical issues or feature requests, please contact the development team or create an issue in the repository.

## License
This project is developed for GITAM University internal use.