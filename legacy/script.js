// Global variables
let currentUser = null;
let userProfile = null;
let isSignedIn = false;

// Valid email domains for GITAM
const validDomains = ['gitam.in', 'gitam.edu'];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadStoredUser();
    setupEventListeners();
});

// Initialize Google Sign-In
function initializeApp() {
    // Check if we're in demo mode first
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
        // Skip Google API initialization in demo mode
        return;
    }
    
    // Only initialize Google API if not in demo mode and gapi is available
    if (typeof gapi !== 'undefined') {
        gapi.load('auth2', function() {
            gapi.auth2.init({
                client_id: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com'
            });
        });
    } else {
        // Add demo login button if Google API is not available
        addDemoLoginButton();
    }
}

// Add demo login button for testing
function addDemoLoginButton() {
    const loginSection = document.querySelector('#loginSection .login-box');
    if (loginSection) {
        const demoBtn = document.createElement('button');
        demoBtn.className = 'btn btn-primary';
        demoBtn.textContent = 'Demo Login (Student)';
        demoBtn.style.margin = '10px 5px';
        demoBtn.onclick = () => demoLogin('student');
        
        const demoFacultyBtn = document.createElement('button');
        demoFacultyBtn.className = 'btn btn-secondary';
        demoFacultyBtn.textContent = 'Demo Login (Faculty)';
        demoFacultyBtn.style.margin = '10px 5px';
        demoFacultyBtn.onclick = () => demoLogin('faculty');
        
        loginSection.appendChild(document.createElement('br'));
        loginSection.appendChild(demoBtn);
        loginSection.appendChild(demoFacultyBtn);
    }
}

// Demo login function
function demoLogin(type) {
    const mockUser = {
        id: `demo_${type}_${Date.now()}`,
        name: type === 'student' ? 'Demo Student' : 'Demo Faculty',
        email: type === 'student' ? 'demo.student@gitam.in' : 'demo.faculty@gitam.in',
        imageUrl: 'https://via.placeholder.com/150',
        signedIn: true
    };
    
    localStorage.setItem('currentUser', JSON.stringify(mockUser));
    currentUser = mockUser;
    isSignedIn = true;
    
    if (type === 'student') {
        showUserTypeSelection();
    } else {
        showUserTypeSelection();
    }
    
    updateUI();
}

// Load stored user data
function loadStoredUser() {
    const storedUser = localStorage.getItem('currentUser');
    const storedProfile = localStorage.getItem('userProfile');
    
    if (storedUser && storedProfile) {
        currentUser = JSON.parse(storedUser);
        userProfile = JSON.parse(storedProfile);
        isSignedIn = true;
        showDashboard();
    }
}

// Google Sign-In callback
function onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    const email = profile.getEmail();
    
    // Validate email domain
    if (!isValidGitamEmail(email)) {
        showAlert('Please use a valid GITAM email address (@gitam.in, @*.gitam.edu, @gitam.edu)', 'error');
        googleUser.disconnect();
        return;
    }
    
    // Store user information
    currentUser = {
        id: profile.getId(),
        name: profile.getName(),
        email: email,
        imageUrl: profile.getImageUrl(),
        signedIn: true
    };
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    isSignedIn = true;
    
    // Check if user profile exists
    const existingProfile = localStorage.getItem(`profile_${currentUser.id}`);
    if (existingProfile) {
        userProfile = JSON.parse(existingProfile);
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
        showDashboard();
    } else {
        showUserTypeSelection();
    }
    
    updateUI();
}

// Validate GITAM email
function isValidGitamEmail(email) {
    const emailLower = email.toLowerCase();
    return validDomains.some(domain => 
        emailLower.endsWith(`@${domain}`) || 
        emailLower.includes(`.${domain}`)
    );
}

// Sign out
function signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        currentUser = null;
        userProfile = null;
        isSignedIn = false;
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userProfile');
        showLoginSection();
        updateUI();
    });
}

// Update UI elements
function updateUI() {
    const userInfo = document.getElementById('userInfo');
    const userName = document.getElementById('userName');
    const userPhoto = document.getElementById('userPhoto');
    
    if (isSignedIn && currentUser) {
        userInfo.style.display = 'flex';
        userName.textContent = currentUser.name;
        userPhoto.src = currentUser.imageUrl;
    } else {
        userInfo.style.display = 'none';
    }
}

// Show different sections
function showLoginSection() {
    hideAllSections();
    document.getElementById('loginSection').style.display = 'block';
}

