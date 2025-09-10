// Load navbar into pages dynamically
fetch("assets/components/navbar.html")
  .then(res => res.text())
  .then(data => {
    document.body.insertAdjacentHTML("afterbegin", data);

    // Hamburger toggle
    const toggle = document.querySelector(".nav-toggle");
    const links = document.querySelector(".nav-links");

    toggle.addEventListener("click", () => {
      links.classList.toggle("active");
    });

    // Highlight active link
    const currentPage = window.location.pathname.split("/").pop(); 
    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(link => {
      if (link.getAttribute("href").includes(currentPage) && currentPage !== "") {
        link.classList.add("active");
      }

      // special case: homepage (index.html or root "/")
      if ((currentPage === "" || currentPage === "index.html") && link.getAttribute("href").includes("index.html")) {
        link.classList.add("active");
      }
    });
  })
  .catch(err => console.error("Navbar load error:", err));
