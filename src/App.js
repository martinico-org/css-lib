import React from 'react'
import { Router } from '@reach/router'
import { Home } from './pages/Home'
import { Project } from './pages/Project'

const App = () => (
  <Router>
    <Home path="/" />
    <Project path="/project/:id" />
  </Router>
)

export default App
