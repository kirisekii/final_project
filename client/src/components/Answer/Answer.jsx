import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import "./Answer.css";

const Answer = ({ answer }) => {
  const [likes, setLikes] = useState((answer.likedUsersIds || []).length);

  const [answerId, setAnswerId] = useState(answer._id);
  const [dislikes, setDislikes] = useState(
    (answer.dislikedUsersIds || []).length
  );
  const [showLikeAlert, setShowLikeAlert] = useState(false);
  const [showDislikeAlert, setShowDislikeAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showEditAlert, setShowEditAlert] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(answer.content);
  const navigate = useNavigate();
  const [deleted, setDeleted] = useState(false);
  const isLoggedIn = true;
  const isEdited = editedContent !== answer.content;

  useEffect(() => {
    setEditedContent(answer.content);
  }, [answer.content]);

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
        setShowLikeAlert(true);
      }
    } catch (error) {
      console.error("Error liking answer:", error);
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
        setShowDislikeAlert(true);
      }
    } catch (error) {
      console.error("Error disliking answer:", error);
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
        setShowDeleteAlert(true);
      }
    } catch (error) {
      console.error("Error deleting answer:", error);
    }
  };

  const toggleEditMode = () => {
    if (isLoggedIn) {
      setEditMode(!editMode);
    } else {
      setShowEditAlert(true);
    }
  };

  const edit = () => {
    setEditMode(true);
  };

  const save = async () => {
    console.log(answerId);
    try {
      const response = await fetch(
        `http://localhost:8081/answers/${answerId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: editedContent,
          }),
          credentials: "include",
        }
      );

      if (response.ok) {
        console.log("Answer edited");
        setEditMode(false);
      } else if (response.status === 401) {
        console.log("401");
      } else {
        console.log("Answer edition failed");
      }
    } catch (err) {
      console.log(err);
    }
    console.log("veikia");
  };

  const handleContentChange = (e) => {
    setEditedContent(e.target.value);
  };

  const updateAnswer = (updatedAnswer) => {};

  return (
    <tr key={answer._id}>
      <td>
        {editMode ? (
          <input
            type="text"
            value={editedContent}
            onChange={handleContentChange}
          />
        ) : (
          answer.content
        )}
        {isEdited && (
          <span>
            (<i>Edited</i>)
          </span>
        )}
      </td>
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
          onClick={() => likeAnswer(answer._id)}
        >
          Like
        </button>
        <button
          className="action-button"
          onClick={() => dislikeAnswer(answer._id)}
        >
          Dislike
        </button>
        {deleted ? (
          <p>Answer deleted</p>
        ) : (
          <>
            <button
              className="action-button"
              onClick={() => deleteAnswer(answer._id)}
            >
              Delete
            </button>
            {editMode && (
              <button className="action-button" onClick={save}>
                Save
              </button>
            )}
            {!editMode && (
              <button className="action-button" onClick={edit}>
                Edit
              </button>
            )}
          </>
        )}
        {showLikeAlert && (
          <Alert variant="warning" className="delete-alert">
            Only logged-in users can like an answer.{" "}
            <Link to="/login">Log in</Link>
          </Alert>
        )}
        {showDislikeAlert && (
          <Alert variant="warning" className="delete-alert">
            Only logged-in users can dislike an answer.{" "}
            <Link to="/login">Log in</Link>
          </Alert>
        )}
        {showDeleteAlert && (
          <Alert variant="warning" className="delete-alert">
            Only logged-in users can delete an answer.{" "}
            <Link to="/login">Log in</Link>
          </Alert>
        )}
        {showEditAlert && (
          <Alert variant="warning" className="delete-alert">
            Only logged-in users can edit an answer.{" "}
            <Link to="/login">Log in</Link>
          </Alert>
        )}
      </td>
    </tr>
  );
};

export default Answer;
