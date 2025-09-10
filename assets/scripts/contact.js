const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", async function(event) {
    event.preventDefault();
    const data = new FormData(form);
    const action = form.getAttribute("action");

    try {
    const response = await fetch(action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
        showMessage("Thanks! Your message has been sent.");
        form.reset();
    } else {
        showMessage("Oops! Something went wrong.");
    }
    } catch (error) {
    showMessage("Network error. Please try again later.");
    }
});

function showMessage(msg) {
    status.textContent = msg;
    status.classList.add("show");

    // Hide after 4 seconds
    setTimeout(() => {
    status.classList.remove("show");
    }, 4000);
}