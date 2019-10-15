import { highlightAuto } from "highlight.js";
// import gorillaColorSchema from "./colorSchema/gorillaColorSchema";
import vs2015 from "../cssConverter/outputs/vs2015";
import hopscotch from "../cssConverter/outputs/hopscotch";

const xpath = require("xpath");
const dom = require("xmldom").DOMParser;

declare function require(path: string): any;

figma.showUI(__html__);

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
        itm.setRangeFills(0, itm.characters.length, [<Paint>hopscotch["hljs"]]);

        /* 着色する部分を適応 */
        results.map(res => {
          itm.setRangeFills(res.lengthStart, res.lengthEnd, [
            hopscotch[res.className]
          ]);
        });
      }
    });

  figma.closePlugin();
};
