// src/routes/AppRouter.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../App";
import Calender from "../pages/Kalender";
import Task from "../pages/Task"

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kalender" element={<Calender />} />
        <Route path="/Task" element={<Task />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
