const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const revealGroups = [
    {
        selector: ".apresentacao > *, .titulo-pagina > *",
        direction: (index) => (index === 0 ? "left" : "right"),
    },
    {
        selector:
            ".tecnologias, .secoes > .rotulo-secao, .secoes > h2, .secoes > .subtitulo, " +
            ".card, .contato, .conteudo-interno section > h2, " +
            ".item-lista, .tabela-responsiva, .observacao, " +
            ".etiquetas span, .gostos article, .video, .botao-voltar, " +
            ".pagina-erro > div",
    },
];

const revealElements = [];

revealGroups.forEach(({ selector, direction }) => {
    document.querySelectorAll(selector).forEach((element, index) => {
        if (element.classList.contains("reveal")) return;

        element.classList.add("reveal");
        element.style.setProperty("--reveal-delay", `${(index % 4) * 90}ms`);

        const animationDirection = direction?.(index);
        if (animationDirection) {
            element.classList.add(`reveal--${animationDirection}`);
        }

        revealElements.push(element);
    });
});

if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
} else {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -8% 0px",
        },
    );

    revealElements.forEach((element) => observer.observe(element));
}
