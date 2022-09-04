const express = require('express');

const app = express();
const route = express.Router();
const routes = require('./api/routes');

app.use(route);
route.use(express.json());

route.get("/", (req,res) =>{
    res.send("Recuperação - Pedidos");
});

route.use("/api", routes);

app.listen("3000", () => {
    console.log("localhost:3000");
});