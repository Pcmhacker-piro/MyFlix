import React from 'react'

export default function CarouselRow({title, children}){
  return (
    <div>
      <div className="row-title">{title}</div>
      <div className="carousel" role="list">
        {children}
      </div>
    </div>
  )
}
