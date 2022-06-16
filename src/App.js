import "./App.css";
import Map from "./map/Map";
import Sidebar from "./sidebar/Sidebar";
import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";
import "react-reflex/styles.css";

function App() {
  return (
    <div className="wrapper">
      <ReflexContainer orientation="vertical">
        <ReflexElement className="left-pane" minSize="270">
          <Sidebar />
        </ReflexElement>
        <ReflexSplitter style={{ height: "100vh" }} />
        <ReflexElement className="right-pane" flex={0.8}>
          <Map />
        </ReflexElement>
      </ReflexContainer>
    </div>
  );
}

export default App;
