import Hero from "./components/Hero";

const Home = () => {
  return (
    <div className="space-y-4 pt-16">
      <Hero />
      <div className="w-full bg-slate-300 h-40 flex justify-center items-center rounded-md text-2xl font-bold">
        <h1>Services</h1>
      </div>
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
