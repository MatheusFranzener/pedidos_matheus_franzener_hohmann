const crud = require("./crud");

const userHandler = require("./api/Users/users.handler");
const productsHandler = require("./api/Products/products.handler");
const orderHandler = require("./api/Orders/orders.handler");

async function executar() {
    const user = {
        cpf: "123",
        name: "matheus",
        surname: "franzener"
    };

    const resultado = await userHandler.cadastrarUser(user);

    console.log(resultado);
}

// async function executar() {
//     const product = {
//         name: "Bola",
//         price: 20
//     };

//     const resultado = await productsHandler.cadastrarProduto(product);

//     console.log(resultado);
// }

// async function executar() {
//     const product = {
//         userId: "jf0jrOPiVK6aILKsLlqV"
//     };

//     const resultado = await orderHandler.cadastrarOrder(product);

//     console.log(resultado);
// }

executar();