// ===== ANIMACIONES AL CARGAR LA PÁGINA =====
document.addEventListener('DOMContentLoaded', function() {
    // Agregar clase de carga
    document.body.classList.add('loaded');

    // Animación de scroll suave para la timeline
    if (document.querySelector('.timeline-page')) {
        observeTimelineItems();
        initFullscreenCards();
    }

    // Efecto de cursor con corazones (opcional)
    createHeartCursor();
    
    // Inicializar reproductor de música
    initMusicPlayer();
    
    // Agregar evento al botón de continuar
    const btnContinue = document.getElementById('btnContinue');
    if (btnContinue) {
        btnContinue.addEventListener('click', function() {
            stopMusicBeforeNavigate();
            window.location.href = 'timeline.html';
        });
    }
    
    // Agregar evento al botón de volver
    const btnBack = document.querySelector('.btn-back');
    if (btnBack) {
        btnBack.addEventListener('click', function(e) {
            e.preventDefault();
            stopMusicBeforeNavigate();
            window.location.href = 'index.html';
        });
    }
    
    // Intentar reproducir con la primera interacción del usuario
    const startMusicOnInteraction = function() {
        const audio = document.getElementById('backgroundMusic');
        const musicControl = document.getElementById('musicControl');
        if (audio && audio.paused) {
            audio.play().then(() => {
                if (musicControl) {
                    musicControl.classList.add('playing');
                    musicControl.classList.remove('pulse-attention');
                    updateMusicIcon(musicControl, true);
                }
            }).catch(() => {
                // Silenciar error si falla
            });
        }
        // Remover listeners después del primer intento
        document.removeEventListener('click', startMusicOnInteraction);
        document.removeEventListener('touchstart', startMusicOnInteraction);
        document.removeEventListener('keydown', startMusicOnInteraction);
    };
    
    // Escuchar cualquier interacción
    document.addEventListener('click', startMusicOnInteraction, { once: true });
    document.addEventListener('touchstart', startMusicOnInteraction, { once: true });
    document.addEventListener('keydown', startMusicOnInteraction, { once: true });
});

// ===== TARJETAS EN PANTALLA COMPLETA =====
function initFullscreenCards() {
    const momentCards = document.querySelectorAll('.moment-card');
    
    momentCards.forEach((card, index) => {
        card.style.cursor = 'pointer';
        card.setAttribute('data-moment-id', index);
        
        card.addEventListener('click', function(e) {
            // Evitar abrir si se hace clic en un video o botón
            if (e.target.tagName === 'VIDEO' || e.target.tagName === 'BUTTON') {
                return;
            }
            openFullscreenCard(card);
        });
    });
}

function openFullscreenCard(card) {
    const momentId = parseInt(card.getAttribute('data-moment-id'));
    const allCards = document.querySelectorAll('.moment-card');
    
    // Crear overlay si no existe
    let overlay = document.querySelector('.fullscreen-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'fullscreen-overlay';
        document.body.appendChild(overlay);
        
        // Cerrar al hacer clic fuera del contenido
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closeFullscreen();
            }
        });
        
        // Navegación con flechas del teclado
        const keyHandler = function(e) {
            if (e.key === 'Escape') {
                closeFullscreen();
            } else if (e.key === 'ArrowRight') {
                navigateToMoment('next');
            } else if (e.key === 'ArrowLeft') {
                navigateToMoment('prev');
            }
        };
        document.addEventListener('keydown', keyHandler);
        overlay.setAttribute('data-key-handler', 'attached');
    }
    
    // Crear contenedor
    const container = document.createElement('div');
    container.className = 'fullscreen-container';
    container.setAttribute('data-current-moment', momentId);
    
    // Clonar la tarjeta
    const cardClone = card.cloneNode(true);
    cardClone.className = 'moment-card fullscreen-card';
    
    // Botón de cerrar
    const closeBtn = document.createElement('button');
    closeBtn.className = 'fullscreen-close';
    closeBtn.innerHTML = '✕';
    closeBtn.onclick = closeFullscreen;
    
    // Botones de navegación
    const navContainer = document.createElement('div');
    navContainer.className = 'fullscreen-nav';
    
    // Botón anterior
    if (momentId > 0) {
        const prevBtn = document.createElement('button');
        prevBtn.className = 'nav-btn nav-prev';
        prevBtn.innerHTML = '<span class="nav-arrow">←</span><span class="nav-text">Anterior</span>';
        prevBtn.onclick = () => navigateToMoment('prev');
        navContainer.appendChild(prevBtn);
    }
    
    // Indicador de posición
    const positionIndicator = document.createElement('div');
    positionIndicator.className = 'position-indicator';
    positionIndicator.innerHTML = `<span class="current">${momentId + 1}</span> / <span class="total">${allCards.length}</span>`;
    navContainer.appendChild(positionIndicator);
    
    // Botón siguiente
    if (momentId < allCards.length - 1) {
        const nextBtn = document.createElement('button');
        nextBtn.className = 'nav-btn nav-next';
        nextBtn.innerHTML = '<span class="nav-text">Siguiente</span><span class="nav-arrow">→</span>';
        nextBtn.onclick = () => navigateToMoment('next');
        navContainer.appendChild(nextBtn);
    }
    
    // Agregar elementos con animación
    container.appendChild(closeBtn);
    container.appendChild(cardClone);
    container.appendChild(navContainer);
    
    // Limpiar contenedor anterior si existe
    const oldContainer = overlay.querySelector('.fullscreen-container');
    if (oldContainer) {
        oldContainer.classList.add('fade-out');
        setTimeout(() => {
            oldContainer.remove();
            overlay.appendChild(container);
            setTimeout(() => container.classList.add('fade-in'), 10);
        }, 300);
    } else {
        overlay.appendChild(container);
        setTimeout(() => {
            overlay.classList.add('active');
            container.classList.add('fade-in');
        }, 10);
    }
    
    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';
}

