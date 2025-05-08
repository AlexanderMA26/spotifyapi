import { useState } from 'react'
import './App.css'
import Code from './code'
import genQuiz from './QuizGen'

function App() {
  const [quiz, setQuiz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [qanswers, setqanswers] = useState([]);

  
  async function handleForm(e) {
    const selCat = e.target.value;
    const data = await genQuiz(selCat);
    if (data) {
      setQuiz(data.results);
      setScore(0);
      setFinished(false);
      setSelectedAnswer(null);
      setCurrentQuestion(0);
    }
  }

  const handleAnswer = (answer) => {
    const correctAnswe = quiz[currentQuestion].correct_answer;


    if (answer === correctAnswe) {
      setScore((prev) => prev + 1);

    }
    if (currentQuestion + 1 < quiz.length) {
      setCurrentQuestion((prev) => prev + 1);
      setqanswers(prevItems => [...prevItems, answer]);
      setSelectedAnswer(null);
    } else {
      setFinished(true);
    }
  };

  return (
      <div className='App'>
        <h1>Quiz Game</h1>
        <br></br>
        <h2>Select what category you'd like to be quizzed on:</h2>
        <form onChange={handleForm}>
  <input type="radio" id="General Knowledge" name="fav_language" value="9"/>
  <label for="General Knowledge">General Knowledge</label>

  <input type="radio" id="Entertainment: Books" name="fav_language" value="10"/>
  <label for="Entertainment: Books">Books</label>

  <input type="radio" id="Entertainment: Music" name="fav_language" value="12"/>
  <label for="Entertainment: Music">Music</label>

  <input type="radio" id="Science: Computers" name="fav_language" value="18"/>
  <label for="Science: Computers">Computers</label>

  <input type="radio" id="Sports" name="fav_language" value="21"/>
  <label for="Sports">Sports</label>

  <input type="radio" id="Art" name="fav_language" value="25"/>
   
  <label for="Art">Art</label>
      </form>
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
          <p>Question 5 Answer: {quiz[4].correct_answer}.Your answer: {qanswers[4]}.</p>
        </div>
      )}
      </div>
  )
}

export default App
