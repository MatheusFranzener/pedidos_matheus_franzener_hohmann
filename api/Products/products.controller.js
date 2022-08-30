const express = require('express');
const router = express.Router();

const productsHandler = require("./products.handler");

router.get("/", async (req, res) => {
    const products = await productsHandler.buscarProdutos();
    res.json(products);
});

router.get("/:id", async (req, res) => {
    res.json(await productsHandler.buscarProduto(req.params.id));
});

router.post("/", async (req, res) => {
    res.json(await productsHandler.cadastrarProduto(req.body));
});

router.put("/:id", async (req, res) => {
    res.json(await productsHandler.editarProduto(req.params.id, req.body));
});

router.delete('/:id', async (req, res) => {
    res.json(await productsHandler.deletarProduto(req.params.id));
});

module.exports = router;