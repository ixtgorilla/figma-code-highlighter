import * as React from "react";
import * as ReactDOM from "react-dom";
import HighLightSelector from "./component/HighLightSelector";

declare function require(path: string): any;

class App extends React.Component {
  render() {
    return <HighLightSelector />;
  }
}

ReactDOM.render(<App />, document.getElementById("react-page"));
