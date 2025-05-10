import { useState } from 'react';
import './App.css';
import BooksQuiz from './books';
import GenQuiz from './GenKnow';
import MusicQuiz from './Music';
import CompQuiz from './computers';
import SportsQuiz from './sports';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';



function App() {
  return (
    <Router>
      {/Adding the link to different quiz categories./}
      <div className="App">
        <header><h1>Quiz Game</h1></header>
        <title>Choose your quiz category</title>
        
        <ul>
          <li><Link to="/books">Books</Link></li>
          <li><Link to="/music">Music</Link></li>
          <li><Link to="/computers">Computers</Link></li>
          <li><Link to="/sports">Sports</Link></li>
          <li><Link to="/GenKnow">General Knowledge</Link></li>
        </ul>

        <Routes>
          <Route path="/books" element={<BooksQuiz />} />
          <Route path="/music" element={<MusicQuiz />} />
          <Route path="/computers" element={<CompQuiz />} />
          <Route path="/sports" element={<SportsQuiz />} />
          <Route path="/GenKnow" element={<GenQuiz />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;

