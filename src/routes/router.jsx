// src/routes/AppRouter.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../App";
import Calender from "../pages/Kalender";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kalender" element={<Calender />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
