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

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC48Eu-PLEhlwskw_p5RaLRWPQdqr4tOH0",
  authDomain: "go-of-beat.firebaseapp.com",
  databaseURL: "https://go-of-beat-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "go-of-beat",
  storageBucket: "go-of-beat.appspot.com",
  messagingSenderId: "621682893416",
  appId: "1:621682893416:web:9978e55a8db5e2ff88d1dd",
  measurementId: "G-6R7CPES21D"
};

const app = initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <Nav firebase={app} />
    <main className="min-h-screen bg-slate-900 text-zinc-200 scroll-smooth">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<App firebase={app}/>} />
          <Route path="/trivia" element={<Trivia firebase={app}/>} />
          <Route path="/news" element={<News firebase={app}/>} />
          <Route path="/vocabulary" element={<Vocabulary firebase={app}/>} />
        </Routes>
      </BrowserRouter>
    </main>
  </React.StrictMode>,
  document.getElementById('root')
)
