// src/routes/AppRouter.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Notes from "../App";
import Calender from "../pages/Kalender";
import Task from "../pages/Task";
import Editprofile from "../pages/editprofile";
import Bahasa from "../pages/bahasa";
import Upgrade from "../pages/upgrade";
import Worksspace from "../pages/workspace";
import Recentfile from "../pages/recentFile";
import Favorite from "../pages/favorite";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/workspace" element={<Worksspace />} />
        <Route path="/recentFile" element={<Recentfile />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/kalender" element={<Calender />} />
        <Route path="/task" element={<Task />} />
        {/* Router Setting */}
        <Route path="/setting/profile" element={<Editprofile/>} />
        <Route path="/setting/bahasa" element={<Bahasa/>} />
        <Route path="/setting/upgrade" element={<Upgrade/>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
