import React, { createContext, useContext, useEffect, useState } from 'react'
import moviesData from '../data/movies.json'

const DiscoverContext = createContext(null)

export function DiscoverProvider({children}){
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [mood, setMood] = useState(null)
  const [interactions, setInteractions] = useState({})

  useEffect(()=>{
    // load local dataset (synchronous import used)
    setMovies(moviesData)
    setLoading(false)
    const saved = localStorage.getItem('discover_interactions')
    if(saved) setInteractions(JSON.parse(saved))
  },[])

  useEffect(()=>{
    localStorage.setItem('discover_interactions', JSON.stringify(interactions))
  },[interactions])

  function recordInteraction(id, type, value=1){
    setInteractions(prev => {
      const next = {...prev}
      if(!next[id]) next[id] = {clicks:0,watch:0,searches:0}
      next[id][type] = (next[id][type] || 0) + value
      return next
    })
  }

  function scoreFor(movie){
    const base = movie.rating || 0
    const s = interactions[movie.id]
    const interactionScore = s ? (s.clicks*1 + Math.min(60, s.watch)/10 + s.searches*0.5) : 0
    return base + interactionScore
  }

  return (
    <DiscoverContext.Provider value={{movies,loading,mood,setMood,recordInteraction,scoreFor,interactions}}>
      {children}
    </DiscoverContext.Provider>
  )
}

export function useDiscover(){
  return useContext(DiscoverContext)
}
