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
      {/* <h2>Highlight.js - figma</h2> */}
      <div className="box">
        <div className="flex">
          <div className="flexChild">
            <div className="section-title">Color Schema</div>
            <select
              className="select-menu__button"
              onChange={e => {
                setSchemaAndLanguage(
                  Object.assign(schemaAndLanguage, {
                    colorSchema: e.target.value
                  })
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
          </div>
          <div className="flexChild">
            <div className="section-title">Language</div>
            <select
              className="select-menu__button"
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
          </div>
        </div>
        <button
          className="button button--secondary buttonFullWidth"
          onClick={e => {
            execute(schemaAndLanguage);
          }}
        >
          Execute
        </button>
      </div>
      <div className="divider" />

      <div className="box">
        <div className="bookmarksSectionTitle">
          <div className="section-title">Bookmarks</div>
          <div
            className="icon icon--plus"
            onClick={e => {
              setBookmarkedSchemaAndLanguages(array => {
                const obj = Object.assign({}, schemaAndLanguage);
                return [obj, ...array];
              });
            }}
          />
        </div>
        {bookmarkedSchemaAndLanguages &&
          bookmarkedSchemaAndLanguages.map((item, index) => {
            let schemaAndLanguage: SchemaAndLanguage = item;
            return (
              <div className="bookmarkListItem" key={index}>
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
                    onClick={e => {
                      execute(schemaAndLanguage);
                    }}
                    className="type type--neg-small-bold"
                  >
                    Execute
                  </span>
                  <span>
                    <div
                      className="icon icon--minus"
                      onClick={e => {
                        setBookmarkedSchemaAndLanguages(array => {
                          array.splice(index, 1);
                          return [...array];
                        });
                      }}
                    />
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default HighLightSelector;
