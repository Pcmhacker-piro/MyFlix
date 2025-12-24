import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Discover from './pages/Discover'
import './index.css'
import { DiscoverProvider } from './context/DiscoverContext'

function App(){
  return (
    <DiscoverProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/discover" element={<Discover/>} />
          <Route path="/" element={<div style={{padding:20}}>Open <Link to="/discover">Discover</Link></div>} />
        </Routes>
      </BrowserRouter>
    </DiscoverProvider>
  )
}

createRoot(document.getElementById('root')).render(<App />)
