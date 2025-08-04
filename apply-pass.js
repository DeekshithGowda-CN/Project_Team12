document.addEventListener('DOMContentLoaded', function() {
    // Load user data from localStorage
    const userData = JSON.parse(localStorage.getItem('userData')) || {
        name: 'John Doe',
        studentId: 'S12345',
        email: 'john@university.edu',
        phone: '555-123-4567',
        department: 'Computer Science'
    };
    
    // Update user information in the header
    const userNameElement = document.querySelector('.user-info h4');
    const userIdElement = document.querySelector('.user-info p');
    
    if (userNameElement && userData.name) {
        userNameElement.textContent = userData.name;
    }
