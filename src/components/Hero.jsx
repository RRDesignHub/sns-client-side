
import heroImg_1 from './../assets/Hero-1.jpg';
import heroImg_2 from './../assets/Hero-2.jpg';
export const Hero = () => {
  return (
    <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full">
          <img
            src={heroImg_1}
            className=" lg:w-full lg:h-[500px] object-cover"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide4" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img
            src={heroImg_2}
            className="h-full "
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
       
      </div>
  )
}
