const ROOT = document.querySelector(":root");
const HEX_CONTROLS = document.querySelector("#hex-controls");
const INPUTS = HEX_CONTROLS.querySelectorAll("input");

const toggleButton = document.querySelector("#controls-toggle");
const hexSize = document.querySelector("#hex_size");
const borderWidth = document.querySelector("#border_width");
const hexGap = document.querySelector("#hex_margin");
const hexCutOff = document.querySelector("#hex_cutoff");
const glowStrength = document.querySelector("#glow_strength");

const toggleHexControls = () => {
  INPUTS.forEach((input) => {
    input.value = input.nextElementSibling.value;
  });
  HEX_CONTROLS.classList.toggle("hidden");
};

const setHexSize = (size) => {
  ROOT.style.setProperty("--hexWidth", `${size}px`);
};

const setHexGap = (size) => {
  ROOT.style.setProperty("--hexMargin", `${size}px`);
};

const setBorderWidth = (width) => {
  ROOT.style.setProperty("--borderThickness", `${width}px`);
};

const setGlowStrength = (strength) => {
  ROOT.style.setProperty("--glowIntensity", `${strength}px`);
};

const setHexFieldPadding = (hexSize) => {
  const size = Math.round(parseInt(hexSize) / 12);
  const paddingSmall = Math.floor(size * 3.5);
  const paddingLarge = size * 4;
  ROOT.style.setProperty(
    "--hexFieldPadding",
    `${paddingLarge}px ${paddingSmall}px ${paddingSmall}px`
  );
};

function setDisplayedValue(VALUE, slider) {
  const bubble = slider.nextElementSibling;
  const val = VALUE.value;
  bubble.innerHTML = val;
}

hexSize.addEventListener("input", (e) => {
  setDisplayedValue(hexSize, e.target);
  setHexSize(hexSize.value);
  setHexFieldPadding(hexSize.value);
  LAYOUT_HEXFIELD();
});

hexGap.addEventListener("input", (e) => {
  setDisplayedValue(hexGap, e.target);
  setHexGap(hexGap.value);
  LAYOUT_HEXFIELD();
});

borderWidth.addEventListener("input", (e) => {
  setDisplayedValue(borderWidth, e.target);
  setBorderWidth(borderWidth.value);
  LAYOUT_HEXFIELD();
});

hexCutOff.addEventListener("input", (e) => {
  setDisplayedValue(hexCutOff, e.target);
  LAYOUT_HEXFIELD();
});

glowStrength.addEventListener("input", (e) => {
  setDisplayedValue(glowStrength, e.target);
  setGlowStrength(glowStrength.value);
});
