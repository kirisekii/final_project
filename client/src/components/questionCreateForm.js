import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuestionCreateForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newQuestion = { title: title, content: content };

    try {
      const response = await fetch('http://localhost:8081/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQuestion),
        credentials: 'include'
      });

      if (response.ok) {
        console.log('Question created');
        navigate('/dashboard');
      } else {
        console.log('Question creation failed');
      }
    } catch(err) {
      console.log(err)
    }
  };

  return (
    React.createElement('form', { onSubmit: handleSubmit },
      React.createElement('div', null,
        React.createElement('label', { htmlFor: 'title' }, 'Title:'),
        React.createElement('input', {
          type: 'text',
          id: 'title',
          value: title,
          onChange: (e) => setTitle(e.target.value)
        })
      ),
      React.createElement('div', null,
        React.createElement('label', { htmlFor: 'content' }, 'Content:'),
        React.createElement('input', {
          type: 'text',
          id: 'content',
          value: content,
          onChange: (e) => setContent(e.target.value)
        })
      ),
      React.createElement('button', { type: 'submit' }, 'Create')
    )
  );
};

export default QuestionCreateForm;
