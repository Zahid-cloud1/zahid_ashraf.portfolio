// Initialize Icons
lucide.createIcons();

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// --- MOBILE MENU LOGIC ---
const mobileToggle = document.getElementById('mobileToggle');
const closeMenu = document.getElementById('closeMenu');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMenu() {
    mobileMenu.classList.toggle('active');
    // Prevent body scrolling when menu is open
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
}

mobileToggle.addEventListener('click', toggleMenu);
closeMenu.addEventListener('click', toggleMenu);
mobileLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
});

// --- SCROLL REVEAL ANIMATION (Intersection Observer) ---
const revealElements = document.querySelectorAll('.reveal');

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Run once
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealOnScroll.observe(el);
});

// --- ACTIVE NAV LINK UPDATER ---
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// --- FUNCTIONAL MAILTO CONTACT FORM LOGIC ---
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value.trim();

    // Recipient email address
    const targetEmail = "zahidashraf.shopifyexpert@gmail.com";

    // Format the Subject line for the email
    const emailSubject = encodeURIComponent(`Portfolio Inquiry: ${subject} from ${name}`);
    
    // Format the Body content for the email
    const emailBody = encodeURIComponent(
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Project Type: ${subject}\n\n` +
        `Message:\n${message}\n\n` +
        `----------------------------------------\n` +
        `Sent from zahidashraf.com portfolio website.`
    );

    // Build the mailto link
    const mailtoLink = `mailto:${targetEmail}?subject=${emailSubject}&body=${emailBody}`;

    // UI Feedback: Show sending state briefly
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = 'Opening Mail Client...';
    submitBtn.disabled = true;

    // Trigger the email client to open
    window.location.href = mailtoLink;

    // Show success message and reset form
    setTimeout(() => {
        formStatus.style.color = '#22D3EE'; // Cyan accent color
        formStatus.textContent = 'If your mail client did not open automatically, please check your browser settings.';
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Reset the form inputs
        contactForm.reset();
        
        // Remove feedback after 8 seconds
        setTimeout(() => {
            formStatus.textContent = '';
        }, 8000);
    }, 1500);
});