import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main/Main";
import Home from "./pages/Home/Home";
import Design1 from "./components/design1/Design1";
import Design2 from "./components/design2/Design2";
import Design3 from "./components/design3/Design3";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="/design1" element={<Design1 />} />
        <Route path="/design2" element={<Design2 />} />
        <Route path="/design3" element={<Design3 />} />
      </Routes>
    </>
  );
}

export default App;
