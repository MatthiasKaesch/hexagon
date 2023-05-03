const HEX_TEMPLATE = document.querySelector("#hexagon_template");
const NAVBAR = document.querySelector(".navbar-list");

fetch("./teams.json")
  .then((res) => res.json())
  .then((JSON) => {
    LAYOUT_HEXFIELD();
    createHexagons(JSON);
  });

const createHexagons = (JSON) => {
  HEXFIELD.innerHTML = "";
  for (let i in JSON) {
    const HEXAGON_WRAP = HEX_TEMPLATE.content.cloneNode(true);
    const HEXAGON = HEXAGON_WRAP.children[0];

    if (JSON[i].color) {
      HEXAGON.setAttribute("data-color", JSON[i].color);
    } else {
      HEXAGON.setAttribute("data-color", "darkorange");
    }

    HEXAGON.children[1].style.backgroundImage = `url("${JSON[i].url}")`;
    HEXAGON.children[0].innerText = JSON[i].name;

    applyTeamColor(HEXAGON);
    HEXAGON.style.animationDelay = `${i / 10}s`;
    HEXFIELD.appendChild(HEXAGON_WRAP);
  }
};

const applyTeamColor = (hexagon) => {
  const teamName = hexagon.children[0];
  const teamColor = hexagon.getAttribute("data-color");

  teamName.style.boxShadow = `4px 4px 10px ${teamColor}`;

  hexagon.addEventListener("mouseover", () => {
    hexagon.style.color = teamColor;
    teamName.style.color = teamColor;
  });

  hexagon.addEventListener("mouseleave", () => {
    hexagon.style.color = null;
    teamName.style.color = null;
  });
};

NAVBAR.addEventListener("click", (e) => {
  let clickedElement = e.target.parentNode;
  const ACTIVE_CLASS = "navbar-list-item-active";
  if (clickedElement.nodeName !== "LI") return;

  NAVBAR.querySelector(`.${ACTIVE_CLASS}`).classList.remove(ACTIVE_CLASS);
  clickedElement.classList.add(ACTIVE_CLASS);
});

window.addEventListener("resize", () => {
  LAYOUT_HEXFIELD();
});
