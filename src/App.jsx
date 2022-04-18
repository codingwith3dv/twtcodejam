import FeatureCard from './components/FeatureCard.jsx'
import HeroImg from './images/heroimg.svg'

import { auth } from './utils.js'
import { useAuthState } from 'react-firebase-hooks/auth'

import { useState, useEffect } from 'react'

const features = [
  {
    heading: 'Trivia',
    description: `
      Choose the right answer and you score, test your knowledge on various categories such as
      'Films', 'Technology' and many more through this trivia!
      The limited number of questions on a daily basis makes the game much more interesting.
    `,
    route: '/trivia'
  },
  {
    heading: 'Daily News',
    description: `
      Getting to know about things around the world... Everyday different things happen
      You can read the most relevant headlines at the moment over here. 
    `,
    route: '/news'
  },
  {
    heading: 'More Vocabulary',
    description: `
      Understanding what a word means is so much important. Vocabulary is the foundation for good
      communication skills. Learn about more words, their meanings, and assess what you learned...
    `,
    route: '/vocabulary'
  }
];

function Feed() {
  const [quote, setQuote] = useState({});
  const [poem, setPoem] = useState({});

  const getQuoteAndPoem = () => {
    fetch("https://api.quotable.io/random?minLength=250&maxLength=300")
      .then(res => res.json())
      .then(res => {
        setQuote(res);
      });
    fetch("https://poetrydb.org/random/1/title,lines,author")
      .then(res => res.json())
      .then(res => {
        setPoem(res[0]);
      });
  }
  useEffect(getQuoteAndPoem, []);

  return (
    <div className="px-4 pt-4 md:px-6 md:pt-6 lg:px-8 lg:pt-8">
      <h1 className="text-2xl font-heading text-zinc-300 font-bold mb-4">Your Feed</h1>
      <section className="flex flex-col md:flex-row md:h-96 gap-4">
        <div className="md:w-72 bg-gray-800 p-4 md:p-6 lg:p-8 rounded-lg flex flex-col h-full overflow-y-scroll">
          <h1 className="font-heading text-xl text-violet-400 font-bold">Quote of the day</h1>
          <h1 className="font-heading font-medium text-zinc-300">{ quote?.content }</h1>
          <h1 className="font-heading-2 font-light text-zinc-400 italic mt-auto">- { quote?.author }</h1>
        </div>
        <div className="p-4 md:p-6 lg:p-8 w-full bg-gray-800 rounded-lg h-96 md:h-full overflow-y-scroll">
          <h1 className="text-xl text-violet-400 font-heading font-bold sticky">{ poem?.title } by { poem.author }</h1>
          <div className="font-heading font-medium text-zinc-300">
          {poem.lines?.map(line => (
            <p>{ line }</p>
          ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function App() {
  const [user] = useAuthState(auth);

  return (
    <div>
      {user ?
        <Feed /> :

        <div>
          <section className="bg-gradient-to-tl from-purple-900 via-blue-900 to-violet-900 flex items-center justify-between flex-col gap-2 mb-4 md:flex-row p-4 sm:p-6 lg:p-8 h-3/4">
            <img className="md:max-w-md lg:max-w-xl md:order-2" src={HeroImg} />
            <div className="flex flex-col gap-2 max-w-prose">
              <h1 className="text-3xl font-heading font-black tracking-wide">Make your life less ordinary each day</h1>
              <p className="font-heading-2">
                Life can be pretty boring...
                What are you supposed to do then?
                Well, do things you don't do everyday,
                <span className="font-semibold"> change things up! </span>
                Play games which are unique everyday,
                Get to know about different things all around the world
              </p>
            </div>
          </section>
        </div>
      }
      <h1 className="px-4 md:px-6 lg:px-8 pt-4 md:pt-6 lg:pt-8 text-2xl font-heading text-zinc-300 font-bold">Features</h1>
      <div className="flex justify-center">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 lg:max-w-4xl gap-4 p-4 sm:p-6 lg:p-8">
          {features.map(feature => (
            <FeatureCard
              {...feature}
            >
            </FeatureCard>
          ))}
        </div>
      </div>

    </div>
  )
}

export default App
