import { Outlet } from "react-router-dom"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"

export const MainLayout = () => {
  return (
    <>
    <header className=" ">
    <Header></Header>

    </header>

    <main >
      <Outlet></Outlet>
    </main>

    <footer className="bg-green-900">
     <Footer></Footer>
    </footer>
    </>
  )
}
