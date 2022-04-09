export default function(props) {
  return (
    <button className="font-sans font-bold rounded-md px-5 py-1 bg-gray-800 text-zinc-100 hover:bg-opacity-90" onClick={props?.onClick}>{props.value}</button>
  );
}
