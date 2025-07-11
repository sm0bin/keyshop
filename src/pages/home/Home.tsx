import Hero from "./components/Hero";
import ShopFeatures from "./components/ShopFeatures";

const Home = () => {
  return (
    <div className="pt-16">
      <Hero />
      <ShopFeatures />
      <div className="w-full bg-slate-300 h-40 flex justify-center items-center rounded-md text-2xl font-bold">
        <h1>Featured Products</h1>
      </div>
      <div className="w-full bg-slate-300 h-40 flex justify-center items-center rounded-md text-2xl font-bold">
        <h1>Featured Brands</h1>
      </div>
      <div className="w-full bg-slate-300 h-40 flex justify-center items-center rounded-md text-2xl font-bold">
        <h1>Testimonials and Reviews</h1>
      </div>
      <div className="w-full bg-slate-300 h-40 flex justify-center items-center rounded-md text-2xl font-bold">
        <h1>Why choose mechanical keyboards</h1>
      </div>
      <div className="w-full bg-slate-300 h-40 flex justify-center items-center rounded-md text-2xl font-bold">
        <h1>Customizing your keyboard</h1>
      </div>
      <div className="w-full bg-slate-300 h-40 flex justify-center items-center rounded-md text-2xl font-bold">
        <h1>Footer</h1>
      </div>
    </div>
  );
};

export default Home;
