import api from "../../api/axios";

/**
 * Obtiene todos los productos.
 * @returns {Promise<Object[]>} - Lista de productos.
 */
export const fetchAllProducts = async () => {
  try {
    const response = await api.get("/api/products");
    return response.data;
  } catch (error) {
    console.error("❌ Error en fetchAllProducts:", error?.response?.data || error.message);
    throw new Error(error?.response?.data?.message || "Error al cargar los productos");
  }
};


/**
 * Crea un nuevo producto.
 * @param {Object} product - Datos del producto { name, price }.
 * @returns {Promise<Object>} - Producto creado.
 */
export const createProduct = async (product) => {
  try {
    const token = localStorage.getItem("token"); // 🔥 Obtener el token desde localStorage
    if (!token) throw new Error("No hay token disponible"); // ⚠️ Manejo de error si no hay token

    const response = await api.post("/api/products", product, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Error en createProduct:", error?.response?.data || error.message);
    throw new Error(error?.response?.data?.message || "Error al crear el producto");
  }
};

/**
 * Actualiza un producto por ID.
 */
export const updateProduct = async (id, product) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No hay token disponible");

    const response = await api.put(`/api/products/${id}`, product, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Error en updateProduct:", error?.response?.data || error.message);
    throw new Error(error?.response?.data?.message || "Error al actualizar el producto");
  }
};

/**
 * Elimina un producto por ID.
 */
export const deleteProduct = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No hay token disponible");

    const response = await api.delete(`/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Error en deleteProduct:", error?.response?.data || error.message);
    throw new Error(error?.response?.data?.message || "Error al eliminar el producto");
  }
};

