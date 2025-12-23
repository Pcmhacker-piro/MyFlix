import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar(){
  const loc = useLocation()
  return (
    <header>
      <div className="logo">NETFLIX</div>
      <nav className="nav">
        <Link className={loc.pathname === '/' ? 'active' : ''} to="/">Home</Link>
        <Link className={loc.pathname === '/discover' ? 'active' : ''} to="/discover">Discover</Link>
      </nav>
    </header>
  )
}
