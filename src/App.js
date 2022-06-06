import { BrowserRouter, Route, Routes } from "react-router-dom";

//screens
import { BreakDownScreen, Home, Splash } from "./screens";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Splash />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/breakdown" element={<BreakDownScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
