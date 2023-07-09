import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Dashboard/Dashboard.css";

const QuestionCreateForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newQuestion = { title: title, content: content };

    try {
      const response = await fetch("http://localhost:8081/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newQuestion),
        credentials: "include",
      });

      if (response.ok) {
        console.log("Question created");
        navigate("/dashboard");
      } else {
        console.log("Question creation failed");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="question-create-form">
      <div>
        <label htmlFor="title" className="label">
          Title:
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input"
        />
      </div>
      <div>
        <label htmlFor="content" className="label">
          Content:
        </label>
        <input
          type="text"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="input"
        />
      </div>
      <button type="submit" className="button">
        Create
      </button>
    </form>
  );
};

export default QuestionCreateForm;
