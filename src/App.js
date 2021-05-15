import React from 'react'
import { Router } from '@reach/router'
import { Home } from './pages/Home'
import RenderElement from './pages/RenderElement'

const App = () => (
  <Router>
    <Home path="/" />
    <RenderElement path="/:id" />
  </Router>
)

export default App
