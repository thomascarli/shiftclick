/* ================================================
   SHIFTCLICK - Interactive Scripts
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initScrollReveal();
    initParallax();
    initTiltEffect();
    initMouseTrail();
    initTypewriter();
});

/* ================================================
   CUSTOM CURSOR
   ================================================ */

function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (!cursor || !follower) return;
    
    // Check if device has touch (skip cursor on mobile)
    if ('ontouchstart' in window) {
        cursor.style.display = 'none';
        follower.style.display = 'none';
        return;
    }
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor animation
    function animateCursor() {
        // Cursor follows immediately
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        // Follower has more lag
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .skill-card, .project-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });
}

/* ================================================
   SCROLL REVEAL
   ================================================ */

function initScrollReveal() {
    const sections = document.querySelectorAll('section:not(.hero)');
    
    const observerOptions = {
        root: null,
        rootMargin: '-50px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Staggered reveal for skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Staggered reveal for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });
}

/* ================================================
   PARALLAX EFFECT
   ================================================ */

function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    const floatingCubes = document.querySelectorAll('.floating-cubes .cube');
    const rotatingBlock = document.querySelector('.rotating-block');
    const aboutSection = document.querySelector('.about');
    
    let ticking = false;
    
    // Scattered state - faces exploded outward with random rotations
    // Each face has: tx, ty, tz (translate), rx, ry, rz (rotate), opacity
    const scattered = {
        front:  { tx: -120, ty: -80,  tz: 200,  rx: 45,  ry: -30, rz: 15,  opacity: 0.4 },
        back:   { tx: 100,  ty: 60,   tz: -180, rx: -20, ry: 150, rz: -25, opacity: 0.3 },
        right:  { tx: 180,  ty: -40,  tz: 80,   rx: 30,  ry: 120, rz: 45,  opacity: 0.35 },
        left:   { tx: -160, ty: 90,   tz: -60,  rx: -60, ry: -80, rz: -30, opacity: 0.45 },
        top:    { tx: 40,   ty: -150, tz: 120,  rx: 140, ry: 25,  rz: 20,  opacity: 0.3 },
        bottom: { tx: -60,  ty: 140,  tz: -100, rx: -120,ry: -15, rz: -40, opacity: 0.4 }
    };
    
    // Assembled cube state - perfect cube formation
    const assembled = {
        front:  { tx: 0, ty: 0, tz: 75,  rx: 0,   ry: 0,    rz: 0, opacity: 1 },
        back:   { tx: 0, ty: 0, tz: -75, rx: 0,   ry: 180,  rz: 0, opacity: 1 },
        right:  { tx: 75, ty: 0, tz: 0,  rx: 0,   ry: 90,   rz: 0, opacity: 1 },
        left:   { tx: -75, ty: 0, tz: 0, rx: 0,   ry: -90,  rz: 0, opacity: 1 },
        top:    { tx: 0, ty: -75, tz: 0, rx: 90,  ry: 0,    rz: 0, opacity: 1 },
        bottom: { tx: 0, ty: 75, tz: 0,  rx: -90, ry: 0,    rz: 0, opacity: 1 }
    };
    
    // Interpolate between values
    function lerp(a, b, t) {
        return a + (b - a) * t;
    }
    
    // Apply the current state to the rotating block faces
    function applyState(progress) {
        if (!rotatingBlock) return;
        
        const faces = {
            front: rotatingBlock.querySelector('.block-face.front'),
            back: rotatingBlock.querySelector('.block-face.back'),
            right: rotatingBlock.querySelector('.block-face.right'),
            left: rotatingBlock.querySelector('.block-face.left'),
            top: rotatingBlock.querySelector('.block-face.top'),
            bottom: rotatingBlock.querySelector('.block-face.bottom')
        };
        
        // Use eased progress for smoother feel
        const easedProgress = easeOutQuart(progress);
        
        for (const [faceName, face] of Object.entries(faces)) {
            if (!face) continue;
            
            const from = scattered[faceName];
            const to = assembled[faceName];
            
            // Interpolate all transform values
            const tx = lerp(from.tx, to.tx, easedProgress);
            const ty = lerp(from.ty, to.ty, easedProgress);
            const tz = lerp(from.tz, to.tz, easedProgress);
            const rx = lerp(from.rx, to.rx, easedProgress);
            const ry = lerp(from.ry, to.ry, easedProgress);
            const rz = lerp(from.rz, to.rz, easedProgress);
            const opacity = lerp(from.opacity, to.opacity, easedProgress);
            
            face.style.transform = `
                translate3d(${tx}px, ${ty}px, ${tz}px)
                rotateX(${rx}deg)
                rotateY(${ry}deg)
                rotateZ(${rz}deg)
            `;
            face.style.opacity = opacity;
        }
    }
    
    function updateParallax() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Floating cubes parallax
        floatingCubes.forEach((cube, index) => {
            const speed = 0.3 + (index * 0.1);
            const yOffset = scrollY * speed;
            cube.style.transform = `translateY(${-yOffset}px)`;
        });
        
        // Assembly effect based on scroll position
        if (rotatingBlock && aboutSection) {
            const aboutRect = aboutSection.getBoundingClientRect();
            const sectionTop = aboutRect.top;
            const sectionHeight = aboutRect.height;
            
            // Calculate progress: 0 = scattered, 1 = assembled
            // Stays scattered until section is well into view
            // Fully assembles when section is near top/scrolling past
            const startOffset = windowHeight * 0.35;  // Start assembling a bit later
            const endOffset = -sectionHeight * 0.3;   // Fully assembled when scrolled past
            const progress = Math.max(0, Math.min(1, 
                (startOffset - sectionTop) / (startOffset - endOffset)
            ));
            
            applyState(progress);
        }
        
        ticking = false;
    }
    
    // Easing functions
    function easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
    
    // Initial call to set starting state
    updateParallax();
}

