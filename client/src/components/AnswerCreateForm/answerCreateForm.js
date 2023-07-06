import React, { useState } from "react";
import "./answerCreateForm.css";
import { useNavigate } from "react-router-dom";

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
        // navigate(`/questions/${questionId}`);
      } else {
        console.log("Answer creation failed");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return React.createElement(
    "form",
    { onSubmit: handleSubmit },
    React.createElement(
      "div",
      null,
      React.createElement("label", { htmlFor: "content" }, "Reply:"),
      React.createElement("input", {
        type: "text",
        id: "content",
        value: content,
        onChange: (e) => setContent(e.target.value),
      })
    ),
    React.createElement("button", { type: "submit" }, "Create")
  );
};

export default AnswerCreateForm;
