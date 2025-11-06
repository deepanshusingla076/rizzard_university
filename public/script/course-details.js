document.addEventListener('DOMContentLoaded', function() {

    const courseApplicationForm = document.getElementById('course-application-form');
    
    if (courseApplicationForm) {
        courseApplicationForm.addEventListener('submit', function(e) {
            const formFields = courseApplicationForm.querySelectorAll('input[required], textarea[required], select[required]');
            let isValid = true;
            
            formFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('is-invalid');
                } else {
                    field.classList.remove('is-invalid');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    }
    
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.benefit-card, .outcome-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
 
    document.querySelectorAll('.benefit-card, .outcome-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.5s ease-out';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); 
});