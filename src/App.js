import { Routes, Route, Navigate } from "react-router-dom";
import Navebar from "./components/Navebar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

import { useAuthContext } from "./hooks/useAuthContext";

const App = () => {
  const { user } = useAuthContext();

  return (
    <div className="app bg-slate-900 text-slate-100 min-h-screen">
      <Navebar />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <SignUp /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
