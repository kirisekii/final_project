import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserContext from "../UserContext/UserContext";
import "./Login.css";

const Login = () => {
  const { login } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authObject = { username: username, password: password };

    try {
      const response = await fetch("http://localhost:8081/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(authObject),
        credentials: "include",
      });

      if (response.ok) {
        const { userId } = await response.json();
        console.log("User logged in.");
        console.log(userId);

        login(userId);
        navigate("/dashboard");
      } else {
        alert("Failed to log in.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <h2>Welcome back! Please, log in</h2>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <Link to="/register">Create account</Link>
      </form>
    </div>
  );
};

export default Login;
