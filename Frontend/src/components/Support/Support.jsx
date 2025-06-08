import React, { useState } from "react";
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdFacebook,
  MdOutlineEmail,
} from "react-icons/md";
import { BsGithub, BsDiscord, BsPerson, BsChevronDown } from "react-icons/bs";

const Support = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "¿Qué es Chakra UI?",
      answer: "Chakra UI es una biblioteca de componentes modular y accesible para React.",
    },
    {
      question: "¿Por qué usar Chakra UI?",
      answer: "Ofrece facilidad de uso, componentes listos para producción y diseño adaptable.",
    },
    {
      question: "¿Cómo empezar con Chakra UI?",
      answer: "Puedes instalarlo con npm/yarn y seguir la documentación oficial para comenzar.",
    },
  ];

  return (
    <div className="bg-gray-800 w-full p-8 rounded-2xl mx-1.25 my-10 shadow-lg">
      <div className="flex flex-wrap gap-8 justify-between">
        {/* Sección de Contacto */}
        <div className="bg-blue-700 text-white rounded-2xl p-8 flex-1 min-w-[320px] max-w-[600px]">
          <h2 className="text-2xl font-bold mb-4">Contacto</h2>
          <p className="text-white mb-4">Rellena el formulario para contactarnos</p>

          <div className="flex flex-col gap-2 mb-4">
            <button className="bg-white text-blue-900 p-2 rounded-lg flex items-center gap-2 font-bold cursor-pointer">
              <MdPhone className="text-blue-500" /> +91-988888888
            </button>
            <button className="bg-white text-blue-900 p-2 rounded-lg flex items-center gap-2 font-bold cursor-pointer">
              <MdEmail className="text-blue-500" /> hello@abc.com
            </button>
            <button className="bg-white text-blue-900 p-2 rounded-lg flex items-center gap-2 font-bold cursor-pointer">
              <MdLocationOn className="text-blue-500" /> Karnavati, India
            </button>
          </div>

          <div className="flex gap-4 mb-6">
            <button className="bg-white p-2 rounded-full cursor-pointer">
              <MdFacebook size="24px" />
            </button>
            <button className="bg-white p-2 rounded-full cursor-pointer">
              <BsGithub size="24px" />
            </button>
            <button className="bg-white p-2 rounded-full cursor-pointer">
              <BsDiscord size="24px" />
            </button>
          </div>

          <form className="flex flex-col gap-4 mt-8">
            <label className="relative">
              Tu nombre
              <div className="relative">
                <BsPerson className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-600" />
                <input
                  type="text"
                  placeholder="Nombre"
                  className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </label>

            <label className="relative">
              Correo
              <div className="relative">
                <MdOutlineEmail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-600" />
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </label>

            <label>
              Mensaje
              <textarea
                placeholder="Escribe tu mensaje aquí"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              ></textarea>
            </label>

            <button
              type="submit"
              className="bg-blue-500 text-white p-3 rounded-lg self-end hover:bg-blue-600 transition-colors"
            >
              Enviar Mensaje
            </button>
          </form>
        </div>

        {/* Sección de FAQ */}
        <div className="bg-gray-100 rounded-2xl p-8 flex-1 min-w-[320px] max-w-[600px] shadow-md">
          <h2 className="text-2xl font-bold mb-4">Preguntas Frecuentes</h2>
          <div className="flex flex-col gap-4 mt-4">
            {faqData.map((faq, index) => (
              <div key={index} className="border border-gray-300 rounded-lg">
                <button
                  className="w-full p-4 text-left font-semibold flex justify-between items-center hover:bg-gray-200 transition-colors"
                  onClick={() => toggleAccordion(index)}
                >
                  {faq.question}
                  <BsChevronDown
                    className={`transform transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="p-4 bg-gray-50">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;