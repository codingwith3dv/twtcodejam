import Link from './Link.jsx'

export default function(props) {
  return (
    <div className="border border-gray-800 rounded-md hover:shadow-lg hover:shadow-zinc-700 p-6 flex flex-col justify-between items-baseline gap-4">
      <div className="flex flex-col gap-4">
        <div className="w-24 h-24 p-4 border-2 border-violet-600 rounded-full flex justify-center items-center">
          { props.icon }
        </div>
        <h1 className="font-heading text-xl font-semibold">{ props.heading }</h1>
        <p className="text-sm font-desc">
          { props.description }
        </p>
      </div>
      <Link to={ props.route }>Let's Go!</Link>
    </div>
  )
}
