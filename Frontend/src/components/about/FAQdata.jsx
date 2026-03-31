import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const FAQ_DATA = [
  { question: "How does it works?", answer: "Imperdiet ut tristique viverra nunc. Ultrices orci vel auctor cursus turpis nibh placerat massa. Fermentum urna ut at et in." },
  { question: "Can I rent a car without a credit card?", answer: "Yes, we offer various payment methods including debit cards and online transfers in specific locations." },
  { question: "What are the requirements for renting a car?", answer: "You typically need a valid driver's license, a form of ID, and to meet the minimum age requirement." },
  { question: "Does Car Rental allow me to tow with or attach a hitch?", answer: "Towing is generally not permitted with our standard rental fleet to ensure vehicle longevity." },
  { question: "Does Car Rental offer coverage products for purchase?", answer: "We offer several insurance and protection packages to give you peace of mind during your trip." },
];

const AccordionItem = ({ item, isOpen, onClick }) => (
  <div className={`border rounded-2xl mb-4 transition-all ${isOpen ? 'border-green-600 shadow-sm' : 'border-gray-200'}`}>
    <button 
      onClick={onClick}
      className="w-full flex justify-between items-center p-6 text-left"
    >
      <span className="font-bold text-gray-900">{item.question}</span>
      {isOpen ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
    </button>
    {isOpen && (
      <div className="px-6 pb-6 text-sm text-gray-500 leading-relaxed">
        {item.answer}
      </div>
    )}
  </div>
);

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="max-w-4xl mx-auto py-20 px-6">
      <h2 className="text-4xl font-black text-center text-gray-900 mb-12">Top Car Rental Questions</h2>
      {FAQ_DATA.map((item, index) => (
        <AccordionItem 
          key={index} 
          item={item} 
          isOpen={openIndex === index} 
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </section>
  );
}

