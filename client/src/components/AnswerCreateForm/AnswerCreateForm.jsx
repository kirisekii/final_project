import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AnswerCreateForm.css";

const AnswerCreateForm = (props) => {
  const questionId = props.questionId;
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      } else {
        console.log("Answer creation failed");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
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
