import { SchemaAndLanguage } from "./model/SchemaAndLanguage";
import changeColorUsecase from "./usecase/changeColorUsecase";

declare function require(path: string): any;

figma.showUI(__html__);
figma.ui.resize(300, 300);

//
// Initialize
//

figma.clientStorage
  .getAsync("currentSchemaAndLanguage")
  .then(schemaAndLanguage => {
    if (schemaAndLanguage) {
      figma.ui.postMessage({
        type: "CURRENT_SCHEMA_AND_LANGUAGE",
        schemaAndLanguage
      });
    } else {
      figma.ui.postMessage({
        type: "CURRENT_SCHEMA_AND_LANGUAGE",
        schemaAndLanguage: { colorSchema: "", language: "" }
      });
    }
  });

figma.clientStorage
  .getAsync("bookMarkedSchemaAndLanguage")
  .then(schemaAndLanguages => {
    if (schemaAndLanguages) {
      figma.ui.postMessage({
        type: "BOOKMARKED_SCHEMA_AND_LANGUAGES",
        schemaAndLanguages
      });
    } else {
      figma.ui.postMessage({
        type: "BOOKMARKED_SCHEMA_AND_LANGUAGES",
        schemaAndLanguages: []
      });
    }
  });

//
// Router
//

figma.ui.onmessage = msg => {
  if (msg.type == "CHANGE_COLOR") {
    const schemaAndLanguage: SchemaAndLanguage = msg.schemaAndLanguage;

    try {
      figma.currentPage.selection &&
        changeColorUsecase(figma.currentPage.selection, schemaAndLanguage);
      figma.clientStorage
        .setAsync("currentSchemaAndLanguage", schemaAndLanguage)
        .then(() => {
          console.log("Cached.");
        });
    } catch (e) {
      figma.notify(`😭 ${e}`);
    }
  }

  if (msg.type == "UPDATE_BOOKMARKS") {
    const schemaAndLanguages: SchemaAndLanguage[] = msg.schemaAndLanguages;
    figma.clientStorage
      .setAsync("bookMarkedSchemaAndLanguage", schemaAndLanguages)
      .then(() => {
        console.log("Bookmark saved.");
      });
  }
};