/* ================================================
   TILT EFFECT ON CARDS
   ================================================ */

function initTiltEffect() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

/* ================================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ================================================ */

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

/* ================================================
   PAGE TRANSITION EFFECT
   ================================================ */

// Add loading state
document.body.style.opacity = '0';
window.addEventListener('load', () => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
});

// Smooth navigation transitions
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.getAttribute('href').endsWith('.html')) {
            e.preventDefault();
            const href = this.getAttribute('href');
            document.body.style.opacity = '0';
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        }
    });
});

/* ================================================
   MOUSE TRAIL EFFECT
   ================================================ */

function initMouseTrail() {
    const canvas = document.getElementById('trailCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const ctaSection = document.querySelector('.cta');
    if (!ctaSection) return;
    
    // Trail points array - each point has x, y, and timestamp
    let points = [];
    const maxAge = 2000; // Points fade out after 2 seconds
    const minDistance = 5; // Minimum distance between points
    
    // Resize canvas to match section
    function resizeCanvas() {
        const rect = ctaSection.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Track mouse movement within the CTA section
    ctaSection.addEventListener('mousemove', (e) => {
        const rect = ctaSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Only add point if moved enough distance from last point
        if (points.length === 0) {
            points.push({ x, y, time: Date.now() });
        } else {
            const lastPoint = points[points.length - 1];
            const distance = Math.sqrt(Math.pow(x - lastPoint.x, 2) + Math.pow(y - lastPoint.y, 2));
            
            if (distance >= minDistance) {
                points.push({ x, y, time: Date.now() });
            }
        }
    });
    
    // Clear points when mouse leaves
    ctaSection.addEventListener('mouseleave', () => {
        // Don't clear immediately - let them fade naturally
    });
    
    // Animation loop
    function animate() {
        const now = Date.now();
        
        // Remove old points
        points = points.filter(point => now - point.time < maxAge);
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw trail
        if (points.length > 1) {
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            
            // Draw line segments with varying opacity based on age
            for (let i = 1; i < points.length; i++) {
                const point = points[i];
                const prevPoint = points[i - 1];
                const age = now - point.time;
                const opacity = 1 - (age / maxAge);
                
                // Line gets thinner as it ages
                const lineWidth = 3 * opacity + 1;
                
                ctx.beginPath();
                ctx.moveTo(prevPoint.x, prevPoint.y);
                ctx.lineTo(point.x, point.y);
                
                // Blue gradient based on opacity
                ctx.strokeStyle = `rgba(48, 134, 248, ${opacity * 0.8})`;
                ctx.lineWidth = lineWidth;
                ctx.stroke();
                
                // Add glow effect
                ctx.shadowColor = 'rgba(48, 134, 248, 0.5)';
                ctx.shadowBlur = 10 * opacity;
            }
            
            // Reset shadow
            ctx.shadowBlur = 0;
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

/* ================================================
   TYPEWRITER EFFECT
   ================================================ */

function initTypewriter() {
    const element = document.getElementById('typewriter');
    if (!element) return;
    
    const words = [
        'Strange',
        'Memorable', 
        'Weird',
        'Bizarre',
        'Unique',
        'Odd',
        'Peculiar',
        'Fun',
        'Funny'
    ];
    
    let wordIndex = 0;
    let charIndex = 1;
    let isDeleting = false;
    let isPaused = false;
    let isWaitingToType = false;
    
    const typeSpeed = 280;        // Very slow, deliberate typing
    const deleteSpeed = 150;      // Slower delete too
    const pauseAfterWord = 3000;  // Pause to read the completed word
    const pauseWithCursor = 1200; // Pause with just cursor before typing next word
    
    // Start with first word's first character visible
    element.innerHTML = words[0].charAt(0);
    
    function updateText(text) {
        // Use non-breaking space if empty to maintain line height
        element.innerHTML = text || '&nbsp;';
    }
    
    function type() {
        const currentWord = words[wordIndex];
        
        // Pause after completing a word (before deleting)
        if (isPaused) {
            isPaused = false;
            setTimeout(type, pauseAfterWord);
            return;
        }
        
        // Pause with empty/cursor before typing next word
        if (isWaitingToType) {
            isWaitingToType = false;
            wordIndex = (wordIndex + 1) % words.length;
            charIndex = 0;
            setTimeout(type, pauseWithCursor);
            return;
        }
        
        if (isDeleting) {
            charIndex--;
            
            if (charIndex <= 0) {
                // Show empty with just cursor, wait before starting next word
                updateText('');
                isDeleting = false;
                isWaitingToType = true;
                setTimeout(type, 100); // Brief moment then trigger wait
                return;
            }
            
            updateText(currentWord.substring(0, charIndex));
            setTimeout(type, deleteSpeed);
        } else {
            charIndex++;
            updateText(words[wordIndex].substring(0, charIndex));
            
            if (charIndex >= words[wordIndex].length) {
                isDeleting = true;
                isPaused = true;
            }
            
            setTimeout(type, typeSpeed);
        }
    }
    
    // Start the typewriter effect after initial animations complete
    setTimeout(type, 2000);
}

