import React from 'react'
import { useDiscover } from '../context/DiscoverContext'

const MOODS = ["Chill","Action","Thriller","Emotional","Focus"]

export default function MoodFilter(){
  const {mood,setMood} = useDiscover()
  return (
    <div className="mood-filters">
      {MOODS.map(m => (
        <button key={m} onClick={()=> setMood(prev => prev===m?null:m)} className={`mood-btn ${mood===m? 'active':''}`}>{m}</button>
      ))}
    </div>
  )
}
