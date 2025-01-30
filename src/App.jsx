import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import { Login } from "./Components/Login";
import { SignIn } from "./Components/SignIn";
import { LedrianInterfaz } from "./Components/LedrianInterfaz";
import { Profile } from "./Components/Profile";
import { ProfileEdit } from "./Components/PorfileComponents/ProfileEdit";
import { Friends } from "./Components/Friends";
import { Settings } from "./Components/Settings";
import { UserProvider } from "./UserContext";

export const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<LedrianInterfaz />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};
