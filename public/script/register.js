function checkStrength() {
    const password = document.getElementById('password').value;
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');

    strengthBar.classList.remove('weak', 'medium', 'strong');

    let strength = 0;
    if (password.match(/[a-z]+/)) strength += 1;
    if (password.match(/[A-Z]+/)) strength += 1;
    if (password.match(/[0-9]+/)) strength += 1;
    if (password.match(/[$@#&!]+/)) strength += 1;
    if (password.length >= 8) strength += 1;

    switch (true) {
        case (strength === 0):
            strengthBar.style.width = '0%';
            strengthText.textContent = '';
            strengthText.style.color = '#666';
            break;
        case (strength < 3):
            strengthBar.style.width = '33%';
            strengthBar.classList.add('weak');
            strengthText.textContent = 'Weak password';
            strengthText.style.color = '#ff4747';
            break;
        case (strength < 5):
            strengthBar.style.width = '66%';
            strengthBar.classList.add('medium');
            strengthText.textContent = 'Medium password';
            strengthText.style.color = '#ffc107';
            break;
        case (strength === 5):
            strengthBar.style.width = '100%';
            strengthBar.classList.add('strong');
            strengthText.textContent = 'Strong password';
            strengthText.style.color = '#2ecc71';
            break;
    }
}

// Password confirmation validation
document.querySelector('form').addEventListener('submit', function(e) {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    if (password !== confirmPassword) {
        e.preventDefault();
        alert('Passwords do not match!');
        return;
    }
    
    if (password.length < 8) {
        e.preventDefault();
        alert('Password must be at least 8 characters long!');
        return;
    }

    const strengthBar = document.getElementById('strength-bar');
    if (!strengthBar.classList.contains('medium') && !strengthBar.classList.contains('strong')) {
        e.preventDefault();
        alert('Please choose a stronger password!');
        return;
    }
});