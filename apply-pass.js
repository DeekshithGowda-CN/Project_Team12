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

    // Step navigation
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    const step4 = document.getElementById('step4');
    
    const personalDetails = document.getElementById('personalDetails');
    const passOptions = document.getElementById('passOptions');
    const uploadDocuments = document.getElementById('uploadDocuments');
    const reviewSubmit = document.getElementById('reviewSubmit');

     // Navigation buttons
    const nextToOptions = document.getElementById('nextToOptions');
    const backToPersonal = document.getElementById('backToPersonal');
    const nextToDocuments = document.getElementById('nextToDocuments');
    const backToOptions = document.getElementById('backToOptions');
    const nextToReview = document.getElementById('nextToReview');
    const backToDocuments = document.getElementById('backToDocuments');
    const submitApplication = document.getElementById('submitApplication');
    
     // Step 1 to Step 2
    nextToOptions.addEventListener('click', function() {
        if (validatePersonalDetails()) {
            personalDetails.classList.add('hidden');
            passOptions.classList.remove('hidden');
            
            step1.classList.add('completed');
            step1.classList.remove('active');
            step2.classList.add('active');
            
            window.scrollTo(0, 0);
        }
    });
    
     // Step 2 to Step 1
    backToPersonal.addEventListener('click', function() {
        passOptions.classList.add('hidden');
        personalDetails.classList.remove('hidden');
        
        step2.classList.remove('active');
        step1.classList.remove('completed');
        step1.classList.add('active');
        
        window.scrollTo(0, 0);
    });







