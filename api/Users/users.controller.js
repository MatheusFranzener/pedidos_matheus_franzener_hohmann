const express = require('express');
const router = express.Router();

const userHandler = require("./users.handler");

router.get("/", async (req, res) => {
    const users = await userHandler.buscarUsers();
    res.json(users);
});

router.get("/:id", async (req, res) => {
    res.json(await userHandler.buscarUser(req.params.id));
});

router.post("/", async (req, res) => {
    res.json(await userHandler.cadastrarUser(req.body));
});

router.put("/:id", async (req, res) => {
    res.json(await userHandler.editarUser(req.params.id, req.body));
});

router.delete('/:id', async (req, res) => {
    res.json(await userHandler.deletarUser(req.params.id));
});

module.exports = router;