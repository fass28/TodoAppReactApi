import React from 'react'
import './Loading.css'

export const Loading = () => {
  return (
    <div className="overlay">
      <div className="h-100 w-100 d-flex align-items-center justify-content-center">
        <span className="spinner"></span>
      </div>
    </div>
  )
}
