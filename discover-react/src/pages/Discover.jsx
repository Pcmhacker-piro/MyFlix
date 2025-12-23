import React from 'react'
import Navbar from '../components/Navbar'
import MoodFilter from '../components/MoodFilter'
import MovieCard from '../components/MovieCard'
import CarouselRow from '../components/CarouselRow'
import { useDiscover } from '../context/DiscoverContext'

export default function Discover(){
  const {movies,loading,mood,scoreFor,interactions} = useDiscover()

  const filtered = mood ? movies.filter(m => m.moods && m.moods.includes(mood)) : movies

  const recommended = [...movies].sort((a,b) => scoreFor(b) - scoreFor(a)).slice(0,8)
  const trending = [...movies].sort((a,b) => (b.rating - a.rating)).slice(0,8)
  const hidden = movies.filter(m => m.rating >= 7.5).slice(0,8)
  const moodPicks = filtered.slice(0,8)

  return (
    <div>
      <Navbar />
      <div className="container">
        <section className="hero">
          <h1>Discover Content</h1>
          <p>Explore curated rows and find content based on your mood.</p>
          <MoodFilter />
        </section>

        <div className="rows">
          {loading ? (
            <div style={{display:'flex',gap:12}}>
              {[1,2,3].map(i => <div className="skeleton skeleton-card" key={i}></div>)}
            </div>
          ) : (
            <>
              <CarouselRow title="Recommended For You">
                {recommended.map(m => <MovieCard key={m.id} movie={m} />)}
              </CarouselRow>

              <CarouselRow title="Trending Now">
                {trending.map(m => <MovieCard key={m.id} movie={m} />)}
              </CarouselRow>

              <CarouselRow title="Hidden Gems">
                {hidden.map(m => <MovieCard key={m.id} movie={m} />)}
              </CarouselRow>

              <CarouselRow title="Mood Picks">
                {moodPicks.map(m => <MovieCard key={m.id} movie={m} />)}
              </CarouselRow>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
