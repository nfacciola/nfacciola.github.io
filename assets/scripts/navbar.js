// Load navbar into pages dynamically
const inPages = location.pathname.includes("/pages/");
const navPath = (inPages ? "../" : "") + "assets/components/navbar.html";

fetch(navPath)
  .then(r => r.text())
  .then(html => {
    document.body.insertAdjacentHTML("afterbegin", html);

    // Fix relative links in the injected navbar
    document.querySelectorAll(".nav-links a, .nav-logo a").forEach(a => {
      const href = a.getAttribute("href");
      if (!href || href.startsWith("http")) return; // leave externals alone
      const normalized = (inPages ? "../" : "") + href.replace(/^(\.\/)?/, "");
      a.setAttribute("href", normalized);
    });

    // Hamburger toggle
    const toggle = document.querySelector(".nav-toggle");
    const links = document.querySelector(".nav-links");
    toggle?.addEventListener("click", () => links.classList.toggle("active"));

    // Active link highlight
    const current = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a").forEach(link => {
      if (link.getAttribute("href").endsWith(current)) link.classList.add("active");
    });
  })
  .catch(err => console.error("Navbar load error:", err));
