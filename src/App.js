import React from 'react'
import { Router } from '@reach/router'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import RenderElement from './pages/RenderElement'

const App = () => (
  <Router>
    <NotFound default />
    <Home path="/" />
    <RenderElement path="/viewer/:id" />
  </Router>
)

export default App
