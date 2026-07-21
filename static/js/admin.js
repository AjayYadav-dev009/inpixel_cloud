// ===================================================================
// Admin panel scripts — shared by base_admin.html and every page that
// extends it.
// ===================================================================

// Render lucide icons (data-lucide="...") used throughout the admin panel.
lucide.createIcons();

// Highlight the sidebar nav item matching the current URL, so pages that
// forget to hardcode `active` on the right link still get one.
document.querySelectorAll(".dash-nav-item").forEach((link) => {
  if (link.getAttribute("href") === window.location.pathname) {
    document
      .querySelectorAll(".dash-nav-item.active")
      .forEach((el) => el.classList.remove("active"));
    link.classList.add("active");
  }
});