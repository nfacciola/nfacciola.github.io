async function loadProjects() {
  const res = await fetch("../assets/data/projects.json");
  const PROJECTS = await res.json();

  const ytEmbed = (id) =>
    `https://www.youtube-nocookie.com/embed/${id}?modestbranding=1&rel=0`;

  function card(project) {
    const card = document.createElement("article");
    card.className = "project-card";

    const media = document.createElement("div");
    media.className = "project-card__media";
    const iframe = document.createElement("iframe");
    iframe.src = ytEmbed(project.youtubeId);
    iframe.title = project.title;
    iframe.frameBorder = "0";
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    media.appendChild(iframe);

    const body = document.createElement("div");
    body.className = "project-card__body";

    const h3 = document.createElement("h3");
    h3.className = "project-card__title";
    h3.textContent = project.title;

    const p = document.createElement("p");
    p.className = "project-card__desc";
    p.textContent = project.description;

    const actions = document.createElement("div");
    actions.className = "project-card__actions";
    const a = document.createElement("a");
    a.className = "btn";
    a.href = project.github;
    a.target = "_blank";
    a.textContent = "GitHub Repo";
    actions.appendChild(a);

    body.append(h3, p, actions);
    card.append(media, body);
    return card;
  }

  const grid = document.getElementById("projectsGrid");
  PROJECTS.forEach((p) => grid.appendChild(card(p)));
}

document.addEventListener("DOMContentLoaded", loadProjects);