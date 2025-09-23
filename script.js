    // Accordion functionality
    function toggleAccordion(button) {
      const content = button.nextElementSibling;
      const isActive = button.classList.contains('active');
      
      // Close all other accordions
      document.querySelectorAll('.accordion-title').forEach(btn => {
        btn.classList.remove('active');
        btn.nextElementSibling.classList.remove('active');
        btn.nextElementSibling.style.maxHeight = '0';
      });
      
      if (!isActive) {
        button.classList.add('active');
        content.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    }

    // Create floating particles
    function createParticles() {
      const particlesContainer = document.getElementById('particles');
      const particleCount = 15;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size
        const size = Math.random() * 6 + 3;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 15 + 's';
        
        // Random animation duration
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        
        particlesContainer.appendChild(particle);
      }
    }

    // Initialize particles on page load
    document.addEventListener('DOMContentLoaded', createParticles);

    // Smooth scroll for better UX
    document.documentElement.style.scrollBehavior = 'smooth';

    // Add intersection observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
        }
      });
    }, observerOptions);

    // Observe all cards
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('.card').forEach(card => {
        observer.observe(card);
      });
    });
