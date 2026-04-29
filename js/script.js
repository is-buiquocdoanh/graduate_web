// ========================================
// Graduation Invitation - JavaScript
// ========================================

// Global Variables
let currentSlide = 0;
const totalSlides = 40;
let slideInterval;
let zoomLevel = 1;

// DOM Elements
const slideshow = document.getElementById('slideshow');
const indicators = document.getElementById('indicators');
const loadingScreen = document.getElementById('loading-screen');
const lightboxModal = document.getElementById('image-lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const campusMapImg = document.getElementById('campus-map-img');

// ========================================
// Initialization
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initSlideshow();
    initLightbox();
    initMapZoom();
    initAttendanceForm();
    initWelcomeFireworks();
    hideLoadingScreen();
});

// Hide Loading Screen
function hideLoadingScreen() {
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
    }, 1500);
}

// ========================================
// Welcome Fireworks
// ========================================

function initWelcomeFireworks() {
    const canvas = document.getElementById('fireworks-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];
    const colors = ['#ffffff', '#fff4c2', '#ffd166', '#f6ad55', '#90cdf4', '#f687b3'];
    let animationFrame;
    let launchTimer;
    let isRunning = true;

    function resizeCanvas() {
        canvas.width = window.innerWidth * window.devicePixelRatio;
        canvas.height = window.innerHeight * window.devicePixelRatio;
        ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    }

    function createFirework(x, y) {
        const count = 58 + Math.floor(Math.random() * 22);
        const color = colors[Math.floor(Math.random() * colors.length)];

        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            const speed = 2.2 + Math.random() * 4.2;
            particles.push({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                alpha: 1,
                size: 1.4 + Math.random() * 2.4,
                color
            });
        }
    }

    function launchFirework() {
        const x = window.innerWidth * (0.16 + Math.random() * 0.68);
        const y = window.innerHeight * (0.14 + Math.random() * 0.36);
        createFirework(x, y);
    }

    function animateFireworks() {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.globalCompositeOperation = 'lighter';

        for (let i = particles.length - 1; i >= 0; i--) {
            const particle = particles[i];
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.035;
            particle.vx *= 0.985;
            particle.vy *= 0.985;
            particle.alpha -= 0.014;

            if (particle.alpha <= 0) {
                particles.splice(i, 1);
                continue;
            }

            ctx.globalAlpha = particle.alpha;
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.globalAlpha = 1;

        if (isRunning || particles.length) {
            animationFrame = requestAnimationFrame(animateFireworks);
        } else {
            canvas.remove();
        }
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    launchFirework();
    setTimeout(launchFirework, 350);
    setTimeout(launchFirework, 700);

    launchTimer = setInterval(launchFirework, 650);
    animationFrame = requestAnimationFrame(animateFireworks);

    setTimeout(() => {
        isRunning = false;
        clearInterval(launchTimer);
        canvas.classList.add('hidden');
        window.removeEventListener('resize', resizeCanvas);

        setTimeout(() => {
            if (!particles.length) {
                cancelAnimationFrame(animationFrame);
                canvas.remove();
            }
        }, 1200);
    }, 4200);
}

// ========================================
// Slideshow Functions
// ========================================

function initSlideshow() {
    // Set initial position
    updateSlideshowPosition();
    
    // Auto-advance slides every 5 seconds
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
    
    // Pause on hover
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        slideshowContainer.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                changeSlide(1);
            }, 5000);
        });
    }
}

function changeSlide(direction) {
    currentSlide += direction;
    
    // Wrap around
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    
    updateSlideshowPosition();
    updateIndicators();
}

function updateSlideshowPosition() {
    if (slideshow) {
        const offset = -currentSlide * 100;
        slideshow.style.transform = `translateX(${offset}%)`;
    }
}

function updateIndicators() {
    if (!indicators) return;
    
    const dots = indicators.querySelectorAll('.indicator');
    const indicatorIndex = currentSlide % dots.length; // Wrap around indicators
    
    dots.forEach((dot, index) => {
        if (index === indicatorIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
    
    // Update caption
    const slides = document.querySelectorAll('.slide');
    const captionText = document.getElementById('caption-text');
    if (slides[currentSlide] && captionText) {
        const caption = slides[currentSlide].getAttribute('data-caption');
        captionText.textContent = caption || '';
    }
}

// Click on indicator to go to specific slide
if (indicators) {
    const dots = indicators.querySelectorAll('.indicator');
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlideshowPosition();
            updateIndicators();
        });
    });
}

// ========================================
// Lightbox Functions
// ========================================

