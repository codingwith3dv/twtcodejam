import FeatureCard from './components/FeatureCard.jsx'
import HeroImg from './images/heroimg.svg'

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
      You can read the most relevant headlines at the moment over here. Psst... Reading news
      everyday can increase your points!
    `,
    route: '/news'
  },
  {
    heading: 'More Vocabulary',
    description: `
      Understanding what a word means is so much important. Vocabulary is the foundation for good
      communication skills. Learn about more words, their meanings, synonymns, antonymns and many more...
    `,
    route: '/vocabulary'
  }
];

function App() {

  return (
    <div>
      <section className="bg-gradient-to-tl from-purple-900 via-blue-900 to-violet-900 flex items-center justify-between flex-col gap-2 mb-4 md:flex-row p-4 sm:p-6 lg:p-8 h-3/4">
        <div className="absolute" />
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
