// Animation for clothing cards
document.addEventListener('DOMContentLoaded', function() {
    const clothingCards = document.querySelectorAll('.clothing-card');
    
    clothingCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 0.5,
            delay: index * 0.1
        });
    });
});