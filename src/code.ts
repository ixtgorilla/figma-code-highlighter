import { SchemaAndLanguage } from "./model/SchemaAndLanguage";
import changeColorUsecase from "./usecase/changeColorUsecase";

declare function require(path: string): any;

figma.showUI(__html__);

figma.clientStorage
  .getAsync("currentSchemaAndLanguage")
  .then(schemaAndLanguage => {
    if (schemaAndLanguage) {
      figma.ui.postMessage(schemaAndLanguage);
    } else {
      figma.ui.postMessage({ colorSchema: "", language: "" });
    }
  });

figma.ui.onmessage = msg => {
  const schemaAndLanguage: SchemaAndLanguage = msg.schemaAndLanguage;

  if (msg.type == "CHANGE_COLOR") {
    figma.currentPage.selection &&
      changeColorUsecase(figma.currentPage.selection, schemaAndLanguage);
    figma.clientStorage
      .setAsync("currentSchemaAndLanguage", schemaAndLanguage)
      .then(schameAndLanguage => {
        console.log("saved");
      });
  }
};
