import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { UserPage } from '../pages/UserPage'
import { UserPageTodo } from '../pages/UserPageTodo'

export const AppRouter = () => {
  return (
    <>
      <div id='main'>
        <Routes>
            <Route path="/" element={<UserPage/>}/>
            <Route path="/users/:userId" element={<UserPageTodo/>}/>
        </Routes>
      </div>
    </>
  )
}
