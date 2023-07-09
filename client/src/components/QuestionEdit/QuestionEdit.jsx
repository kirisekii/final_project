import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./QuestionEdit.css";

const QuestionEdit = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  const { questionId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8081/questions/${questionId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content }),
          credentials: "include",
        }
      );

      if (response.ok) {
        console.log("Question edited");
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
    <form onSubmit={handleSubmit} className="question-edit-container">
      {showAlert && (
        <Alert variant="warning">
          Only logged-in users can edit a question.{" "}
          <Link to="/login">Log in</Link>
        </Alert>
      )}
      <h1 className="edit-heading">Edit Question</h1>
      <div className="edit-form-group">
        <label className="edit-label">Title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="edit-input"
        />
      </div>
      <div className="edit-form-group">
        <label className="edit-label">Content</label>
        <textarea
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="edit-textarea"
          rows="5"
        ></textarea>
      </div>
      <button type="submit" className="edit-btn-style">
        Update
      </button>
    </form>
  );
};

export default QuestionEdit;
