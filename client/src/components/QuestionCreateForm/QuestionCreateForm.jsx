import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import "./QuestionCreateForm.css";

const QuestionCreateForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8081/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
        credentials: "include",
      });

      if (response.ok) {
        console.log("Question created");
        navigate("/dashboard");
      } else if (response.status === 401) {
        setShowAlert(true);
      } else {
        console.log("Question creation failed");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="question-create-form">
      {showAlert && (
        <Alert variant="warning">
          Only logged-in users can ask a question.{" "}
          <Link to="/login">Log in</Link>
        </Alert>
      )}
      <div>
        <label htmlFor="title" className="label">
          Title:
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input"
        />
      </div>
      <div>
        <label htmlFor="content" className="label">
          Content:
        </label>
        <input
          type="text"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="input"
        />
      </div>
      <button type="submit" className="button">
        Create
      </button>
    </form>
  );
};

export default QuestionCreateForm;
