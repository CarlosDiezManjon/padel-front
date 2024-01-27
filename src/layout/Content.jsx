import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Content() {
  return (
    <div
      className="flex-grow overflow-auto mt-16 px-2"
      id="content"
      style={{ maxHeight: 'calc(100dvh -  70px - 64px)' }}
    >
      <Outlet />
    </div>
  )
}
