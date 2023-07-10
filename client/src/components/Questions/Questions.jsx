import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import "./Questions.css";

const Questions = (props) => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const sortBy = props.sortBy;
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/questions?sortBy=${sortBy}`
        );
        const data = await response.json();
        console.log(data);
        setQuestions(data || []);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [sortBy]);

  const showQuestion = (questionId) => {
    navigate(`/questions/${questionId}`);
  };

  const deleteQuestion = async (questionId) => {
    try {
      const response = await fetch(
        `http://localhost:8081/questions/${questionId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.ok) {
        setQuestions((prevQuestions) =>
          prevQuestions.filter((question) => question._id !== questionId)
        );
      } else {
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const editQuestion = (questionId) => {
    navigate(`/questions/${questionId}/edit`);
  };

  return (
    <div className="questions-section">
      <h1 className="heading">Questions</h1>
      {showAlert && (
        <Alert variant="warning">
          Only logged-in users can delete a question.{" "}
          <Link to="/login">Log in</Link>
        </Alert>
      )}
      {questions.map((question) => (
        <div key={question._id} className="question-container">
          <h3>Title: {question.title}</h3>
          {question.createdAt !== question.updatedAt && <span>(Edited)</span>}
          <p>Content: {question.content}</p>
          <button
            className="btn-style"
            onClick={() => showQuestion(question._id)}
          >
            Answer
          </button>
          <button
            className="btn-style"
            onClick={() => deleteQuestion(question._id)}
          >
            Delete
          </button>
          <button
            className="btn-style"
            onClick={() => editQuestion(question._id)}
          >
            Edit
          </button>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Questions;
