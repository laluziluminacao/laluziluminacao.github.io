document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initLightingSimulator();
});

/**
 * Gerenciamento das Abas de Navegação
 */
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabButtons.length === 0 || tabContents.length === 0) return;

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            // 1. Remover classe ativa de todos os botões e abas
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => {
                c.classList.remove('active');
                c.style.display = 'none'; // Garante ocultação
            });

            // 2. Adicionar classe ativa no botão clicado
            btn.classList.add('active');

            // 3. Exibir e ativar o conteúdo alvo com efeito suave
            const activeContent = document.getElementById(targetTab);
            if (activeContent) {
                activeContent.style.display = 'flex';
                // Pequeno delay para acionar a transição CSS de opacidade
                setTimeout(() => {
                    activeContent.classList.add('active');
                }, 10);
            }
        });
    });

    // Inicializar exibindo apenas a primeira aba ativa
    tabButtons.forEach((btn, index) => {
        const targetTab = btn.getAttribute('data-tab');
        const content = document.getElementById(targetTab);
        
        if (btn.classList.contains('active')) {
            if (content) {
                content.style.display = 'flex';
                content.classList.add('active');
            }
        } else {
            if (content) {
                content.style.display = 'none';
                content.classList.remove('active');
            }
        }
    });
}

/**
 * Simulador Interativo de Temperatura de Luz
 */
function initLightingSimulator() {
    const tempButtons = document.querySelectorAll('.temp-btn');
    const roomPreview = document.querySelector('.room-preview');
    const tempLabel = document.querySelector('.temp-value-label');
    const tempDescription = document.querySelector('.temp-description');

    if (tempButtons.length === 0 || !roomPreview) return;

    // Configurações das temperaturas de cor
    const tempConfigs = {
        '3000k': {
            glow: 'rgba(253, 184, 39, 0.45)', // Amarelo aconchegante forte
            glowSecondary: 'rgba(253, 184, 39, 0.2)',
            roomBg: 'linear-gradient(135deg, #1e1b15 0%, #0d0a05 100%)',
            lightColor: '#FDB827',
            label: '3000K — Branco Quente',
            description: '💡 <strong>Sensação:</strong> Aconchegante, relaxante e intimista.<br>🏠 <strong>Ideal para:</strong> Salas de estar, quartos, áreas gourmet e recepções de hotéis. Valoriza texturas e traz conforto psicológico.'
        },
        '4000k': {
            glow: 'rgba(255, 249, 230, 0.4)', // Branco neutro agradável
            glowSecondary: 'rgba(255, 249, 230, 0.15)',
            roomBg: 'linear-gradient(135deg, #18191b 0%, #090a0b 100%)',
            lightColor: '#FFF9E6',
            label: '4000K — Branco Neutro',
            description: '💡 <strong>Sensação:</strong> Estimulante, clara e natural (luz do dia).<br>🏠 <strong>Ideal para:</strong> Cozinhas, escritórios, home-office, lojas, banheiros e áreas de estudo. Mantém o foco sem cansar a vista.'
        },
        '6000k': {
            glow: 'rgba(164, 219, 255, 0.4)', // Azulado frio estimulante
            glowSecondary: 'rgba(164, 219, 255, 0.15)',
            roomBg: 'linear-gradient(135deg, #13171c 0%, #06080b 100%)',
            lightColor: '#A4DBFF',
            label: '6000K — Branco Frio',
            description: '💡 <strong>Sensação:</strong> Higiênica, focada, de extrema atenção e alta visibilidade.<br>🏠 <strong>Ideal para:</strong> Áreas de serviço, galpões, garagens, hospitais, vitrines externas e iluminação pública.'
        }
    };

    tempButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tempValue = btn.getAttribute('data-temp');
            const config = tempConfigs[tempValue];

            if (!config) return;

            // 1. Alternar classe ativa nos botões
            tempButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // 2. Aplicar as variáveis CSS na pré-visualização do ambiente
            roomPreview.style.setProperty('--ambient-glow', config.glow);
            roomPreview.style.setProperty('--ambient-glow-sec', config.glowSecondary);
            roomPreview.style.setProperty('--room-bg-gradient', config.roomBg);
            roomPreview.style.setProperty('--bulb-color', config.lightColor);

            // 3. Atualizar textos informativos com micro-animação
            if (tempLabel && tempDescription) {
                // Efeito fade out rápido
                tempLabel.style.opacity = '0';
                tempDescription.style.opacity = '0';
                
                setTimeout(() => {
                    tempLabel.textContent = config.label;
                    tempDescription.innerHTML = config.description;
                    
                    // Fade in suave
                    tempLabel.style.opacity = '1';
                    tempDescription.style.opacity = '1';
                }, 200);
            }
        });
    });

    // Acionar o clique inicial no primeiro botão para carregar o estado padrão (3000K)
    const defaultBtn = document.querySelector('.temp-btn.active') || tempButtons[0];
    if (defaultBtn) {
        defaultBtn.click();
    }
}
