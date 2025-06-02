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
import Landingpage from "../pages/landingPage";
import SignUp from "../pages/sign_up";
import Login from "../pages/login";
import Archived from "../pages/archived";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
         {/* Router Landing Page */}
          <Route path="/" element={<Landingpage />} />
         {/* Router Login & Sign Up */}
         <Route path="/sign_up" element={<SignUp />} />
         <Route path="/login" element={<Login />} />
        {/* Router After Login */}
        <Route path="/workspace" element={<Worksspace />} />
        <Route path="/recentFile" element={<Recentfile />} />
        <Route path="/archived" element={<Archived />} />
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
