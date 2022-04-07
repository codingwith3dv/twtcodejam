import { useState, useEffect } from 'react'

import { RadioGroup } from '@headlessui/react'

import Button from '../components/Button'

function Trivia() {

  const [trivia, setTrivia] = useState({
    question: [],
    answers: [],
    correctAnswer: ""
  });
  const [chosenAnswer, setChosenAnswer] = useState(null);
  const [disabled, setDisabled] = useState(false);
  // 0: right
  // 1: wrong
  // 2: not chosen
  const [result, setResult] = useState(2);

  const checkAnswer = () => {
    setDisabled(true);

    if(chosenAnswer == trivia.correctAnswer)
      setResult(0);
    else
      setResult(1);
  }

  const fetchNewTrivia = async () => {
    fetch("https://the-trivia-api.com/questions?limit=1")
      .then(res => res.json())
      .then(res => {
        let answerChoices = [...res[0].incorrectAnswers];
        let index = Math.floor(Math.random() * 3) + 1;
        answerChoices.splice(index - 1, 0, res[0].correctAnswer);
        setTrivia({ question: res[0].question, answers: answerChoices, correctAnswer: res[0].correctAnswer});
      });
  };
  
  const next = () => {
    setChosenAnswer(null);
    setResult(2);
    setDisabled(false);

    fetchNewTrivia();
  }

  useEffect(fetchNewTrivia, []);

  return (
    <div>
      <RadioGroup value={chosenAnswer} onChange={setChosenAnswer} disabled={disabled}>
        <RadioGroup.Label className="font-bold tracking-wide">{ trivia.question }</RadioGroup.Label>
        {trivia.answers.map(answer => (
          <RadioGroup.Option
            value={answer}
            className={({ active, checked }) =>
              `
              relative rounded-md my-2 px-4 py-2 bg-gray-100 transition-all hover:transition-all ease-in-out delay-50
              ${active ? 'outline outline-4 outline-blue-700' : ''}
              ${checked ? 'bg-blue-500 font-semibold text-zinc-100' : ''}
              ${checked && result == 0 ? 'bg-green-500' : ''}
              ${checked && result == 1? 'bg-red-500' : ''}
              `
            }>
            <RadioGroup.Label>{ answer }</RadioGroup.Label>
          </RadioGroup.Option>
        ))}
      </RadioGroup>
      <Button value="Check" onClick={checkAnswer} />
      { result == 0 && <h1>Correct</h1> }
      <Button value="Next" onClick={next} />
    </div>
  );
}

export default Trivia;