function showUserTypeSelection() {
    hideAllSections();
    document.getElementById('userTypeSection').style.display = 'block';
    updateUI();
}

function showProfileSetup(userType) {
    hideAllSections();
    document.getElementById('profileSetupSection').style.display = 'block';
    
    if (userType === 'student') {
        document.getElementById('studentFields').style.display = 'block';
        document.getElementById('facultyFields').style.display = 'none';
    } else {
        document.getElementById('studentFields').style.display = 'none';
        document.getElementById('facultyFields').style.display = 'block';
    }
}

function showDashboard() {
    hideAllSections();
    document.getElementById('dashboardSection').style.display = 'block';
    updateUI();
    
    // Customize dashboard based on user type
    if (userProfile && userProfile.type === 'faculty') {
        document.getElementById('newFormCard').querySelector('p').textContent = 'Submit guest lectures, reviews, and projects';
    }
}

function showAchievementForm() {
    hideAllSections();
    document.getElementById('achievementFormSection').style.display = 'block';
    buildAchievementForm();
}

function showFacultyForm() {
    hideAllSections();
    document.getElementById('facultyFormSection').style.display = 'block';
    buildFacultyForm();
}

function showResponses() {
    hideAllSections();
    document.getElementById('responsesSection').style.display = 'block';
    loadResponses();
}

function hideAllSections() {
    const sections = ['loginSection', 'userTypeSection', 'profileSetupSection', 
                     'dashboardSection', 'achievementFormSection', 'facultyFormSection', 
                     'responsesSection'];
    sections.forEach(section => {
        document.getElementById(section).style.display = 'none';
    });
}

// Setup event listeners
function setupEventListeners() {
    // Sign out button
    document.getElementById('signOutBtn').addEventListener('click', signOut);
    
    // User type selection
    document.getElementById('studentBtn').addEventListener('click', () => {
        showProfileSetup('student');
    });
    
    document.getElementById('facultyBtn').addEventListener('click', () => {
        showProfileSetup('faculty');
    });
    
    // Profile form submission
    document.getElementById('profileForm').addEventListener('submit', handleProfileSubmission);
    
    // Dashboard cards
    document.getElementById('newFormCard').addEventListener('click', () => {
        if (userProfile.type === 'student') {
            showAchievementForm();
        } else {
            showFacultyForm();
        }
    });
    
    document.getElementById('viewResponsesCard').addEventListener('click', showResponses);
    document.getElementById('reportsCard').addEventListener('click', generateReport);
}

// Handle profile form submission
function handleProfileSubmission(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    userProfile = {
        userId: currentUser.id,
        type: document.getElementById('studentFields').style.display === 'block' ? 'student' : 'faculty',
        createdAt: new Date().toISOString()
    };
    
    if (userProfile.type === 'student') {
        userProfile.rollNo = formData.get('rollNo');
        userProfile.yearOfStudy = formData.get('yearOfStudy');
        userProfile.branch = formData.get('branch');
    } else {
        userProfile.employeeId = formData.get('employeeId');
        userProfile.department = formData.get('department');
        userProfile.branch = formData.get('facultyBranch');
    }
    
    // Save profile
    localStorage.setItem(`profile_${currentUser.id}`, JSON.stringify(userProfile));
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    
    showAlert('Profile created successfully!', 'success');
    setTimeout(() => showDashboard(), 1500);
}

