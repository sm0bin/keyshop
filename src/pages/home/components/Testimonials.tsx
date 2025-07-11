import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  comment: string;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sakib Hasan",
    role: "Full Stack Developer",
    comment:
      "The keyboard I purchased exceeded my expectations — amazing build quality, smooth switches, and stunning RGB effects!",
    image: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 2,
    name: "Fatema Khatun",
    role: "Freelance Designer",
    comment:
      "Super fast delivery and excellent customer support. I love the aesthetic and functionality of my new keyboard.",
    image: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 3,
    name: "Aminul Islam",
    role: "Pro Gamer",
    comment:
      "Responsive keys and zero input lag — a dream for any gamer. I’d recommend this store to everyone!",
    image: "https://i.pravatar.cc/150?img=13",
  },
  {
    id: 4,
    name: "Tanjina Akter",
    role: "Office Executive",
    comment:
      "I was surprised by how comfortable the keyboard feels even after long typing hours. Cash on delivery made the process easy!",
    image: "https://i.pravatar.cc/150?img=14",
  },
  {
    id: 5,
    name: "Naimur Rahman",
    role: "Tech Reviewer",
    comment:
      "This shop provides genuine mechanical keyboards with great service. Loved the packaging and delivery speed!",
    image: "https://i.pravatar.cc/150?img=15",
  },
  {
    id: 6,
    name: "Sabina Yasmin",
    role: "Student",
    comment:
      "Affordable pricing and quality products — perfect for someone on a student budget. Thank you for the great experience!",
    image: "https://i.pravatar.cc/150?img=16",
  },
  {
    id: 7,
    name: "Rifat Karim",
    role: "Freelancer",
    comment:
      "My new keyboard is a productivity booster. Quiet keys, customizable lighting — just what I needed!",
    image: "https://i.pravatar.cc/150?img=17",
  },
  {
    id: 8,
    name: "Mahia Chowdhury",
    role: "Content Writer",
    comment:
      "Typing has never been more enjoyable! Beautiful keyboard design and the feel is just perfect for my long writing sessions.",
    image: "https://i.pravatar.cc/150?img=18",
  },
];

const Testimonials: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <section className=" py-12 px-4">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          What Our Customers Say
        </h2>
        <p className="text-gray-300 mt-2">
          Real feedback from our trusted buyers
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Slider {...settings}>
          {testimonials.map((t) => (
            <div key={t.id} className="px-4">
              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-white shadow-lg">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-white/20 shadow-md"
                  />
                  <div className="text-center md:text-left">
                    <p className="text-lg italic mb-4">"{t.comment}"</p>
                    <h4 className="text-xl font-semibold">{t.name}</h4>
                    <p className="text-sm text-gray-300">{t.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;
