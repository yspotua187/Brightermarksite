// Brighter Mark Enterprises LLC - Navigation JavaScript
// Enhanced navigation functionality

document.addEventListener('DOMContentLoaded', function() {
    // Enhanced mobile navigation toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('.header');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            mobileToggle.innerHTML = navMenu.classList.contains('active') ? '✕' : '☰';
            mobileToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileToggle.innerHTML = '☰';
                    mobileToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.nav') && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileToggle.innerHTML = '☰';
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close mobile menu on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileToggle.innerHTML = '☰';
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // Header scroll effect
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        if (header) {
            if (window.scrollY > 100) {
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                header.style.background = 'white';
                header.style.backdropFilter = 'none';
            }
            
            // Hide/show header on scroll
            if (window.scrollY > lastScrollY && window.scrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollY = window.scrollY;
        }
    });
    
    // Smooth scrolling for anchor links with offset
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#' || href === '#0') return;
            
            // Don't prevent default for same-page anchors
            if (href.startsWith('#')) {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without page jump
                    if (history.pushState) {
                        history.pushState(null, null, href);
                    } else {
                        location.hash = href;
                    }
                }
            }
        });
    });
    
    // Active navigation highlighting with intersection observer
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    if (sections.length > 0 && navLinks.length > 0) {
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '-20% 0px -60% 0px'
        };
        
        const sectionObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);
        
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }
    
    // Add loading state for page transitions
    const allLinks = document.querySelectorAll('a[href]');
    allLinks.forEach(link => {
        if (link.hostname === window.location.hostname && !link.hash) {
            link.addEventListener('click', function(e) {
                // Add loading indicator for same-domain links
                if (!this.classList.contains('no-loading')) {
                    this.classList.add('loading');
                    setTimeout(() => {
                        this.classList.remove('loading');
                    }, 1000);
                }
            });
        }
    });
    
    // Keyboard navigation for menu
    if (navMenu) {
        navMenu.addEventListener('keydown', function(e) {
            const links = this.querySelectorAll('.nav-link');
            const currentIndex = Array.from(links).indexOf(document.activeElement);
            
            switch(e.key) {
                case 'ArrowDown':
                case 'ArrowRight':
                    e.preventDefault();
                    const nextIndex = (currentIndex + 1) % links.length;
                    links[nextIndex].focus();
                    break;
                case 'ArrowUp':
                case 'ArrowLeft':
                    e.preventDefault();
                    const prevIndex = (currentIndex - 1 + links.length) % links.length;
                    links[prevIndex].focus();
                    break;
                case 'Home':
                    e.preventDefault();
                    links[0].focus();
                    break;
                case 'End':
                    e.preventDefault();
                    links[links.length - 1].focus();
                    break;
            }
        });
    }
    
    // Add focus styles for keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Add CSS for focus states
    const focusStyles = document.createElement('style');
    focusStyles.textContent = `
        .keyboard-navigation .nav-link:focus,
        .keyboard-navigation a:focus,
        .keyboard-navigation button:focus {
            outline: 2px solid var(--primary-blue);
            outline-offset: 2px;
        }
        
        .nav-link.loading {
            position: relative;
            color: transparent;
        }
        
        .nav-link.loading::after {
            content: '';
            position: absolute;
            width: 16px;
            height: 16px;
            top: 50%;
            left: 50%;
            margin-left: -8px;
            margin-top: -8px;
            border: 2px solid var(--primary-blue);
            border-radius: 50%;
            border-top-color: transparent;
            animation: spin 1s ease-in-out infinite;
        }
    `;
    document.head.appendChild(focusStyles);
    
    console.log('Enhanced navigation initialized');
});