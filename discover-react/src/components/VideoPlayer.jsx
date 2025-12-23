import React, { useEffect, useRef, useState } from 'react'

export default function VideoPlayer({src, meta={}, onClose}){
  const videoRef = useRef(null)
  const audioRef = useRef(null)
  const [showIntroSkip, setShowIntroSkip] = useState(false)
  const [showRecapSkip, setShowRecapSkip] = useState(false)
  const [userInteracted, setUserInteracted] = useState(false)

  useEffect(()=>{
    // Ringtone is expected to be served from the app public folder at /assets/idle-tone.mp3
    // Copy your file to discover-react/public/assets/idle-tone.mp3
    const idleToneUrl = '/assets/idle-tone.mp3'
    audioRef.current = new Audio(idleToneUrl)
    audioRef.current.loop = true
    audioRef.current.volume = 0.06
    audioRef.current.preload = 'auto'

    return ()=>{
      try{ audioRef.current.pause(); audioRef.current.src = '' }catch(e){}
    }
  },[])

  useEffect(()=>{
    const v = videoRef.current
    if(!v) return

    function onTime(){
      const t = v.currentTime
      if(typeof meta.introStart === 'number' && typeof meta.introEnd === 'number'){
        setShowIntroSkip(t >= meta.introStart && t <= meta.introEnd)
      } else setShowIntroSkip(false)

      if(typeof meta.recapStart === 'number' && typeof meta.recapEnd === 'number'){
        setShowRecapSkip(t >= meta.recapStart && t <= meta.recapEnd)
      } else setShowRecapSkip(false)
    }

    function onPlay(){
      setUserInteracted(true)
      stopRingtone()
    }

    function onPause(){
      if(userInteracted) startRingtone()
    }

    function onEnded(){
      if(userInteracted) startRingtone()
    }

    v.addEventListener('timeupdate', onTime)
    v.addEventListener('play', onPlay)
    v.addEventListener('pause', onPause)
    v.addEventListener('ended', onEnded)

    return ()=>{
      v.removeEventListener('timeupdate', onTime)
      v.removeEventListener('play', onPlay)
      v.removeEventListener('pause', onPause)
      v.removeEventListener('ended', onEnded)
    }
  },[meta, userInteracted])

  function startRingtone(){
    const audio = audioRef.current
    const v = videoRef.current
    if(!audio || !v) return
    try{
      v.muted = true
      audio.currentTime = 0
      audio.play().catch(()=>{})
    }catch(e){}
  }

  function stopRingtone(){
    const audio = audioRef.current
    const v = videoRef.current
    if(!audio || !v) return
    try{
      audio.pause()
      audio.currentTime = 0
      v.muted = false
    }catch(e){}
  }

  function skipIntro(){
    const v = videoRef.current
    if(!v) return
    v.currentTime = Math.min(meta.introEnd || v.currentTime, v.duration || meta.introEnd || v.currentTime)
    setShowIntroSkip(false)
  }

  function skipRecap(){
    const v = videoRef.current
    if(!v) return
    v.currentTime = Math.min(meta.recapEnd || v.currentTime, v.duration || meta.recapEnd || v.currentTime)
    setShowRecapSkip(false)
  }

  useEffect(()=>{
    return ()=>{
      try{ audioRef.current && audioRef.current.pause(); }catch(e){}
    }
  },[])

  return (
    <div style={{position:'relative',background:'#000'}}>
      <video ref={videoRef} src={src} controls autoPlay style={{width:'100%',height:'auto',display:'block'}} />

      <div style={{position:'absolute',left:20,top:20,display:'flex',flexDirection:'column',gap:8}}>
        {showIntroSkip && (
          <button onClick={skipIntro} className="mood-btn video-skip-btn" style={{opacity:showIntroSkip?1:0}}>Skip Intro</button>
        )}
        {showRecapSkip && (
          <button onClick={skipRecap} className="mood-btn video-skip-btn" style={{opacity:showRecapSkip?1:0}}>Skip Recap</button>
        )}
      </div>

      <button onClick={()=>{ stopRingtone(); onClose && onClose() }} style={{position:'absolute',right:12,top:12,background:'rgba(0,0,0,0.6)',color:'#fff',border:'none',padding:8,borderRadius:6}}>Close</button>
    </div>
  )
}
