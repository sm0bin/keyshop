import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { heroSlides } from "@/utils/data/data";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        right: "10px",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        left: "10px",
        zIndex: 1,
      }}
      onClick={onClick}
    />
  );
}

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    appendDots: (dots: any) => (
      <div
        style={{
          //   backgroundColor: "#ddd",
          //   borderRadius: "10px",
          // padding: "10px",
          bottom: "20px",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
  };
  return (
    <Slider {...settings}>
      {heroSlides.map((slide) => (
        <div key={slide.id}>
          <div
            className="w-full h-[90vh] flex flex-col justify-center items-center bg-cover bg-center text-white"
            style={{
              backgroundImage: `url(${slide.src})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            {/* Background blur overlay */}
            <div className="bg-black/10 backdrop-blur-sm w-full h-full flex flex-col justify-center items-center">
              <div className="text-center px-4">
                <h2 className="text-4xl font-bold mb-4">{slide.heading}</h2>
                <p className="text-lg mb-6">{slide.subheading}</p>

                {/* Glass button */}
                <Link
                  to="/products"
                  // className="px-6 py-2 rounded-full border border-white/30 text-white backdrop-blur-md bg-white/10 hover:bg-white/20 transition"
                >
                  <Button>Explore Now</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>

    // <div>
    //   <Slider {...settings}>
    //     {heroSlides.map((slide) => (
    //       <div key={slide.id} style={{ backgroundImage: `url(${slide.src})` }}>
    //         {/* <img
    //           className="w-full h-96 object-cover"
    //           src={slide.src}
    //           alt={slide.heading}
    //         /> */}
    //         <div
    //           className={`w-full h-96 flex flex-col justify-center items-center bg-cover bg-center text-white backdrop-blur-md bg-black/40`}
    //         >
    //           <h2 className="text-4xl font-bold mb-4">{slide.heading}</h2>
    //           <p className="text-lg">{slide.subheading}</p>
    //         </div>
    //       </div>
    //     ))}
    //   </Slider>
    // </div>
  );
};

export default Hero;
