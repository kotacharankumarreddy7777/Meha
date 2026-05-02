// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
});

// Preloader Animation
function initPreloader() {
    const tl = gsap.timeline({
        onComplete: () => {
            document.body.style.overflow = 'auto'; // Re-enable scroll
            initHeroAnimations();
            initNavbarScroll();
            initScrollReveals();
            initParallax();
            initMobileMenu();
            initProductInteractions();
        }
    });

    document.body.style.overflow = 'hidden'; // Lock scroll during preloader

    tl.to('.bar-progress', {
        left: 0,
        duration: 1.5,
        ease: 'power2.inOut'
    })
    .to('.preloader-logo', {
        opacity: 0,
        y: -20,
        duration: 0.8,
        delay: 0.5
    })
    .to('.preloader-bar', {
        opacity: 0,
        duration: 0.5
    }, '-=0.5')
    .to('.preloader-text', {
        opacity: 0,
        duration: 0.5
    }, '-=0.5')
    .to('#preloader', {
        yPercent: -100,
        duration: 1.2,
        ease: 'expo.inOut'
    });
}


// Hero Animations
function initHeroAnimations() {
    const tl = gsap.timeline();

    tl.from('.hero-bg img', {
        scale: 1.2,
        duration: 2,
        ease: 'power2.out'
    })
    .from('.stagger-text', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    }, '-=1.5')
    .from('.scroll-indicator', {
        opacity: 0,
        y: -20,
        duration: 1
    }, '-=0.5');
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    ScrollTrigger.create({
        start: 'top -100',
        onUpdate: (self) => {
            if (self.direction === 1) {
                gsap.to(navbar, { y: -100, duration: 0.3 });
            } else {
                gsap.to(navbar, { y: 0, duration: 0.3 });
            }
            
            if (self.scroll() > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
}

// Scroll Reveals
function initScrollReveals() {
    // Reveal Text
    const revealTexts = document.querySelectorAll('.reveal-text');
    revealTexts.forEach(text => {
        gsap.from(text, {
            scrollTrigger: {
                trigger: text,
                start: 'top 80%',
            },
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power2.out'
        });
    });

    // Reveal Items (Cards)
    const revealItems = document.querySelectorAll('.reveal-item');
    revealItems.forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
            },
            y: 50,
            opacity: 0,
            duration: 1,
            delay: index % 3 * 0.2, // Stagger effect based on grid row
            ease: 'power3.out'
        });
    });

    // Reveal Left
    gsap.from('.reveal-left', {
        scrollTrigger: {
            trigger: '.reveal-left',
            start: 'top 80%',
        },
        x: -100,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out'
    });

    // Reveal Right
    gsap.from('.reveal-right', {
        scrollTrigger: {
            trigger: '.reveal-right',
            start: 'top 80%',
        },
        x: 100,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out'
    });
}

// Parallax Effect
function initParallax() {
    gsap.to('.parallax-bg', {
        scrollTrigger: {
            trigger: '#parallax-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        },
        y: '20%',
        ease: 'none'
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');

    toggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        toggle.classList.toggle('active');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            toggle.classList.remove('active');
        });
    });
}

// Product Interactions
function initProductInteractions() {
    const cartBtn = document.querySelectorAll('.add-to-cart');
    const bespokeBtn = document.querySelector('.cta-nav');
    const wishlistIcon = document.querySelector('button[title="Wishlist"] .count');
    const cartIcon = document.querySelector('button[title="Cart"] .count');

    let wishlistCount = 0;
    let cartCount = 0;

    cartBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            const productName = btn.closest('.product-card').querySelector('h4').textContent;
            
            // Simple logic: add to cart (and counter)
            cartCount++;
            cartIcon.textContent = cartCount;
            
            // Subtle animation for the counter
            gsap.from(cartIcon, { scale: 1.5, duration: 0.3 });

            // Notify user
            showNotification(`${productName} added to cart`);
        });
    });

    bespokeBtn.addEventListener('click', () => {
        alert("Redirecting to our Bespoke Consultation service...");
    });

    // Handle generic icon clicks
    document.querySelectorAll('.nav-icon-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.getAttribute('title');
            if (type === 'Search') {
                showNotification("Search feature coming soon...");
            } else if (type === 'Wishlist') {
                showNotification(`You have ${wishlistCount} items in your wishlist.`);
            }
        });
    });
}

// Simple Toast Notification
function showNotification(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: var(--gold);
        color: var(--black);
        padding: 1rem 2rem;
        border-radius: 4px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    gsap.from(toast, { x: 100, opacity: 0, duration: 0.5 });
    
    setTimeout(() => {
        gsap.to(toast, { x: 100, opacity: 0, duration: 0.5, onComplete: () => toast.remove() });
    }, 3000);
}

// Smooth anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1.5,
                scrollTo: target,
                ease: 'power4.inOut'
            });
        }
    });
});
