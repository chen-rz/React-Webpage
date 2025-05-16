import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import WelcomePage from "./WelcomePage";

// import ControlPanel from "./SFL/ControlPanel";
// import DevicePage from "./SFL/DevicePage";
// import ModelSplit from "./SFL/ModelSplit";
// import Topology from "./SFL/Topology";

// TODO ------------------------------------------------
import Main372 from "./372/Main372";
import DeviceInfo372 from "./372/DeviceInfo372";
import FormA372 from "./372/FormA372";
import FormB372 from "./372/FormB372";
import FormC372 from "./372/FormC372";
import StatusA372 from "./372/StatusA372";
import StatusB372 from "./372/StatusB372";
import StatusC372 from "./372/StatusC372";

function App() {
  return (
    <Router>
      <Routes>

        {/* <Route path="/SFL/devices" element={<DevicePage />} />
        <Route path="/SFL/split" element={<ModelSplit />} />
        <Route path="/SFL/topology" element={<Topology />} /> */}

        <Route path="/" element={<WelcomePage />} />

        {/* TODO ------------------------------------------------ */}
        <Route path="/372/main" element={<Main372 />} />
        <Route path="/372/device" element={<DeviceInfo372 />} />
        {/* A-设备选择 */}
        <Route path="/372/form_a" element={<FormA372 />} />
        <Route path="/372/status_a" element={<StatusA372 />} />
        {/* B-本地训练卸载 */}
        <Route path="/372/form_b" element={<FormB372 />} />
        <Route path="/372/status_b" element={<StatusB372 />} />
        {/* C-全局资源配置 */}
        <Route path="/372/form_c" element={<FormC372 />} />
        <Route path="/372/status_c" element={<StatusC372 />} />

      </Routes>
    </Router>
  );
}

export default App;
