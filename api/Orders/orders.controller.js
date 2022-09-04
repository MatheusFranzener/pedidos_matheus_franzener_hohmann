const express = require('express');
const router = express.Router();

const orderHandler = require("./orders.handler");

router.get("/", async (req, res) => {
    const orders = await orderHandler.buscarOrders();
    res.json(orders);
});

router.get("/:id", async (req, res) => {
    res.json(await orderHandler.buscarOrder(req.params.id));
});

router.post("/", async (req, res) => {
    res.json(await orderHandler.cadastrarOrder(req.body));
});

router.put("/:id", async (req, res) => {
    res.json(await orderHandler.finalizarOrder(req.params.id));
});

router.delete('/:id', async (req, res) => {
    res.json(await orderHandler.deletarOrder(req.params.id));
});

module.exports = router;