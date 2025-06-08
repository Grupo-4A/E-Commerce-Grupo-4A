import dotenv from 'dotenv';
dotenv.config(); 

import app from './app.js'; 

// Importa la función startNewsUpdater desde el archivo de servicios
import { startNewsUpdater } from './src/services/newService.js';

// Verifica que el puerto esté correctamente asignado, usa un valor por defecto si es necesario
const port = process.env.PORT || 4000;  

// Inicia el servidor y ejecuta el actualizador de noticias
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
  startNewsUpdater(); // Inicia el actualizador de noticias al iniciar el servidor
});
