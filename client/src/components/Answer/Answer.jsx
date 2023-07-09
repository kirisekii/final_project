import React, { useState, useEffect, useContext } from "react";
import AnswerCreateForm from "../AnswerCreateForm/AnswerCreateForm";
import { useParams } from "react-router-dom";
// import "./Answer.css";

const Answer = (props) => {
  const answer = props.answer;
  const [likes, setLikes] = useState(answer.likedUsersIds.length);
  const [dislikes, setDislikes] = useState(answer.dislikedUsersIds.length);

  const [deleted, setDeleted] = useState(false);

  const likeAnswer = async (answerId) => {
    try {
      const response = await fetch(
        `http://localhost:8081/answers/${answerId}/like`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.ok) {
        setLikes(likes + 1);
      } else {
        console.error("Error deleting answer:", data.message);
      }
    } catch (error) {
      console.error("Error deleting answer:", error);
    }
  };

  const dislikeAnswer = async (answerId) => {
    try {
      const response = await fetch(
        `http://localhost:8081/answers/${answerId}/dislike`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.ok) {
        setDislikes(dislikes + 1);
      } else {
        console.error("Error deleting answer:", data.message);
      }
    } catch (error) {
      console.error("Error deleting answer:", error);
    }
  };

  const deleteAnswer = async (answerId) => {
    try {
      const response = await fetch(
        `http://localhost:8081/answers/${answerId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.ok) {
        setDeleted(true);
      } else {
        console.error("Error deleting answer:", data.message);
      }
    } catch (error) {
      console.error("Error deleting answer:", error);
    }
  };

  return (
    <tr key={answer._id}>
      <td>{answer.content}</td>
      <td>{likes}</td>
      <td>{dislikes}</td>
      <td>
        {new Date(answer.createdAt).toLocaleTimeString([], {
          year: "numeric",
          month: "numeric",
          day: "numeric",
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
  );
};

export default Answer;
