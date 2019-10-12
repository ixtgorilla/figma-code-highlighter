import { highlightAuto } from "highlight.js";
// import xpath from "xpath-ts";
const xpath = require("xpath");
const dom = require("xmldom").DOMParser;

declare function require(path: string): any;

figma.showUI(__html__);

figma.ui.onmessage = msg => {
  console.log(figma.currentPage.selection);

  figma.currentPage.selection &&
    figma.currentPage.selection.map((item, index) => {
      if (item.type == "TEXT") {
        let itm: TextNode = item;
        console.log("わわお？");

        const result = highlightAuto(itm.characters, ["typescript"]);
        const str: string = `<div>${result.value}</div>`;
        // console.log(result);
        // console.log(document);
        // let htmlObject = document.createElement("div");
        // htmlObject.innerHTML = '<div id="myDiv"></div>';

        const xml = "<book><title>Harry Potter</title></book>";
        console.log(xml);
        const doc = new dom().parseFromString(str);
        console.log(doc);
        var nodes = xpath.select("//", doc);
        console.log(nodes);

        // console.log(nodes[0].localName + ": " + nodes[0].firstChild.data);
        // console.log("Node: " + nodes[0].toString());
        // console.log(document.evaluate("//div", htmlObject));
        // console.log(wa);
        // console.log(htmlObject);
      }
    });

  figma.closePlugin();
};
