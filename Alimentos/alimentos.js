// Variables globales
let currentQuestion = 1;
let totalQuestions = 3;
let testScore = 0;
let testAnswers = {};

// Inicialización cuando el DOM está cargado
document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    initializeScrollAnimations();
    initializeToggleButtons();
    initializeHeaderScroll();
    initializeTest();
});

// Crear partículas flotantes
function initializeParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.classList.add('floating-particles');
    document.body.appendChild(particlesContainer);
    
    // Crear partículas
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
    
    // Crear nuevas partículas cada 5 segundos
    setInterval(() => {
        createParticle(particlesContainer);
    }, 5000);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Posición inicial aleatoria
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 8 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
    
    container.appendChild(particle);
    
    // Remover la partícula después de la animación
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 15000);
}

// Animaciones de scroll
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);
    
    // Observar elementos con clase animate-on-scroll
    document.querySelectorAll('.prevention-card, .info-box').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Header scroll effect
function initializeHeaderScroll() {
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        // Cambiar opacidad del header
        if (scrollTop > 50) {
            header.style.background = 'rgba(5, 31, 32, 0.98)';
        } else {
            header.style.background = 'rgba(5, 31, 32, 0.95)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Función para mostrar información adicional de las comidas
function showInfo(mealType) {
    const infoContainer = document.getElementById(mealType + '-info');
    const button = event.target;
    
    if (infoContainer.classList.contains('show')) {
        infoContainer.classList.remove('show');
        button.innerHTML = '<span>Leer Más</span>';
    } else {
        // Cerrar otros contenedores abiertos
        document.querySelectorAll('.extra-info').forEach(el => {
            el.classList.remove('show');
        });
        document.querySelectorAll('.card-button').forEach(btn => {
            btn.innerHTML = '<span>Leer Más</span>';
        });
        
        // Mostrar información específica
        const info = getMealInfo(mealType);
        infoContainer.innerHTML = info;
        infoContainer.classList.add('show');
        button.innerHTML = '<span>Leer Menos</span>';
    }
}

// Obtener información específica de cada comida
function getMealInfo(mealType) {
    const mealInfo = {
        desayuno: `
            <h4>Componentes del Desayuno Saludable:</h4>
            <ul>
                <li><strong>Lácteos:</strong> Leche, yogur o queso para aportar calcio y proteínas</li>
                <li><strong>Cereales:</strong> Pan integral, avena o cereales que proporcionen energía</li>
                <li><strong>Frutas:</strong> Frescas o en jugo natural para vitaminas y fibra</li>
                <li><strong>Proteínas:</strong> Huevos, jamón magro o frutos secos</li>
                <li><strong>Grasas saludables:</strong> Palta, aceite de oliva o frutos secos</li>
            </ul>
            <p><strong>Tip:</strong> Evita azúcares refinados y productos ultraprocesados en el desayuno.</p>
        `,
        almuerzo: `
            <h4>Distribución del Plato Saludable:</h4>
            <ul>
                <li><strong>1/2 del plato:</strong> Verduras variadas y de diferentes colores</li>
                <li><strong>1/4 del plato:</strong> Proteínas (carne, pollo, pescado, legumbres)</li>
                <li><strong>1/4 del plato:</strong> Carbohidratos complejos (arroz integral, pasta, papa)</li>
                <li><strong>Complementos:</strong> Aceite de oliva, semillas y frutos secos</li>
                <li><strong>Bebida:</strong> Agua como principal opción</li>
            </ul>
            <p><strong>Tip:</strong> Mastica lentamente y disfruta de los sabores para una mejor digestión.</p>
        `,
        merienda: `
            <h4>Opciones Saludables para la Merienda:</h4>
            <ul>
                <li><strong>Opción 1:</strong> Yogur con frutas y granola casera</li>
                <li><strong>Opción 2:</strong> Tostadas integrales con palta y tomate</li>
                <li><strong>Opción 3:</strong> Frutos secos y frutas deshidratadas</li>
                <li><strong>Opción 4:</strong> Batido de frutas con leche o yogur</li>
                <li><strong>Opción 5:</strong> Queso fresco con frutas de estación</li>
            </ul>
            <p><strong>Tip:</strong> La merienda debe ser ligera pero nutritiva, evita snacks procesados.</p>
        `,
        cena: `
            <h4>Cena Ligera y Nutritiva:</h4>
            <ul>
                <li><strong>Base:</strong> Verduras cocidas o en ensalada (mayor proporción)</li>
                <li><strong>Proteína:</strong> Pescado, pollo, huevos o legumbres (menor cantidad que en almuerzo)</li>
                <li><strong>Carbohidratos:</strong> Mínima cantidad, preferir verduras de raíz</li>
                <li><strong>Preparación:</strong> Cocción al vapor, hervido, grillado o al horno</li>
                <li><strong>Horario:</strong> Al menos 2 horas antes de dormir</li>
            </ul>
            <p><strong>Tip:</strong> Evita comidas pesadas y grasas en la cena para un mejor descanso.</p>
        `
    };
    
    return mealInfo[mealType] || '<p>Información no disponible.</p>';
}

// Inicializar botones de toggle para info boxes
function initializeToggleButtons() {
    document.querySelectorAll('.toggle-btn').forEach(button => {
        button.addEventListener('click', function() {
            const infoDetails = this.parentElement.querySelector('.info-details');
            
            if (infoDetails.classList.contains('show')) {
                infoDetails.classList.remove('show');
                this.textContent = 'Leer Más';
            } else {
                // Cerrar otros detalles abiertos
                document.querySelectorAll('.info-details').forEach(detail => {
                    detail.classList.remove('show');
                });
                document.querySelectorAll('.toggle-btn').forEach(btn => {
                    btn.textContent = 'Leer Más';
                });
                
                // Mostrar detalles actuales
                infoDetails.classList.add('show');
                this.textContent = 'Leer Menos';
            }
        });
    });
}

// Inicializar test interactivo
function initializeTest() {
    updateProgressBar();
}

// Función para seleccionar respuesta del test
function selectAnswer(questionNum, score) {
    testAnswers[questionNum] = score;
    
    // Añadir clase selected al botón
    const currentQuestionEl = document.getElementById('question' + questionNum);
    currentQuestionEl.querySelectorAll('.answer-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.classList.add('selected');
    
    // Esperar un poco antes de continuar
    setTimeout(() => {
        nextQuestion();
    }, 500);
}

// Siguiente pregunta
function nextQuestion() {
    if (currentQuestion < totalQuestions) {
        // Ocultar pregunta actual
        document.getElementById('question' + currentQuestion).classList.remove('active');
        
        // Mostrar siguiente pregunta
        currentQuestion++;
        document.getElementById('question' + currentQuestion).classList.add('active');
        
        // Actualizar barra de progreso
        updateProgressBar();
    } else {
        // Finalizar test
        finishTest();
    }
}

// Actualizar barra de progreso
function updateProgressBar() {
    const progress = (currentQuestion / totalQuestions) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
}

// Finalizar test y mostrar resultado
function finishTest() {
    // Calcular puntaje total
    testScore = Object.values(testAnswers).reduce((sum, score) => sum + score, 0);
    const maxScore = totalQuestions * 3;
    const percentage = (testScore / maxScore) * 100;
    
    // Ocultar última pregunta
    document.getElementById('question' + currentQuestion).classList.remove('active');
    
    // Mostrar resultado
    showTestResult(percentage);
    
    // Actualizar barra de progreso al 100%
    document.getElementById('progressBar').style.width = '100%';
}

// Mostrar resultado del test
function showTestResult(percentage) {
    const resultContainer = document.getElementById('testResult');
    const resultIcon = document.getElementById('resultIcon');
    const resultTitle = document.getElementById('resultTitle');
    const resultText = document.getElementById('resultText');
    
    let icon, title, text, color;
    
    if (percentage >= 80) {
        icon = '🎉';
        title = '¡Excelente!';
        text = 'Tienes hábitos muy saludables. Continúa así y mantén este estilo de vida equilibrado.';
        color = '#235347';
    } else if (percentage >= 60) {
        icon = '👍';
        title = '¡Muy Bien!';
        text = 'Vas por buen camino. Con algunos ajustes pequeños podrás mejorar aún más tu salud.';
        color = '#8EB69B';
    } else if (percentage >= 40) {
        icon = '💪';
        title = 'Puedes Mejorar';
        text = 'Hay oportunidades para mejorar tus hábitos. Pequeños cambios pueden hacer una gran diferencia.';
        color = '#163832';
    } else {
        icon = '🌱';
        title = 'Comienza Hoy';
        text = 'Es un buen momento para comenzar a cuidar tu salud. Cada paso cuenta hacia un estilo de vida más saludable.';
        color = '#0B2B26';
    }
    
    resultIcon.textContent = icon;
    resultTitle.textContent = title;
    resultText.textContent = text;
    resultTitle.style.color = color;
    
    // Mostrar resultado con animación
    resultContainer.classList.add('show');
    
    // Animación de confeti para resultados excelentes
    if (percentage >= 80) {
        createConfetti();
    }
}

// Crear efecto de confeti
function createConfetti() {
    const colors = ['#DAF1DE', '#8EB69B', '#235347', '#163832'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.zIndex = '9999';
            confetti.style.borderRadius = '50%';
            confetti.style.animation = 'confettiFall 3s ease-out forwards';
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 3000);
        }, i * 50);
    }
}

