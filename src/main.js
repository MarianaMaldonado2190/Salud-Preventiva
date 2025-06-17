function toggleMenu() {
            console.log('Toggle menu clicked'); // Para debug
            const navLinks = document.getElementById('navLinks');
            const hamburger = document.getElementById('hamburger');
            const overlay = document.getElementById('overlay');
            
            if (!navLinks || !hamburger) {
                console.error('No se encontraron los elementos del menú');
                return;
            }
            
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            if (overlay) overlay.classList.toggle('active');
            
            // Prevenir scroll del body cuando el menú está abierto
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
                console.log('Menú abierto');
            } else {
                document.body.style.overflow = '';
                console.log('Menú cerrado');
            }
        }

        function closeMenu() {
            const navLinks = document.getElementById('navLinks');
            const hamburger = document.getElementById('hamburger');
            const overlay = document.getElementById('overlay');
            
            if (navLinks) navLinks.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Asegurarse de que el DOM esté cargado
        document.addEventListener('DOMContentLoaded', function() {
            console.log('DOM cargado, inicializando menú');
            
            // Verificar que los elementos existen
            const hamburger = document.getElementById('hamburger');
            const navLinks = document.getElementById('navLinks');
            
            if (!hamburger) {
                console.error('No se encontró el botón hamburguesa');
            }
            if (!navLinks) {
                console.error('No se encontraron los enlaces de navegación');
            }
        });

        // Cerrar menú al cambiar el tamaño de la ventana
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });

        // Cerrar menú con la tecla Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMenu();
            }
        });

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



        