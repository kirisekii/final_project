import React, { useState } from "react";
import Questions from "../Questions/Questions.jsx";
import QuestionCreateForm from "../QuestionCreateForm/QuestionCreateForm.jsx";
import "./Dashboard.css";

const Dashboard = () => {
  const [sortBy, setSortBy] = useState("");
  const [filter, setFilter] = useState("");

  const handleSort = (option) => {
    if (sortBy === option) {
      setSortBy(`-${option}`);
    } else {
      setSortBy(option);
    }
  };

  const handleFilter = (option) => {
    if (filter === option) {
      setFilter("");
    } else {
      setFilter(option);
    }
  };

  return (
    <div className="dash-container">
      <div className="sort-button-container">
        <button
          className="sort-button"
          onClick={() => handleSort("answerCount")}
        >
          Sort by Answer Count
        </button>
        <button className="sort-button" onClick={() => handleSort("createdAt")}>
          Sort by Creation Date
        </button>
        <button
          className="sort-button"
          onClick={() => handleFilter("unanswered")}
        >
          {filter === "unanswered" ? "Show All" : "Filter Unanswered"}
        </button>
      </div>
      <div>
        <Questions sortBy={sortBy} filter={filter} />
      </div>
      <div>
        <h2 className="heading">Create New Question</h2>
        <QuestionCreateForm />
      </div>
    </div>
  );
};

export default Dashboard;
