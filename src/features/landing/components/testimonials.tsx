import type { FC, ReactElement } from "react";

const Testimonials: FC = (): ReactElement => {
  const testimonials = [
    {
      name: "Sarah Wilson",
      title: "Data Analyst, TechCorp",
      quote:
        "NL2DATA has revolutionized how we explore data. The ability to ask questions in plain English and get visual insights instantly is a game-changer.",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Michael Chen",
      title: "BI Manager, FinanceHub",
      quote:
        "Our team now builds interactive dashboards in minutes—without touching SQL. It's intuitive, smart, and saves us hours each week.",
      img: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "David Kumar",
      title: "CEO, DataStart",
      quote:
        "We cut reporting cycles by 80%. NL2DATA’s AI-driven visualizations have become essential to our operations and executive decision-making.",
      img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Emily Zhang",
      title: "CTO, InsightWorks",
      quote:
        "Integration with our PostgreSQL database was seamless. The support is stellar, and the product just works beautifully.",
      img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Carlos Reyes",
      title: "Data Engineer, CloudSpan",
      quote:
        "The real-time dashboards let us catch data anomalies immediately. NL2DATA has improved our monitoring dramatically.",
      img: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Maya Patel",
      title: "Analytics Lead, HealthSync",
      quote:
        "From chart flexibility to AI query generation, NL2DATA delivers a powerful, user-friendly experience. It’s our go-to analytics tool.",
      img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Jake Tran",
      title: "VP of Ops, SalesFlow",
      quote:
        "We rely on NL2DATA to analyze sales performance and forecast trends—all from plain English queries. Our decision-making is sharper than ever.",
      img: "https://images.unsplash.com/photo-1502767089025-6572583495b0?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Amira Sayed",
      title: "Product Manager, AIForge",
      quote:
        "Tracking KPIs used to be tedious. Now I type what I want and get real-time visualizations. It’s like having an analyst on demand.",
      img: "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Liam O'Brien",
      title: "Lead Scientist, QuantumLeap",
      quote:
        "NL2DATA’s forecasting and multi-variable comparison tools are unmatched. We’re making confident, fast decisions thanks to it.",
      img: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chunkArray = (arr: any[], size: number) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );

  const desktopColumns = chunkArray(testimonials, 3);
  const mobileList = testimonials.slice(0, 5);

  return (
    <section className="py-20 bg-black text-secondaryAccent">
      <div className="container mx-auto p-4">
        <div className="text-center mb-12">
          <p className="font-merriweather text-3xl md:text-4xl lg:text-5xl font-extrabold text-white">
            Trusted by data teams everywhere
          </p>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:grid grid-cols-3 gap-6">
          {desktopColumns.map((column, idx) => (
            <div key={idx} className="h-[32rem] overflow-hidden relative">
              <div
                className={`space-y-6 ${
                  idx % 2 === 0
                    ? "animate-marquee-vertical"
                    : "animate-reverse-marquee-vertical"
                }`}
              >
                {[...column, ...column].map((testimonial, i) => (
                  <TestimonialCard key={i} {...testimonial} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View */}
        <div className="lg:hidden h-[28rem] overflow-hidden relative">
          <div className="space-y-6 animate-marquee-vertical">
            {[...mobileList, ...mobileList].map((testimonial, i) => (
              <TestimonialCard key={i} {...testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({
  name,
  title,
  quote,
  img,
}: {
  name: string;
  title: string;
  quote: string;
  img: string;
}) => (
  <div className="p-4 rounded-md text-white">
    <div className="flex items-center mb-3">
      <img src={img} alt={name} className="h-10 w-10 rounded-full" />
      <div className="ml-3">
        <h4 className="text-sm font-bold">{name}</h4>
        <p className="text-xs text-secondaryAccent">{title}</p>
      </div>
    </div>
    <p className="text-sm leading-snug">{quote}</p>
  </div>
);

export default Testimonials;
