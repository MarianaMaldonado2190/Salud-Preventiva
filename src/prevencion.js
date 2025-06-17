 let currentQuestion = 1;
        let totalScore = 0;
        const totalQuestions = 3;

        // Navigation
        function goBack() {
            if (confirm('¿Estás seguro de que quieres volver a la página principal?')) {
                // Simular navegación hacia atrás
                alert('Regresando a la página principal...');
                // En una implementación real, aquí iría: window.history.back() o window.location.href = 'index.html'
            }
        }

        // Smooth scrolling
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

        // Test functionality
        function selectAnswer(questionNum, score) {
            totalScore += score;
            
            // Update progress
            const progress = (questionNum / totalQuestions) * 100;
            document.getElementById('progressBar').style.width = progress + '%';
            
            // Hide current question
            document.getElementById('question' + questionNum).classList.remove('active');
            
            // Show next question or result
            if (questionNum < totalQuestions) {
                setTimeout(() => {
                    document.getElementById('question' + (questionNum + 1)).classList.add('active');
                }, 300);
            } else {
                setTimeout(() => {
                    showResult();
                }, 300);
            }
        }

        function showResult() {
            const resultDiv = document.getElementById('testResult');
            const resultIcon = document.getElementById('resultIcon');
            const resultTitle = document.getElementById('resultTitle');
            const resultText = document.getElementById('resultText');
            
            let icon, title, text;
            
            if (totalScore >= 7) {
                icon = '🌟';
                title = '¡Excelente!';
                text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tus hábitos de prevención son ejemplares. Sed do eiusmod tempor incididunt ut labore.';
            } else if (totalScore >= 4) {
                icon = '👍';
                title = 'Muy Bien';
                text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tienes buenos hábitos, pero hay espacio para mejorar. Ut enim ad minim veniam.';
            } else {
                icon = '⚠️';
                title = 'Necesitas Mejorar';
                text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Es importante que consideres mejorar tus hábitos de prevención. Quis nostrud exercitation.';
            }
            
            resultIcon.textContent = icon;
            resultTitle.textContent = title;
            resultText.textContent = text;
            
            resultDiv.style.display = 'block';
        }

        function restartTest() {
            currentQuestion = 1;
            totalScore = 0;
            
            // Hide result
            document.getElementById('testResult').style.display = 'none';
            
            // Hide all questions
            for (let i = 1; i <= totalQuestions; i++) {
                document.getElementById('question' + i).classList.remove('active');
            }
            
            // Show first question
            document.getElementById('question1').classList.add('active');
            
            // Reset progress
            document.getElementById('progressBar').style.width = '0%';
        }

        // Card info
        function showCardInfo(type) {
            let title, content;
            
            if (type === 'cardiovascular') {
                title = 'Salud Cardiovascular';
                content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.';
            } else if (type === 'mental') {
                title = 'Salud Mental';
                content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate.';
            }
            
            alert(title + '\n\n' + content);
        }


  // Ocultarlo inicialmente
  fab.style.display = 'none';
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

        // Observe elements for animation
        document.querySelectorAll('.prevention-card, .info-box').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(card);
        });

        // Show/hide FAB based on scroll
        window.addEventListener('scroll', function() {
            const fab = document.querySelector('.fab');
            if (window.scrollY > 300) {
                fab.style.opacity = '1';
                fab.style.transform = 'scale(1)';
            } else {
                fab.style.opacity = '0.7';
                fab.style.transform = 'scale(0.8)';
            }
        });

        // Add some dynamic effects
        document.addEventListener('DOMContentLoaded', function() {
            // Animate hero icons
            const heroIcons = document.querySelectorAll('.hero-icon');
            heroIcons.forEach((icon, index) => {
                icon.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.2) rotate(10deg)';
                });
                
                icon.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1) rotate(0deg)';
                });
            });

            // Add click effects to buttons
            document.querySelectorAll('.card-button, .answer-btn').forEach(button => {
                button.addEventListener('click', function() {
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 150);
                });
            });
        });