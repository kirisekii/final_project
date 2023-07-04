import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Replies from "./components/Replies/Replies";
import Questions from "./components/Questions/Questions";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/:id/replies" element={<Replies />} />
          <Route path="/:id/questions" element={<Questions />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
