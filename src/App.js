import { Route, Routes } from "react-router-dom";
// import Home from "./pages/Home/Home";
import Main from "./pages/Main/Main";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </>
  );
}

export default App;
