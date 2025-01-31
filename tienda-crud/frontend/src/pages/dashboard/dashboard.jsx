import React, { useEffect, useState } from "react";
import { fetchAllProducts, createProduct, updateProduct, deleteProduct } from "./DashboardController";
import { Modal, Button, Table, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Importar navegación
import "./Dashboard.css";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const navigate = useNavigate(); // Hook para redirección

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await fetchAllProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error al obtener productos:", error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Elimina el token
    navigate("/login"); // Redirige a Login
  };

  const handleOpenModal = (product = null) => {
    setEditing(product);
    setShowModal(true);
    setProductData(
      product || { name: "", description: "", price: "", category: "", stock: "" }
    );
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditing(null);
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    try {
      if (editing) {
        await updateProduct(editing._id, productData, token);
        setProducts(products.map((p) => (p._id === editing._id ? productData : p)));
      } else {
        const newProduct = await createProduct(productData, token);
        setProducts([...products, newProduct]);
      }
      handleCloseModal();
    } catch (error) {
      console.error("Error al guardar producto:", error.message);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    try {
      await deleteProduct(id, token);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error al eliminar producto:", error.message);
    }
  };

  return (
    <div className="dashboard-container">
      {/* 🔹 Barra superior con Logout */}
      <div className="dashboard-header">
        <h2>Dashboard de Productos</h2>
        <Button variant="danger" onClick={handleLogout} className="logout-button">
          Salir 🚪
        </Button>
      </div>

      <Button variant="primary" onClick={() => handleOpenModal()}>
        + Añadir Producto
      </Button>

      <Table striped bordered hover className="products-table mt-3">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td>{product.stock}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleOpenModal(product)}>✏️</Button>
                {' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(product._id)}>🗑️</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para Añadir/Editar Producto */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editing ? "Editar Producto" : "Añadir Producto"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={productData.name}
                onChange={(e) => setProductData({ ...productData, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={productData.description}
                onChange={(e) => setProductData({ ...productData, description: e.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                value={productData.price}
                onChange={(e) => setProductData({ ...productData, price: e.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                type="text"
                value={productData.category}
                onChange={(e) => setProductData({ ...productData, category: e.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                value={productData.stock}
                onChange={(e) => setProductData({ ...productData, stock: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="success" onClick={handleSave}>
            {editing ? "Actualizar" : "Añadir"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
