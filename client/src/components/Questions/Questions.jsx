import React, { useState } from "react";

const Questions = () => {
  const [question, setQuestion] = useState("");

  const handleSubmitQuestion = (e) => {
    e.preventDefault();
    console.log({ question });
    setQuestion("");
  };

  return (
    <main className="questions">
      <form className="question_content" onSubmit={handleSubmitQuestion}>
        <label htmlFor="question">Ask a question</label>
        <textarea
          rows={5}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          type="text"
          name="question"
          className="mquestion_content"
        />

        <button className="modalBtn">SEND</button>
      </form>
    </main>
  );
};

export default Questions;
