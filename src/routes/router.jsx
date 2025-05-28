// src/routes/AppRouter.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Notes from "../App";
import Calender from "../pages/Kalender";
import Task from "../pages/Task";
import Editprofile from "../pages/editprofile";
import Bahasa from "../pages/bahasa";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Notes" element={<Notes />} />
        <Route path="/kalender" element={<Calender />} />
        <Route path="/Task" element={<Task />} />
        {/* Router See */}
        <Route path="/setting/profile" element={<Editprofile/>} />
        <Route path="/setting/bahasa" element={<Bahasa/>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
