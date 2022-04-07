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
  const [isLoading, setIsLoading] = useState(true);

  const checkAnswer = () => {
    setDisabled(true);

    if(chosenAnswer == trivia.correctAnswer)
      setResult(0);
    else
      setResult(1);
  }

  const fetchNewTrivia = () => {
    fetch("https://the-trivia-api.com/questions?limit=1")
      .then(res => res.json())
      .then(res => {
        let answerChoices = [...res[0].incorrectAnswers];
        let index = Math.floor(Math.random() * 3) + 1;
        answerChoices.splice(index - 1, 0, res[0].correctAnswer);
        setTrivia({ question: res[0].question, answers: answerChoices, correctAnswer: res[0].correctAnswer});
        setIsLoading(false);
      });

  };
  
  const next = () => {
    fetchNewTrivia();

    setChosenAnswer(null);
    setResult(2);
    setDisabled(false);
  }

  useEffect(fetchNewTrivia, []);

  if(isLoading) {
    return (
      <div className="flex justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-10 h-10 border-4 border-double border-black rounded-lg animate-spin"></div>
      </div>
    )
  }

  return (
    <div>
      <RadioGroup value={chosenAnswer} onChange={setChosenAnswer} disabled={disabled}>
        <RadioGroup.Label className="font-bold tracking-wide">{ trivia.question }</RadioGroup.Label>
        {trivia.answers.map((answer, i) => (
          <RadioGroup.Option
            value={answer}
            className={({ checked }) =>
              `
              relative rounded-md my-2 px-4 py-2 bg-gray-100 transition-all hover:transition-all ease-in-out delay-75
              hover:outline hover:outline-4 hover:outline-blue-700
              ${checked ? 'bg-blue-500 font-semibold text-zinc-100' : ''}
              ${checked && result == 0 ? 'bg-green-500' : ''}
              ${checked && result == 1 ? 'bg-red-500' : ''}
              ${result == 1 && answer == trivia.correctAnswer ? 'text-zinc-100 font-semibold bg-green-500' : ''}
              `
            }>
            <RadioGroup.Label>{ String.fromCharCode(i + 65) + ") " + answer }</RadioGroup.Label>
          </RadioGroup.Option>
        ))}
      </RadioGroup>

      <div className="flex justify-between">
        <Button value="Check" onClick={checkAnswer} />
        <Button value="Next" onClick={next} />
      </div>

    </div>
  );
}

export default Trivia;
