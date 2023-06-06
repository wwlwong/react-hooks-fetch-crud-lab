import React, { useEffect } from "react";
import QuestionItem from "./QuestionItem"

function QuestionList( {questions, setQuestions} ) {

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((questions) => {
        console.log(questions);
        setQuestions(questions)});
  }, []); 

  function onDeleteQuestion(id){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
    .then((r) => r.json())
    .then(() => setQuestions(questions.filter((question) => question.id !== id)));
  }
  
  function onAnswerChange(id, updatedIndex){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify( {
        "correctIndex" : updatedIndex,
      })
    })
    .then((r) => r.json())
    .then((updatedQuestion) => {
      const updatedQuestions = questions.map((question) => {
        if (question.id === id) return updatedQuestion;
        return question;
      });
      setQuestions(updatedQuestions);
    });
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul> {questions.map((question) => (
        <QuestionItem key={question.id} question={question} onDeleteQuestion={onDeleteQuestion} onAnswerChange={onAnswerChange} /> ))} 
        </ul>
    </section>
  );
}

export default QuestionList;
