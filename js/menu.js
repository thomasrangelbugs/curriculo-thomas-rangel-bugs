const menuButton = document.querySelector(".menu-toggle");
const menuLinks = document.querySelector(".menu-links");
const mobileMenu = window.matchMedia("(max-width: 760px)");

function setMenuState(isOpen) {
    if (!menuButton || !menuLinks) return;

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.querySelector(".sr-only").textContent = isOpen
        ? "Fechar menu"
        : "Abrir menu";
    menuLinks.hidden = mobileMenu.matches && !isOpen;
}

if (menuButton && menuLinks) {
    setMenuState(false);

    menuButton.addEventListener("click", () => {
        setMenuState(menuButton.getAttribute("aria-expanded") !== "true");
    });

    menuLinks.addEventListener("click", (event) => {
        if (event.target.closest("a") && mobileMenu.matches) {
            setMenuState(false);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            setMenuState(false);
            menuButton.focus();
        }
    });

    mobileMenu.addEventListener("change", () => setMenuState(false));
}

const sectionLinks = [...document.querySelectorAll('.menu-links a[href^="#"]')];
const linkedSections = sectionLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

if ("IntersectionObserver" in window && linkedSections.length) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            const currentSection = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

            if (!currentSection) return;

            sectionLinks.forEach((link) => {
                const isCurrent =
                    link.getAttribute("href") === `#${currentSection.target.id}`;

                if (isCurrent) {
                    link.setAttribute("aria-current", "true");
                } else {
                    link.removeAttribute("aria-current");
                }
            });
        },
        { threshold: [0.25, 0.5], rootMargin: "-15% 0px -55% 0px" },
    );

    linkedSections.forEach((section) => sectionObserver.observe(section));
}
