import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { UserProvider } from "./components/userContext";
import Login from "./components/login";
import Register from "./components/register";
import Dashboard from "./components/Dashboard/dashboard";
import Question from "./components/question";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/questions/:questionId" element={<Question />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
