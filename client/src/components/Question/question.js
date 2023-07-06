import React, { useState, useEffect, useContext } from "react";
import AnswerCreateForm from "../AnswerCreateForm/answerCreateForm";
import { useParams } from "react-router-dom";
import "./Question.css"; // Import the CSS file

const Question = () => {
  const [answers, setAnswers] = useState([]);
  const { questionId } = useParams();

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/questions/${questionId}/answers`,
          { credentials: "include" }
        );
        const data = await response.json();
        setAnswers(data);
      } catch (error) {
        console.error("Error fetching answers:", error);
      }
    };

    fetchAnswers();
  }, [questionId]);

  const likeAnswer = async (answerId) => {
    // ... Rest of the code
  };

  const dislikeAnswer = async (answerId) => {
    // ... Rest of the code
  };

  const deleteAnswer = async (answerId) => {
    // ... Rest of the code
  };

  return (
    <div className="question-container">
      <table className="answers-table">
        <tr>
          <th>Answer</th>
          <th>Likes</th>
          <th>Dislikes</th>
          <th>Created at</th>
          <th>Actions</th>
        </tr>
        {answers.map((answer) => (
          <tr key={answer._id}>
            <td>{answer.content}</td>
            <td>{answer.likedUsersIds.length}</td>
            <td>{answer.dislikedUsersIds.length}</td>
            <td>
              {new Date(answer.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </td>
            <td>
              <button
                className="action-button"
                onClick={() => {
                  likeAnswer(answer._id);
                }}
              >
                Like
              </button>
              <button
                className="action-button"
                onClick={() => {
                  dislikeAnswer(answer._id);
                }}
              >
                Dislike
              </button>
              <button
                className="action-button"
                onClick={() => {
                  deleteAnswer(answer._id);
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </table>
      <AnswerCreateForm questionId={questionId} />
    </div>
  );
};

export default Question;
