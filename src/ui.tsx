import * as React from "react";
import * as ReactDOM from "react-dom";
import HighLightSelector from "./component/HighLightSelector";
import "./figma-plugin-ds.css";
import "./ui.css";

declare function require(path: string): any;

class App extends React.Component {
  render() {
    return <HighLightSelector />;
  }
}

ReactDOM.render(<App />, document.getElementById("react-page"));
