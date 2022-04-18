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

let testArticles = [
  {
    source: {
      id: "abc-news",
      name: "ABC News"
    },
    author: "Morgan Winsor",
    title: "Russia-Ukraine live updates: At least 39 killed, 87 injured in attack on Ukrainian train station - ABC News",
    description: "",
    url: "https://abcnews.go.com/International/live-updates/russia-ukraine/?id=83931446",
    urlToImage: "https://s.abcnews.com/images/International/kramatorsk-train-5-gty-rc-220408_1649415036152_hpMain_16x9_1600.jpg",
    publishedAt: "2022-04-08T12:09:00Z",
    content: "At least 39 people were killed in a rocket attack on a railway station in eastern Ukraine on Friday, authorities said.\r\nTwo Russian rockets struck the train station in the city of Kramatorsk in Donet… [+1998 chars]"
  },
  {
    source: {
      id: null,
      name: "CNBC"
    },
    author: "Peter Schacknow",
    title: "Stocks making the biggest moves premarket: Biogen, Spirit, Robinhood and more - CNBC",
    description: "These are the stocks posting the largest moves before the bell.",
    url: "https://www.cnbc.com/2022/04/08/stocks-making-the-biggest-moves-premarket-biogen-spirit-robinhood-and-more.html",
    urlToImage: "https://image.cnbcfm.com/api/v1/image/106831762-16118534192021-01-28t165813z_294449866_rc24hl9jlwzy_rtrmadp_0_usa-stocks-open.jpeg?v=1611854525&w=1920&h=1080",
    publishedAt: "2022-04-08T12:01:36Z",
    content: "Check out the companies making headlines before the bell:\r\nBiogen (BIIB) Biogen fell 1% in premarket trading after the government announced that Medicare will limit coverage for Aduhelm, Biogen's Alz… [+2191 chars]",
  },
]

for(let i = 0; i < 20; i++) {
  testArticles.push(testArticles[0])
  testArticles.push(testArticles[1])
}

function News() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLatestHeadlines = () => {
    fetch("https://newsdata.io/api/1/news?apikey=pub_66185f045c872f203b5bfbd82f50c5873007&language=en&country=us,gb")
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
