import React, { useState } from 'react'
import { useDiscover } from '../context/DiscoverContext'
import Modal from './Modal'
import VideoPlayer from './VideoPlayer'

export default function MovieCard({movie}){
  const {recordInteraction} = useDiscover()
  const [open, setOpen] = useState(false)

  function handleClick(){
    recordInteraction(movie.id,'clicks',1)
  }

  function handlePlay(e){
    e.stopPropagation()
    recordInteraction(movie.id,'watch',1)
    setOpen(true)
  }

  return (
    <>
      <div className="card" onClick={handleClick}>
        <div style={{position:'relative'}}>
          <img src={movie.poster} alt={movie.title} />
        </div>
        <div className="card-body">
          <div style={{fontWeight:700}}>{movie.title}</div>
          <div className="rating">{movie.genre} • {movie.year} • {movie.rating}</div>
          <div style={{marginTop:8}}>
            <button onClick={handlePlay} className="mood-btn">Play</button>
          </div>
        </div>
      </div>

      {open && (
        <Modal onClose={()=> setOpen(false)}>
          <VideoPlayer src={movie.video || ''} meta={{introStart: movie.introStart, introEnd: movie.introEnd, recapStart: movie.recapStart, recapEnd: movie.recapEnd}} onClose={()=> setOpen(false)} />
        </Modal>
      )}
    </>
  )
}
