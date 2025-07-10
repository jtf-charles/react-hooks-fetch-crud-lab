import React, { useState } from "react";

function QuestionItem({ question, deleteItem}) {
  //const [questionList, setQuestionList]=useState(question)
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

function DeleteQuestion(){
  deleteItem(id)
} 

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={DeleteQuestion}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
