import { Outlet } from "react-router-dom"
import { Footer } from "../components/Shared/Footer"
import { Navbar } from "../components/Shared/Navbar"

export const MainLayout = () => {
  return (
    <>
    <header className="bg-green-800 ">
    <Navbar />

    </header>

    <main className="min-h-[calc(100vh-244px)]">
      <Outlet></Outlet>
    </main>

    <footer className="bg-green-900">
     <Footer></Footer>
    </footer>
    </>
  )
}
