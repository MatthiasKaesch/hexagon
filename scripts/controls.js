const ROOT = document.querySelector(":root");
const HEX_CONTROLS = document.querySelector("#hex-controls");
const INPUTS = HEX_CONTROLS.querySelectorAll("input");

const toggleButton = document.querySelector("#controls-toggle");
const hexSize = document.querySelector("#hex_size");
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

const setHoverSize = (size) => {
  ROOT.style.setProperty("--hoverScale", `${size / 10}`);
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

glowStrength.addEventListener("input", (e) => {
  setBubble(glowStrength, e.target);
  setGlowStrength(glowStrength.value);
});
