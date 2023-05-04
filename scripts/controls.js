const ROOT = document.querySelector(":root");
const HEX_CONTROLS = document.querySelector("#hex-controls");
const INPUTS = HEX_CONTROLS.querySelectorAll("input");

const toggleButton = document.querySelector("#controls-toggle");
const hexSize = document.querySelector("#hex_size");
const borderWidth = document.querySelector("#border_width");
const hexGap = document.querySelector("#hex_margin");
const glowStrength = document.querySelector("#glow_strength");

const toggleHexControls = () => {
  INPUTS.forEach((input) => {
    input.value = input.nextElementSibling.value;
  });
  HEX_CONTROLS.classList.toggle("hidden");
};

const setHexSize = (size) => {
  ROOT.style.setProperty("--hexWidth", `${size}Px`);
};

const setHexGap = (size) => {
  ROOT.style.setProperty("--hexMargin", `${size}Px`);
};

const setGlowStrength = (strength) => {
  ROOT.style.setProperty("--glowIntensity", `${strength}px`);
};

function setBubble(VALUE, slider) {
  const bubble = slider.nextElementSibling;
  const val = VALUE.value;
  bubble.innerHTML = val;
}

hexSize.addEventListener("input", (e) => {
  setBubble(hexSize, e.target);
  setHexSize(hexSize.value);
  LAYOUT_HEXFIELD();
});

borderWidth.addEventListener("input", (e) => {
  setBubble(borderWidth, e.target);
  LAYOUT_HEXFIELD();
});

hexGap.addEventListener("input", (e) => {
  setBubble(hexGap, e.target);
  setHexGap(hexGap.value);
  LAYOUT_HEXFIELD();
});

glowStrength.addEventListener("input", (e) => {
  setBubble(glowStrength, e.target);
  setGlowStrength(glowStrength.value);
});
