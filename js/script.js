function loadComponent(elementId, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(html => {
            document.getElementById(elementId).innerHTML = html;
            if (elementId === 'banners-placeholder') {
                initBanners();
            }
        })
        .catch(() => {
            document.getElementById(elementId).innerHTML = '<p style="color:red;">Erro ao carregar</p>';
        });
}

function initBanners() {
    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.dot');
    if (slides.length === 0) return;
    let currentIndex = 0, interval;
    function showSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;
        currentIndex = index;
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }
    function nextSlide() { showSlide(currentIndex + 1); }
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            clearInterval(interval);
            showSlide(parseInt(this.dataset.index));
            startAutoSlide();
        });
    });
    function startAutoSlide() {
        clearInterval(interval);
        interval = setInterval(nextSlide, 5000);
    }
    showSlide(0);
    startAutoSlide();
    const container = document.getElementById('bannerContainer');
    if (container) {
        container.addEventListener('touchstart', () => clearInterval(interval));
        container.addEventListener('touchend', startAutoSlide);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadComponent('header-placeholder', 'components/header.html');
    loadComponent('banners-placeholder', 'components/banners.html');
    loadComponent('menu-placeholder', 'components/menu.html');
    loadComponent('footer-placeholder', 'components/footer.html');
});
