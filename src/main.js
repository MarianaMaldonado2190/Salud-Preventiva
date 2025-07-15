  function scrollGrupo(id, direction) {
    const track = document.querySelector(`#${id} .carousel-track`);
    const scrollAmount = 300;
    track.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth'
    });
  }
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
       // let mobileMenuOpen = false;
        //document.querySelector('.search-icon').addEventListener('click', function() {
            // This could be expanded to show a search modal
          //  alert('Funcionalidad de búsqueda');
       // });

        // Header background change on scroll
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(19, 58, 59, 0.3)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'linear-gradient(135deg, #051F20 0%, #163832 50%,rgb(31, 61, 54) 100%)';
                header.style.backdropFilter = 'none';
            }
        });

let currentQuestion = 1;
        let totalScore = 0;
        const totalQuestions = 10;

        // Inicializar el test
        function initTest() {
            updateProgress();
            updateQuestionCounter();
            attachEventListeners();
        }

        // Actualizar barra de progreso
        function updateProgress() {
            const progressBar = document.getElementById('progressBar');
            const progressPercentage = (currentQuestion / totalQuestions) * 100;
            progressBar.style.width = progressPercentage + '%';
        }

        // Actualizar contador de preguntas
        function updateQuestionCounter() {
            const counter = document.getElementById('questionCounter');
            counter.textContent = `${currentQuestion} / ${totalQuestions}`;
        }

        // Agregar event listeners a los botones
        function attachEventListeners() {
            const answerButtons = document.querySelectorAll('.answer-btn');
            answerButtons.forEach(button => {
                button.addEventListener('click', function() {
                    handleAnswer(this);
                });
            });
        }

        // Manejar respuesta
        function handleAnswer(button) {
            const points = parseInt(button.dataset.points);
            totalScore += points;

            // Mostrar feedback visual
            button.style.background = '#235347';
            button.style.color = 'white';

            // Esperar un poco antes de continuar
            setTimeout(() => {
                if (currentQuestion < totalQuestions) {
                    nextQuestion();
                } else {
                    showResult();
                }
            }, 500);
        }

        // Ir a la siguiente pregunta
        function nextQuestion() {
            // Ocultar pregunta actual
            const currentQuestionElement = document.getElementById(`question${currentQuestion}`);
            currentQuestionElement.classList.remove('active');

            // Mostrar siguiente pregunta
            currentQuestion++;
            const nextQuestionElement = document.getElementById(`question${currentQuestion}`);
            nextQuestionElement.classList.add('active');

            // Actualizar progreso
            updateProgress();
            updateQuestionCounter();
        }

        // Mostrar resultado
        function showResult() {
            // Ocultar última pregunta
            const lastQuestion = document.getElementById(`question${currentQuestion}`);
            lastQuestion.classList.remove('active');

            // Mostrar resultado
            const resultElement = document.getElementById('testResult');
            resultElement.classList.add('active');

            // Actualizar progreso al 100%
            const progressBar = document.getElementById('progressBar');
            progressBar.style.width = '100%';

            // Ocultar contador
            const counter = document.getElementById('questionCounter');
            counter.style.display = 'none';

            // Determinar resultado
            displayResult();
        }

        // Mostrar resultado basado en el puntaje
        function displayResult() {
            const resultTitle = document.getElementById('resultTitle');
            const resultText = document.getElementById('resultText');
            const resultIcon = document.querySelector('.result-icon');

            if (totalScore >= 8) {
                resultIcon.textContent = '🌟';
                resultTitle.textContent = '¡Excelente!';
                resultTitle.style.color = '#235347';
                resultText.innerHTML = `<strong>Puntuación: ${totalScore}/10</strong><br><br>¡Felicitaciones! Tenés hábitos alimentarios muy saludables. Seguí así, tu cuerpo te lo agradece. Solo recordá mantener la constancia y seguir disfrutando de una alimentación variada y equilibrada.`;
            } else if (totalScore >= 5) {
                resultIcon.textContent = '🌱';
                resultTitle.textContent = '¡Buen trabajo!';
                resultTitle.style.color = '#8EB69B';
                resultText.innerHTML = `<strong>Puntuación: ${totalScore}/10</strong><br><br>Vas por buen camino. Tenés algunos hábitos saludables establecidos, pero hay espacio para mejorar. Te sugerimos revisar los mensajes de las GAPA y hacer pequeños cambios graduales en tu rutina diaria.`;
            } else {
                resultIcon.textContent = '🌿';
                resultTitle.textContent = '¡Empezá el cambio!';
                resultTitle.style.color = '#163832';
                resultText.innerHTML = `<strong>Puntuación: ${totalScore}/10</strong><br><br>Es momento de hacer algunos cambios importantes en tu alimentación. No te desanimes, cada pequeño paso cuenta. Te recomendamos empezar con cambios simples como tomar más agua y agregar más frutas y verduras a tu dieta.`;
            }
        }

        // Reiniciar test
        function restartTest() {
            currentQuestion = 1;
            totalScore = 0;

            // Ocultar resultado
            const resultElement = document.getElementById('testResult');
            resultElement.classList.remove('active');

            // Mostrar primera pregunta
            const firstQuestion = document.getElementById('question1');
            firstQuestion.classList.add('active');

            // Ocultar todas las otras preguntas
            for (let i = 2; i <= totalQuestions; i++) {
                const question = document.getElementById(`question${i}`);
                question.classList.remove('active');
            }

            // Resetear estilos de botones
            const answerButtons = document.querySelectorAll('.answer-btn');
            answerButtons.forEach(button => {
                button.style.background = 'white';
                button.style.color = '#235347';
            });

            // Mostrar contador
            const counter = document.getElementById('questionCounter');
            counter.style.display = 'block';

            // Actualizar progreso
            updateProgress();
            updateQuestionCounter();
        }

        // Inicializar cuando se carga la página
        document.addEventListener('DOMContentLoaded', initTest);

        let comments = [];

document.getElementById('commentForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const comment = document.getElementById('comment').value.trim();

  if (name && comment) {
    const newComment = {
      id: Date.now(),
      name: name,
      comment: comment,
      timestamp: new Date().toLocaleString()
    };

    comments.push(newComment);
    displayComments();

    // Reset form
    document.getElementById('commentForm').reset();
  }
});

function displayComments() {
  const commentsSection = document.getElementById('commentsSection');
  const commentsList = document.getElementById('commentsList');

  commentsSection.style.display = 'block';

  // Limpiar lista antes de renderizar de nuevo
  commentsList.innerHTML = '';

  comments.forEach(c => {
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');
    commentDiv.innerHTML = `
      <p class="comment-author">${c.name} — <span style="font-size:0.8em;">${c.timestamp}</span></p>
      <p class="comment-text">${c.comment}</p>
    `;
    commentsList.appendChild(commentDiv);
  });
}
// Guardar en localStorage
localStorage.setItem('comments', JSON.stringify(comments));

// Recuperar al inicio
document.addEventListener('DOMContentLoaded', () => {
  const stored = localStorage.getItem('comments');
  if (stored) {
    comments = JSON.parse(stored);
    displayComments();
  }
});
