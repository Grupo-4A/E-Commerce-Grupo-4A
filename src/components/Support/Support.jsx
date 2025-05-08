import styles from './Support.module.css'
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdFacebook,
  MdOutlineEmail,
} from 'react-icons/md'
import { BsGithub, BsDiscord, BsPerson, BsChevronDown } from 'react-icons/bs'
import { useState } from 'react'

const Support = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Sección de Contacto */}
        <div className={styles.formSection}>
          <h2>Contacto</h2>
          <p className={styles.description}>Rellena el formulario para contactarnos</p>

          <div className={styles.contactButtons}>
            <button className={styles.contactButton}>
              <MdPhone className={styles.icon} />
              +91-988888888
            </button>
            <button className={styles.contactButton}>
              <MdEmail className={styles.icon} />
              hello@abc.com
            </button>
            <button className={styles.contactButton}>
              <MdLocationOn className={styles.icon} />
              Karnavati, India
            </button>
          </div>

          <div className={styles.socialIcons}>
            <button className={styles.iconBtn}><MdFacebook size="24px" /></button>
            <button className={styles.iconBtn}><BsGithub size="24px" /></button>
            <button className={styles.iconBtn}><BsDiscord size="24px" /></button>
          </div>

          <form className={styles.formFields}>
            <label>
              Tu nombre
              <div className={styles.inputGroup}>
                <BsPerson className={styles.inputIcon} />
                <input type="text" placeholder="Nombre" />
              </div>
            </label>

            <label>
              Correo
              <div className={styles.inputGroup}>
                <MdOutlineEmail className={styles.inputIcon} />
                <input type="email" placeholder="Correo electrónico" />
              </div>
            </label>

            <label>
              Mensaje
              <textarea placeholder="Escribe tu mensaje aquí"></textarea>
            </label>

            <button type="submit" className={styles.submitButton}>
              Enviar Mensaje
            </button>
          </form>
        </div>

        {/* Sección de FAQ */}
        <div className={styles.accordionSection}>
          <h2>Preguntas Frecuentes</h2>
          <div className={styles.accordion}>
            {faqData.map((faq, index) => (
              <div key={index} className={styles.accordionItem}>
                <button
                  className={styles.accordionButton}
                  onClick={() => toggleAccordion(index)}
                >
                  {faq.question}
                  <span className={styles.chevron}>
                    <BsChevronDown />
                  </span>
                </button>
                {openIndex === index && (
                  <div className={styles.accordionPanel}>{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Support;
const faqData = [
  {
    question: '¿Qué es Chakra UI?',
    answer: 'Chakra UI es una biblioteca de componentes modular y accesible para React.',
  },
  {
    question: '¿Por qué usar Chakra UI?',
    answer: 'Ofrece facilidad de uso, componentes listos para producción y diseño adaptable.',
  },
  {
    question: '¿Cómo empezar con Chakra UI?',
    answer: 'Puedes instalarlo con npm/yarn y seguir la documentación oficial para comenzar.',
  },
]
