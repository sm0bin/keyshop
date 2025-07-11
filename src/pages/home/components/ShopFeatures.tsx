import {
  Truck,
  BadgeDollarSign,
  Headset,
  HandCoins,
  Clock,
  ShieldCheck,
  PackageCheck,
  Zap,
} from "lucide-react";

const shopFeatures = [
  {
    id: 1,
    icon: Truck,
    title: "Free Shipping",
    subtitle: "Enjoy free delivery on all orders over $50.",
  },
  {
    id: 2,
    icon: BadgeDollarSign,
    title: "Lowest Delivery Charge",
    subtitle: "Competitive rates with no hidden fees.",
  },
  {
    id: 3,
    icon: Headset,
    title: "24/7 Support",
    subtitle: "Our support team is available anytime.",
  },
  {
    id: 4,
    icon: HandCoins,
    title: "Cash on Delivery",
    subtitle: "Pay securely when your order arrives.",
  },
  {
    id: 5,
    icon: Clock,
    title: "Fast Delivery",
    subtitle: "Get your products delivered in 1–3 days.",
  },
  {
    id: 6,
    icon: ShieldCheck,
    title: "Free Warranty Service",
    subtitle: "1-year warranty coverage included.",
  },
  {
    id: 7,
    icon: PackageCheck,
    title: "Easy Returns",
    subtitle: "Hassle-free 7-day return policy.",
  },
  {
    id: 8,
    icon: Zap,
    title: "Best Quality",
    subtitle: "High-quality products for your satisfaction.",
  },
];

const ShopFeatures = () => {
  return (
    <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 px-4">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Why Shop With Us?
        </h2>
        <p className="text-gray-300 mt-2">
          We’re committed to making your shopping experience smooth and
          reliable.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {shopFeatures.map((feature) => (
          <div
            key={feature.id}
            className="backdrop-blur-md bg-white/10 border border-white/10 p-6 rounded-2xl text-white shadow-lg hover:bg-white/20 transition"
          >
            <feature.icon className="w-8 h-8 mb-4 text-blue-400" />
            <h4 className="text-xl font-semibold mb-1">{feature.title}</h4>
            <p className="text-sm text-gray-200">{feature.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopFeatures;
