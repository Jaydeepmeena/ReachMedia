import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import SmoothScroll from '../components/SmoothScroll'

function MainLayout() {
  return (
    <>
      <SmoothScroll />
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default MainLayout
