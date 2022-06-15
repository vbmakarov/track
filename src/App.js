import "./App.css";
import Map from "./map/Map";
import Sidebar from "./sidebar/Sidebar";

function App() {
  return (
    <div className="wrapper">
      <Sidebar />
      <Map />
    </div>
  );
}

export default App;
