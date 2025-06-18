import { useState } from "react";
import type { FC, ReactElement } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "What is NL2DATA and how does it work?",
    answer:
      "NL2DATA is an AI-powered platform that turns natural language queries into real-time data visualizations. Just describe the data you want to see, and NL2DATA handles the rest—generating optimized SQL queries and selecting the right chart automatically.",
  },
  {
    question: "Do I need to know SQL or coding?",
    answer:
      "No. NL2DATA is designed for everyone—from analysts to non-technical users. You can ask questions in plain English and get visual results without writing a single line of code.",
  },
  {
    question: "What databases does NL2DATA support?",
    answer:
      "Currently, NL2DATA supports PostgreSQL and is expanding to support additional SQL-based databases. Secure connections and integrations are easy to set up through the dashboard.",
  },
  {
    question: "Can I customize the visualizations?",
    answer:
      "Yes. Charts are fully responsive and customizable. You can adjust types, colors, axes, and more to fit your needs before sharing or exporting your dashboards.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We use encrypted connections and never store your raw data. All queries are executed securely through your database connections.",
  },
];


const FAQ: FC = (): ReactElement => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
<section className="w-[90%] max-w-4xl mx-auto my-16">
      <h2 className="font-merriweather text-3xl sm:text-4xl font-bold text-white text-center mb-4">Frequently Asked Questions</h2>
      <p className="text-base text-secondaryAccent text-center mb-10 max-w-2xl mx-auto">
        Everything you need to know about NL2DATA.
      </p>

      <div className="rounded-xl overflow-hidden divide-y divide-[#2d2d2d] bg-black border border-[#2e2e2e]">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`transition-all duration-200 ${
                isOpen ? 'bg-[#0f0f0f] border-l-4 border-[#EAB308]' : 'border-l-4 border-transparent'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between px-6 py-5 text-left group hover:bg-[#1AA8BD]/10"
              >
                <span className="text-white font-medium text-lg group-hover:text-[#21C1D6] transition-colors duration-300">
                  {faq.question}
                </span>
                {isOpen ? (
                  <FaChevronUp className="text-[#21C1D6]" />
                ) : (
                  <FaChevronDown className="text-secondaryAccent" />
                )}
              </button>

              <div
                className={`px-6 pb-5 text-sm text-secondaryAccent transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                }`}
              >
                {faq.answer}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;
