document.addEventListener('DOMContentLoaded', () => {
    // 1. Fade in the body
    document.body.style.opacity = '1';

    // 2. Selectors
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // 3. Mobile Navigation Toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 4. Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(26, 26, 26, 0.98)';
            navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.boxShadow = 'none';
        }
    });

    // 5. Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve once animated to save resources
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply observer to all elements with .reveal class
    // (Add 'reveal' class to your HTML elements: project cards, stats, etc.)
    const animatedElements = document.querySelectorAll('.reveal, .project-card, .skill-item, .stat');
    animatedElements.forEach(el => {
        el.classList.add('reveal'); // Ensure they have the base transition class
        observer.observe(el);
    });
});

// Dropdown accessibility: sync aria-expanded / aria-hidden on hover and focus
document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.querySelector('.dropdown');
    if (!dropdown) return;
    const link = dropdown.querySelector('.dropdown-link');
    const menu = dropdown.querySelector('.dropdown-menu');
    if (!link || !menu) return;

    function open() {
        link.setAttribute('aria-expanded', 'true');
        menu.setAttribute('aria-hidden', 'false');
    }
    function close() {
        link.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-hidden', 'true');
    }

    dropdown.addEventListener('mouseenter', open);
    dropdown.addEventListener('mouseleave', close);
    dropdown.addEventListener('focusin', open);
    dropdown.addEventListener('focusout', (e) => {
        // if focus moved outside the dropdown, close
        if (!dropdown.contains(e.relatedTarget)) close();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') close();
    });
});