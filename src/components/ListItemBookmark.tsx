import * as React from "react";
import { SchemaAndLanguage } from "../models/SchemaAndLanguage";

interface Props {
  schemaAndLanguage: SchemaAndLanguage;
  destroy: () => void;
}

const runHighlight = (schemaAndLanguage: SchemaAndLanguage) => {
  parent.postMessage(
    { pluginMessage: { type: "CHANGE_COLOR", schemaAndLanguage } },
    "*"
  );
};

const ListItemBookmark: React.FC<Props> = ({
  schemaAndLanguage,
  destroy
}: Props) => {
  return (
    <div className="bookmarkListItem">
      <div>
        <span className="type type--neg-small-normal">
          {schemaAndLanguage.colorSchema}
        </span>
        <span className="type type--neg-small-normal"> / </span>
        <span className="type type--neg-small-normal">
          {schemaAndLanguage.language}
        </span>
      </div>

      <div className="bookmarkListItemButtons">
        <span
          onClick={() => {
            runHighlight(schemaAndLanguage);
          }}
          className="type type--neg-small-bold"
        >
          Run
        </span>
        <span>
          <div
            className="icon icon--minus"
            onClick={() => {
              destroy();
            }}
          />
        </span>
      </div>
    </div>
  );
};

export default ListItemBookmark;
