// Initialize Lucide Icons
lucide.createIcons();

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById("site-header");
if (navbar) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("nav-scrolled");
    } else {
      navbar.classList.remove("nav-scrolled");
    }
  });
}

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

if (mobileMenuBtn) mobileMenuBtn.addEventListener("click", openMobileMenu);
if (mobileMenuClose) mobileMenuClose.addEventListener("click", closeMobileMenu);
if (mobileMenuOverlay) mobileMenuOverlay.addEventListener("click", closeMobileMenu);

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
