import * as fs from "fs";

interface Rgb {
  r: number;
  g: number;
  b: number;
}

interface ColorSchema {
  [index: string]: {
    type: "SOLID";
    color: Rgb;
  };
}

function generateColorObject(blockItem: string, primaryColor: Rgb): Rgb {
  let cssColor: string[] = blockItem.match(/(color:).\#[0-9A-Za-z]{6}/gi);

  if (cssColor) {
    const colorCode = cssColor[0].match(/[0-9A-Za-z]{6}/)[0];
    return colorObject(colorCode);
  } else {
    return primaryColor;
  }
}

function colorObject(colorCode: string): Rgb {
  const colorCodeArray = colorCode.split("");
  return {
    r: parseInt(`${colorCodeArray[0]}${colorCodeArray[1]}`, 16) / 255,
    g: parseInt(`${colorCodeArray[2]}${colorCodeArray[3]}`, 16) / 255,
    b: parseInt(`${colorCodeArray[4]}${colorCodeArray[5]}`, 16) / 255
  };
}

function primaryColor(content: string): Rgb {
  const primaries = content.match(/((.hljs) {|(.hljs){)([\s\S]*?)}/gi);

  const cssColor: string[] = primaries[0].match(/(color:).\#[0-9A-Za-z]{6}/gi);
  if (cssColor) {
    const colorCode = cssColor[0].match(/[0-9A-Za-z]{6}/)[0];
    return colorObject(colorCode);
  } else {
    return { r: 1.0, g: 1.0, b: 1.0 };
  }
}

function generateColorSchemas(
  blocks: string[],
  primaryColor: Rgb
): ColorSchema {
  let colorSchemas: ColorSchema = {
    hljs: { type: "SOLID", color: primaryColor }
  };

  blocks.map(item => {
    let classes = item.match(/(.(.*),)|(.(.)*{)/gi);

    classes = classes.map(item => {
      return item.replace(/\.|,|\{| /g, "");
    });

    const color = generateColorObject(item, primaryColor);

    classes.map(className => {
      colorSchemas[className] = { type: "SOLID", color: color };
    });
  });

  return colorSchemas;
}

const content = fs.readFileSync("./styles/shades-of-purple.css", "utf8");
const blocks = content.match(/.hljs([\s\S]*?)}/gi);

let colorSchemas = generateColorSchemas(blocks, primaryColor(content));
