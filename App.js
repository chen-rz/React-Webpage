import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ControlPanel from "./ControlPanel";
import DevicePage from "./DevicePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ControlPanel />} />
        <Route path="/devices" element={<DevicePage />} />
      </Routes>
    </Router>
  );
}

export default App;
