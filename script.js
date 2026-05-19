// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
const topBar = document.querySelector('.top-bar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        if (topBar) topBar.style.transform = 'translateY(-100%)';
    } else {
        navbar.classList.remove('scrolled');
        if (topBar) topBar.style.transform = 'translateY(0)';
    }
});

// Animated Counters
const counters = document.querySelectorAll('.stat-number');
const speed = 200; // The lower the slower

const animateCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target + "+";
            }
        };
        
        // Simple Intersection Observer to start animation when visible
        const observer = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting) {
                updateCount();
                observer.disconnect();
            }
        });
        
        observer.observe(counter);
    });
};

animateCounters();

// Mobile Menu Toggle (Basic implementation)
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if(hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.backgroundColor = 'rgba(11, 25, 44, 0.95)';
        navLinks.style.padding = '2rem 0';
    });
}
