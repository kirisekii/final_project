import React, { useState, useEffect, useContext } from 'react';
import AnswerCreateForm from './answerCreateForm';
import { useParams } from 'react-router-dom';

const Question = () => {
  const [answers, setAnswers] = useState([]);
  const { questionId } = useParams();

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await fetch(`http://localhost:8081/questions/${questionId}/answers`, { credentials: 'include' });
        const data = await response.json();
        setAnswers(data);
      } catch (error) {
        console.error('Error fetching answers:', error);
      }
    };

    fetchAnswers();
  }, [questionId]);

  const likeAnswer = async (answerId) => {
    try {
      const response = await fetch(`http://localhost:8081/answers/${answerId}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });

      if (response.ok) {
        console.log('Liked');
        window.location.reload()
      } else {
        console.log('Like failed');
      }
    } catch(err) {
      console.log(err)
    }
  };

  const dislikeAnswer = async (answerId) => {
    try {
      const response = await fetch(`http://localhost:8081/answers/${answerId}/dislike`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });

      if (response.ok) {
        console.log('Disiked');
        window.location.reload()
      } else {
        console.log('Disike failed');
      }
    } catch(err) {
      console.log(err)
    }
  };

  const deleteAnswer = async (answerId) => {
    try {
      const response = await fetch(`http://localhost:8081/answers/${answerId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });

      if (response.ok) {
        console.log('Answer deleted');
        window.location.reload()
      } else {
        console.log('Answer deletion failed');
      }
    } catch(err) {
      console.log(err)
    }
  };

  return (
    <div>
      <table>
        <tr>
          <th>Answer</th>
          <th>Likes</th>
          <th>Dislikes</th>
          <th>Created at</th>
          <th>Actions</th>
        </tr>
        {answers.map((answer) => (
            <tr key={answer._id}>
              <td>{answer.content}</td>
              <td>{answer.likedUsersIds.length}</td>
              <td>{answer.dislikedUsersIds.length}</td>
              <td>{new Date(answer.createdAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })}</td>
              <td>
                <button onClick={() => { likeAnswer(answer._id) }}>Like</button>
                <button onClick={() => { dislikeAnswer(answer._id) }}>Dislike</button>
                <button onClick={() => { deleteAnswer(answer._id) }}>Delete</button>
              </td>
            </tr>
        ))}
      </table>
      <AnswerCreateForm questionId={questionId}/>
    </div>
  );
};

export default Question;
