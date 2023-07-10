import React, { useState, useEffect, useContext } from "react";
import AnswerCreateForm from "../AnswerCreateForm/AnswerCreateForm";
import Answer from "../Answer/Answer";
import { useParams } from "react-router-dom";
import "./Question.css";

const Question = () => {
  const [answers, setAnswers] = useState([]);
  const { questionId } = useParams();

  useEffect(() => {
    const fetchAnswers = async () => {
      setAnswers([]);
      try {
        const response = await fetch(
          `http://localhost:8081/questions/${questionId}/answers`,
          { credentials: "include" }
        );
        const data = await response.json();
        console.log(data);
        setAnswers(data || []);
      } catch (error) {
        console.error("Error fetching answers:", error);
      }
    };

    fetchAnswers();
  }, [questionId]);

  return (
    <div className="question-container">
      <table className="answers-table">
        <thead>
          <tr>
            <th>Answer</th>
            <th>Likes</th>
            <th>Dislikes</th>
            <th>Created at</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {(answers || []).map((answer) => (
            <Answer key={answer._id} answer={answer} />
          ))}
        </tbody>
      </table>
      <AnswerCreateForm questionId={questionId} />
    </div>
  );
};

export default Question;
