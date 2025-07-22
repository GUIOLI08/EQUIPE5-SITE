// Carrossel para Fiveflix
class FiveflixCarousel {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.currentIndex = 0;
        this.itemsPerView = 5;
        this.itemWidth = 240;
        this.gap = 15;
        this.isTransitioning = false;
        
        this.init();
    }
    
    init() {
        this.createCarouselStructure();
        this.populateCarousel();
        this.setupEventListeners();
        this.updateCarousel();
    }
    
    createCarouselStructure() {
        this.container.innerHTML = `
            <div class="carousel-section">
                <h2 class="carousel-title">Continuar Assistindo</h2>
                <div class="carousel-container">
                    <button class="carousel-btn prev-btn" aria-label="Anterior">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
                            <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/>
                        </svg>
                    </button>
                    <div class="carousel-wrapper">
                        <div class="carousel-track"></div>
                    </div>
                    <button class="carousel-btn next-btn" aria-label="Próximo">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
                            <path d="M400-720l240 240-240 240-56-56 184-184-184-184 56-56Z"/>
                        </svg>
                    </button>
                </div>
            </div>
            
            <div class="carousel-section">
                <h2 class="carousel-title">Tendências</h2>
                <div class="carousel-container">
                    <button class="carousel-btn prev-btn" aria-label="Anterior">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
                            <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/>
                        </svg>
                    </button>
                    <div class="carousel-wrapper">
                        <div class="carousel-track"></div>
                    </div>
                    <button class="carousel-btn next-btn" aria-label="Próximo">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
                            <path d="M400-720l240 240-240 240-56-56 184-184-184-184 56-56Z"/>
                        </svg>
                    </button>
                </div>
            </div>
            
            <div class="carousel-section">
                <h2 class="carousel-title">Minha Lista</h2>
                <div class="carousel-container">
                    <button class="carousel-btn prev-btn" aria-label="Anterior">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
                            <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/>
                        </svg>
                    </button>
                    <div class="carousel-wrapper">
                        <div class="carousel-track"></div>
                    </div>
                    <button class="carousel-btn next-btn" aria-label="Próximo">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
                            <path d="m304-82-56-57 343-343L248-825l56-57 400 400L304-82Z"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
        
        // Adicionar CSS
        this.addStyles();
        this.setupScrollHeader();
    }
    
    setupScrollHeader() {
        const header = document.querySelector('header');
        let lastScrollY = window.scrollY;
        
        const updateHeader = () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 50) {
                header.style.background = 'linear-gradient(to bottom, rgba(0, 0, 0, 0.80) 40%, rgba(0, 0, 0, 0) 100%)';

                header.style.transition = 'all 0.3s ease';
            } else {
                header.style.background = 'transparent';
                header.style.backdropFilter = 'none';
                header.style.transition = 'all 0.3s ease';
            }
            
            lastScrollY = currentScrollY;
        };
        
        window.addEventListener('scroll', updateHeader);
        updateHeader(); // Executar uma vez para definir o estado inicial
    }
    
    populateCarousel() {
        const tracks = document.querySelectorAll('.carousel-track');
        
        // Dados de exemplo para filmes/séries
        const content = [
            { title: "Lucas borges se assume homossexual e abala a internet", image: "https://i.ytimg.com/vi/m2zDk8yS964/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLDevwos7MUlDtRiJFa7t7hGf3wUZg", type: "filme" },
            { title: "Escrevi Deus com d minúsculo as 3:00 AM! (Fui jubilado?)", image: "https://i.ytimg.com/vi/bRCG76HANZc/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLCXsY-jumf47YSB4J2KYbOUjPZ0kg", type: "serie" },
            { title: "Guilherme Oliver utiliza o seu bumbum e choca o mundo!<br>(Muito Juicy)", image: "https://i.ytimg.com/vi/eW6U6z5tzwE/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLD0vGC1FX8e8tha2_lnY8twj3OpZA", type: "filme" },
            { title: "Série 2", image: "https://via.placeholder.com/240x135/B00710/FFFFFF?text=Serie+2", type: "serie" },
            { title: "Filme 3", image: "https://via.placeholder.com/240x135/E50914/FFFFFF?text=Filme+3", type: "filme" },
            { title: "Série 3", image: "https://via.placeholder.com/240x135/B00710/FFFFFF?text=Serie+3", type: "serie" },
            { title: "Filme 4", image: "https://via.placeholder.com/240x135/E50914/FFFFFF?text=Filme+4", type: "filme" },
            { title: "Série 4", image: "https://via.placeholder.com/240x135/B00710/FFFFFF?text=Serie+4", type: "serie" },
            { title: "Filme 5", image: "https://via.placeholder.com/240x135/E50914/FFFFFF?text=Filme+5", type: "filme" },
            { title: "Série 5", image: "https://via.placeholder.com/240x135/B00710/FFFFFF?text=Serie+5", type: "serie" }
        ];
        
        tracks.forEach((track, trackIndex) => {
            track.innerHTML = '';
            
            content.forEach((item, index) => {
                const carouselItem = document.createElement('div');
                carouselItem.className = 'carousel-item';
                carouselItem.innerHTML = `
                    <div class="item-content">
                        <img src="${item.image}" alt="${item.title}" loading="lazy">
                        <div class="item-overlay">
                            <div class="item-actions">
                                <button class="action-btn play-btn" title="Reproduzir">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF">
                                        <path d="M320-200v-560l440 280-440 280Z"/>
                                    </svg>
                                </button>
                                <button class="action-btn add-btn" title="Adicionar à lista">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF">
                                        <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
                                    </svg>
                                </button>
                                <button class="action-btn like-btn" title="Gostei">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF">
                                        <path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z"/>
                                    </svg>
                                </button>
                                <button class="action-btn info-btn" title="Mais informações">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF">
                                        <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                                    </svg>
                                </button>
                            </div>
                            <div class="item-info">
                                <h3 class="item-title">${item.title}</h3>
                                <span class="item-type">${item.type}</span>
                            </div>
                        </div>
                    </div>
                `;
                
                track.appendChild(carouselItem);
            });
            
            // Configurar carrossel individual para cada seção
            this.setupCarouselEvents(track.closest('.carousel-section'));
        });
    }
    
    setupCarouselEvents(section) {
        const prevBtn = section.querySelector('.prev-btn');
        const nextBtn = section.querySelector('.next-btn');
        const track = section.querySelector('.carousel-track');
        let currentIndex = 0;
        const totalItems = track.children.length;
        const maxIndex = Math.max(0, totalItems - this.itemsPerView);
        
        const updateCarousel = () => {
            const translateX = -(currentIndex * (this.itemWidth + this.gap));
            track.style.transform = `translateX(${translateX}px)`;
            
            prevBtn.style.display = currentIndex === 0 ? 'none' : 'flex';
            nextBtn.style.display = currentIndex >= maxIndex ? 'none' : 'flex';
        };
        
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
        
        nextBtn.addEventListener('click', () => {
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            }
        });
        
        updateCarousel();
    }
    
    setupEventListeners() {
        // Adicionar eventos de hover para mostrar controles
        document.addEventListener('click', (e) => {
            if (e.target.closest('.play-btn')) {
                console.log('Reproduzir clicado');
                // Aqui você pode adicionar a lógica para reproduzir o conteúdo
            }
            
            if (e.target.closest('.add-btn')) {
                const btn = e.target.closest('.add-btn');
                btn.style.color = btn.style.color === 'rgb(229, 9, 20)' ? '#FFFFFF' : '#E50914';
                console.log('Adicionar à lista clicado');
            }
            
            if (e.target.closest('.like-btn')) {
                const btn = e.target.closest('.like-btn');
                btn.style.color = btn.style.color === 'rgb(229, 9, 20)' ? '#FFFFFF' : '#E50914';
                console.log('Gostei clicado');
            }
            
            if (e.target.closest('.info-btn')) {
                console.log('Mais informações clicado');
                // Aqui você pode adicionar a lógica para mostrar mais informações
            }
        });
    }
    
    updateCarousel() {
        // Função para atualizar responsividade
        const updateItemsPerView = () => {
            const containerWidth = this.container.offsetWidth;
            if (containerWidth < 768) {
                this.itemsPerView = 2;
            } else if (containerWidth < 1200) {
                this.itemsPerView = 3;
            } else if (containerWidth < 1600) {
                this.itemsPerView = 4;
            } else {
                this.itemsPerView = 5;
            }
        };
        
        window.addEventListener('resize', updateItemsPerView);
        updateItemsPerView();
    }
    
    addStyles() {
        const styles = `
            .movies-area {
                padding: 50px;
                background: linear-gradient(to bottom, transparent 0%, #000000 100%);
            }
            
            .carousel-section {
                margin-bottom: 50px;
            }
            
            .carousel-title {
                color: var(--netflix-white);
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 15px;
                padding-left: 10px;
            }
            
            .carousel-container {
                position: relative;
                display: flex;
                align-items: center;
            }
            
            .carousel-wrapper {
                flex: 1;
                overflow: hidden;
                padding: 0 10px;
            }
            
            .carousel-track {
                display: flex;
                gap: 15px;
                transition: transform 0.3s ease;
            }
            
            .carousel-item {
                flex: 0 0 240px;
                height: 135px;
                position: relative;
                cursor: pointer;
                border-radius: 8px;
                overflow: hidden;
                transition: transform 0.3s ease, z-index 0.3s ease;
            }
            
            .carousel-item:hover {
                transform: scale(1.05);
                z-index: 10;
            }
            
            .item-content {
                width: 100%;
                height: 100%;
                position: relative;
            }
            
            .item-content img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 8px;
            }
            
            .item-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 100%);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding: 10px;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .carousel-item:hover .item-overlay {
                opacity: 1;
            }
            
            .item-actions {
                display: flex;
                justify-content: center;
                gap: 8px;
                margin-top: auto;
                margin-bottom: 5px;
            }
            
            .action-btn {
                background: rgba(0,0,0,0.7);
                border: 2px solid rgba(255,255,255,0.3);
                border-radius: 50%;
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .action-btn:hover {
                background: var(--netflix-white);
                border-color: var(--netflix-white);
            }
            
            .action-btn:hover svg {
                fill: var(--netflix-black);
            }
            
            .play-btn {
                background: var(--netflix-red);
                border-color: var(--netflix-red);
            }
            
            .play-btn:hover {
                background: var(--netflix-deep-red);
                border-color: var(--netflix-deep-red);
            }
            
            .play-btn:hover svg {
                fill: var(--netflix-white);
            }
            
            .item-info {
                text-align: center;
            }
            
            .item-title {
                color: var(--netflix-white);
                font-size: 14px;
                font-weight: bold;
                margin: 0;
            }
            
            .item-type {
                color: #ccc;
                font-size: 12px;
                text-transform: uppercase;
            }
            
            .carousel-btn {
                background: rgba(0,0,0,0.7);
                border: none;
                border-radius: 50%;
                width: 48px;
                height: 48px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s ease;
                z-index: 100;
            }
            
            .carousel-btn:hover {
                background: rgba(0,0,0,0.9);
                transform: scale(1.1);
            }
            
            .prev-btn {
                margin-right: 10px;
            }
            
            .next-btn {
                margin-left: 10px;
            }
            
            /* Responsividade */
            @media (max-width: 1600px) {
                .carousel-item {
                    flex: 0 0 220px;
                }
            }
            
            @media (max-width: 1200px) {
                .carousel-item {
                    flex: 0 0 200px;
                }
                .movies-area {
                    padding: 30px;
                }
            }
            
            @media (max-width: 768px) {
                .carousel-item {
                    flex: 0 0 180px;
                }
                .carousel-title {
                    font-size: 20px;
                }
                .movies-area {
                    padding: 20px;
                }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
}

// Inicializar o carrossel quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new FiveflixCarousel('.movies-area');
});

// Função para adicionar conteúdo dinamicamente (opcional)
function addContentToCarousel(sectionTitle, contentArray) {
    const section = document.querySelector(`h2:contains("${sectionTitle}")`);
    if (section) {
        const track = section.parentElement.querySelector('.carousel-track');
        // Lógica para adicionar novos itens
    }
}
