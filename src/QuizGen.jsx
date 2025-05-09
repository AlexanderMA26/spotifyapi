import React from "react";
import App from "./App";

async function genQuiz(category){

    const quiz = await fetch ('https://opentdb.com/api.php?amount=5&category=' + category)
    const parsed = await quiz.json();
    console.log(parsed);
    return parsed;
}

export default genQuiz;