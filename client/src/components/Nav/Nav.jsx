import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  return (
    <nav className="nav-container">
      <ul className="nav-links">
        <li className="nav-link">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-link">
          <Link to="/login">Login</Link>
        </li>
        <li className="nav-link">
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
