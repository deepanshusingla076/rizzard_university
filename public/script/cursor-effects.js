// Cursor click ripple effect
document.addEventListener('click', function(e) {
    // Create ripple element
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    
    // Position at click location
    ripple.style.left = (e.clientX - 250) + 'px';
    ripple.style.top = (e.clientY - 250) + 'px';
    
    // Add to body
    document.body.appendChild(ripple);
    
    // Remove after animation completes
    setTimeout(() => {
        ripple.remove();
    }, 800);
});

// Add particle effect on click (optional enhanced effect)
document.addEventListener('click', function(e) {
    const colors = ['#3b82f6', '#f1d60c', '#112f5c', '#2563eb'];
    const particleCount = 6;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 8 + 4;
        
        particle.style.position = 'fixed';
        particle.style.left = e.clientX + 'px';
        particle.style.top = e.clientY + 'px';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9998';
        particle.style.opacity = '0.8';
        
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = Math.random() * 100 + 50;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        particle.animate([
            {
                transform: 'translate(0, 0) scale(1)',
                opacity: 0.8
            },
            {
                transform: `translate(${tx}px, ${ty}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 600,
            easing: 'cubic-bezier(0, .9, .57, 1)'
        });
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 600);
    }
});
