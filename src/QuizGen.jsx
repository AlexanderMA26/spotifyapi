import React from "react";
import App from "./App";

async function genQuiz(category){
    {/* Calling the api to get the quiz */}
    const quiz = await fetch ('https://opentdb.com/api.php?amount=5&category=' + category)
    const parsed = await quiz.json();
    console.log(parsed);
    return parsed;
}

export default genQuiz;