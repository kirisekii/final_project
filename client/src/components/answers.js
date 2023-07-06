import React, { useState, useEffect } from 'react';
import AnswerCreateForm from './answerCreateForm';

const Answers = (props) => {
  const question = props.question;
  const answers = question.answers;
  const [open, setOpen] = useState(false);

  const toggleAnswers = () => {
    setOpen(!open);
  }

  return (
    <div>
      <a href='#' onClick={toggleAnswers}>{open ? 'Hide answers' : 'Show answers'}</a>
      {
        open && answers.map((answer) => (
          <div key={answer._id}>
            <p>Content: {answer.content}</p>
          </div>
        ))
      }
      {open && <AnswerCreateForm question={question}/>}
    </div>
  );
};

export default Answers;
