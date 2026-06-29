// Initialize Lucide Icons
lucide.createIcons();

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById("themeToggle");
const themeToggleMobile = document.getElementById("themeToggleMobile");
const root = document.documentElement;

function applyThemeIcons() {
    const isLight = root.getAttribute("data-theme") === "light";
    document
        .querySelectorAll(".theme-icon-light")
        .forEach((el) => el.classList.toggle("hidden", !isLight));
    document
        .querySelectorAll(".theme-icon-dark")
        .forEach((el) => el.classList.toggle("hidden", isLight));
}

function setTheme(theme) {
    if (theme === "light") {
        root.setAttribute("data-theme", "light");
    } else {
        root.removeAttribute("data-theme");
    }
    localStorage.setItem("theme", theme);
    applyThemeIcons();
}

function toggleTheme() {
    const current =
        root.getAttribute("data-theme") === "light" ? "light" : "dark";
    setTheme(current === "light" ? "dark" : "light");
}

applyThemeIcons();
if (themeToggle) themeToggle.addEventListener("click", toggleTheme);
if (themeToggleMobile) themeToggleMobile.addEventListener("click", toggleTheme);

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById("site-header");
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("nav-scrolled");
    } else {
        navbar.classList.remove("nav-scrolled");
    }
});

// ===== MOBILE MENU =====
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const mobileMenuClose = document.getElementById("mobileMenuClose");
const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");

function openMobileMenu() {
    mobileMenu.classList.add("open");
    document.body.style.overflow = "hidden";
}
function closeMobileMenu() {
    mobileMenu.classList.remove("open");
    document.body.style.overflow = "";
}

mobileMenuBtn.addEventListener("click", openMobileMenu);
mobileMenuClose.addEventListener("click", closeMobileMenu);
mobileMenuOverlay.addEventListener("click", closeMobileMenu);

// ===== DOMAIN SEARCH =====
const domainInput = document.getElementById("domainInput");
const domainSearchBtn = document.getElementById("domainSearchBtn");
const domainResult = document.getElementById("domainResult");

function searchDomain() {
    const domain = domainInput.value.trim();
    if (!domain) {
        domainResult.className = "mt-3";
        domainResult.innerHTML =
            '<p class="text-xs text-yellow-400">Please enter a domain name to search.</p>';
        return;
    }
    domainResult.className = "mt-3";
    const tlds = [".com", ".net", ".io", ".dev", ".co", ".org"];
    const prices = [
        "₹699/yr",
        "₹799/yr",
        "₹2,399/yr",
        "₹999/yr",
        "₹949/yr",
        "₹799/yr",
    ];
    const available = [true, true, false, true, true, false];
    let html = '<div class="space-y-2">';
    tlds.forEach((tld, i) => {
        const status = available[i];
        html += `<div class="flex items-center justify-between p-3 glass rounded-lg">
                    <div class="flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full ${status ? "bg-green-400" : "bg-red-400"}"></span>
                        <span class="text-sm font-medium">${domain}${tld}</span>
                    </div>
                    <div class="flex items-center gap-3">
                        <span class="text-xs text-text-muted">${prices[i]}</span>
                        ${status ? `<button class="px-3 py-1 gradient-accent rounded-lg text-xs font-semibold btn-ripple">Add</button>` : `<span class="text-xs text-red-400">Taken</span>`}
                    </div>
                </div>`;
    });
    html += "</div>";
    domainResult.innerHTML = html;
}

domainSearchBtn.addEventListener("click", searchDomain);
domainInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") searchDomain();
});

// ===== PRICING TOGGLE =====
const monthlyBtn = document.getElementById("monthlyBtn");
const yearlyBtn = document.getElementById("yearlyBtn");
const priceValues = document.querySelectorAll(".price-value");
const billingPeriods = document.querySelectorAll(".billing-period");
let isYearly = true;

function updatePricing() {
    priceValues.forEach((el) => {
        const price = isYearly ? el.dataset.yearly : el.dataset.monthly;
        el.textContent = `₹${price}`;
    });
    billingPeriods.forEach((el) => {
        el.textContent = isYearly ? "Billed annually" : "Billed monthly";
    });
    if (isYearly) {
        yearlyBtn.className =
            "px-5 py-2 rounded-full text-sm font-medium btn-primary text-white transition-all";
        monthlyBtn.className =
            "px-5 py-2 rounded-full text-sm font-medium text-faint transition-all";
    } else {
        monthlyBtn.className =
            "px-5 py-2 rounded-full text-sm font-medium btn-primary text-white transition-all";
        yearlyBtn.className =
            "px-5 py-2 rounded-full text-sm font-medium text-faint transition-all";
    }
}

