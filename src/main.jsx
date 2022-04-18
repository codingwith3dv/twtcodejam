import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'
import Nav from './components/Nav'
import Trivia from './routes/trivia'
import News from './routes/news'
import Vocabulary from './routes/vocabulary'
import ScrollToTop from './components/ScrollToTop'

ReactDOM.render(
  <React.StrictMode>
    <Nav />
    <main className="bg-slate-900 text-zinc-200 scroll-smooth">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/trivia" element={<Trivia />} />
          <Route path="/news" element={<News />} />
          <Route path="/vocabulary" element={<Vocabulary />} />
        </Routes>
      </BrowserRouter>
    </main>
  </React.StrictMode>,
  document.getElementById('root')
)
