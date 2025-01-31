const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(cors({
    origin: "http://localhost:5173", // URL del frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Permitir cookies
  }));
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

module.exports = app;
