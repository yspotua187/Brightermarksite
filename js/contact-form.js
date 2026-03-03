// Brighter Mark Enterprises LLC - Contact Form Handling
// Form validation and submission functionality with Google Sheets integration

// API endpoint configuration
const API_CONFIG = {
    // Google Apps Script Web App URL - Replace with your deployed script URL
    // Example: 'https://script.google.com/macros/s/ABC123xyz/exec'
    ENDPOINT: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec',
    METHOD: 'POST'
};

document.addEventListener('DOMContentLoaded', function() {
    // Contact form handling
    const contactForms = document.querySelectorAll('form[id$="contact-form"]');
    
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                submitForm(this);
            }
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    });
    
    // Form validation functions
    function validateForm(form) {
        let isValid = true;
        const fields = form.querySelectorAll('input[required], select[required], textarea[required]');
        
        fields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Clear previous errors
        clearFieldError(field);
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // Email validation
        if (field.type === 'email' && value && !window.validateEmail(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
        
        // Phone validation
        if (field.type === 'tel' && value && !window.validatePhone(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
        
        // Show error if validation failed
        if (!isValid) {
            showFieldError(field, errorMessage);
        }
        
        return isValid;
    }
    
    function showFieldError(field, message) {
        field.classList.add('error');
        
        // Create or update error message
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    function clearFieldError(field) {
        field.classList.remove('error');
        
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }
    
    // Form submission with Google Sheets integration
    function submitForm(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        submitButton.classList.add('loading');
        
        // Collect form data
        const formData = new FormData(form);
        const formDataObj = Object.fromEntries(formData.entries());
        
        // Prepare data for Google Sheets
        // Google Apps Script expects URL-encoded parameters or form data
        const params = new URLSearchParams();
        params.append('timestamp', new Date().toISOString());
        params.append('business_name', formDataObj['business-name'] || formDataObj['business-name'] || '');
        params.append('contact_person', formDataObj['contact-person'] || formDataObj['contact-name'] || '');
        params.append('phone', formDataObj.phone || '');
        params.append('email', formDataObj.email || '');
        params.append('service_type', formDataObj['service-type'] || '');
        params.append('property_type', formDataObj['property-type'] || '');
        params.append('square_footage', formDataObj['square-footage'] || '');
        params.append('frequency', formDataObj.frequency || '');
        params.append('message', formDataObj.message || '');
        params.append('page_url', window.location.href);
        params.append('source', 'brighter-mark-website');
        
        // Send data to Google Apps Script
        // Note: Google Apps Script has CORS restrictions, so we use mode: 'no-cors' for simple requests
        // or handle the redirect that Google Apps Script returns
        fetch(API_CONFIG.ENDPOINT, {
            method: API_CONFIG.METHOD,
            mode: 'no-cors', // Required for Google Apps Script to avoid CORS errors
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString()
        })
        .then(function() {
            // With 'no-cors' mode, we can't read the response, but we assume success
            // Show success message
            showFormMessage(form, 'Thank you! Your information has been submitted successfully. We will contact you soon.', 'success');
            
            // Reset form
            form.reset();
        })
        .catch(function(error) {
            console.error('Failed to submit form to Google Sheets:', error);
            
            // Show error message
            showFormMessage(form, 'Sorry, there was an error submitting your information. Please try again or call us directly at (501) 712-0802.', 'error');
        })
        .finally(function() {
            // Restore button
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            submitButton.classList.remove('loading');
        });
    }
    
    function showFormMessage(form, message, type) {
        // Remove existing messages
        const existingMessages = form.querySelectorAll('.form-message');
        existingMessages.forEach(msg => msg.remove());
        
        // Create new message
        const messageElement = document.createElement('div');
        messageElement.className = `form-message form-message-${type}`;
        messageElement.textContent = message;
        
        // Add styles for message types
        if (!document.querySelector('#form-message-styles')) {
            const styles = document.createElement('style');
            styles.id = 'form-message-styles';
            styles.textContent = `
                .form-message {
                    padding: 12px;
                    margin: 16px 0;
                    border-radius: 4px;
                    text-align: center;
                    font-weight: bold;
                }
                .form-message-success {
                    background-color: #d4edda;
                    color: #155724;
                    border: 1px solid #c3e6cb;
                }
                .form-message-error {
                    background-color: #f8d7da;
                    color: #721c24;
                    border: 1px solid #f5c6cb;
                }
                .form-input.error {
                    border-color: #dc3545;
                }
                .error-message {
                    color: #dc3545;
                    font-size: 0.875rem;
                    margin-top: 4px;
                    display: none;
                }
            `;
            document.head.appendChild(styles);
        }
        
        // Insert message at the top of the form
        form.insertBefore(messageElement, form.firstChild);
        
        // Auto-remove success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                messageElement.remove();
            }, 5000);
        }
    }
    
    // Phone number formatting
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = value;
                } else if (value.length <= 6) {
                    value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
                } else {
                    value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
                }
            }
            
            e.target.value = value;
        });
    });
    
    // Service type change handler
    const serviceSelects = document.querySelectorAll('select[name="service-type"]');
    serviceSelects.forEach(select => {
        select.addEventListener('change', function() {
            // You can add specific logic based on service type selection
            console.log('Service type selected:', this.value);
        });
    });
    
    // Form reset handler
    const resetButtons = document.querySelectorAll('button[type="reset"]');
    resetButtons.forEach(button => {
        button.addEventListener('click', function() {
            const form = this.closest('form');
            const errorMessages = form.querySelectorAll('.error-message');
            const formInputs = form.querySelectorAll('.error');
            
            errorMessages.forEach(msg => msg.remove());
            formInputs.forEach(input => input.classList.remove('error'));
        });
    });
});

// Export functions for use in other modules (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateForm,
        validateField,
        submitForm
    };
}