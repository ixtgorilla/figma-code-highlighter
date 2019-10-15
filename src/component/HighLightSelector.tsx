import * as React from "react";
import * as ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import colorSchemaList from "../const/colorSchemalist";
import languageList from "../const/languagelist";
import { SchemaAndLanguage } from "../model/SchemaAndLanguage";

const postMessage = (schemaAndLanguage: SchemaAndLanguage) => {
  console.log("wao??");
  parent.postMessage(
    { pluginMessage: { type: "change", schemaAndLanguage } },
    "*"
  );
};

const HighLightSelector: React.FC = () => {
  const [schemaAndLanguage, setSchemaAndLanguage] = useState({
    language: "",
    colorSchema: ""
  });

  return (
    <div>
      <h2>Highlight.js - figma</h2>
      <select
        // value={schemaAndLanguage.language}
        onChange={e => {
          setSchemaAndLanguage(
            Object.assign(schemaAndLanguage, { colorSchema: e.target.value })
          );
          console.log(schemaAndLanguage);
        }}
      >
        {colorSchemaList.map((colorSchema, index) => {
          return (
            <option value={colorSchema} key={index}>
              {colorSchema}
            </option>
          );
        })}
      </select>
      <select
        // value={schemaAndLanguage.colorSchema}
        onChange={e => {
          setSchemaAndLanguage(
            Object.assign(schemaAndLanguage, { language: e.target.value })
          );
          console.log(schemaAndLanguage);
        }}
      >
        {languageList.map((language, index) => {
          return (
            <option value={language} key={index}>
              {language}
            </option>
          );
        })}
      </select>
      <button
        onClick={e => {
          postMessage(schemaAndLanguage);
        }}
      >
        Execute
      </button>
    </div>
  );
};

export default HighLightSelector;
