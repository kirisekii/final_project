import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Questions.css";

const Questions = (props) => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const sortBy = props.sortBy;
  console.log(sortBy);
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
  }, []);

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
        console.log(data.message);
      } else {
        console.error("Error deleting question:", data.message);
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
      {questions.map((question) => (
        <div key={question._id} className="question-container">
          <h3>Title: {question.title}</h3>
          {question.createdAt !== question.updatedAt && <span>(Edited)</span>}
          <p>Content: {question.content}</p>
          <button
            className="btn-style"
            onClick={() => showQuestion(question._id)}
          >
            View
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
