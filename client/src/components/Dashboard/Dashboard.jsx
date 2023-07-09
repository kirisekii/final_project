import React, { useState } from "react";
import Questions from "../Questions/Questions.jsx";
import QuestionCreateForm from "../QuestionCreateForm/QuestionCreateForm.jsx";
import "./Dashboard.css";

const Dashboard = () => {
  const [sortBy, setSortBy] = useState(""); // State to track the sorting option

  const handleSort = (option) => {
    console.log(option);
    setSortBy(option);
  };

  return (
    <div className="dash-container">
      <div className="sort-button-container">
        <button
          className="sort-button"
          onClick={() => {
            handleSort("answerCount");
          }}
        >
          Sort by Answer Count
        </button>
        <button
          className="sort-button"
          onClick={() => {
            handleSort("createdAt");
          }}
        >
          Sort by Creation Date
        </button>
      </div>
      <div>
        <Questions sortBy={sortBy} /> {}
      </div>
      <div>
        <h2 className="heading">Create New Question</h2>
        <QuestionCreateForm />
      </div>
    </div>
  );
};

export default Dashboard;
