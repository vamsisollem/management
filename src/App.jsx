import React from 'react'
import HomePage from './components/HomePage'
import {BrowserRouter as Router, Route, Routes} from 'react-router';
import Players from './components/Players';
import Scores from './components/Scores';
function App() {
  return (
    <Router>
      <Routes>
        <Route path={'/'} element = {<HomePage />} />
        <Route path={'/players'} element = {<Players />} />
        <Route path={'/scores'} element = {<Scores />} />
      </Routes>
    </Router>
  )
}

export default App
