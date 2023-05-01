import React from 'react'
import Header from './components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <>
              <Header />
              <Login />
            </>
          } />
          <Route path='/channels' element={
            <Home />
          } />
          <Route path='/channels/:id' element={
            <Home />
          } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
