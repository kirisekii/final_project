import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import Replies from "./Replies";
import Questions from "./Questions";

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
