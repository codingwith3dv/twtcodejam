import Link from './Link.jsx'

export default function(props) {
  return (
    <div className="bg-slate-200 rounded-md shadow-lg shadow-slate-300 p-4">
      <h1 className="font-heading text-xl font-semibold">{ props.heading }</h1>
      <p className="my-2 text-sm font-desc">
        { props.description }
      </p>
      <Link to={ props.route }>Let's Go!</Link>
    </div>
  )
}
