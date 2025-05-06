import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import WelcomePage from "./WelcomePage";

// import ControlPanel from "./SFL/ControlPanel";
// import DevicePage from "./SFL/DevicePage";
// import ModelSplit from "./SFL/ModelSplit";
// import Topology from "./SFL/Topology";

import FMain from "./F/FMain";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<WelcomePage />} />

        <Route path="/F/main" element={<FMain />} />
        {/* <Route path="/SFL/devices" element={<DevicePage />} />
        <Route path="/SFL/split" element={<ModelSplit />} />
        <Route path="/SFL/topology" element={<Topology />} /> */}

      </Routes>
    </Router>
  );
}

export default App;
