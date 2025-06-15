// Rolagem suave para as seções ao clicar no menu
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Destaca o menu conforme a seção visível
const sections = document.querySelectorAll('main .section');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Copia o e-mail ao clicar e mostra mensagem
document.querySelectorAll('p strong').forEach(strong => {
    if (strong.textContent.trim().toLowerCase().includes('email')) {
        const emailNode = strong.nextSibling;
        if (emailNode && emailNode.nodeType === Node.TEXT_NODE) {
            const emailText = emailNode.textContent.trim();
            // Cria um span clicável para o e-mail
            const span = document.createElement('span');
            span.textContent = ` ${emailText}`;
            span.style.cursor = 'pointer';
            span.style.textDecoration = 'underline';
            span.style.color = '#ffc300';
            span.title = 'Clique para copiar o e-mail';
            span.addEventListener('click', function() {
                navigator.clipboard.writeText(emailText);
                alert('E-mail copiado para a área de transferência!');
            });
            strong.parentNode.replaceChild(span, emailNode);
            strong.parentNode.insertBefore(strong, span);
        }
    }
});

// Botão de voltar ao topo
const backToTop = document.createElement('button');
backToTop.textContent = '↑ Topo';
backToTop.setAttribute('aria-label', 'Voltar ao topo');
backToTop.style.position = 'fixed';
backToTop.style.bottom = '30px';
backToTop.style.right = '30px';
backToTop.style.padding = '0.7rem 1.2rem';
backToTop.style.background = '#003566';
backToTop.style.color = '#ffd60a';
backToTop.style.border = 'none';
backToTop.style.borderRadius = '5px';
backToTop.style.cursor = 'pointer';
backToTop.style.display = 'none';
backToTop.style.zIndex = '1000';
backToTop.style.fontWeight = 'bold';
backToTop.style.boxShadow = '0 2px 8px rgba(107, 107, 107, 0.15)';
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Responsividade do menu (exemplo de menu mobile)
const nav = document.querySelector('nav ul');
const menuBtn = document.createElement('button');
menuBtn.textContent = '☰ Menu';
menuBtn.setAttribute('aria-label', 'Abrir menu');
menuBtn.style.display = 'none';
menuBtn.style.position = 'absolute';
menuBtn.style.top = '10px';
menuBtn.style.right = '20px';
menuBtn.style.background = 'var(--yale-blue)';
menuBtn.style.color = 'white';
menuBtn.style.border = 'none';
menuBtn.style.fontSize = '1.5rem';
menuBtn.style.cursor = 'pointer';
menuBtn.style.zIndex = '1001';

function handleResize() {
    if (window.innerWidth < 700) {
        menuBtn.style.display = 'block';
        nav.style.display = 'none';
    } else {
        menuBtn.style.display = 'none';
        nav.style.display = 'flex';
    }
}
window.addEventListener('resize', handleResize);
handleResize();

menuBtn.addEventListener('click', () => {
    if (nav.style.display === 'none') {
        nav.style.display = 'flex';
    } else {
        nav.style.display = 'none';
    }
});
document.querySelector('nav').appendChild(menuBtn);