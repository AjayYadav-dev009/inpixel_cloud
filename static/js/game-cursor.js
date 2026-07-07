const dot = document.querySelector(".cursor");
const ring = document.querySelector(".cursor-dot");

let mouseX = 0;
let mouseY = 0;

let ringX = 0;
let ringY = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.left = mouseX + "px";
    dot.style.top = mouseY + "px";
});

function animateRing() {

    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    ring.style.left = ringX + "px";
    ring.style.top = ringY + "px";

    requestAnimationFrame(animateRing);
}

const hoverItems = document.querySelectorAll(
    "a, button, .btn, .btn-primary, .btn-outline, .card, .pricing-card, .card-hover, .gs-region-card"
);

hoverItems.forEach(item => {

    item.addEventListener("mouseenter", () => {
        ring.classList.add("hover");
    });

    item.addEventListener("mouseleave", () => {
        ring.classList.remove("hover");
    });

});

// Swing the pickaxe on click (anywhere on the page), not on hover
document.addEventListener("mousedown", () => {
    dot.classList.add("hover");
});

document.addEventListener("mouseup", () => {
    dot.classList.remove("hover");
});

animateRing();