monthlyBtn.addEventListener("click", () => {
    isYearly = false;
    updatePricing();
});
yearlyBtn.addEventListener("click", () => {
    isYearly = true;
    updatePricing();
});

// ===== TESTIMONIAL SLIDER =====
const testimonialTrack = document.getElementById("testimonialTrack");
const prevBtn = document.getElementById("prevTestimonial");
const nextBtn = document.getElementById("nextTestimonial");
const dots = document.querySelectorAll(".testimonial-dot");
let currentSlide = 0;
const totalSlides = 3;
let autoSlideInterval;

function updateSlider() {
    const cardWidth = testimonialTrack.children[0].offsetWidth + 24;
    testimonialTrack.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
    dots.forEach((dot, i) => {
        dot.className = `w-2.5 h-2.5 rounded-full transition-all testimonial-dot ${i === currentSlide ? "bg-accent w-6" : "bg-surface-strong"}`;
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}
function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
}

nextBtn.addEventListener("click", () => {
    nextSlide();
    resetAutoSlide();
});
prevBtn.addEventListener("click", () => {
    prevSlide();
    resetAutoSlide();
});
dots.forEach((dot) => {
    dot.addEventListener("click", () => {
        currentSlide = parseInt(dot.dataset.index);
        updateSlider();
        resetAutoSlide();
    });
});

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 5000);
}
autoSlideInterval = setInterval(nextSlide, 5000);

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
);

revealElements.forEach((el) => revealObserver.observe(el));

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll(".counter");
const counterObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const el = entry.target;
                if (el.dataset.counted) return;
                el.dataset.counted = "true";
                const target = parseFloat(el.dataset.target);
                const suffix = el.dataset.suffix || "";
                const decimal = parseInt(el.dataset.decimal) || 0;
                const duration = 2000;
                const start = performance.now();

                function update(now) {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = target * eased;
                    el.textContent =
                        current.toFixed(decimal).replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                        suffix;
                    if (progress < 1) requestAnimationFrame(update);
                }
                requestAnimationFrame(update);
            }
        });
    },
    { threshold: 0.5 },
);

counters.forEach((c) => counterObserver.observe(c));

// ===== COOKIE NOTICE =====
const cookieNotice = document.getElementById("cookieNotice");
const acceptCookies = document.getElementById("acceptCookies");
const declineCookies = document.getElementById("declineCookies");

if (!localStorage.getItem("cookiesAccepted")) {
    cookieNotice.style.display = "block";
} else {
    cookieNotice.style.display = "none";
}

acceptCookies.addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "true");
    cookieNotice.style.display = "none";
    showToast(
        "Cookies accepted",
        "You can change your preferences anytime in settings.",
        "success",
    );
});
declineCookies.addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "declined");
    cookieNotice.style.display = "none";
});

// ===== LIVE CHAT =====
const liveChatBtn = document.getElementById("liveChatBtn");
const chatPanel = document.getElementById("chatPanel");
const closeChat = document.getElementById("closeChat");
const chatInput = document.getElementById("chatInput");
const chatSend = document.getElementById("chatSend");
const chatMessages = document.getElementById("chatMessages");

liveChatBtn.addEventListener("click", () => {
    chatPanel.classList.toggle("hidden");
    if (!chatPanel.classList.contains("hidden")) {
        liveChatBtn.style.display = "none";
    }
});
closeChat.addEventListener("click", () => {
    chatPanel.classList.add("hidden");
    liveChatBtn.style.display = "flex";
});

