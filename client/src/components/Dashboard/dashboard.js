import React from "react";
import Questions from "../questions.js";
import QuestionCreateForm from "../questionCreateForm.js";
import "./dashboard.css"; // Import the CSS file

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
