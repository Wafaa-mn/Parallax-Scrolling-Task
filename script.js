window.addEventListener("mousemove", handleParallax);

function handleParallax(event) {
    const { clientX, clientY } = event;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const moveX = (clientX - centerX) * 0.02;
    const moveY = (clientY - centerY) * 0.02;

    const layers = document.querySelectorAll(".parallax-layer");
    layers.forEach(layer => {
        let depth = parseFloat(layer.style.transform.match(/translateZ\((-?\d+)px\)/)?.[1]);
        
        if (isNaN(depth)) {
            depth = 0; // fallback if no depth value is found
        }

        const offsetX = moveX * depth;
        const offsetY = moveY * depth;
        layer.style.transform = `translate(${offsetX}px, ${offsetY}px) translateZ(${depth}px)`;
    });
}

const aliens = document.querySelectorAll(".alien");
aliens.forEach(alien => {
    alien.addEventListener("click", () => {
        alien.style.transform = "scale(1.5) rotate(360deg)";
        setTimeout(() => {
            alien.style.transform = "scale(1) rotate(0deg)";
        }, 1000);
    });
});

let starsContainer = document.getElementById("shooting-stars");

function createShootingStar() {
    let star = document.createElement("div");
    star.classList.add("shooting-star");

    const startLeft = Math.random() * 100 + "vw";
    const startTop = Math.random() * 50 + "vh";
    star.style.left = startLeft;
    star.style.top = startTop;
    star.style.animationDuration = (Math.random() * 2 + 2) + "s";

    starsContainer.appendChild(star);

    setTimeout(() => {
        star.remove();
    }, 2000);
}

let isScrolling = false;

window.addEventListener("scroll", () => {
    if (!isScrolling) {
        isScrolling = true;
        setTimeout(() => {
            createShootingStar();
            isScrolling = false;
        }, 200);
    }
});

window.addEventListener("scroll", handleScroll);

function handleScroll() {
    const paragraph = document.querySelector(".scroll-paragraph");
    const scrollPosition = window.scrollY;

    if (scrollPosition > 10) {
        paragraph.classList.add("visible");
    } else {
        paragraph.classList.remove("visible");
    }
}
