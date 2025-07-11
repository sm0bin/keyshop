import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

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
  const heroSlides = [
    {
      id: 1,
      heading: "K-Series Pro Mechanical Keyboard",
      subheading:
        "Premium typing experience with hot-swappable switches and vibrant RGB lighting.",
      src: "https://i.ibb.co/V1D2hfG/k-01.jpg",
    },
    {
      id: 2,
      heading: "K70 TKL Gaming Keyboard",
      subheading:
        "Compact, precise, and lightning-fast—built for competitive gaming.",
      src: "https://i.ibb.co/WW03jfSK/k-02.jpg",
    },
    {
      id: 3,
      heading: "K80 RGB Backlit Mechanical Keyboard",
      subheading:
        "Sleek aluminum frame with full-spectrum lighting and tactile key feel.",
      src: "https://i.ibb.co/gGVdBny/k-03.jpg",
    },
    {
      id: 4,
      heading: "K65 Ultra-Slim Mechanical Keyboard",
      subheading:
        "Low-profile design with mechanical precision and portability in mind.",
      src: "https://i.ibb.co/SDw7Mg95/k-04.jpg",
    },
    {
      id: 5,
      heading: "K95 Macro Edition Keyboard",
      subheading:
        "Fully programmable macros and media controls for power users and streamers.",
      src: "https://i.ibb.co/hRHP5qrC/k-05.jpg",
    },
    {
      id: 6,
      heading: "K60 Wireless Mechanical Keyboard",
      subheading:
        "Seamless wireless performance with long battery life and RGB flair.",
      src: "https://i.ibb.co/Q7mtKNdS/k-06.jpg",
    },
    {
      id: 7,
      heading: "K100 Optical Mechanical Keyboard",
      subheading:
        "Lightning-speed optical switches for next-gen responsiveness.",
      src: "https://i.ibb.co/352vw1XY/k-07.jpg",
    },
    {
      id: 8,
      heading: "K50 Essential Mechanical Keyboard",
      subheading:
        "Reliable and affordable mechanical feel with customizable backlight modes.",
      src: "https://i.ibb.co/fdrMVY5N/k-08.jpg",
    },
  ];
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
            className="w-full h-96 flex flex-col justify-center items-center bg-cover bg-center text-white"
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
                <button className="px-6 py-2 rounded-full border border-white/30 text-white backdrop-blur-md bg-white/10 hover:bg-white/20 transition">
                  Explore Now
                </button>
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
