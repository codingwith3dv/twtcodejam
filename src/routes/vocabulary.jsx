import { useEffect, useState } from 'react';
import Loader from '../components/Loader'
import Button from '../components/Button'
import Modal from '../components/Modal'

import { RadioGroup } from '@headlessui/react'

import { db, auth } from '../utils.js'
import { useAuthState } from 'react-firebase-hooks/auth'
import { setDoc, doc, onSnapshot } from 'firebase/firestore'

function Word(props) {
  return (
    <div className="flex flex-col gap-none bg-slate-800 p-4 rounded-lg shadow-md shadow-zinc-700">
      <h1 className="text-xl font-bold font-heading-2">{ props.word }</h1>
      <p className="text-md font-desc text-zinc-400">{ props.meaning }</p>
    </div>
  );
}

let unsubscribe;

function Vocabulary(props) {
  const [ user ] = useAuthState(auth);

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
  const [signInOpen, setSignInOpen] = useState(false);
  const [testQuestions, setTestQuestions] = useState([]);

  const [chosen, setChosen] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  // 0: right
  // 1: wrong
  // 2: not chosen
  const [result, setResult] = useState(2);
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [maxQns, setMaxQns] = useState(5);
  const [completed, setCompleted] = useState(false);

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

  const next = () => {
    if(questionIndex == maxQns - 1) {
      setCompleted(true);
      return;
    }

    setTimeout(() => {
      setQuestionIndex(questionIndex + 1);
      setResult(2);
      setDisabled(false);
      setChosen(null);
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
    /* let _words = [];
    for(let i = 0; i < maxQns; i++) {
      const wordData = (await (await fetch('https://random-words-api.vercel.app/word')).json());
      _words.push(wordData[0]);
    }
    setWords(_words); */
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
    if(currentQuestion.correctAnswer == value) {
      setResult(0);
      updateScore(50);
    } else {
      setResult(1);
    }

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
      <Button value="Done, Go to Test" onClick={() => { !user ? setSignInOpen(true) : openDialog()}}/>

      {signInOpen &&
        <Modal>
          <div className="bg-gray-800 w-full m-4 md:m-6 lg:m-8 relative p-4 md:p-6 lg:p-8 rounded-lg shadow shadow-zinc-700 shadow-sm">
            <div className="flex flex-row justify-between items-cente items-center">
              <h1 className="text-gray-400 text-md font-bold font-heading">Please sign in or register to use!</h1>
              <button onClick={() => setSignInOpen(false)} className="flex justify-center items-center w-8 h-8 bg-gray-600 self-start font-heading font-black rounded-full hover:ring ring-gray-500 ring-2">x</button>
            </div>

            <p className="text-zinc-200 text-sm mt-2">
              You have to sign in or register for further use of this feature :)<br /><br />
              We need to do authentication for recognizing you and for properly showing your earned points!
            </p>
          </div>
        </Modal>
      }

      {isOpen &&
        <Modal>
          <div className="bg-gray-800 w-full m-4 md:m-6 lg:m-8 relative p-4 md:p-6 lg:p-8 rounded-lg shadow shadow-zinc-700 shadow-sm">
            <div className="flex flex-row justify-between items-cente items-center">
              <h1 className="text-gray-400 text-md font-bold font-heading">Ready to test what you learned?</h1>
              <button onClick={closeDialog} className="flex justify-center items-center w-8 h-8 bg-gray-600 self-start font-heading font-black rounded-full hover:ring ring-gray-500 ring-2">x</button>
            </div>

            <div className="flex justify-center mt-6">
              <p className="font-medium text-zinc-200">Total: { total }</p>
            </div>

            <div className="flex justify-center mb-6">
              <h1 key={score} className="text-3xl font-heading stacked-fractions"><div className="inline-block font-bold animate animate-num">{ score }</div> / { maxQns * 50 }</h1>
            </div>

            {!completed ?
              <RadioGroup className="mt-4" value={chosen} onChange={v => { check(v); }} disabled={disabled}>
                <div>
                  <RadioGroup.Label className="text-lg font-semibold font-heading-2 text-gray-300">{ testQuestions[questionIndex].question }</RadioGroup.Label>
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
              </RadioGroup> :
              <div className="py-6 flex justify-center text-2xl font-heading text-zinc-200">
                🎉 Congratulations! You have succesfully completed your test!
              </div>
            }
          </div>
        </Modal>
      }
    </div>
  );
}

export default Vocabulary;