// Añadir keyframes para confeti
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .answer-btn.selected {
        background: linear-gradient(135deg, #8EB69B, #235347);
        color: white;
        transform: scale(1.05);
    }
`;
document.head.appendChild(confettiStyle);

// Reiniciar test
function restartTest() {
    // Resetear variables
    currentQuestion = 1;
    testScore = 0;
    testAnswers = {};
    
    // Ocultar resultado
    document.getElementById('testResult').classList.remove('show');
    
    // Ocultar todas las preguntas
    document.querySelectorAll('.question').forEach(q => {
        q.classList.remove('active');
    });
    
    // Mostrar primera pregunta
    document.getElementById('question1').classList.add('active');
    
    // Resetear botones
    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Resetear barra de progreso
    updateProgressBar();
}

// Smooth scroll para navegación
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

// Efecto paralax en hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Añadir efectos de hover dinámicos
document.querySelectorAll('.prevention-card, .info-box').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Efecto de ondas en los botones
document.querySelectorAll('.card-button, .toggle-btn, .answer-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Añadir CSS para efecto ripple
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: rippleEffect 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Detectar si el usuario está inactivo y añadir animaciones sutiles
let inactivityTimer;
function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        // Añadir clase de inactividad para activar animaciones sutiles
        document.body.classList.add('inactive');
    }, 30000); // 30 segundos de inactividad
}

// Resetear timer con cualquier actividad del usuario
['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
    document.addEventListener(event, () => {
        document.body.classList.remove('inactive');
        resetInactivityTimer();
    });
});

// Inicializar timer de inactividad
resetInactivityTimer();

// Animaciones adicionales para estado inactivo
const inactiveStyle = document.createElement('style');
inactiveStyle.textContent = `
    .inactive .hero-icon {
        animation: pulse 3s ease-in-out infinite;
    }
    
    .inactive .logo::after {
        animation: glow 2s ease-in-out infinite alternate;
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    
    @keyframes glow {
        0% { box-shadow: 0 0 5px #8EB69B; }
        100% { box-shadow: 0 0 20px #8EB69B; }
    }
`;
document.head.appendChild(inactiveStyle);