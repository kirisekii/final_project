import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Alert } from "react-bootstrap";

import "./AnswerCreateForm.css";

const AnswerCreateForm = (props) => {
  const questionId = props.questionId;
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const [showLikeAlert, setShowLikeAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (content.length < 2) {
      alert("Type something!");
      return;
    }

    const newAnswer = { content: content };

    try {
      const response = await fetch(
        `http://localhost:8081/questions/${questionId}/answers`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newAnswer),
          credentials: "include",
        }
      );

      if (response.ok) {
        console.log("Answer created");
        window.location.reload();
      } else if (response.status === 401) {
        setShowLikeAlert(true);
      } else {
        console.log("Answer creation failed");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      {showLikeAlert && (
        <Alert variant="warning" className="delete-alert">
          Only logged-in users can like an answer.{" "}
          <Link to="/login">Log in</Link>
        </Alert>
      )}
      <div>
        <label className="label" htmlFor="content">
          Reply:
        </label>
        <input
          className="input"
          type="text"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button className="button" type="submit">
        Create
      </button>
    </form>
  );
};

export default AnswerCreateForm;