// Build achievement form
function buildAchievementForm() {
    const formContainer = document.getElementById('achievementForm');
    formContainer.innerHTML = `
        <div class="form-group">
            <label for="studentName">Name *</label>
            <input type="text" id="studentName" name="studentName" value="${currentUser.name}" readonly>
        </div>
        
        <div class="form-group">
            <label for="rollNumber">Roll No. *</label>
            <input type="text" id="rollNumber" name="rollNumber" value="${userProfile.rollNo}" readonly>
        </div>
        
        <div class="form-group">
            <label for="admittedBatch">Admitted Batch *</label>
            <input type="text" id="admittedBatch" name="admittedBatch" required>
        </div>
        
        <div class="form-group">
            <label for="specialization">Specialization *</label>
            <select id="specialization" name="specialization" required>
                <option value="">Select Specialization</option>
                <option value="CSE Core">CSE Core</option>
                <option value="AIML">AIML</option>
                <option value="CS">CS</option>
                <option value="DS">DS</option>
                <option value="IOT">IOT</option>
                <option value="CSBS">CSBS</option>
            </select>
        </div>
        
        <div class="form-group">
            <label for="yearStudy">Year of Study *</label>
            <input type="text" id="yearStudy" name="yearStudy" value="${userProfile.yearOfStudy}" readonly>
        </div>
        
        <div class="form-group">
            <label for="category">Category of Achievement *</label>
            <select id="category" name="category" required>
                <option value="">Select Category</option>
                <option value="Curricular Activities">Curricular Activities</option>
                <option value="Co-curricular Activities">Co-curricular Activities</option>
                <option value="Extracurricular Activities">Extracurricular Activities</option>
                <option value="Other">Other</option>
            </select>
        </div>
        
        <div class="form-group">
            <label for="eventName">Name of the Event/Competition *</label>
            <input type="text" id="eventName" name="eventName" required>
        </div>
        
        <div class="form-group">
            <label for="organizer">Organizer of the Event *</label>
            <input type="text" id="organizer" name="organizer" required>
        </div>
        
        <div class="form-group">
            <label for="eventPlace">Place of the Event *</label>
            <input type="text" id="eventPlace" name="eventPlace" required>
        </div>
        
        <div class="form-group">
            <label for="achievementLevel">Level of Achievement *</label>
            <select id="achievementLevel" name="achievementLevel" required>
                <option value="">Select Level</option>
                <option value="College Level">College Level</option>
                <option value="State Level">State Level</option>
                <option value="National Level">National Level</option>
                <option value="International Level">International Level</option>
            </select>
        </div>
        
        <div class="form-group">
            <label for="eventDate">Date of the Event *</label>
            <input type="date" id="eventDate" name="eventDate" required min="2025-03-01" max="2025-05-31">
        </div>
        
        <div class="form-group">
            <label for="position">Position Secured *</label>
            <select id="position" name="position" required>
                <option value="">Select Position</option>
                <option value="1st Place">1st Place</option>
                <option value="2nd Place">2nd Place</option>
                <option value="3rd Place">3rd Place</option>
                <option value="Participation">Participation</option>
                <option value="Other">Other</option>
            </select>
        </div>
        
        <div class="form-group">
            <label for="certificate">Upload Proof of achievement (Certificate) *</label>
            <div class="file-upload">
                <input type="file" id="certificate" name="certificate" accept=".pdf,.jpg,.jpeg,.png" multiple>
                <div class="file-upload-btn" onclick="document.getElementById('certificate').click()">
                    Choose Files (Max 5 files, 100MB each)
                </div>
                <div id="certificateFiles" class="uploaded-files"></div>
                <div class="demo-note" style="font-size: 0.9em; color: #666; margin-top: 10px;">
                    📝 Demo Mode: File upload is simulated - click submit to continue
                </div>
            </div>
        </div>
        
        <div class="form-group">
            <label for="eventPhotos">Upload the event photos taken at the venue</label>
            <div class="file-upload">
                <input type="file" id="eventPhotos" name="eventPhotos" accept=".jpg,.jpeg,.png" multiple>
                <div class="file-upload-btn" onclick="document.getElementById('eventPhotos').click()">
                    Choose Photos (Max 10 files, 10MB each)
                </div>
                <div id="photoFiles" class="uploaded-files"></div>
            </div>
        </div>
        
        <div class="form-group">
            <label for="eventDescription">Write a few lines about the event (if you'd like to share)</label>
            <textarea id="eventDescription" name="eventDescription" rows="4" 
                      placeholder="Describe your experience and the event..."></textarea>
        </div>
        
        <div class="form-actions">
            <button type="button" class="btn btn-secondary" onclick="showDashboard()">Cancel</button>
            <button type="submit" class="btn btn-primary">Submit Achievement</button>
        </div>
    `;
    
    // Add form submission handler
    formContainer.addEventListener('submit', handleAchievementSubmission);
    
    // Add file upload handlers
    setupFileUploadHandlers();
}

