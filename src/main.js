import './style.css'
// Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
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

        // Animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all cards for animation
        document.querySelectorAll('.department-card, .doctor-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(card);
        });

        // Newsletter form handling
        document.querySelector('.newsletter-button').addEventListener('click', function(e) {
            e.preventDefault();
            const email = document.querySelector('.newsletter-input').value;
            if (email) {
                alert('¡Gracias por suscribirte a nuestro newsletter!');
                document.querySelector('.newsletter-input').value = '';
            } else {
                alert('Por favor, ingresa tu email.');
            }
        });

        // Appointment booking
        document.querySelector('.appointment-button').addEventListener('click', function() {
            alert('Funcionalidad de reserva de citas - Aquí se abriría un formulario o modal');
        });

        // CTA buttons
        document.querySelectorAll('.cta-button').forEach(button => {
            button.addEventListener('click', function() {
                if (this.textContent === 'Read More') {
                    document.querySelector('#about').scrollIntoView({
                        behavior: 'smooth'
                    });
                } else if (this.textContent === 'View All') {
                    alert('Ver todos los elementos - Aquí se cargarían más elementos');
                }
            });
        });

        // Mobile menu toggle (for future enhancement)
        let mobileMenuOpen = false;
        document.querySelector('.search-icon').addEventListener('click', function() {
            // This could be expanded to show a search modal
            alert('Funcionalidad de búsqueda');
        });

        // Header background change on scroll
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(20, 184, 166, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'linear-gradient(135deg, #4fd1c7 0%, #14b8a6 100%)';
                header.style.backdropFilter = 'none';
            }
        });


        ///PREVENCION///



        