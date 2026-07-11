function renderBanners(banners) {
  const container = document.getElementById('bannerContainer');
  const dotsContainer = document.getElementById('bannerDots');

  // Gera slides com imagem e link
  container.innerHTML = banners.map((b, index) => {
    const link = b.link || '#'; // se não tiver link, usa # (não faz nada)
    const imagem = b.imagem || ''; // se não tiver imagem, mostra texto alternativo
    const alt = b.alt || 'Banner';
    return `
      <div class="banner-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
        <a href="${link}" target="_blank" rel="noopener noreferrer">
          <img src="${imagem}" alt="${alt}" class="banner-img">
        </a>
      </div>
    `;
  }).join('');

  // Gera bolinhas (igual antes)
  dotsContainer.innerHTML = banners.map((b, index) => `
    <span class="dot ${index === 0 ? 'active' : ''}" data-index="${index}"></span>
  `).join('');

  // Inicia o carrossel (mesma lógica de antes)
  initCarousel();
}
