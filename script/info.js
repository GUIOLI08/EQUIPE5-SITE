// Função para reproduzir o conteúdo
function playContent() {
    window.location.href = `assistir.html`;
}

// Função para mostrar mais informações
function showMoreInfo() {
    alert('Mostrando mais informações sobre o filme');
}

// Função para alternar o botão de curtir
function toggleLike(button) {
    button.classList.toggle('active');
    if (button.classList.contains('active')) {
        const dislikeBtn = button.parentElement.children[1];
        dislikeBtn.classList.remove('active');
        
        button.style.transform = 'scale(1.2)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 200);
    }
}

// Função para alternar o botão de não curtir
function toggleDislike(button) {
    button.classList.toggle('active');
    if (button.classList.contains('active')) {
        const likeBtn = button.parentElement.children[0];
        likeBtn.classList.remove('active');
        
        button.style.transform = 'scale(1.2)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 200);
    }
}

// Função para alternar lista de favoritos
function toggleWatchlist(button) {
    button.classList.toggle('active');
    const isAdded = button.classList.contains('active');
    
    button.innerHTML = isAdded ? 
        `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
        </svg>` :
        `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
        </svg>`;
    
    button.style.transform = 'scale(1.2)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 200);
    
    const message = isAdded ? 'Adicionado à sua lista!' : 'Removido da sua lista!';
    showToast(message);
}

// Função para abrir conteúdo relacionado
function openContent(contentId) {
    alert(`Abrindo conteúdo: ${contentId}`);
}

// Função para mostrar notificação toast
function showToast(message) {
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 50px;
        background: rgba(0,0,0,0.9);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        z-index: 10000;
        font-size: 16px;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        border-left: 4px solid #E50914;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Efeito de scroll no header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        const scrolled = window.scrollY > 100;
        
        if (scrolled) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0) 100%)';
            header.style.backdropFilter = 'none';
        }
    }
});

// Controle de scroll horizontal com mouse wheel no container similar-content
document.addEventListener('DOMContentLoaded', function() {
    const similarContent = document.querySelector('.similar-content');
    
    if (similarContent) {
        similarContent.addEventListener('wheel', function(e) {
            // Previne o scroll vertical quando dentro do container
            e.preventDefault();
            
            // Aplica o scroll horizontal
            this.scrollLeft += e.deltaY;
        }, { passive: false });
    }
});

// Controles de teclado para scroll horizontal
document.addEventListener('keydown', function(e) {
    const similarContent = document.querySelector('.similar-content');
    if (!similarContent) return;
    
    // Verifica se o foco está na área de conteúdo similar
    const rect = similarContent.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isInView) {
        if (e.key === 'ArrowLeft') {
            similarContent.scrollLeft -= 300;
            e.preventDefault();
        } else if (e.key === 'ArrowRight') {
            similarContent.scrollLeft += 300;
            e.preventDefault();
        }
    }
});

// Suporte a touch/swipe para dispositivos móveis no container horizontal
let touchStartX = 0;
let touchEndX = 0;
let isScrolling = false;

document.addEventListener('DOMContentLoaded', function() {
    const similarContent = document.querySelector('.similar-content');
    
    if (similarContent) {
        similarContent.addEventListener('touchstart', function(e) {
            touchStartX = e.touches[0].clientX;
            isScrolling = false;
        });
        
        similarContent.addEventListener('touchmove', function(e) {
            if (!isScrolling) {
                const touchCurrentX = e.touches[0].clientX;
                const diffX = touchStartX - touchCurrentX;
                
                // Se o movimento horizontal é maior que o vertical, previne o scroll da página
                if (Math.abs(diffX) > 10) {
                    isScrolling = true;
                    e.preventDefault();
                }
            }
        }, { passive: false });
        
        similarContent.addEventListener('touchend', function(e) {
            if (isScrolling) {
                touchEndX = e.changedTouches[0].clientX;
                handleHorizontalSwipe();
            }
        });
    }
});

function handleHorizontalSwipe() {
    const similarContent = document.querySelector('.similar-content');
    if (!similarContent) return;
    
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - scroll para direita
            similarContent.scrollLeft += 300;
        } else {
            // Swipe right - scroll para esquerda
            similarContent.scrollLeft -= 300;
        }
    }
}

// Smooth scroll behavior para navegação por teclado e mouse
document.addEventListener('DOMContentLoaded', function() {
    const similarContent = document.querySelector('.similar-content');
    if (similarContent) {
        similarContent.style.scrollBehavior = 'smooth';
    }
});