function initLightbox() {
    const zoomBtn = document.getElementById('zoom-btn');
    const lightboxClose = document.getElementById('lightbox-close');
    const zoomInBtn = document.getElementById('zoom-in-btn');
    const zoomOutBtn = document.getElementById('zoom-out-btn');
    const resetZoomBtn = document.getElementById('reset-zoom-btn');
    
    // Open lightbox
    if (zoomBtn) {
        zoomBtn.addEventListener('click', openLightbox);
    }
    
    // Also open on image click
    if (campusMapImg) {
        campusMapImg.addEventListener('click', openLightbox);
    }
    
    // Close lightbox
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    // Close on overlay click
    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                closeLightbox();
            }
        });
    }
    
    // Zoom controls
    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', () => zoomLightboxImage(0.2));
    }
    
    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', () => zoomLightboxImage(-0.2));
    }
    
    if (resetZoomBtn) {
        resetZoomBtn.addEventListener('click', resetLightboxZoom);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightboxModal.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === '+' || e.key === '=') {
            zoomLightboxImage(0.2);
        } else if (e.key === '-') {
            zoomLightboxImage(-0.2);
        }
    });
}

function openLightbox() {
    if (!campusMapImg || !lightboxModal || !lightboxImage) return;
    
    // Get the source from the campus map image
    const imgSrc = campusMapImg.src;
    lightboxImage.src = imgSrc;
    lightboxImage.style.transform = 'scale(1)';
    zoomLevel = 1;
    
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    if (!lightboxModal) return;
    
    lightboxModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function zoomLightboxImage(delta) {
    if (!lightboxImage) return;
    
    zoomLevel += delta;
    
    // Limit zoom range
    if (zoomLevel < 0.5) zoomLevel = 0.5;
    if (zoomLevel > 3) zoomLevel = 3;
    
    lightboxImage.style.transform = `scale(${zoomLevel})`;
}

function resetLightboxZoom() {
    if (!lightboxImage) return;
    
    zoomLevel = 1;
    lightboxImage.style.transform = 'scale(1)';
}

// ========================================
// Map Zoom Functions
// ========================================

function initMapZoom() {
    const campusMapImg = document.getElementById('campus-map-img');
    
    if (campusMapImg) {
        // Add click handler for zoom
        campusMapImg.parentElement.addEventListener('click', function(e) {
            // Only trigger if not clicking the zoom button
            if (!e.target.closest('.zoom-btn')) {
                openLightbox();
            }
        });
    }
}

// ========================================
// Attendance Form Functions
// ========================================

function initAttendanceForm() {
    const attendanceForm = document.getElementById('attendanceForm');
    const submitBtn = document.getElementById('attendanceSubmitBtn');
    const successMsg = document.getElementById('attendanceSuccessMsg');

    if (!attendanceForm || !submitBtn || !successMsg) return;

    attendanceForm.addEventListener('submit', function() {
        submitBtn.disabled = true;
        submitBtn.classList.add('is-loading');
        successMsg.classList.remove('visible');

        setTimeout(() => {
            attendanceForm.reset();
            submitBtn.disabled = false;
            submitBtn.classList.remove('is-loading');
            successMsg.classList.add('visible');
        }, 1200);
    });
}

// ========================================
// Google Maps Functions
// ========================================

// Note: Google Maps API key is required for full functionality
// The map embed works without a key for basic display

function initMap() {
    // Map initialization code
    // This requires a valid Google Maps API key
    
    const mapElement = document.getElementById('google-map');
    const directionsBtn = document.getElementById('directions-btn');
    const streetViewBtn = document.getElementById('street-view-btn');
    
    if (directionsBtn) {
        directionsBtn.style.display = 'flex';
    }
    
    if (streetViewBtn) {
        streetViewBtn.style.display = 'flex';
    }
}

// ========================================
// YouTube Player Functions
// ========================================

// YouTube API ready callback
function onYouTubeIframeAPIReady() {
    // Player is initialized via iframe directly in HTML
    console.log('YouTube API ready');
}

// Handle YouTube player errors
window.addEventListener('error', function(e) {
    if (e.message && e.message.includes('YouTube')) {
        console.log('YouTube player error handled');
    }
});

// ========================================
// Utility Functions
// ========================================

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading state for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.classList.add('loaded');
    });
    
    // If already loaded
    if (img.complete) {
        img.classList.add('loaded');
    }
});

// ========================================
// Animation on Scroll
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// ========================================
// Export Functions (for global access)
// ========================================

// Make functions available globally for onclick handlers
window.changeSlide = changeSlide;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.zoomLightboxImage = zoomLightboxImage;
window.resetLightboxZoom = resetLightboxZoom;
