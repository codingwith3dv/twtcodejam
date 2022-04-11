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
import ScrollToTop from './components/ScrollToTop'

ReactDOM.render(
  <React.StrictMode>
    <Nav />
    <main className="min-h-screen bg-slate-900 text-gray-200 scroll-smooth">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/trivia" element={<Trivia />} />
          <Route path="/news" element={<News />} />
        </Routes>
      </BrowserRouter>
    </main>
  </React.StrictMode>,
  document.getElementById('root')
)
