import { highlightAuto } from "highlight.js";

figma.showUI(__html__);

figma.ui.onmessage = msg => {
  console.log(figma.currentPage.selection);
  figma.currentPage.selection &&
    figma.currentPage.selection.map((item, index) => {
      if (item.type == "TEXT") {
        let itm: TextNode = item;
        console.log("わわお？");

        console.log(highlightAuto(itm.characters, ["typescript"]));
      }
    });

  figma.closePlugin();
};
