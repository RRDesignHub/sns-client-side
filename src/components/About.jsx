import { Link } from 'react-router-dom'
import img from './../assets/Hero-1.jpg'
export const About = () => {
  return (
    <>
      <div className="bg-green-700 py-8 lg:py-10 lg:px-20 mb-10">
        <div className="w-11/12 mx-auto flex max-sm:flex-col gap-y-6 items-center justify-between">
          <div className="">
            <h2 className="text-4xl font-bold text-white mb-2">About Us</h2>
            <p className="text-white mb-8">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis enim a recusandae laudantium repellendus voluptate error pariatur. Autem magnam nostrum voluptas ipsam iste eligendi nisi, mollitia, quibusdam, praesentium cupiditate porro.
            </p>
            <Link to='/management' className='btn bg-white text-black rounded-3xl'>Board of Managemant</Link>
          </div>
          <div>
            <img className='w-full rounded-xl md:drop-shadow-white' src={img} alt="" />
          </div>
        </div>
      </div>
    </>
  )
}
