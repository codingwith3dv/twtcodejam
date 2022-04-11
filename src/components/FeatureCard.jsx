import Link from './Link.jsx'

export default function(props) {
  return (
    <div className="bg-slate-800 rounded-md shadow-md shadow-zinc-700 border border-slate-700 p-6 flex flex-col justify-between items-baseline gap-4">
      <div>
        <h1 className="font-heading text-xl font-semibold">{ props.heading }</h1>
        <p className="my-2 text-sm font-desc">
          { props.description }
        </p>
      </div>
      <Link to={ props.route }>Let's Go!</Link>
    </div>
  )
}
