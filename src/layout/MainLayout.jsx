import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ScrollReveal from '../components/ScrollReveal'
import SmoothScroll from '../components/SmoothScroll'

function MainLayout() {
  return (
    <>
      <SmoothScroll />
      <ScrollReveal />
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default MainLayout
