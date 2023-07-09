import React from "react";
import Questions from "../Questions/Questions.jsx";
import QuestionCreateForm from "../QuestionCreateForm/QuestionCreateForm.jsx";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="container">
      <div className="questions-section">
        <Questions />
      </div>
      <div className="question-create-form-section">
        <h2 className="heading">Create New Question</h2>
        <QuestionCreateForm />
      </div>
    </div>
  );
};

export default Dashboard;
