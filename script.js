document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        navbar.style.boxShadow = window.scrollY > 50 ? '0 2px 15px rgba(0,0,0,0.1)' : '0 2px 10px rgba(0,0,0,0.05)';
    });
});
