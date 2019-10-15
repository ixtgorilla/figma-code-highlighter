import * as React from "react";
import * as ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import colorSchemaList from "../const/colorSchemalist";
import languageList from "../const/languagelist";
import { SchemaAndLanguage } from "../model/SchemaAndLanguage";

const postMessage = (schemaAndLanguage: SchemaAndLanguage) => {
  console.log("wao??");
  parent.postMessage(
    { pluginMessage: { type: "CHANGE_COLOR", schemaAndLanguage } },
    "*"
  );
};

const HighLightSelector: React.FC = () => {
  const [schemaAndLanguage, setSchemaAndLanguage] = useState({
    language: "",
    colorSchema: ""
  });

  useEffect(() => {
    onmessage = event => {
      setSchemaAndLanguage(event.data.pluginMessage);
    };
  });

  return (
    <div>
      <h2>Highlight.js - figma</h2>
      <select
        onChange={e => {
          setSchemaAndLanguage(
            Object.assign(schemaAndLanguage, { colorSchema: e.target.value })
          );
          console.log(schemaAndLanguage);
        }}
      >
        {colorSchemaList.map((colorSchema, index) => {
          return colorSchema == schemaAndLanguage.colorSchema ? (
            <option selected value={colorSchema} key={index}>
              {colorSchema}
            </option>
          ) : (
            <option value={colorSchema} key={index}>
              {colorSchema}
            </option>
          );
        })}
      </select>
      <select
        onChange={e => {
          setSchemaAndLanguage(
            Object.assign(schemaAndLanguage, { language: e.target.value })
          );
          console.log(schemaAndLanguage);
        }}
      >
        {languageList.map((language, index) => {
          return language == schemaAndLanguage.language ? (
            <option selected value={language} key={index}>
              {language}
            </option>
          ) : (
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
      <button
        onClick={e => {
          console.log(schemaAndLanguage);
        }}
      >
        CheckIt
      </button>
    </div>
  );
};

export default HighLightSelector;
