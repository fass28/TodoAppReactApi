import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { UserPage } from '../components/pages/UserPage'
import { UserPageTodo } from '../components/pages/UserPageTodo'

export const AppRouter = () => {
  return (
    <>
      <Routes>
          <Route path="/" element={<UserPage/>}/>
          <Route path="/users/:userid" element={<UserPageTodo/>}/>
      </Routes>
    </>
  )
}
