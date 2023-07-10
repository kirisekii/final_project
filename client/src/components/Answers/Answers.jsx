import React, { useState, useEffect } from "react";
import AnswerCreateForm from "../AnswerCreateForm/AnswerCreateForm.jsx";
import "./Answers.css";

const Answers = (props) => {
  const question = props.question;
  const answers = question.answers ? question.answers : [];
  const [open, setOpen] = useState(false);

  const toggleAnswers = () => {
    setOpen(!open);
  };

  return (
    <div className="container">
      <a href="#" onClick={toggleAnswers} className="link">
        {open ? "Hide answers" : "Show answers"}
      </a>
      {open &&
        answers.map((answer) => (
          <div className="answer" key={answer._id}>
            <p className="content">Content: {answer.content}</p>
          </div>
        ))}
      {open && <AnswerCreateForm question={question} className="form" />}
    </div>
  );
};

export default Answers;
