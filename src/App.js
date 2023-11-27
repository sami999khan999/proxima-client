import { Routes, Route } from "react-router-dom";
import Navebar from "./components/Navebar";
import Footer from "./components/Footer";
import Home from "./pages/Home";

const App = () => {
  return (
    <div className="app bg-slate-900 text-slate-100 min-h-screen">
      <Navebar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
