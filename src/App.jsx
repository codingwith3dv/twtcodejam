import FeatureCard from './components/FeatureCard.jsx'

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
    `,
    route: '/news'
  }
];

function App() {

  return (
    <div>
      <section className="flex flex-col gap-2 mb-4">
        <h1 className="text-3xl font-heading font-black tracking-wide">Make your life less ordinary each day</h1>
        <p className="font-heading-2">
          Life can be pretty boring...
          What are you supposed to do then?
          Well, do things you don't do everyday,
          change things up!
          Play games which are unique everyday,
          Get to know about different things all around the world
        </p>
      </section>
      <div className="flex flex-col gap-4">
        {features.map(feature => (
          <FeatureCard
            {...feature}
          >
          </FeatureCard>
        ))}
      </div>
    </div>
  )
}

export default App
