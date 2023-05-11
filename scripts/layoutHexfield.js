const HEXFIELD = document.querySelector(".hexfield");
const HEXFIELD_BORDERS = Array.from(document.querySelectorAll(".border"));

const LAYOUT_HEXFIELD = () => {
  const hexfieldPadding = Math.round(parseInt(hexSize.value) / 12);
  const hexMargin = parseInt(hexGap.value);
  const hexWidth = parseInt(hexSize.value) + hexMargin * 2;
  const borderThickness = parseInt(borderWidth.value);
  const wrapperWidth = document.querySelector(".wrapper").clientWidth - 32;
  const amount = Math.floor(
    parseInt(wrapperWidth - 168 - borderThickness * 4 - hexfieldPadding * 8) / parseInt(hexWidth)
  );

  setHexfieldWidth(amount, hexWidth, hexfieldPadding, borderThickness);
  generateHexfieldFrame(amount, hexWidth, hexMargin, hexfieldPadding);
};

const setHexfieldWidth = (amount, hexWidth, hexfieldPadding, borderThickness) => {
  const paddingSides = hexfieldPadding * 3.5;
  const paddingTop = hexfieldPadding * 4;

  const maxWidth = amount * hexWidth + paddingSides * 2;
  HEXFIELD_BORDERS[0].style.padding = `${borderThickness}px`;
  HEXFIELD_BORDERS[1].style.padding = `${borderThickness}px`;

  HEXFIELD.style.padding = `${paddingTop}px ${paddingSides}px ${paddingSides}px`;
  HEXFIELD.style.width = `${Math.ceil(maxWidth)}px`;

  HEXFIELD_BORDERS[0].style.width = `${maxWidth + borderThickness * 4}px`;
  HEXFIELD.style.height = "auto";
  HEXFIELD.style.height = `${HEXFIELD.scrollHeight}px`;
};

const setBorderClipPathes = (hexH, hfP, topL, hfW, percentage, values_R, values_B, values_L) => {
  const borderTopValues = [`0 ${hexH + hfP / 2}px, ${topL / (hfW / 100)}% 0`];
  borderTopValues.push(`${percentage}% 0px`);
  const borderPath = `polygon(${borderTopValues.toString()},${values_R.toString()},${values_B.toString()},${values_L.toString()})`;

  HEXFIELD_BORDERS.forEach((border) => (border.style.clipPath = borderPath));
};

const generateHexfieldFrame = (amount, hexWidth, hexMargin, hexfieldPadding) => {
  const hexHeight = Math.round(hexWidth * 1.1547);
  //hexFieldWidth
  const hfW = Math.round(amount * hexWidth + hexfieldPadding * 7);
  //hexFieldPadding
  const hfP = Math.round(hexfieldPadding * 3.5);

  const hexW = Math.round(hexWidth / 2);
  const hexH = Math.round(hexHeight / 3.9);

  const topL = hexW + hfP;

  // Top, Right, Bottom, Left => Clip Path default points
  const values_T = [`0 ${Math.round(hexH + hfP / 2)}px, ${(topL / (hfW / 100)).toFixed(3)}% 0`];
  const values_R = [`100% ${Math.round(hexH + hfP / 2)}px`];
  const values_B = ["100% 100%", "0% 100%"];
  const values_L = [`0% ${hexH}px`];

  let offset = hfP + hexWidth;

  for (let i = 1; i < amount; i++) {
    const sideHexCutOffVertical = parseInt(hexCutOff.value);
    const sideHexCutOffHorizontal = sideHexCutOffVertical / 1.5;
    const percentage = (offset + hexWidth / 2) / (hfW / 100);
    const percentageOffsetLeft = (offset - sideHexCutOffVertical) / (hfW / 100);
    const percentageOffsetRight = (offset + sideHexCutOffVertical) / (hfW / 100);

    const borderHexBottomLeftY = hexH - (hexMargin - hexMargin / 1.5) - sideHexCutOffHorizontal;
    const borderHexBottomLeft = `${+percentageOffsetLeft.toFixed(3)}% ${borderHexBottomLeftY}px`;
    const borderHexBottomRight = `${+percentageOffsetRight.toFixed(3)}% ${borderHexBottomLeftY}px`;
    const borderHexEnd = `${+percentage.toFixed(3)}% 0px`;

    values_T.push(borderHexBottomLeft, borderHexBottomRight, borderHexEnd);

    if (i + 1 === amount) {
      setBorderClipPathes(hexH, hfP, topL, hfW, percentage, values_R, values_B, values_L);
    }
    offset += hexWidth;
  }

  const path = `polygon(${values_T.toString()},${values_R.toString()},${values_B.toString()},${values_L.toString()})`;

  HEXFIELD.style.clipPath = path;

  const consoleLogPath = () => {
    const pathToLog = [
      "------TOP-----",
      ...values_T,
      "------RIGHT----- ",
      ...values_R,
      "------BOTTOM-----",
      ...values_B,
      "------LEFT-----",
      ...values_L,
    ];
    console.table(pathToLog);
  };

  // consoleLogPath();
};
