import { highlightAuto } from "highlight.js";
// import xpath from "xpath-ts";
const xpath = require("xpath");
const dom = require("xmldom").DOMParser;

declare function require(path: string): any;

figma.showUI(__html__);

function nodeWalks() {}

figma.ui.onmessage = msg => {
  console.log(figma.currentPage.selection);

  figma.currentPage.selection &&
    figma.currentPage.selection.map((item, index) => {
      if (item.type == "TEXT") {
        let itm: TextNode = item;

        const result = highlightAuto(itm.characters, ["typescript"]);
        const str: string = `<div>${result.value}</div>`;
        // console.log(result);
        // console.log(document);
        // let htmlObject = document.createElement("div");
        // htmlObject.innerHTML = '<div id="myDiv"></div>';
        console.log(str);

        const doc = new dom().parseFromString(str);
        console.log(doc);

        var nodes = xpath.select("//div", doc)[0];

        console.log(nodes);
        console.log(nodes.childNodes.length);
        for (let i = 0; i < nodes.childNodes.length; i++) {
          console.log("============================================");
          // ここで、ネスとのやつをしょりして、文字数から、カラーの設定をしていく
          console.log("1---------------");
          console.log(nodes.childNodes[i].childNodes);
          console.log("2---------------");
          console.log(nodes.childNodes[i]);
        }
        // console.log(nodes);

        // console.log(nodes[0].localName + ": " + nodes[0].firstChild.data);
        // console.log("Node: " + nodes[0].toString());
        // console.log(document.evaluate("//div", htmlObject));
        // console.log(wa);
        // console.log(htmlObject);
      }
    });

  figma.closePlugin();
};
