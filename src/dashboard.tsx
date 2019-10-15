import * as React from "react";
import * as ReactDOM from "react-dom";
import colorSchemaList from "./const/colorSchemalist";
import languageList from "./const/languagelist";
import HighLightSelector from "./component/HighLightSelector";

declare function require(path: string): any;

class App extends React.Component {
  textbox: HTMLInputElement;

  onCreate = () => {
    const count = parseInt(this.textbox.value, 10);
    parent.postMessage(
      { pluginMessage: { type: "create-rectangles", count } },
      "*"
    );
  };

  onCancel = () => {
    parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
  };

  render() {
    return (
      <HighLightSelector />
      // <div>
      //   <h2></h2>
      //   <select onChange={e => console.log(e.target.value)}>
      //     {colorSchemaList.map(colorSchema => {
      //       return <option>{colorSchema}</option>;
      //     })}
      //   </select>
      //   <select
      //     // value={schemaAndLanguage.colorSchema}
      //     onChange={e => console.log(e)}
      //   >
      //     {languageList.map(language => {
      //       return <option>{language}</option>;
      //     })}
      //   </select>
      //   {/* <p>
      //     Count: <input ref={this.countRef} />
      //   </p>
      //   <button id="create" onClick={this.onCreate}>
      //     Create
      //   </button> */}
      //   <button onClick={this.onCancel}>Cancel</button>
      // </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("react-page"));
