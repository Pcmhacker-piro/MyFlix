import React from 'react'

export default function Modal({children,onClose}){
  return (
    <div style={styles.backdrop} onClick={onClose}>
      <div style={styles.panel} onClick={e=>e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

const styles = {
  backdrop:{position:'fixed',left:0,top:0,right:0,bottom:0,background:'rgba(0,0,0,0.7)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:80},
  panel:{width:'90%',maxWidth:900,borderRadius:8,overflow:'hidden',background:'#000'}
}
