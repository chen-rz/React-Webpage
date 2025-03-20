import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import WelcomePage from "./WelcomePage";

import ControlPanel from "./SFL/ControlPanel";
import DevicePage from "./SFL/DevicePage";
import ModelSplit from "./SFL/ModelSplit";
import Topology from "./SFL/Topology";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<WelcomePage />} />

        <Route path="/SFL/control" element={<ControlPanel />} />
        <Route path="/SFL/devices" element={<DevicePage />} />
        <Route path="/SFL/split" element={<ModelSplit />} />
        <Route path="/SFL/topology" element={<Topology />} />

      </Routes>
    </Router>
  );
}

export default App;
