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
    res.json(await orderProductsHandler.cadastrarOrderProducts(req.body));
});

router.put("/:id", async (req, res) => {
    res.json(await orderProductsHandler.editarOrderProduct(req.params.id, req.body));
});

router.delete('/:id', async (req, res) => {
    res.json(await orderProductsHandler.deletarOrderProduct(req.params.id));
});

module.exports = router;