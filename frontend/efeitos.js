
    // Seleciona todos os elementos com a classe "hidden"
    const hiddenElements = document.querySelectorAll('.hidden');

    // Função para observar os elementos
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show'); // Adiciona a classe "show" quando o elemento aparece na tela
                observer.unobserve(entry.target); // Para de observar o elemento após a animação
            }
        });
    });

    // Observa cada elemento com a classe "hidden"
    hiddenElements.forEach((el) => observer.observe(el));

    