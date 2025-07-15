 // Scroll Animation
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

        document.addEventListener('DOMContentLoaded', () => {
            const fadeElements = document.querySelectorAll('.fade-in');
            fadeElements.forEach(el => observer.observe(el));
        });

        // Form handling
        let comments = [];

        document.getElementById('commentForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const comment = document.getElementById('comment').value;
            
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
                
                // Show success message
                showSuccessMessage();
            }
        });

        function displayComments() {
            const commentsSection = document.getElementById('commentsSection');
            const commentsList = document.getElementById('commentsList');
            
            if (comments.length > 0) {
                commentsSection.style.display = 'block';
                commentsList.innerHTML = comments.map(comment => `
                    <div class="comment">
                        <div class="comment-author">${comment.name}</div>
                        <div class="comment-text">${comment.comment}</div>
                        <small style="color: #8EB69B; font-style: italic;">${comment.timestamp}</small>
                    </div>
                `).join('');
            }
        }

        function showSuccessMessage() {
            const button = document.querySelector('.submit-btn');
            const originalText = button.textContent;
            
            button.textContent = '¡Comentario enviado!';
            button.style.background = 'linear-gradient(135deg, #8EB69B, #DAF1DE)';
            button.style.color = '#235347';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = 'linear-gradient(135deg, #8EB69B, #235347)';
                button.style.color = '#DAF1DE';
            }, 2000);
        }

        // Add hover effects to nutrient items
        document.querySelectorAll('.nutrient-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05) rotate(1deg)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
            });
        });

        // Add click animation to tip cards
        document.querySelectorAll('.tip-card').forEach(card => {
            card.addEventListener('click', function() {
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = 'translateY(-8px)';
                }, 150);
            });
        });