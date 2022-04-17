import { useState, useEffect } from 'react'

import { RadioGroup } from '@headlessui/react'

import Button from '../components/Button'
import Loader from '../components/Loader'

import { setDoc, doc, onSnapshot } from 'firebase/firestore'
import { db, auth } from '../utils.js'
import { useAuthState } from 'react-firebase-hooks/auth'

let unsubscribe;

function Trivia() {
  const [user] = useAuthState(auth);

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
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  auth.onAuthStateChanged(u => {
    if(u) {
      unsubscribe = onSnapshot(
        doc(db, "users", u.uid),
        data => {
          setTotal(data.data().score);
        }
      );
    } else {
      unsubscribe && unsubscribe();
    }
  });

  const updateScore = (inc) => {
    setScore(score + inc);
    setDoc(doc(db, "users", user.uid), {
      score: total + inc
    }, { merge: true });
  }

  const checkAnswer = () => {
    if(!chosenAnswer) return;
    setDisabled(true);

    if(chosenAnswer == trivia.correctAnswer) {
      setResult(0);
      updateScore(30);
    } else {
      setResult(1)
    }

    setTimeout(() => {
      next();
    }, 1500);
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
    return <Loader />
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col items-center py-6">
        <div className="">
          <h1 className="text-2xl text-zinc-200 font-heading">Score: <span key={score} className="animate animate-num">{ score }</span></h1>
        </div>
        <h1 className="text-zinc-300 font-desc">Total: { total }</h1>
      </div>

      <RadioGroup value={chosenAnswer} onChange={setChosenAnswer} disabled={disabled}>
        <RadioGroup.Label className="font-heading font-bold tracking-wide">{ trivia.question }</RadioGroup.Label>
        {trivia.answers.map((answer, i) => (
          <RadioGroup.Option
            value={answer}
            className={({ checked }) =>
              `
              relative rounded-md my-2 px-4 py-2 transition-all ease-in-out delay-75 font-heading-2
              border border-slate-700 border-4
              hover:border-blue-700 box-border
              ${checked ? 'bg-blue-600 font-semibold text-zinc-100' : ''}
              ${checked && result == 0 ? 'bg-green-500 border-green-500' : ''}
              ${checked && result == 1 ? 'bg-red-500 border-red-500' : ''}
              ${result == 1 && answer == trivia.correctAnswer ? 'text-zinc-100 font-semibold bg-green-500 border-green-500' : ''}
              `
            }>
            <RadioGroup.Label>{ String.fromCharCode(i + 65) + ") " + answer }</RadioGroup.Label>
          </RadioGroup.Option>
        ))}
      </RadioGroup>

      <div className="flex justify-center md:justify-around ">
        <Button value="Check" onClick={checkAnswer} />
      </div>

    </div>
  );
}

export default Trivia;