function navigateToMoment(direction) {
    const container = document.querySelector('.fullscreen-container');
    if (!container) return;
    
    const currentId = parseInt(container.getAttribute('data-current-moment'));
    const allCards = document.querySelectorAll('.moment-card[data-moment-id]');
    let nextId;
    
    if (direction === 'next') {
        nextId = Math.min(currentId + 1, allCards.length - 1);
    } else {
        nextId = Math.max(currentId - 1, 0);
    }
    
    if (nextId !== currentId) {
        const nextCard = document.querySelector(`.moment-card[data-moment-id="${nextId}"]`);
        if (nextCard) {
            openFullscreenCard(nextCard);
        }
    }
}

function closeFullscreen() {
    const overlay = document.querySelector('.fullscreen-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        const container = overlay.querySelector('.fullscreen-container');
        if (container) {
            container.classList.remove('fade-in');
            container.classList.add('fade-out');
        }
        setTimeout(() => {
            overlay.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

// ===== OBSERVER PARA ANIMACIONES EN SCROLL =====
function observeTimelineItems() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(item);
    });
}

// ===== EFECTO DE CURSOR CON CORAZONES =====
function createHeartCursor() {
    let lastTime = 0;
    const throttleDelay = 150; // Crear corazón cada 150ms

    document.addEventListener('mousemove', function(e) {
        const currentTime = Date.now();
        
        if (currentTime - lastTime < throttleDelay) {
            return;
        }
        
        lastTime = currentTime;

        // Crear corazón
        const heart = document.createElement('div');
        heart.className = 'cursor-heart';
        heart.innerHTML = '💙';
        heart.style.left = e.pageX + 'px';
        heart.style.top = e.pageY + 'px';
        
        document.body.appendChild(heart);

        // Animar y eliminar
        setTimeout(() => {
            heart.style.opacity = '0';
            heart.style.transform = 'translateY(-50px) scale(1.5)';
        }, 10);

        setTimeout(() => {
            heart.remove();
        }, 1000);
    });

    // Agregar estilos para el cursor de corazones
    const style = document.createElement('style');
    style.textContent = `
        .cursor-heart {
            position: absolute;
            pointer-events: none;
            font-size: 1rem;
            opacity: 1;
            transition: all 1s ease;
            z-index: 9999;
        }
    `;
    document.head.appendChild(style);
}

// ===== FUNCIÓN PARA SCROLL SUAVE =====
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ===== AGREGAR PARTÍCULAS DE ESTRELLAS AL HACER CLIC =====
document.addEventListener('click', function(e) {
    createSparkles(e.pageX, e.pageY);
});

function createSparkles(x, y) {
    const sparkles = ['✨', '⭐', '💫'];
    const numSparkles = 3;

    for (let i = 0; i < numSparkles; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.innerHTML = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        
        // Posición aleatoria alrededor del clic
        const angle = (Math.PI * 2 * i) / numSparkles;
        const distance = 50 + Math.random() * 50;
        const targetX = x + Math.cos(angle) * distance;
        const targetY = y + Math.sin(angle) * distance;
        
        document.body.appendChild(sparkle);

        // Animar
        setTimeout(() => {
            sparkle.style.left = targetX + 'px';
            sparkle.style.top = targetY + 'px';
            sparkle.style.opacity = '0';
            sparkle.style.transform = 'scale(1.5)';
        }, 10);

        setTimeout(() => {
            sparkle.remove();
        }, 800);
    }

    // Agregar estilos para las partículas
    if (!document.querySelector('#sparkle-styles')) {
        const style = document.createElement('style');
        style.id = 'sparkle-styles';
        style.textContent = `
            .sparkle {
                position: absolute;
                pointer-events: none;
                font-size: 1.2rem;
                opacity: 1;
                transition: all 0.8s ease;
                z-index: 9999;
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== FUNCIÓN PARA AGREGAR IMÁGENES/VIDEOS =====
function addMediaToMoment(momentNumber, mediaPath, type = 'image') {
    const momentCards = document.querySelectorAll('.moment-card');
    if (momentCards[momentNumber - 1]) {
        const mediaContainer = momentCards[momentNumber - 1].querySelector('.moment-media');
        const placeholder = mediaContainer.querySelector('.media-placeholder');
        
        if (type === 'image') {
            const img = document.createElement('img');
            img.src = mediaPath;
            img.alt = `Momento ${momentNumber}`;
            if (placeholder) {
                placeholder.remove();
            }
            mediaContainer.appendChild(img);
        } else if (type === 'video') {
            const video = document.createElement('video');
            video.src = mediaPath;
            video.controls = true;
            if (placeholder) {
                placeholder.remove();
            }
            mediaContainer.appendChild(video);
        }
    }
}

// Ejemplo de uso (descomenta y ajusta las rutas):
// addMediaToMoment(1, 'assets/momento1.jpg', 'image');
// addMediaToMoment(2, 'assets/momento2.mp4', 'video');

// ===== EFECTO DE PARALLAX PARA LAS NUBES =====
window.addEventListener('scroll', function() {
    const clouds = document.querySelectorAll('.cloud');
    const scrolled = window.pageYOffset;

    clouds.forEach((cloud, index) => {
        const speed = (index + 1) * 0.3;
        cloud.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== DETENER MÚSICA AL NAVEGAR =====
function stopMusicBeforeNavigate() {
    const audio = document.getElementById('backgroundMusic');
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
        // Guardar estado para no reproducir automáticamente después
        sessionStorage.setItem('musicStopped', 'true');
    }
}

// ===== REPRODUCTOR DE MÚSICA DE FONDO =====
function initMusicPlayer() {
    const audio = document.getElementById('backgroundMusic');
    const musicControl = document.getElementById('musicControl');
    
    if (!audio || !musicControl) return;
    
    let isPlaying = false;
    
    // Verificar si venimos de otra página
    const musicStopped = sessionStorage.getItem('musicStopped');
    
    // Si no venimos de otra página, intentar reproducir
    if (!musicStopped) {
        // Intentar reproducir (puede ser bloqueado por el navegador)
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Reproducción exitosa
                isPlaying = true;
                musicControl.classList.add('playing');
                updateMusicIcon(musicControl, true);
            }).catch(() => {
                // Bloqueado por el navegador - necesita interacción del usuario
                isPlaying = false;
                musicControl.classList.remove('playing');
                musicControl.classList.add('pulse-attention');
            });
        }
    } else {
        // Si venimos de otra página, limpiar el flag pero no reproducir
        sessionStorage.removeItem('musicStopped');
        musicControl.classList.add('pulse-attention');
    }
    
    // Control manual de play/pause
    musicControl.addEventListener('click', function() {
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
            musicControl.classList.remove('playing');
            updateMusicIcon(musicControl, false);
        } else {
            audio.play();
            isPlaying = true;
            musicControl.classList.add('playing');
            musicControl.classList.remove('pulse-attention');
            updateMusicIcon(musicControl, true);
        }
    });
    
    // Actualizar estado cuando la música termina o se pausa
    audio.addEventListener('pause', function() {
        if (!audio.ended) {
            isPlaying = false;
            musicControl.classList.remove('playing');
            updateMusicIcon(musicControl, false);
        }
    });
    
    audio.addEventListener('play', function() {
        isPlaying = true;
        musicControl.classList.add('playing');
        updateMusicIcon(musicControl, true);
    });
}

function updateMusicIcon(button, isPlaying) {
    const icon = button.querySelector('.music-icon');
    if (icon) {
        icon.textContent = isPlaying ? '🎶' : '🎵';
        button.title = isPlaying ? 'Pausar música' : 'Reproducir música';
    }
}

// ===== MENSAJE DE CONSOLE ESPECIAL =====
console.log('%c💙 Feliz Aniversario 💙', 
    'font-size: 24px; font-weight: bold; color: #A8D8F0; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);'
);
console.log('%c🐰 Un año de amor y muchos más por venir 🐕', 
    'font-size: 16px; color: #FFD1DC;'
);
