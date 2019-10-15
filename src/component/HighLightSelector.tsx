import * as React from "react";
import { useState, useEffect } from "react";
import colorSchemaList from "../const/colorSchemalist";
import languageList from "../const/languagelist";
import { SchemaAndLanguage } from "../model/SchemaAndLanguage";

const execute = (schemaAndLanguage: SchemaAndLanguage) => {
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

  const [
    bookmarkedSchemaAndLanguages,
    setBookmarkedSchemaAndLanguages
  ] = useState([]);

  useEffect(() => {
    onmessage = event => {
      if (event.data.pluginMessage.type == "CURRENT_SCHEMA_AND_LANGUAGE") {
        setSchemaAndLanguage(event.data.pluginMessage.schemaAndLanguage);
      }

      if (event.data.pluginMessage.type == "BOOKMARKED_SCHEMA_AND_LANGUAGES") {
        setBookmarkedSchemaAndLanguages(array => [
          ...array,
          ...event.data.pluginMessage.schemaAndLanguages
        ]);
      }
    };
  });

  useEffect(() => {
    parent.postMessage(
      {
        pluginMessage: {
          type: "UPDATE_BOOKMARKS",
          schemaAndLanguages: bookmarkedSchemaAndLanguages
        }
      },
      "*"
    );
  }, [bookmarkedSchemaAndLanguages]);

  return (
    <div>
      <h2>Highlight.js - figma</h2>
      <select
        onChange={e => {
          setSchemaAndLanguage(
            Object.assign(schemaAndLanguage, { colorSchema: e.target.value })
          );
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
          execute(schemaAndLanguage);
        }}
      >
        execute
      </button>
      <button
        onClick={e => {
          setBookmarkedSchemaAndLanguages(array => {
            const obj = Object.assign({}, schemaAndLanguage);
            return [...array, obj];
          });
        }}
      >
        bookmark
      </button>
      <hr />
      {bookmarkedSchemaAndLanguages &&
        bookmarkedSchemaAndLanguages.map((item, index) => {
          let schemaAndLanguage: SchemaAndLanguage = item;
          return (
            <div key={index}>
              <span>{schemaAndLanguage.colorSchema}</span>
              <span> / </span>
              <span>{schemaAndLanguage.language}</span>
              <span>
                <button
                  onClick={e => {
                    setBookmarkedSchemaAndLanguages(array => {
                      array.splice(index, 1);
                      return [...array];
                    });
                  }}
                >
                  Destroy
                </button>

                <button
                  onClick={e => {
                    execute(schemaAndLanguage);
                  }}
                >
                  execute
                </button>
              </span>
            </div>
          );
        })}
    </div>
  );
};

export default HighLightSelector;
