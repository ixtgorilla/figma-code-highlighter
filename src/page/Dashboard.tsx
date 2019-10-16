import * as React from "react";
import { useState, useEffect } from "react";
import Bookmarks from "../component/Bookmarks";
import HighlightExecutor from "../component/HighlightExecutor";

const Dashboard: React.FC = () => {
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
      <HighlightExecutor
        schemaAndLanguage={schemaAndLanguage}
        setColorSchema={event => {
          setSchemaAndLanguage(
            Object.assign(schemaAndLanguage, {
              colorSchema: event.target.value
            })
          );
        }}
        setLanguage={event => {
          setSchemaAndLanguage(
            Object.assign(schemaAndLanguage, {
              language: event.target.value
            })
          );
        }}
      />

      <div className="divider" />

      <Bookmarks
        schemaAndLanguage={schemaAndLanguage}
        bookmarkedSchemaAndLanguages={bookmarkedSchemaAndLanguages}
        createBookmark={schemaAndLanguage => {
          setBookmarkedSchemaAndLanguages(array => {
            const obj = Object.assign({}, schemaAndLanguage);
            return [obj, ...array];
          });
        }}
        destroyBookmark={index => {
          setBookmarkedSchemaAndLanguages(array => {
            array.splice(index, 1);
            return [...array];
          });
        }}
      />
    </div>
  );
};

export default Dashboard;
