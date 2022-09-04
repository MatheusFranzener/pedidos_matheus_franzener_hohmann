const crud = require("../../crud");
const nomeTabela = "Products";

async function cadastrarProduto(dados = { name: "", price: 0 }) {
    if (!dados.name) {
        return {
            error: "0001",
            message: "É necessário preencher os dados da requisição!",
            camposNecessarios: ["name"]
        };
    }
    if (!dados.price) {
        return {
            error: "0001",
            message: "É necessário preencher os dados da requisição!",
            camposNecessarios: ["price"]
        };
    }
    if (typeof dados.price != "number") {
        return {
            error: "0002",
            message: "O tipo de dado não corresponde ao esperado!",
            tipoDeDado: typeof dados.price,
            tipoEsperado: "number"
        };
    }
    if (typeof dados.name != "string") {
        return {
            error: "0002",
            message: "O tipo de dado não corresponde ao esperado!",
            tipoDeDado: typeof dados.name,
            tipoEsperado: "string"
        };
    }

    const product = await crud.save(nomeTabela, undefined, dados);
    return product;
}

async function buscarProdutos() {
    const products = await crud.get("Products");
    return products;
}

async function buscarProduto(id) {
    const product = await crud.getById("Products", id);
    return product;
}

async function editarProduto(id, user) {
    const productEditado = await crud.save("Products", id, user);
    return productEditado;
}

async function deletarProduto(id) {
    const productDeletado = await crud.remove("Products", id);
    return productDeletado;
}

module.exports = {
    cadastrarProduto,
    buscarProdutos,
    buscarProduto,
    editarProduto,
    deletarProduto
}