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

ReactDOM.render(
  <React.StrictMode>
    <Nav />
    <main className="px-4">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/trivia" element={<Trivia />} />
        </Routes>
      </BrowserRouter>
    </main>
  </React.StrictMode>,
  document.getElementById('root')
)
