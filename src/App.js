import { BrowserRouter, Route, Routes } from "react-router-dom";

//screens
import { Home, Splash } from "./screens";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Splash />} />
        <Route exact path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
