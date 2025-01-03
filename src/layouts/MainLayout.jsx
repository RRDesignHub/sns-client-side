import { Outlet } from "react-router-dom"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"

export const MainLayout = () => {
  return (
    <>
    <header className=" ">
    <Header></Header>

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
