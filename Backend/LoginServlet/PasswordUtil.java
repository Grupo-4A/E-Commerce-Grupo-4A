package com.yourcompany.loginapp.util;

import org.mindrot.jbcrypt.BCrypt;

/**
 * Utilidad para el hashing y verificación de contraseñas usando BCrypt.
 * BCrypt es una función de hash de contraseña fuerte y adaptativa.
 */
public class PasswordUtil {

    /**
     * Hashea una contraseña de texto plano.
     * @param plainPassword La contraseña de texto plano a hashear.
     * @return La contraseña hasheada (con un salt incluido).
     */
    public static String hashPassword(String plainPassword) {
        // BCrypt.gensalt() genera un salt aleatorio para cada hash, 
        // lo que es crucial para la seguridad (previene ataques de tablas arcoíris).
        return BCrypt.hashpw(plainPassword, BCrypt.gensalt());
    }

    /**
     * Verifica si una contraseña de texto plano coincide con una contraseña hasheada.
     * @param plainPassword La contraseña de texto plano a verificar.
     * @param hashedPassword La contraseña hasheada almacenada en la base de datos.
     * @return true si coinciden, false en caso contrario.
     */
    public static boolean checkPassword(String plainPassword, String hashedPassword) {
        // BCrypt.checkpw() se encarga de extraer el salt del hash y aplicarlo
        // a la contraseña de texto plano antes de compararla.
        return BCrypt.checkpw(plainPassword, hashedPassword);
    }
}
