import { Link } from 'react-router-dom'

export default function(props) {
  return (
    <Link to={props.to} className="font-bold rounded-lg inline-block px-3 py-2 bg-gray-800 text-zinc-100 hover:bg-opacity-90">{ props.children }</Link>
  );
}
