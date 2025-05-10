import { useState, useEffect } from 'react'
import './App.css'
import genQuiz from './QuizGen'

function Quiz({category, title}) {
  const [quiz, setQuiz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [qanswers, setqanswers] = useState([]);

  
  useEffect(() => {
    async function fetchQuiz() {
      const data = await genQuiz(category);
      if (data?.results) {
        setQuiz(data.results);
      }
    }
    fetchQuiz();
  }, [category]);
 


  const handleAnswer = (answer) => {
    const correctAnswe = quiz[currentQuestion].correct_answer;

    if (answer === correctAnswe) {
      setScore((prev) => prev + 1);

    }
    if (currentQuestion + 1 < quiz.length) {
      setCurrentQuestion((prev) => prev + 1);
      setqanswers(prevItems => [...prevItems, answer]);
    } else {
      setFinished(true);
    }
  };

  return (
      <div className='App'>
        <h1>{title}</h1>
        <br></br>

      {/* The dynamic question rendering was a lot of GPT */}
      {quiz.length > 0 && !finished && (
        
        <div className="quiz">
          <h3 dangerouslySetInnerHTML={{ __html: quiz[currentQuestion].question }} />
          <ul>
            {[...quiz[currentQuestion].incorrect_answers, quiz[currentQuestion].correct_answer].map(
              (answer, idx) => (
                <li key={idx}>
                  <button onClick={() => handleAnswer(answer)} dangerouslySetInnerHTML={{ __html: answer }}/>
                </li>
              )
            )}
          </ul>
        </div>
      )}

      {finished && (
        <div>
          <h2>Quiz finished!</h2>
          <p>Your score: {score} / {quiz.length}</p>
          {quiz.map((q, idx) => (
            <p key={idx}>
              Q{idx + 1} Answer: <span dangerouslySetInnerHTML={{ __html: q.correct_answer }} />. Your answer: <span dangerouslySetInnerHTML={{ __html: qanswers[idx] }} />.
            </p>
          ))}
        </div>
      )}
      </div>
  )
}
export default Quiz;


async function fetchQuiz(category){
  const data = await genQuiz(category);
  return data.results;
}