// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// Handle resource request buttons
const resourceButtons = document.querySelectorAll('[data-inquiry]');
resourceButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const inquiryType = button.getAttribute('data-inquiry');
        const inquirySelect = document.getElementById('inquiry-type');
        
        if (inquirySelect) {
            inquirySelect.value = inquiryType;
        }
        
        // Smooth scroll to contact form
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.12)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    }
    
    lastScroll = currentScroll;
});

// Form submission handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            company: document.getElementById('company').value,
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            inquiryType: document.getElementById('inquiry-type').value,
            message: document.getElementById('message').value
        };
        
        // In a real implementation, you would send this data to a server
        console.log('Form submitted:', formData);
        
        // Show success message
        alert('お問い合わせありがとうございます。\n2営業日以内にご返信させていただきます。');
        
        // Reset form
        contactForm.reset();
        
        // In a real implementation, you might want to:
        // 1. Send data to a backend API
        // 2. Use a service like Formspree, EmailJS, or Google Forms
        // 3. Integrate with your CRM system
        
        // Example API call (commented out):
        /*
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            alert('お問い合わせありがとうございます。\n2営業日以内にご返信させていただきます。');
            contactForm.reset();
        })
        .catch(error => {
            alert('送信中にエラーが発生しました。\n後ほど再度お試しください。');
            console.error('Error:', error);
        });
        */
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in effect to elements
const fadeElements = document.querySelectorAll('.problem-card, .service-card, .pricing-card, .value-card, .trust-card, .flow-step');
fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-image');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Preload images for better performance
const preloadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
};

// Run when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    preloadImages();
    
    // Add active class to current nav item
    const currentPath = window.location.hash;
    if (currentPath) {
        const activeLink = document.querySelector(`.nav-link[href="${currentPath}"]`);
        if (activeLink) {
            activeLink.style.color = 'var(--accent-color)';
        }
    }
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            mobileMenu.classList.remove('active');
        }
    }, 250);
});
