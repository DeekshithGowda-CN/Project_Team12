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

    if (userIdElement && userData.studentId) {
        userIdElement.textContent = `Student ID: ${userData.studentId}`;
    }
    
    // Pre-fill form with user data
    if (userData) {
        document.getElementById('fullName').value = userData.name || '';
        document.getElementById('studentId').value = userData.studentId || '';
        document.getElementById('email').value = userData.email || '';
        document.getElementById('phone').value = userData.phone || '';
        
        // Set department if it exists
        const departmentSelect = document.getElementById('department');
        if (departmentSelect && userData.department) {
            for (let i = 0; i < departmentSelect.options.length; i++) {
                if (departmentSelect.options[i].text === userData.department || 
                    departmentSelect.options[i].value === userData.department) {
                    departmentSelect.selectedIndex = i;
                    break;
                }
            }
        }
    }
