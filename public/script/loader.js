document.addEventListener("DOMContentLoaded", function() {
    const loaderWrapper = document.getElementById('loader-wrapper');
    
    const randomLoadTime = Math.floor(Math.random() * 700) + 500;
    
    setTimeout(function() {
        if (loaderWrapper) {
            loaderWrapper.classList.add('loader-hidden');
            
            loaderWrapper.addEventListener('transitionend', function() {
                if (loaderWrapper.parentNode) {
                    loaderWrapper.parentNode.removeChild(loaderWrapper);
                }
            });
        }
    }, randomLoadTime);
    
    setTimeout(function() {
        if (loaderWrapper && loaderWrapper.parentNode) {
            loaderWrapper.parentNode.removeChild(loaderWrapper);
        }
    }, 2000);
});