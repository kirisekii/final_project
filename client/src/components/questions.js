import React, { useState, useEffect } from "react";
import "./Dashboard/dashboard.css";
import { useNavigate } from "react-router-dom";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:8081/questions");
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const showQuestion = (questionId) => {
    navigate(`/questions/${questionId}`);
  };

  return (
    <div className="questions-section">
      <h1 className="heading">Questions</h1>
      {questions.map((question) => (
        <div
          key={question._id}
          onClick={() => {
            showQuestion(question._id);
          }}
        >
          <h3>Title: {question.title}</h3>
          <p>Content: {question.content}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Questions;
