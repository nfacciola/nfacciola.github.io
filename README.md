# Nicholas Facciola Portfolio

A personal portfolio website showcasing my professional experience, projects, and contact information.  
Built with **HTML, CSS, JavaScript, and Three.js** to create an interactive 3D cube navigation experience.

## 🌐 Live Demo
[Visit Portfolio](https://nfacciola.github.io/)


## 📂 Project Structure
```plaintext
repo-root/
├── assets/
│   ├── css/
│   │   ├── style.css        # Global styles
│   │   ├── projects.css     # Projects page styles
│   │   ├── contact.css      # Contact form styles
│   │   └── about.css        # About page styles
│   ├── data/
│   │   └── projects.json    # Project metadata
│   ├── images/              # Cube textures & profile photo
│   ├── scripts/
│   │   ├── cube.js          # Three.js cube logic
│   │   ├── navbar.js        # Dynamic navbar loader
│   │   ├── projects.js      # Renders project cards
│   │   └── contact.js       # Handles contact form submission
│   └── docs/
│       └── Nicholas_Facciola_Resume.pdf
│
├── pages/
│   ├── about.html           # About page
│   ├── projects.html        # Projects listing
│   └── contact.html         # Contact form
│
├── assets/components/
│   └── navbar.html          # Navbar HTML partial
│
├── index.html               # Homepage with cube
└── README.md                # Project documentation
```

## 🚀 Setup & Usage
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/portfolio-site.git
   cd portfolio-site
   ```
2. Open `index.html` in a browser to view locally.
3. For the contact form:
    - Replace the action in contact.html with your Formspree endpoint.
4. Update your personal details:
    - assets/images/me.jpg → your headshot
    - assets/data/0_0_base_nfresume1b.pdf → your resume
    - Social links in navbar.html & cube.js.

## 🛠️ Technologies
- HTML5, CSS3, JavaScript (Vanilla)
- Three.js for cube rendering
- Formspree for contact form handling
- YouTube embeds for project demos

## 📈 Future Improvements
- Add blog section or case studies
- Dark/light mode toggle
- Continuous deployment with GitHub Actions
- Enhanced accessibility improvements (ARIA labels, keyboard navigation)