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

ReactDOM.render(
  <React.StrictMode>
    <Nav />
    <main className="p-4 bg-neutral-100 h-screen text-gray-800">
      <BrowserRouter>
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