// Build faculty form
function buildFacultyForm() {
    const formContainer = document.getElementById('facultyForm');
    formContainer.innerHTML = `
        <div class="form-group">
            <label for="facultyName">Name *</label>
            <input type="text" id="facultyName" name="facultyName" value="${currentUser.name}" readonly>
        </div>
        
        <div class="form-group">
            <label for="empId">Employee ID *</label>
            <input type="text" id="empId" name="empId" value="${userProfile.employeeId}" readonly>
        </div>
        
        <div class="form-group">
            <label for="activityType">Activity Type *</label>
            <select id="activityType" name="activityType" required>
                <option value="">Select Activity Type</option>
                <option value="Guest Lecture">Guest Lecture</option>
                <option value="Review">Review</option>
                <option value="Editorial Member">Editorial Member</option>
                <option value="UGC Project">UGC Project</option>
            </select>
        </div>
        
        <div class="form-group">
            <label for="activityTitle">Title/Name of Activity *</label>
            <input type="text" id="activityTitle" name="activityTitle" required>
        </div>
        
        <div class="form-group">
            <label for="activityDescription">Description *</label>
            <textarea id="activityDescription" name="activityDescription" rows="4" required 
                      placeholder="Provide detailed description of your activity..."></textarea>
        </div>
        
        <div class="form-group">
            <label for="activityDate">Date of Activity *</label>
            <input type="date" id="activityDate" name="activityDate" required>
        </div>
        
        <div class="form-group">
            <label for="organization">Organization/Institution *</label>
            <input type="text" id="organization" name="organization" required>
        </div>
        
        <div class="form-group">
            <label for="activityLevel">Level *</label>
            <select id="activityLevel" name="activityLevel" required>
                <option value="">Select Level</option>
                <option value="Department Level">Department Level</option>
                <option value="College Level">College Level</option>
                <option value="State Level">State Level</option>
                <option value="National Level">National Level</option>
                <option value="International Level">International Level</option>
            </select>
        </div>
        
        <div class="form-group">
            <label for="activityProof">Upload Supporting Documents</label>
            <div class="file-upload">
                <input type="file" id="activityProof" name="activityProof" accept=".pdf,.jpg,.jpeg,.png" multiple>
                <div class="file-upload-btn" onclick="document.getElementById('activityProof').click()">
                    Choose Files (Max 5 files, 50MB each)
                </div>
                <div id="activityProofFiles" class="uploaded-files"></div>
            </div>
        </div>
        
        <div class="form-actions">
            <button type="button" class="btn btn-secondary" onclick="showDashboard()">Cancel</button>
            <button type="submit" class="btn btn-primary">Submit Activity</button>
        </div>
    `;
    
    // Add form submission handler
    formContainer.addEventListener('submit', handleFacultySubmission);
}

// Setup file upload handlers
function setupFileUploadHandlers() {
    const certificateInput = document.getElementById('certificate');
    const photoInput = document.getElementById('eventPhotos');
    
    if (certificateInput) {
        certificateInput.addEventListener('change', function() {
            displaySelectedFiles(this, 'certificateFiles', 5, 100);
        });
    }
    
    if (photoInput) {
        photoInput.addEventListener('change', function() {
            displaySelectedFiles(this, 'photoFiles', 10, 10);
        });
    }
}

// Display selected files
function displaySelectedFiles(input, containerId, maxFiles, maxSizeMB) {
    const container = document.getElementById(containerId);
    const files = input.files;
    
    if (files.length > maxFiles) {
        showAlert(`Maximum ${maxFiles} files allowed`, 'error');
        input.value = '';
        return;
    }
    
    container.innerHTML = '';
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileSizeMB = file.size / (1024 * 1024);
        
        if (fileSizeMB > maxSizeMB) {
            showAlert(`File "${file.name}" exceeds ${maxSizeMB}MB limit`, 'error');
            input.value = '';
            return;
        }
        
        const fileDiv = document.createElement('div');
        fileDiv.className = 'uploaded-file';
        fileDiv.innerHTML = `
            <span class="file-name">${file.name}</span>
            <span class="file-size">(${fileSizeMB.toFixed(2)} MB)</span>
        `;
        container.appendChild(fileDiv);
    }
}

// Handle achievement form submission
function handleAchievementSubmission(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // In demo mode, simulate file uploads
    const isDemo = localStorage.getItem('currentUser') && JSON.parse(localStorage.getItem('currentUser')).email.includes('demo');
    
    const achievement = {
        id: Date.now().toString(),
        userId: currentUser.id,
        userName: currentUser.name,
        userEmail: currentUser.email,
        userPhoto: currentUser.imageUrl,
        type: 'achievement',
        submittedAt: new Date().toISOString(),
        data: Object.fromEntries(formData)
    };
    
    // Add user profile data
    achievement.userProfile = userProfile;
    
    // Simulate file data in demo mode
    if (isDemo) {
        achievement.data.certificate = 'demo_certificate.pdf';
        achievement.data.eventPhotos = 'demo_photo1.jpg, demo_photo2.jpg';
    }
    
    // Save achievement
    saveResponse(achievement);
    
    showAlert('Achievement submitted successfully!', 'success');
    setTimeout(() => showDashboard(), 2000);
}

