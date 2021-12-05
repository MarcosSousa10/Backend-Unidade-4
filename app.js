const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");

const ProductSchema = require("./schemas/ProductSchema");

const server = express();

server.use(cors());

server.use(express.json());

mongoose.connect(
  "mongodb+srv://admin:254565@cluster0.pdzrk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);

server.get("/", (req, res) => {
  return res.json({ message: "Seja bem vindo à API" });
});

server.get("/products", async (req, res) => {
  const products = await ProductSchema.find();
  return res.json(products);
});

server.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await ProductSchema.findById(id);
  return res.json(product);
});

server.post("/products", async (req, res) => {
  const { name, price, promotionalPrice, image } = req.body;

  const product = await ProductSchema.create({
    name,
    price,
    promotionalPrice,
    image,
  });
  return res.json(product);
});

server.listen(3333, () =>
  console.log("Servidor iniciado em http://localhost:3333")
);
