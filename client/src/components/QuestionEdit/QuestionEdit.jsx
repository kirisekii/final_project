import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const QuestionEdit = () => {
  const { id } = useParams();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(`http://localhost:8081/questions/${id}`);
        const data = await response.json();
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };

    fetchQuestion();
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <h1>Edit Question</h1>
      {}
      <form onSubmit={handleSubmit}>
        {}
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default QuestionEdit;
