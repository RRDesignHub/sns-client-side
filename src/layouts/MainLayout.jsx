import { Outlet } from "react-router-dom"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"

export const MainLayout = () => {
  return (
    <>
    <header className="w-11/12 mx-auto">
    <Header></Header>

    </header>

    <main className="w-11/12 mx-auto">
      <Outlet></Outlet>
    </main>

    <footer className="w-11/12 mx-auto">
     <Footer></Footer>
    </footer>
    </>
  )
}
