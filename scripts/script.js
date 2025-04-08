const HEX_TEMPLATE = document.querySelector("#hexagon_template");
const NAVBAR = document.querySelector(".navbar-list");

fetch("./teams.json")
  .then((res) => res.json())
  .then((JSON) => {
    createHexagons(JSON);
    LAYOUT_HEXFIELD();
  });

const createHexagons = (JSON) => {
  HEXFIELD.innerHTML = "";
  for (let i in JSON) {
    if (!JSON[i].url || !JSON[i].name) continue;
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
    addRandomInitalOrientation(HEXAGON)
    HEXAGON.style.animationDelay = `${i / 25}s`;
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

const addRandomInitalOrientation = (hexagon) => {
  const axes = [
  [1, 1, 0],
  [-1, 1, 0],
  [1, -1, 0],
  [-1, -1, 0],
  [0.5, 1, 0],
  [1, 0.5, 0],
  [-0.5, 1, 0],
  [1, -0.5, 0],
  [0.4, 1, 0],
  [1, 0.4, 0],
  [0.3, 1, 0],
  [1, 0.3, 0],
  [0.2, 1, 0],
  [1, 0.2, 0],
  [-0.2, 1, 0],
  [1, -0.2, 0],
  [-0.3, 1, 0],
  [1, -0.3, 0],
  [-0.4, 1, 0],
  [1, -0.4, 0],
  ];

  const randomAxis = axes[Math.floor(Math.random() * axes.length)];
  const [rx, ry, rz] = randomAxis;
  hexagon.style.transform = `rotate3d(${rx}, ${ry},${rz}, -90deg)`;
  
}

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
