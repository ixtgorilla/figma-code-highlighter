import * as React from "react";
import * as ReactDOM from "react-dom";
import Dashboard from "./pages/Dashboard";
import "./figma-plugin-ds.css";
import "./ui.css";

declare function require(path: string): any;

class App extends React.Component {
  render() {
    return <Dashboard />;
  }
}

ReactDOM.render(<App />, document.getElementById("react-page"));
