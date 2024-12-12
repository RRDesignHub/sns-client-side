import { Link } from "react-router-dom"

export const ErrorPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-green-50">
      <h1 className="text-3xl font-bold text-green-950">Page not found (404)</h1>
      <Link className="btn bg-green-600 text-white hover:bg-green-700" to='/'>Back to Home</Link>
    </div>
  )
}