function sendChatMessage() {
    const msg = chatInput.value.trim();
    if (!msg) return;

    // User message
    chatMessages.innerHTML += `<div class="flex gap-3 mb-4 justify-end">
                <div class="gradient-accent rounded-xl rounded-tr-sm px-3.5 py-2.5 max-w-[80%]">
                    <p class="text-xs text-white leading-relaxed">${msg}</p>
                </div>
            </div>`;
    chatInput.value = "";
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Bot response
    setTimeout(() => {
        const responses = [
            "Thanks for reaching out! Let me connect you with a specialist who can help with that.",
            "Great question! Our team typically handles this within minutes. One moment please.",
            "I understand your concern. Let me pull up some information for you right away.",
            "Absolutely! I'd be happy to help. Could you provide a bit more detail?",
            "That's something we can definitely assist with. Let me check our systems.",
        ];
        const response = responses[Math.floor(Math.random() * responses.length)];
        chatMessages.innerHTML += `<div class="flex gap-3 mb-4">
                    <div class="w-7 h-7 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                        <i data-lucide="bot" class="w-3.5 h-3.5 text-secondary"></i>
                    </div>
                    <div class="glass rounded-xl rounded-tl-sm px-3.5 py-2.5 max-w-[80%]">
                        <p class="text-xs text-text-dim leading-relaxed">${response}</p>
                    </div>
                </div>`;
        chatMessages.scrollTop = chatMessages.scrollHeight;
        lucide.createIcons();
    }, 1000);
}

chatSend.addEventListener("click", sendChatMessage);
chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendChatMessage();
});

// ===== SCROLL TO TOP =====
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        scrollTopBtn.style.opacity = "1";
        scrollTopBtn.style.visibility = "visible";
        scrollTopBtn.style.transform = "translateY(0)";
    } else {
        scrollTopBtn.style.opacity = "0";
        scrollTopBtn.style.visibility = "hidden";
        scrollTopBtn.style.transform = "translateY(1rem)";
    }
});
scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== TOAST NOTIFICATION =====
function showToast(title, message, type = "info") {
    const container = document.getElementById("toastContainer");
    const colors = {
        success: "bg-green-500/10 border-green-500/30 text-green-400",
        error: "bg-red-500/10 border-red-500/30 text-red-400",
        info: "bg-secondary/10 border-secondary/30 text-secondary",
    };
    const icons = {
        success: "check-circle",
        error: "alert-circle",
        info: "info",
    };

    const toast = document.createElement("div");
    toast.className = `toast glass rounded-xl p-4 flex items-start gap-3 min-w-[300px] border ${colors[type]}`;
    toast.innerHTML = `
                <i data-lucide="${icons[type]}" class="w-5 h-5 flex-shrink-0 mt-0.5"></i>
                <div class="flex-1">
                    <div class="text-sm font-semibold">${title}</div>
                    <div class="text-xs opacity-80 mt-0.5">${message}</div>
                </div>
                <button class="opacity-60 hover:opacity-100 transition-opacity flex-shrink-0">
                    <i data-lucide="x" class="w-4 h-4"></i>
                </button>
            `;
    container.appendChild(toast);
    lucide.createIcons();

    toast.querySelector("button").addEventListener("click", () => toast.remove());
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(100px)";
        toast.style.transition = "all 0.3s";
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// ===== NEWSLETTER SUBSCRIBE =====
document.getElementById("subscribeBtn").addEventListener("click", () => {
    const email = document
        .querySelector('footer input[type="email"]')
        .value.trim();
    if (!email || !email.includes("@")) {
        showToast("Invalid Email", "Please enter a valid email address.", "error");
        return;
    }
    showToast("Subscribed!", "You've been added to our newsletter.", "success");
    document.querySelector('footer input[type="email"]').value = "";
});

// ===== BUTTON RIPPLE EFFECT =====
document.querySelectorAll(".btn-ripple").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        btn.style.setProperty(
            "--x",
            ((e.clientX - rect.left) / rect.width) * 100 + "%",
        );
        btn.style.setProperty(
            "--y",
            ((e.clientY - rect.top) / rect.height) * 100 + "%",
        );
    });
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            // Close mobile menu if open
            closeMobileMenu();
        }
    });
});

// FAQ accordion toggle
document.querySelectorAll("#faq-list .faq-item").forEach((item) => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");
        document
            .querySelectorAll("#faq-list .faq-item")
            .forEach((el) => el.classList.remove("open"));
        if (!isOpen) item.classList.add("open");
    });
});

// Sidebar item active state in hero mockup (purely cosmetic interactivity)
document.querySelectorAll(".sidebar-item").forEach((el) => {
    el.addEventListener("click", () => {
        document
            .querySelectorAll(".sidebar-item")
            .forEach((s) => s.classList.remove("active"));
        el.classList.add("active");
    });
});
