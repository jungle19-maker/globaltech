/**
 * Globotech Talent Hub Pvt. Ltd. - Interactive Design Functions
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. Preloader Overlay Handler
    // ==========================================================================
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 600); // matches CSS fade duration
        }
    });

    // Fallback: hide preloader after 3 seconds in case window load takes too long
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader && !preloader.classList.contains('fade-out')) {
            preloader.classList.add('fade-out');
            setTimeout(() => preloader.style.display = 'none', 600);
        }
    }, 3000);

    // ==========================================================================
    // 2. Sticky Navbar scroll effect
    // ==========================================================================
    const navbar = document.getElementById('navbar');
    
    const handleScroll = () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check immediately on load

    // ==========================================================================
    // 3. Hamburger Responsive Overlay Trigger
    // ==========================================================================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('open');
            document.body.classList.toggle('menu-open');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('open');
                document.body.classList.remove('menu-open');
            });
        });
    }


    // ==========================================================================
    // 5. Viewport-Triggered Statistics Counters
    // ==========================================================================
    const counters = document.querySelectorAll('.stat-number, .exp-card h3');
    const counterSpeed = 150; // controls speed (lower = slower count)

    const animateCounter = (counter) => {
        // Extract raw number value from text (handling symbols like + or %)
        const rawText = counter.innerText.trim();
        const cleanText = rawText.replace(/[^0-9]/g, '');
        const target = parseInt(cleanText, 10) || 0;
        const suffixes = rawText.replace(/[0-9]/g, ''); // keeps +, %, etc.
        
        let count = 0;
        const inc = Math.max(1, Math.ceil(target / counterSpeed));

        const updateCount = () => {
            if (count < target) {
                count += inc;
                if (count > target) count = target;
                counter.innerText = count + suffixes;
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = rawText; // set back to original to preserve exact formatting
            }
        };
        
        updateCount();
    };

    // Intersection observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    counters.forEach(counter => counterObserver.observe(counter));

    // ==========================================================================
    // 6. Intersection Observer for Scroll Reveals
    // ==========================================================================
    const fadeSections = document.querySelectorAll('.fade-in-section');
    
    if (fadeSections.length > 0) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -60px 0px"
        });

        fadeSections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // ==========================================================================
    // 7. Dynamic Background Particle Generators
    // ==========================================================================
    const initParticles = () => {
        const container = document.getElementById('particles-js');
        if (!container) return;

        // Create canvas
        const canvas = document.createElement('canvas');
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        container.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        let width = canvas.width = container.offsetWidth;
        let height = canvas.height = container.offsetHeight;

        window.addEventListener('resize', () => {
            if (!container) return;
            width = canvas.width = container.offsetWidth;
            height = canvas.height = container.offsetHeight;
        });

        const particles = [];
        const particleCount = 45;

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height + height; // start from bottom
                this.size = Math.random() * 3 + 1;
                this.speedY = -(Math.random() * 0.8 + 0.3); // float upward
                this.speedX = Math.random() * 0.4 - 0.2;
                this.alpha = Math.random() * 0.5 + 0.15;
            }

            update() {
                this.y += this.speedY;
                this.x += this.speedX;
                
                // Wrap around screen boundaries
                if (this.y < 0) {
                    this.y = height;
                    this.x = Math.random() * width;
                }
                if (this.x < 0 || this.x > width) {
                    this.speedX = -this.speedX;
                }
            }

            draw() {
                ctx.fillStyle = `rgba(255, 107, 26, ${this.alpha})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Initialize particles array
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
            // Pre-simulate to scatter particles initially
            particles[i].y = Math.random() * height;
        }

        // Animation Loop
        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            
            // subtle gradient path mapping
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            requestAnimationFrame(animate);
        };

        animate();
    };

    initParticles();

    // ==========================================================================
    // 8. Basic Hero Banner Fade Slider
    // ==========================================================================
    const prevArrow = document.querySelector('.slider-arrow.prev');
    const nextArrow = document.querySelector('.slider-arrow.next');
    const heroTitle = document.querySelector('.hero h1');
    const heroTagline = document.querySelector('.hero-tagline');

    const slides = [
        {
            title: "Global Industry<br><span>Quality Projects</span><br>Expert Workers",
            tagline: "Bridging the gap between elite global technical talent and premier engineering enterprises."
        },
        {
            title: "Empowering Skills<br><span>Shaping Futures</span><br>Ethical Placements",
            tagline: "An MEA Registered Company offering certified industrial workshops and overseas infrastructure recruitment."
        }
    ];

    let currentSlide = 0;

    const renderSlide = (index) => {
        if (!heroTitle || !heroTagline) return;

        // Apply slide animation
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(15px)';
        heroTagline.style.opacity = '0';
        heroTagline.style.transform = 'translateY(15px)';

        setTimeout(() => {
            heroTitle.innerHTML = slides[index].title;
            heroTagline.innerText = slides[index].tagline;

            heroTitle.style.transition = 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
            heroTagline.style.transition = 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
            
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
            heroTagline.style.opacity = '1';
            heroTagline.style.transform = 'translateY(0)';
        }, 300);
    };

    if (prevArrow && nextArrow) {
        prevArrow.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            renderSlide(currentSlide);
        });

        nextArrow.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            renderSlide(currentSlide);
        });
        
        // Auto slide cycle every 8 seconds
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            renderSlide(currentSlide);
        }, 8000);
    }

    // ==========================================================================
    // 8.5 Gallery "View More" Toggle Handler
    // ==========================================================================
    const galleryBtn = document.getElementById('gallery-view-more-btn');
    const hiddenGalleryItems = document.querySelectorAll('.gallery-img.hidden-item');
    
    if (galleryBtn && hiddenGalleryItems.length > 0) {
        galleryBtn.addEventListener('click', () => {
            const isShowing = galleryBtn.classList.toggle('active');
            const btnText = galleryBtn.querySelector('span');
            const btnIcon = galleryBtn.querySelector('i');
            
            hiddenGalleryItems.forEach(item => {
                if (isShowing) {
                    item.classList.add('show');
                } else {
                    item.classList.remove('show');
                }
            });
            
            if (isShowing) {
                if (btnText) btnText.innerText = "Show Less";
                if (btnIcon) {
                    btnIcon.className = "fas fa-chevron-up";
                }
            } else {
                if (btnText) btnText.innerText = "View More";
                if (btnIcon) {
                    btnIcon.className = "fas fa-chevron-down";
                }
                
                // Smooth scroll back to gallery section top if they collapse
                const gallerySection = document.getElementById('gallery');
                if (gallerySection) {
                    gallerySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    }

    // ==========================================================================
    // 8.6 Scrollspy: Show active navbar menu link on scroll
    // ==========================================================================
    const spySections = document.querySelectorAll('header, section');
    const navItems = document.querySelectorAll('.nav-links a:not(.nav-cta)');

    const scrollSpy = () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 160; // offset for nav height

        spySections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const id = section.getAttribute('id');

            if (id && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = id;
            }
        });

        // Fallback for bottom of the page to highlight contact
        if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50) {
            currentSectionId = 'contact';
        }

        navItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href');
            if (href === `#${currentSectionId}`) {
                item.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', scrollSpy);
    scrollSpy(); // run immediately on load

});

// ==========================================================================
// 9. Collapsible Leadership Messages (Read More / Show Less Toggle)
// ==========================================================================
window.toggleLeaderMessage = (button) => {
    const wrapper = button.previousElementSibling;
    if (!wrapper) return;

    const isExpanded = wrapper.classList.toggle('expanded');
    button.classList.toggle('active', isExpanded);

    const btnText = button.querySelector('span');
    const btnIcon = button.querySelector('i');

    if (isExpanded) {
        if (btnText) btnText.innerText = "Show Less";
        if (btnIcon) {
            btnIcon.className = "fas fa-chevron-up";
        }
    } else {
        if (btnText) btnText.innerText = "Read Full Message";
        if (btnIcon) {
            btnIcon.className = "fas fa-chevron-down";
        }
        
        // Smooth scroll back to leader card top if they are far down
        const card = button.closest('.leader-card');
        if (card) {
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
};
