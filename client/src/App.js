import "./App.css";
import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { UserProvider } from "./components/UserContext/UserContext";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import Question from "./components/Question/Question";
import QuestionEdit from "./components/QuestionEdit/QuestionEdit";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Nav />

        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/questions/:questionId" element={<Question />} />
          <Route
            path="/questions/:questionId/edit"
            element={<QuestionEdit />}
          />
        </Routes>
        <Footer />
      </Router>
    </UserProvider>
  );
};

export default App;
