import React from "react"
import { Outlet } from "react-router"

function Layout() {
  return (
    <>
      <div>헤더자리</div>
      <Outlet />
      <div>푸터자리</div>
    </>
  )
}

export default Layout
