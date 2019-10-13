import { highlightAuto } from "highlight.js";
// import xpath from "xpath-ts";
const xpath = require("xpath");
const dom = require("xmldom").DOMParser;

declare function require(path: string): any;

figma.showUI(__html__);

function* walkTree(node) {
  yield node;
  let children = node.childNodes;
  if (children) {
    for (let i = 0; i < children.length; i++) {
      yield* walkTree(children[i]);
    }
  }
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

        console.log(str);

        let nodes = xpath.select("//div", doc)[0];

        let results = [];
        let classNameCache: string = "";

        for (let i = 0; i < nodes.childNodes.length; i++) {
          let walker = walkTree(nodes.childNodes[i]);
          let done = true;
          let res;

          while (!(res = walker.next()).done) {
            let node = res.value;
            console.log(node);

            if (node.data) {
              results.push({
                data: node.data,
                length: node.length,
                className: classNameCache
              });

              classNameCache = "";
            } else {
              classNameCache = node.attributes[0].nodeValue;
            }
          }
        }

        console.log(results);
      }
    });

  figma.closePlugin();
};
