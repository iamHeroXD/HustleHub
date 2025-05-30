document.addEventListener('DOMContentLoaded', function() {
    // Initialize filter functionality
    const categoryFilter = document.getElementById('category-filter');
    const premiumFilter = document.getElementById('premium-filter');
    const freelancerCards = document.querySelectorAll('.hire-card');

    // Filter function
    function filterFreelancers() {
        const categoryValue = categoryFilter.value;
        const premiumValue = premiumFilter.value;

        freelancerCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardStatus = card.getAttribute('data-status');

            // Check category filter
            const categoryMatch = categoryValue === 'all' || cardCategory.includes(categoryValue);
            
            // Check premium filter
            let premiumMatch = true;
            if (premiumValue === 'premium') {
                premiumMatch = cardStatus.includes('premium');
            } else if (premiumValue === 'verified') {
                premiumMatch = cardStatus.includes('verified');
            }

            // Show/hide card based on filters
            if (categoryMatch && premiumMatch) {
                card.style.display = 'block';
                
                // Animate appearance
                gsap.from(card, {
                    opacity: 0,
                    y: 20,
                    duration: 0.5,
                    ease: "power2.out"
                });
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Add event listeners
    categoryFilter.addEventListener('change', filterFreelancers);
    premiumFilter.addEventListener('change', filterFreelancers);

    // Initialize card animations
    gsap.registerPlugin(ScrollTrigger);

    freelancerCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: index * 0.1,
            ease: "back.out(1.2)"
        });
    });

    // Add hover effects for premium cards
    const premiumCards = document.querySelectorAll('.hire-card.premium');
    
    premiumCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card.querySelector('.card-glow'), {
                opacity: 1,
                duration: 0.3
            });
            
            gsap.to(card, {
                boxShadow: '0 15px 35px rgba(241, 196, 15, 0.4)',
                duration: 0.3
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card.querySelector('.card-glow'), {
                opacity: 0,
                duration: 0.3
            });
            
            gsap.to(card, {
                boxShadow: '0 5px 20px rgba(241, 196, 15, 0.2)',
                duration: 0.3
            });
        });
    });

    // Portfolio image zoom effect
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                scale: 1.05,
                duration: 0.3
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                scale: 1,
                duration: 0.3
            });
        });
    });
});