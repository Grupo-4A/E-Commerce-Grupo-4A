/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx, css}'], // ajusta según tu estructura
  theme: {
    extend: {
      colors: {
        azulProfundo: '#2C5282',
        grisOscuro: '#1F2937',
        blanco: '#FFFFFF',
        azulClaro: '#60A5FA',
        verdeEsmeralda: '#10B981',
        rojoSuave: '#EF4444',
        grisClaro: '#F3F4F6',
        amarilloMostaza: '#F59E0B',
        grisMedio: '#384557',
      },
      fontFamily: {
        mono: ['"Space Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};

