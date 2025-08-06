// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    gsap.to(preloader, {
        opacity: 0,
        duration: 0.5,
        onComplete: function() {
            preloader.style.display = 'none';
        }
    });
});

// 3D Background
function initThreeJS() {
    const container = document.getElementById('threejs-background');
    if (!container) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    
    // Create floating clothing items
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const materials = [
        new THREE.MeshBasicMaterial({ color: 0x6a0dad, transparent: true, opacity: 0.5 }),
        new THREE.MeshBasicMaterial({ color: 0x9c27b0, transparent: true, opacity: 0.5 }),
        new THREE.MeshBasicMaterial({ color: 0x4a148c, transparent: true, opacity: 0.5 }),
        new THREE.MeshBasicMaterial({ color: 0xe91e63, transparent: true, opacity: 0.5 })
    ];
    
    const cubes = [];
    for (let i = 0; i < 15; i++) {
        const cube = new THREE.Mesh(geometry, materials[Math.floor(Math.random() * materials.length)]);
        cube.position.x = Math.random() * 20 - 10;
        cube.position.y = Math.random() * 20 - 10;
        cube.position.z = Math.random() * 20 - 10;
        cube.rotation.x = Math.random() * Math.PI;
        cube.rotation.y = Math.random() * Math.PI;
        cube.scale.setScalar(Math.random() * 0.5 + 0.5);
        scene.add(cube);
        cubes.push(cube);
    }
    
    camera.position.z = 5;
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        cubes.forEach(cube => {
            cube.rotation.x += 0.005;
            cube.rotation.y += 0.01;
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize 3D background
    initThreeJS();
    
    // Card animations
    const clothingCards = document.querySelectorAll('.clothing-card');
    
    clothingCards.forEach((card, index) => {
        // Add tilt effect
        VanillaTilt.init(card, {
            max: 5,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
        });
        
        // Scroll animation
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
    
    // Wishlist functionality
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            this.innerHTML = this.classList.contains('active') ? 
                '<i class="fas fa-heart"></i>' : 
                '<i class="far fa-heart"></i>';
            
            // Animation
            gsap.to(this, {
                scale: 1.3,
                duration: 0.2,
                yoyo: true,
                repeat: 1
            });
        });
    });
    
    // Quick view functionality
    const quickViews = document.querySelectorAll('.quick-view');
    quickViews.forEach(view => {
        view.addEventListener('click', function() {
            const card = this.closest('.clothing-card');
            const imgSrc = card.querySelector('img').src;
            const title = card.querySelector('h3').textContent;
            const price = card.querySelector('.price-tag').textContent;
            
            // Create modal
            const modal = document.createElement('div');
            modal.className = 'quick-view-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <div class="modal-image">
                        <img src="${imgSrc}" alt="${title}">
                    </div>
                    <div class="modal-info">
                        <h3>${title}</h3>
                        <div class="modal-price">${price}</div>
                        <p>Detailed description of the product would go here with all features and benefits.</p>
                        <a href="${card.querySelector('a').href}" class="btn btn-primary" target="_blank">Buy Now</a>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';
            
            // Close modal
            modal.querySelector('.close-modal').addEventListener('click', function() {
                document.body.removeChild(modal);
                document.body.style.overflow = '';
            });
            
            // Click outside to close
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                    document.body.style.overflow = '';
                }
            });
        });
    });
    
    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Quick View Modal Styles (dynamically added)
const quickViewModalStyles = document.createElement('style');
quickViewModalStyles.textContent = `
    .quick-view-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        opacity: 0;
        animation: fadeIn 0.3s forwards;
    }
    
    @keyframes fadeIn {
        to { opacity: 1; }
    }
    
    .modal-content {
        background: white;
        border-radius: 15px;
        overflow: hidden;
        max-width: 900px;
        width: 90%;
        display: flex;
        flex-direction: column;
        box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
    }
    
    .close-modal {
        position: absolute;
        top: 15px;
        right: 15px;
        font-size: 2rem;
        color: white;
        cursor: pointer;
        z-index: 2;
    }
    
    .modal-image {
        height: 300px;
        overflow: hidden;
    }
    
    .modal-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .modal-info {
        padding: 30px;
    }
    
    .modal-info h3 {
        font-size: 1.8rem;
        color: var(--primary-color);
        margin-bottom: 10px;
    }
    
    .modal-price {
        font-size: 1.5rem;
        color: var(--accent-color);
        font-weight: bold;
        margin-bottom: 20px;
    }
    
    .modal-info p {
        margin-bottom: 30px;
        line-height: 1.6;
    }
    
    @media (min-width: 768px) {
        .modal-content {
            flex-direction: row;
            max-height: 500px;
        }
        
        .modal-image {
            height: auto;
            flex: 1;
        }
        
        .modal-info {
            flex: 1;
            padding: 40px;
        }
    }
    
    @media (max-width: 576px) {
        .modal-image {
            height: 200px;
        }
    }
`;
document.head.appendChild(quickViewModalStyles);
