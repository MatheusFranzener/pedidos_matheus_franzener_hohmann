const express = require('express');
const router = express.Router();

const orderProductsHandler = require("./orderProducts.handler");

router.get("/", async (req, res) => {
    const orderProducts = await orderProductsHandler.buscarOrderProducts();
    res.json(orderProducts);
});

router.get("/:id", async (req, res) => {
    res.json(await orderProductsHandler.buscarOrderProduct(req.params.id));
});

router.post("/", async (req, res) => {
    res.json(await orderProductsHandler.cadastrarProduto(req.body));
});

router.delete('/', async (req, res) => {
    res.json(await orderProductsHandler.removerProduto(req.body));
});

module.exports = router;