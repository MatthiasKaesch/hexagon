const HEXFIELD = document.querySelector(".hexfield");
const HEXFIELD_BORDERS = Array.from(document.querySelectorAll(".border"));

const LAYOUT_HEXFIELD = () => {
  const hexfieldPadding = 16;
  const hexMargin = 8;
  const hexWidth = parseInt(hexSize.value) + hexMargin * 2;
  const hexHeight = hexWidth * 1.15;
  const hexfieldContainerWidth = document.querySelectorAll(".wrapper")[0].clientWidth;
  const amount = Math.floor(
    parseInt(hexfieldContainerWidth - hexfieldPadding * 7 - 40) / parseInt(hexWidth)
  );

  setHexfieldWidth(amount, hexWidth, hexfieldPadding);
  generateHexfieldFrame(amount, hexWidth, hexMargin, hexHeight, hexfieldPadding);
};

const setHexfieldWidth = (amount, hexWidth, hexfieldPadding) => {
  const paddingSides = hexfieldPadding * 3.5;
  const paddingTop = hexfieldPadding * 4;

  HEXFIELD.style.padding = `${paddingTop}px ${paddingSides}px 0px`;
  HEXFIELD.style.width = `${amount * hexWidth + paddingSides + paddingSides}px`;
  HEXFIELD.parentNode.style.width = `${amount * hexWidth + paddingSides + paddingSides + 32}px`;
};

const setBorderClipPathes = (hexH, hfP, topL, hfW, percentage, values_R, values_B, values_L) => {
  const borderTopValues = [`0 ${hexH + hfP / 2}px, ${topL / (hfW / 100)}% 0`];
  borderTopValues.push(`${percentage}% 0px`);
  const borderPath = `polygon(${borderTopValues.toString()},${values_R.toString()},${values_B.toString()},${values_L.toString()})`;
  HEXFIELD_BORDERS.forEach((border) => (border.style.clipPath = borderPath));
};

const generateHexfieldFrame = (amount, hexWidth, hexMargin, hexHeight, hexfieldPadding) => {
  //hexFieldWidth
  const hfW = amount * hexWidth + hexfieldPadding * 7;
  //hexFieldPadding
  const hfP = hexfieldPadding * 3.5;

  const hexW = hexWidth / 2;
  const hexH = hexHeight / 4;

  const topL = hexW + hfP;

  // Top, Right, Bottom, Left => Clip Path points
  const values_T = [`0 ${hexH + hfP / 2}px, ${topL / (hfW / 100)}% 0`];
  const values_R = [`100% ${hexH + hfP / 2}px`];
  const values_B = ["100% 100%", "0% 100%"];
  const values_L = [`0% ${hexH}px`];

  let offset = hfP + hexWidth;

  for (let i = 1; i < amount; i++) {
    const percentage = (offset + hexWidth / 2) / (hfW / 100);
    const percentageOffset = offset / (hfW / 100);
    values_T.push(`${percentageOffset}% ${hexH - (hexMargin - hexMargin / 1.15)}px`);
    values_T.push(`${percentage}% 0px`);

    if (i + 1 === amount) {
      setBorderClipPathes(hexH, hfP, topL, hfW, percentage, values_R, values_B, values_L);
    }
    offset += hexWidth;
  }

  const path = `polygon(${values_T.toString()},${values_R.toString()},${values_B.toString()},${values_L.toString()})`;

  HEXFIELD.style.clipPath = path;
};
