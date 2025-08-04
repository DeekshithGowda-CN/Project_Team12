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

    // Step 2 to Step 3
    nextToDocuments.addEventListener('click', function() {
        if (validatePassOptions()) {
            passOptions.classList.add('hidden');
            uploadDocuments.classList.remove('hidden');
            
            step2.classList.add('completed');
            step2.classList.remove('active');
            step3.classList.add('active');
            
            window.scrollTo(0, 0);
        }
    });
    
    // Step 3 to Step 2
    backToOptions.addEventListener('click', function() {
        uploadDocuments.classList.add('hidden');
        passOptions.classList.remove('hidden');
        
        step3.classList.remove('active');
        step2.classList.remove('completed');
        step2.classList.add('active');
        
        window.scrollTo(0, 0);
    });
  
    // Step 3 to Step 4
    nextToReview.addEventListener('click', function() {
        if (validateDocuments()) {
            uploadDocuments.classList.add('hidden');
            reviewSubmit.classList.remove('hidden');
            
            step3.classList.add('completed');
            step3.classList.remove('active');
            step4.classList.add('active');
            
            // Update review information
            updateReviewInfo();
            
            window.scrollTo(0, 0);
        }
    });
    
    // Step 4 to Step 3
    backToDocuments.addEventListener('click', function() {
        reviewSubmit.classList.add('hidden');
        uploadDocuments.classList.remove('hidden');
        
        step4.classList.remove('active');
        step3.classList.remove('completed');
        step3.classList.add('active');
        
        window.scrollTo(0, 0);
    });

    // Handle file uploads
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        input.addEventListener('change', function(e) {
            const fileName = e.target.files[0]?.name;
            const fileInfoLabel = this.nextElementSibling.querySelector('.file-info');
            
            if (fileName) {
                fileInfoLabel.textContent = `Selected: ${fileName}`;
                this.nextElementSibling.classList.add('file-selected');
            } else {
                fileInfoLabel.textContent = 'JPG, PNG or PDF, max 5MB';
                this.nextElementSibling.classList.remove('file-selected');
            }
        });
    });

     // Handle pass type selection (update price display)
    const passTypeRadios = document.querySelectorAll('input[name="passType"]');
    passTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const selectedType = document.querySelector('input[name="passType"]:checked').value;
            let price = '$120';
            
            if (selectedType === 'annual') {
                price = '$220';
            } else if (selectedType === 'monthly') {
                price = '$40';
            }
            
            // If implementing in a real application, update price display
            console.log('Selected pass type:', selectedType, 'Price:', price);
        });
    });
    
    // Handle all routes checkbox
    const allRoutesCheckbox = document.getElementById('route4');
    const otherRouteCheckboxes = [
        document.getElementById('route1'),
        document.getElementById('route2'),
        document.getElementById('route3')
    ];
    
    allRoutesCheckbox.addEventListener('change', function() {
        if (this.checked) {
            otherRouteCheckboxes.forEach(checkbox => {
                checkbox.checked = true;
                checkbox.disabled = true;
            });
        } else {
            otherRouteCheckboxes.forEach(checkbox => {
                checkbox.disabled = false;
            });
        }
    });


    // Form submission
    document.getElementById('passApplicationForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!document.getElementById('termsAgree').checked) {
            alert('Please agree to the terms and conditions before submitting.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = document.getElementById('submitApplication');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        
        setTimeout(() => {
            // Show success message
            alert('Your pass application has been submitted successfully! We will process your application and notify you within 2 business days.');
            
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        }, 2000);
    });


     // Validation functions
    function validatePersonalDetails() {
        const fullName = document.getElementById('fullName').value;
        const studentId = document.getElementById('studentId').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const department = document.getElementById('department').value;
        const year = document.getElementById('year').value;
        
        if (!fullName || !studentId || !email || !phone || !address || !department || !year) {
            alert('Please fill in all required fields.');
            return false;
        }
     
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return false;
        }
        
        return true;
    }

    function validatePassOptions() {
        // Check if at least one route is selected
        const routes = document.querySelectorAll('input[name="routes[]"]:checked');
        if (routes.length === 0) {
            alert('Please select at least one route.');
            return false;
        }
        
        return true;
    }
    
    function validateDocuments() {
        const studentIdCard = document.getElementById('studentIdCard').files;
        const enrollmentProof = document.getElementById('enrollmentProof').files;
        const photoId = document.getElementById('photoId').files;
        
        if (studentIdCard.length === 0 || enrollmentProof.length === 0 || photoId.length === 0) {
            alert('Please upload all required documents.');
            return false;
        }
        
        return true;
    }
    
    function updateReviewInfo() {

	    // Personal details
        document.getElementById('reviewName').textContent = document.getElementById('fullName').value;
        document.getElementById('reviewStudentId').textContent = document.getElementById('studentId').value;
        document.getElementById('reviewEmail').textContent = document.getElementById('email').value;
        document.getElementById('reviewPhone').textContent = document.getElementById('phone').value;

        const departmentSelect = document.getElementById('department');
        document.getElementById('reviewDepartment').textContent =
            departmentSelect.options[departmentSelect.selectedIndex].text;

        const yearSelect = document.getElementById('year');
        document.getElementById('reviewYear').textContent =
            yearSelect.options[yearSelect.selectedIndex].text;

        // Pass details
        const selectedPassType = document.querySelector('input[name="passType"]:checked').value;
        let passTypeText = 'Semester Pass';
        let priceText = '$120';

        if (selectedPassType === 'annual') {
            passTypeText = 'Annual Pass';
            priceText = '$220';
        } else if (selectedPassType === 'monthly') {
            passTypeText = 'Monthly Pass';
            priceText = '$40';
        }

        document.getElementById('reviewPassType').textContent = passTypeText;
        document.getElementById('reviewPrice').textContent = priceText;
       

