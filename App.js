import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import WelcomePage from "./WelcomePage";

import ControlPanel from "./SFL/ControlPanel";
import DevicePage from "./SFL/DevicePage";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<WelcomePage />} />

        <Route path="/SFL/control" element={<ControlPanel />} />
        <Route path="/SFL/devices" element={<DevicePage />} />

      </Routes>
    </Router>
  );
}

export default App;
