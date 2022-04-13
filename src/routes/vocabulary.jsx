import { useEffect, useState } from 'react';
import Loader from '../components/Loader'
import Button from '../components/Button'

function Word(props) {
  return (
    <div className="flex flex-col gap-none">
      <h1 className="text-2xl font-bold font-heading-2">{ props.word }</h1>
      <p className="text-lg font-desc text-zinc-400">{ props.meaning }</p>
    </div>
  );
}

function Vocabulary() {
  const [wordInfo, setWordInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getInfoAboutWord = () => {
    fetch('https://san-random-words.vercel.app')
      .then(res => res.json())
      .then(res => {
        setWordInfo(res[0]);
        setIsLoading(false);
      });
  }
  
  useEffect(getInfoAboutWord, []);

  const next = () => {
    setIsLoading(true);
    getInfoAboutWord();
  }

  if(isLoading) {
    return <Loader />
  }

  return (
    <div className="p-4">
      <Word word={wordInfo.word} meaning={wordInfo.definition} />
      <Button value="Next" onClick={next} />
    </div>
  );
}

export default Vocabulary;
