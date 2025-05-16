        // Navigation menu toggle
        document.addEventListener('DOMContentLoaded', () => {
            // Burger menu functionality
            const burger = document.querySelector('.burger');
            const nav = document.querySelector('.nav-links');
            const navLinks = document.querySelectorAll('.nav-links li');

            burger?.addEventListener('click', () => {
                // Toggle Nav
                nav?.classList.toggle('nav-active');
                
                // Animate Links
                navLinks.forEach((link, index) => {
                    if ((link as HTMLElement).style.animation) {
                        (link as HTMLElement).style.animation = '';
                    } else {
                        (link as HTMLElement).style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                    }
                });
                
                // Burger Animation
                burger.classList.toggle('toggle');
            });

            // Smooth scrolling for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (this: HTMLAnchorElement, e) {
                    e.preventDefault();
                    
                    const href = this.getAttribute('href');
                    if (href) {
                        const targetElement = document.querySelector(href);
                        if (targetElement) {
                            window.scrollTo({
                                top: (targetElement as HTMLElement).offsetTop - 70,
                                behavior: 'smooth'
                            });
                            
                            // Close mobile menu if open
                            if (nav?.classList.contains('nav-active')) {
                                nav.classList.remove('nav-active');
                                burger?.classList.remove('toggle');
                                
                                navLinks.forEach(link => {
                                    (link as HTMLElement).style.animation = '';
                                });
                            }
                        }
                    }
                });
            });

            // Create particles
            createParticles();
            
            // Animate stats
            animateStats();
            
            // Initialize testimonial slider
            initSlider();
            
            // Add typing effect to hero headline
            const heroTitle = document.querySelector('.hero h1');
            if (heroTitle) {
                const originalText = heroTitle.textContent || '';
                const cursor = document.querySelector('.cursor');
                
                // Clear the text content except the cursor
                heroTitle.textContent = '';
                
                if (cursor) {
                    heroTitle.appendChild(cursor);
                }
                
                // Type out the text
                let charIndex = 0;
                const typeWriter = () => {
                    if (charIndex < originalText.length) {
                        heroTitle.insertBefore(
                            document.createTextNode(originalText.charAt(charIndex)),
                            cursor
                        );
                        charIndex++;
                        setTimeout(typeWriter, 100);
                    } else {
                        // Add the glow class after typing is complete
                        setTimeout(() => {
                            heroTitle.classList.add('glow');
                        }, 500);
                    }
                };
                
                setTimeout(typeWriter, 1000);
            }
            
            // Form validation
            const contactForm = document.querySelector('.contact-form');
            contactForm?.addEventListener('submit', (e) => {
                e.preventDefault();
                const nameInput = document.getElementById('name') as HTMLInputElement;
                const emailInput = document.getElementById('email') as HTMLInputElement;
                const messageInput = document.getElementById('message') as HTMLTextAreaElement;
                
                if (nameInput?.value && emailInput?.value && messageInput?.value) {
                    // Display success message (in a real app, you would send the data to a server)
                    alert('Thank you for your message! We will get back to you soon.');
                    (contactForm as HTMLFormElement).reset();
                }
            });
        });

        // Create animated particles in the background
        function createParticles(): void {
            const particlesContainer = document.getElementById('particles');
            if (!particlesContainer) return;
            
            const particleCount = window.innerWidth < 768 ? 30 : 50;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // Random size between 2px and 6px
                const size = Math.random() * 4 + 2;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                // Random position
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                
                // Random animation duration between 15s and 30s
                const duration = Math.random() * 15 + 15;
                particle.style.animationDuration = `${duration}s`;
                
                // Delayed start for some particles
                const delay = Math.random() * 5;
                particle.style.animationDelay = `${delay}s`;
                
                particlesContainer.appendChild(particle);
            }
        }

        // Animate stats with counting effect
        function animateStats(): void {
            // Define stat targets
            const stats = [
                { id: 'clients', target: 500 },
                { id: 'projects', target: 1250 },
                { id: 'awards', target: 150 },
                { id: 'uptime', target: 99.9 }
            ];
            
            // Function to animate a single stat
            const animateStat = (stat: { id: string, target: number }): void => {
                const element = document.getElementById(stat.id);
                if (!element) return;
                
                const duration = 2000; // Animation duration in ms
                const frameRate = 30; // Frames per second
                const totalFrames = duration / 1000 * frameRate;
                let frame = 0;
                
                const counter = setInterval(() => {
                    frame++;
                    const progress = frame / totalFrames;
                    const currentCount = Math.floor(stat.target * progress);
                    
                    // Update the element
                    element.textContent = stat.id === 'uptime' 
                        ? currentCount.toFixed(1) 
                        : currentCount.toString();
                    
                    // Check if the animation is complete
                    if (frame === totalFrames) {
                        clearInterval(counter);
                        element.textContent = stat.id === 'uptime' 
                            ? stat.target.toFixed(1) 
                            : stat.target.toString();
                    }
                }, 1000 / frameRate);
            };
            
            // Observer for animation trigger when scrolled into view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        stats.forEach(animateStat);
                        observer.disconnect();
                    }
                });
            }, { threshold: 0.3 });
            
            const statsSection = document.getElementById('stats');
            if (statsSection) {
                observer.observe(statsSection);
            }
        }

        // Testimonial slider functionality
        function initSlider(): void {
            const track = document.querySelector('.testimonial-track');
            const prevBtn = document.querySelector('.prev-btn');
            const nextBtn = document.querySelector('.next-btn');
            const testimonials = document.querySelectorAll('.testimonial');
            
            if (!track || !prevBtn || !nextBtn || testimonials.length === 0) return;
            
            let currentIndex = 0;
            
            // Set initial track width
            (track as HTMLElement).style.width = `${testimonials.length * 100}%`;
            testimonials.forEach(item => {
                (item as HTMLElement).style.width = `${100 / testimonials.length}%`;
            });
            
            // Handle button clicks
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
                updateSlider();
            });
            
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % testimonials.length;
                updateSlider();
            });
            
            // Auto-advance the slider
            let sliderInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % testimonials.length;
                updateSlider();
            }, 5000);
            
            // Pause auto-advance on hover
            const sliderContainer = document.querySelector('.testimonial-slider');
            sliderContainer?.addEventListener('mouseenter', () => {
                clearInterval(sliderInterval);
            });
            
            sliderContainer?.addEventListener('mouseleave', () => {
                sliderInterval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % testimonials.length;
                    updateSlider();
                }, 5000);
            });
            
            // Update slider position
            function updateSlider(): void {
                (track as HTMLElement).style.transform = `translateX(-${currentIndex * (100 / testimonials.length)}%)`;
            }
        }

        // Handle scroll events for animation triggers
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            
            // Add scroll-triggered animations for different sections
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition > sectionTop - window.innerHeight + sectionHeight / 3) {
                    section.classList.add('animated-in');
                }
            });
            
            // Parallax effect for floating elements
            const floatingElements = document.querySelectorAll('.floating-element');
            floatingElements.forEach(el => {
                const speed = 0.1;
                (el as HTMLElement).style.transform = `translateY(${scrollPosition * speed}px)`;
            });
        });

        // Handle window resize events
        window.addEventListener('resize', () => {
            // Update testimonial slider
            const track = document.querySelector('.testimonial-track');
            const testimonials = document.querySelectorAll('.testimonial');
            
            if (track && testimonials.length > 0) {
                (track as HTMLElement).style.width = `${testimonials.length * 100}%`;
                testimonials.forEach(item => {
                    (item as HTMLElement).style.width = `${100 / testimonials.length}%`;
                });
            }
        });