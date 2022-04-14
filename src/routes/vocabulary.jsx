import { useEffect, useState } from 'react';
import Loader from '../components/Loader'
import Button from '../components/Button'

import { RadioGroup, Transition } from '@headlessui/react'

function Word(props) {
  return (
    <div className="flex flex-col gap-none bg-slate-800 p-4 rounded-lg shadow-md shadow-zinc-700">
      <h1 className="text-xl font-bold font-heading-2">{ props.word }</h1>
      <p className="text-md font-desc text-zinc-400">{ props.meaning }</p>
    </div>
  );
}

function Vocabulary() {
  const [words, setWords] = useState([
    {
      word: 'Apocatastasis',
      definition: 'Final restitution of all things at the appearance of the Messiah'
    },
    {
      word: 'Apocatastasis',
      definition: 'Final restitution of all things at the appearance of the Messiah'
    },
    {
      word: 'Apocatastasis',
      definition: 'Final restitution of all things at the appearance of the Messiah'
    },
    {
      word: 'Apocatastasis',
      definition: 'Final restitution of all things at the appearance of the Messiah'
    },
    {
      word: 'Apocatastasis',
      definition: 'Final restitution of all things at the appearance of the Messiah'
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [testQuestions, setTestQuestions] = useState([]);

  const [chosen, setChosen] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  // 0: right
  // 1: wrong
  // 2: not chosen
  const [result, setResult] = useState(2);
  const [disabled, setDisabled] = useState(false);
  const [shouldShow, setShouldShow] = useState(true);

  const next = () => {
    setShouldShow(false);
    setTimeout(() => {
      setQuestionIndex(questionIndex == 4 ? 0 : questionIndex + 1);
      setResult(2);
      setDisabled(false);
      setChosen(null);
      setShouldShow(true);
    }, 1000)
  }

  const getRandomIndex = (len, except) => {
    let randomIndex = Math.floor(Math.random() * len);
    if(except == randomIndex) return getRandomIndex(len, except);
    return randomIndex;
  }

  const buildTest = (_words = words) => {
    let _testQuestions = [];
    _words.forEach((v, i) => {
      let correctAnswer = v.word;
      let randomIndex = getRandomIndex(_words.length, i);
      let incorrectAnswer = _words[randomIndex].word;
      let question = v.definition;
      let answers = [];
      answers.push(correctAnswer);
      answers.push(incorrectAnswer);

      let obj = {
        correctAnswer,
        incorrectAnswer,
        question,
        answers,
      }

      _testQuestions.push(obj);
    })
    setTestQuestions(_testQuestions);
  }

  const getInfoAboutWord = async () => {
    let _words = [];
    for(let i = 0; i < 5; i++) {
      const wordData = (await (await fetch('https://san-random-words.vercel.app')).json());
      _words.push(wordData[0]);
    }
    setWords(_words);
    setIsLoading(false);
  }
  
  useEffect(getInfoAboutWord, []);
  useEffect(buildTest, [words]);

  if(isLoading) {
    return <Loader />
  }

  const closeDialog = () => {
    setIsOpen(false);
  }

  const openDialog = () => {
    setIsOpen(true);
  }

  const check = (value) => {
    setDisabled(true);

    let currentQuestion = testQuestions[questionIndex];
    if(currentQuestion.correctAnswer == value)
      setResult(0);
    else
      setResult(1);

    setChosen(value);
    next();
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-2 font-heading font-bold">New words for today</h1>
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {words.map(word => (
          <Word word={word.word} meaning={word.definition} />
        ))}
      </div>
      <Button value="Done, Go to Test" onClick={openDialog}/>

      {isOpen &&
        <>
          <div className="
            flex justify-center items-center
            overflow-x-hidden overflow-y-auto fixed
            inset-0 z-50 outline-none focus:outline-none
            bg-black bg-opacity-50 filter
            backdrop-blur-sm">
            <div className="bg-gray-800 w-full m-4 md:m-6 lg:m-8 relative p-4 md:p-6 lg:p-8 rounded-lg shadow shadow-zinc-700 shadow-sm">
              <div className="flex flex-row justify-between">
                <h1 className="text-xl font-bold font-heading">Ready to test what you learned?</h1>
                <button onClick={closeDialog} className="flex justify-center items-center w-8 h-8 bg-gray-600 self-start font-heading rounded-md hover:ring ring-gray-500 ring-2">x</button>
              </div>

              <RadioGroup className="my-4" value={chosen} onChange={v => { check(v); }} disabled={disabled}>
                <div>
                  <RadioGroup.Label className="text-lg font-medium font-heading-2">{ testQuestions[questionIndex].question }</RadioGroup.Label>
                  {testQuestions[questionIndex].answers.map((answer, j) => (
                    <RadioGroup.Option
                      value={answer}
                      key={answer}
                      className={({ checked }) =>
                        `
                        relative rounded-md my-2 px-4 py-2 transition-all ease-in-out delay-75 font-heading-2
                        border border-slate-700 border-4
                        hover:border-blue-700 box-border
                        ${checked ? 'bg-blue-600 font-semibold text-zinc-100' : ''}
                        ${checked && result == 0 ? 'bg-green-500 border-green-500' : ''}
                        ${checked && result == 1 ? 'bg-red-500 border-red-500' : ''}
                        `
                      }>
                      <RadioGroup.Label>{ String.fromCharCode(j + 65) + ") " + answer }</RadioGroup.Label>
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>
          </div>
        </>
      }
    </div>
  );
}

export default Vocabulary;
