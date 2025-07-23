// Função para reproduzir o conteúdo
function playContent() {
    alert('Iniciando reprodução de "Error 404: Professor não encontrado"');
    // Aqui você pode implementar a lógica para iniciar o player de vídeo
}

// Função para mostrar mais informações
function showMoreInfo() {
    alert('Mostrando mais informações sobre o filme');
    // Aqui você pode implementar um modal ou navegar para uma página de detalhes
}

// Função para alternar o botão de curtir
function toggleLike(button) {
    button.classList.toggle('active');
    if (button.classList.contains('active')) {
        // Remove active do botão de não curtir se estiver ativo
        const dislikeBtn = button.parentElement.children[1];
        dislikeBtn.classList.remove('active');
        
        // Animação de feedback
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
        // Remove active do botão de curtir se estiver ativo
        const likeBtn = button.parentElement.children[0];
        likeBtn.classList.remove('active');
        
        // Animação de feedback
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
    
    // Muda o ícone baseado no estado
    button.innerHTML = isAdded ? 
        `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
        </svg>` :
        `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
        </svg>`;
    
    // Feedback visual
    button.style.transform = 'scale(1.2)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 200);
    
    // Mensagem de feedback
    const message = isAdded ? 'Adicionado à sua lista!' : 'Removido da sua lista!';
    showToast(message);
}

// Função para abrir conteúdo relacionado
function openContent(contentId) {
    alert(`Abrindo conteúdo: ${contentId}`);
    // Aqui você pode implementar a navegação para o conteúdo selecionado
}

// Função para mostrar notificação toast
function showToast(message) {
    // Remove toast existente se houver
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Cria novo toast
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
    
    // Anima entrada
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove após 3 segundos
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
    const scrolled = window.scrollY > 100;
    
    if (scrolled) {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0) 100%)';
        header.style.backdropFilter = 'none';
    }
});

