import api from '../../api/axios';

/**
 * Inicia sesión con las credenciales proporcionadas.
 * @param {string} email - El correo electrónico del usuario.
 * @param {string} password - La contraseña del usuario.
 * @returns {Promise<Object>} - Respuesta del servidor con el token de acceso.
 */
export const loginUser = async (email, password) => {
    try {
        const response = await api.post('/api/auth/login', { email, password });
        return response.data;
    } catch (error) {
        throw new Error('Credenciales inválidas. Intenta de nuevo.');
    }
};
