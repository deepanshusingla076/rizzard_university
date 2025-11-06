
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.add('animate-nav');
        });
    }

    const enhanceResponsiveImages = () => {
        const images = document.querySelectorAll('img:not(.team-img):not(.logo)');
        images.forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    };
    
    enhanceResponsiveImages();

    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }

    const makeTablesResponsive = () => {
        const tables = document.querySelectorAll('table');
        tables.forEach(table => {
            const wrapper = document.createElement('div');
            wrapper.classList.add('table-responsive');
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
        });
    };
    
    makeTablesResponsive();

    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            const viewportWidth = window.innerWidth;
            const teamImages = document.querySelectorAll('.team-img-container');
            
            if (viewportWidth <= 767) {
                teamImages.forEach(img => {
                    img.classList.add('small-screen');
                });
            } else {
                teamImages.forEach(img => {
                    img.classList.remove('small-screen');
                });
            }
        }, 250);
    });
});