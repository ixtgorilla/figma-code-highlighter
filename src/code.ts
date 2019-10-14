import { highlightAuto } from "highlight.js";

const xpath = require("xpath");
const dom = require("xmldom").DOMParser;

declare function require(path: string): any;

figma.showUI(__html__);

let colorScheme = {
  "hljs-function": {
    type: "SOLID",
    color: { r: 0.0859375, g: 0.63671875, b: 0.7109375 }
  },
  "hljs-params": {
    type: "SOLID",
    color: { r: 0.890625, g: 0.71484375, b: 0.50390625 }
  },
  "hljs-keyword": {
    type: "SOLID",
    color: { r: 0.8984375, g: 0.39453125, b: 0.19921875 }
  },
  "hljs-built_in": {
    type: "SOLID",
    color: { r: 0.8359375, g: 0.4921875, b: 0.359375 }
  },
  "hljs-literal": {
    type: "SOLID",
    color: { r: 0.4375, g: 0.375, b: 0.91796875 }
  },
  "hljs-number": {
    type: "SOLID",
    color: { r: 0.4375, g: 0.375, b: 0.91796875 }
  },
  "hljs-string": {
    type: "SOLID",
    color: { r: 0.28515625, g: 0.91015625, b: 0.6484375 }
  },
  "hljs-title": {
    type: "SOLID",
    color: { r: 0.0862745098, g: 0.6352941176, b: 0.7137254902 }
  },
  default: {
    type: "SOLID",
    color: { r: 0.890625, g: 0.71484375, b: 0.50390625 }
  },
  "": {
    type: "SOLID",
    color: { r: 0.890625, g: 0.71484375, b: 0.50390625 }
  }
};

/* Elementをdigする */
function* walkTree(node) {
  yield node;
  let children = node.childNodes;
  if (children) {
    for (let i = 0; i < children.length; i++) {
      yield* walkTree(children[i]);
    }
  }
}

/* ElementのStringの文字数をカウントする */
function countLength(node): number {
  let lng: number = 0;

  if (node.childNodes) {
    /* Element */
    for (let i = 0; i < node.childNodes.length; i++) {
      lng = lng + countLength(node.childNodes[i]);
    }
  } else {
    /* Text */
    lng = lng + node.length;
  }

  return lng;
}

figma.ui.onmessage = msg => {
  console.log(figma.currentPage.selection);

  figma.currentPage.selection &&
    figma.currentPage.selection.map((item, index) => {
      if (item.type == "TEXT") {
        let itm: TextNode = item;

        const result = highlightAuto(itm.characters, ["typescript"]);
        const str: string = `<div>${result.value}</div>`;
        const doc = new dom().parseFromString(str);

        let nodes = xpath.select("//div", doc)[0];
        let results = [];
        let length: number = 0;

        for (let i = 0; i < nodes.childNodes.length; i++) {
          let walker = walkTree(nodes.childNodes[i]);
          let res;

          while (!(res = walker.next()).done) {
            let node = res.value;

            if (node.data) {
              /* Text Nodeの場合 開始位置を足し上げてく  */
              length = length + node.length;
            } else {
              /* Element Nodeの場合 着色する開始位置と終了位置を定義する  */
              results.push({
                length: countLength(node),
                lengthStart: length,
                lengthEnd: length + countLength(node),
                className: node.attributes[0].nodeValue
              });
            }
          }
        }

        /* 文字全体をまずデフォルトカラーで着色 */
        itm.setRangeFills(0, itm.characters.length, [
          {
            type: "SOLID",
            color: { r: 0.890625, g: 0.71484375, b: 0.50390625 }
          }
        ]);

        /* 着色する部分を適応 */
        results.map(res => {
          itm.setRangeFills(res.lengthStart, res.lengthEnd, [
            colorScheme[res.className]
          ]);
        });
      }
    });

  figma.closePlugin();
};
