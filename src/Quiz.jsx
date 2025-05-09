import { useState } from 'react'
import './App.css'
import genQuiz from './QuizGen'
import { useEffect } from 'react';

function Quiz({category, title}) {
  const [quiz, setQuiz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [qanswers, setqanswers] = useState([]);

  
    async function fetchQuiz() {
      const data = await genQuiz(category);
      if (data) {
        setQuiz(data.results);
        console.log(quiz);
      }
      
    }
    fetchQuiz();
 


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
          <p>Question 1 Answer: {quiz[0].correct_answer}. Your answer: {qanswers[0]}.</p>
          <p>Question 2 Answer: {quiz[1].correct_answer}. Your answer: {qanswers[1]}.</p>
          <p>Question 3 Answer: {quiz[2].correct_answer}. Your answer: {qanswers[2]}.</p>
          <p>Question 4 Answer: {quiz[3].correct_answer}. Your answer: {qanswers[3]}.</p>
          <p>Question 5 Answer: {quiz[4].correct_answer}. Your answer: {qanswers[4]}.</p>
        </div>
      )}
      </div>
  )
}
export default Quiz;
