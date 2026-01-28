document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Reveal Animation (Scroll to show)
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 2. Project Accordion Logic
    const accordions = document.querySelectorAll('.project-accordion');

    accordions.forEach(acc => {
        const header = acc.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            // Check if currently open
            const isOpen = acc.classList.contains('active');
            
            // Close all others (Optional: if you want only one open at a time)
            accordions.forEach(other => {
                other.classList.remove('active');
                other.querySelector('.accordion-body').style.maxHeight = null;
            });

            // Toggle current
            if (!isOpen) {
                acc.classList.add('active');
                const body = acc.querySelector('.accordion-body');
                body.style.maxHeight = body.scrollHeight + "px";
            }
        });
    });

    // 3. Smooth Scroll for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
