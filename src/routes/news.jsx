import { useState, useEffect} from 'react'

import Loader from '../components/Loader'

const NewsCard = (props) => {
  let str = props.description;
  const MAX = 200;
  if(str.length > MAX) str = str.slice(0, MAX);

  return (
    <a href={ props?.link } target="blank">
      <div className="flex flex-col p-4 h-full rounded-lg bg-slate-800 shadow-md hover:shadow-zinc-700 hover:shadow-md transition-all delay-75 border border-slate-700">
        <img className="w-full h-40 max-h-40 bg-slate-300 rounded-md mb-4" src={ props?.image_url ? props.image_url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdSrBEweHrwBRQ2r_57XFhloOzHP8REcLGPw&usqp=CAU' } />
        <div className="flex flex-col h-full">
          <h1 className="font-semibold text-xl font-heading-2">{ props.title }</h1>
          <p className="my-2 text-sm">{ str }</p>
          <p className="mt-auto">Source: <p className="font-medium inline">{ props.source_id }</p></p>
        </div>
      </div>
    </a>
  );
}

function News() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLatestHeadlines = () => {
    fetch("https://newsdata.io/api/1/news?apikey=<API_KEY>&language=en&country=us,gb")
      .then(res => res.json())
      .then(res => {
        setArticles(res.results);
        setIsLoading(false);
      })
  }

  useEffect(fetchLatestHeadlines, []);

  if(isLoading) {
    return <Loader />
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="font-bold text-2xl mb-2 font-heading">Today's headlines</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {articles.map(article => (
          <NewsCard {...article} />
        ))}
      </div>
    </div>
  );
}

export default News;
