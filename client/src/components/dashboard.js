import Questions from './questions';
import QuestionCreateForm from './questionCreateForm';

const Dashboard = () => {
  return(
    <div>
      <Questions />
      <QuestionCreateForm />
    </div>
  );
}

export default Dashboard;