// Handle faculty form submission
function handleFacultySubmission(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const activity = {
        id: Date.now().toString(),
        userId: currentUser.id,
        userName: currentUser.name,
        userEmail: currentUser.email,
        userPhoto: currentUser.imageUrl,
        type: 'faculty_activity',
        submittedAt: new Date().toISOString(),
        data: Object.fromEntries(formData)
    };
    
    // Add user profile data
    activity.userProfile = userProfile;
    
    // Save activity
    saveResponse(activity);
    
    showAlert('Activity submitted successfully!', 'success');
    setTimeout(() => showDashboard(), 2000);
}

// Save response to localStorage
function saveResponse(response) {
    const responses = JSON.parse(localStorage.getItem('formResponses') || '[]');
    responses.push(response);
    localStorage.setItem('formResponses', JSON.stringify(responses));
}

// Load and display responses
function loadResponses() {
    const responsesContainer = document.querySelector('#responsesSection .responses-container');
    const responses = JSON.parse(localStorage.getItem('formResponses') || '[]');
    
    let html = `
        <div class="filters">
            <h3>Filter Responses</h3>
            <div class="filter-group">
                <div class="form-group">
                    <label for="filterType">Type</label>
                    <select id="filterType">
                        <option value="">All Types</option>
                        <option value="achievement">Student Achievements</option>
                        <option value="faculty_activity">Faculty Activities</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="filterBranch">Branch</label>
                    <select id="filterBranch">
                        <option value="">All Branches</option>
                        <option value="CSE Core">CSE Core</option>
                        <option value="AIML">AIML</option>
                        <option value="CS">CS</option>
                        <option value="DS">DS</option>
                        <option value="IOT">IOT</option>
                        <option value="CSBS">CSBS</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="filterYear">Year</label>
                    <select id="filterYear">
                        <option value="">All Years</option>
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                    </select>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary" onclick="filterResponses()">Apply Filters</button>
                </div>
            </div>
        </div>
        <div id="responsesDisplay">
    `;
    
    // Display responses
    responses.forEach(response => {
        html += createResponseCard(response);
    });
    
    html += '</div>';
    
    if (responses.length === 0) {
        html += '<div class="text-center"><p>No responses found.</p></div>';
    }
    
    responsesContainer.innerHTML = html;
}

// Create response card HTML
function createResponseCard(response) {
    const date = new Date(response.submittedAt).toLocaleDateString();
    const time = new Date(response.submittedAt).toLocaleTimeString();
    
    let contentHtml = '';
    
    if (response.type === 'achievement') {
        contentHtml = `
            <div><strong>Event:</strong> ${response.data.eventName}</div>
            <div><strong>Category:</strong> ${response.data.category}</div>
            <div><strong>Level:</strong> ${response.data.achievementLevel}</div>
            <div><strong>Position:</strong> ${response.data.position}</div>
            <div><strong>Organizer:</strong> ${response.data.organizer}</div>
        `;
    } else if (response.type === 'faculty_activity') {
        contentHtml = `
            <div><strong>Activity:</strong> ${response.data.activityTitle}</div>
            <div><strong>Type:</strong> ${response.data.activityType}</div>
            <div><strong>Level:</strong> ${response.data.activityLevel}</div>
            <div><strong>Organization:</strong> ${response.data.organization}</div>
        `;
    }
    
    return `
        <div class="response-card" data-type="${response.type}" 
             data-branch="${response.userProfile?.branch || ''}" 
             data-year="${response.userProfile?.yearOfStudy || ''}">
            <div class="response-header">
                <div class="response-user">
                    <img src="${response.userPhoto}" alt="${response.userName}">
                    <div>
                        <div><strong>${response.userName}</strong></div>
                        <div style="font-size: 0.9em; color: #666;">${response.userEmail}</div>
                    </div>
                </div>
                <div class="response-date">${date} ${time}</div>
            </div>
            <div class="response-content">
                ${contentHtml}
            </div>
        </div>
    `;
}

// Filter responses
function filterResponses() {
    const typeFilter = document.getElementById('filterType').value;
    const branchFilter = document.getElementById('filterBranch').value;
    const yearFilter = document.getElementById('filterYear').value;
    
    const responseCards = document.querySelectorAll('.response-card');
    
    responseCards.forEach(card => {
        const cardType = card.dataset.type;
        const cardBranch = card.dataset.branch;
        const cardYear = card.dataset.year;
        
        let shouldShow = true;
        
        if (typeFilter && cardType !== typeFilter) shouldShow = false;
        if (branchFilter && cardBranch !== branchFilter) shouldShow = false;
        if (yearFilter && cardYear !== yearFilter) shouldShow = false;
        
        card.style.display = shouldShow ? 'block' : 'none';
    });
}

// Generate report
function generateReport() {
    const responses = JSON.parse(localStorage.getItem('formResponses') || '[]');
    
    if (responses.length === 0) {
        showAlert('No data available for report generation', 'info');
        return;
    }
    
    // Create report data
    const report = {
        generatedAt: new Date().toISOString(),
        totalResponses: responses.length,
        achievements: responses.filter(r => r.type === 'achievement'),
        facultyActivities: responses.filter(r => r.type === 'faculty_activity'),
        byBranch: {},
        byLevel: {},
        byCategory: {}
    };
    
    // Group by branch
    responses.forEach(response => {
        const branch = response.userProfile?.branch || 'Unknown';
        if (!report.byBranch[branch]) report.byBranch[branch] = 0;
        report.byBranch[branch]++;
    });
    
    // Group achievements by level
    report.achievements.forEach(achievement => {
        const level = achievement.data.achievementLevel || 'Unknown';
        if (!report.byLevel[level]) report.byLevel[level] = 0;
        report.byLevel[level]++;
    });
    
    // Group achievements by category
    report.achievements.forEach(achievement => {
        const category = achievement.data.category || 'Unknown';
        if (!report.byCategory[category]) report.byCategory[category] = 0;
        report.byCategory[category]++;
    });
    
    // Generate HTML report
    const reportHtml = generateReportHTML(report);
    
    // Open report in new window
    const reportWindow = window.open('', '_blank');
    reportWindow.document.write(reportHtml);
    reportWindow.document.close();
}

// Generate report HTML
function generateReportHTML(report) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>GITAM Achievement Report</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .header { text-align: center; margin-bottom: 30px; }
                .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
                .stat-card { background: #f8f9fa; padding: 20px; border-radius: 6px; text-align: center; }
                .stat-number { font-size: 2em; font-weight: bold; color: #007bff; }
                .chart { margin-bottom: 30px; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
                th { background-color: #f8f9fa; }
                @media print { body { margin: 0; } }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>GITAM Achievement Report</h1>
                <p>Generated on: ${new Date(report.generatedAt).toLocaleString()}</p>
            </div>
            
            <div class="stats">
                <div class="stat-card">
                    <div class="stat-number">${report.totalResponses}</div>
                    <div>Total Submissions</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${report.achievements.length}</div>
                    <div>Student Achievements</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${report.facultyActivities.length}</div>
                    <div>Faculty Activities</div>
                </div>
            </div>
            
            <div class="chart">
                <h2>Distribution by Branch</h2>
                <table>
                    <thead>
                        <tr><th>Branch</th><th>Count</th></tr>
                    </thead>
                    <tbody>
                        ${Object.entries(report.byBranch).map(([branch, count]) => 
                            `<tr><td>${branch}</td><td>${count}</td></tr>`
                        ).join('')}
                    </tbody>
                </table>
            </div>
            
            <div class="chart">
                <h2>Achievements by Level</h2>
                <table>
                    <thead>
                        <tr><th>Level</th><th>Count</th></tr>
                    </thead>
                    <tbody>
                        ${Object.entries(report.byLevel).map(([level, count]) => 
                            `<tr><td>${level}</td><td>${count}</td></tr>`
                        ).join('')}
                    </tbody>
                </table>
            </div>
            
            <div class="chart">
                <h2>Achievements by Category</h2>
                <table>
                    <thead>
                        <tr><th>Category</th><th>Count</th></tr>
                    </thead>
                    <tbody>
                        ${Object.entries(report.byCategory).map(([category, count]) => 
                            `<tr><td>${category}</td><td>${count}</td></tr>`
                        ).join('')}
                    </tbody>
                </table>
            </div>
        </body>
        </html>
    `;
}

// Show alert messages
function showAlert(message, type = 'info') {
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());
    
    // Create new alert
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    // Insert at top of main content
    const main = document.querySelector('.main');
    main.insertBefore(alert, main.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 5000);
}