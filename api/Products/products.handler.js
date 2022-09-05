const crud = require("../../crud");
const nomeTabela = "Products";

async function cadastrarProduto(dados) {
    
    if (Object.keys(dados).length != 2) {
        return {
            error: "0001",
            message: "Preencha somente os campos necessários!",
            camposNecessarios: ["name", "price"]
        };
    }

    if (!dados.name) {
        return {
            error: "0002",
            message: "Preencha os campos da requisição!",
            camposNecessarios: ["name"]
        };
    }
    
    if (typeof dados.name != "string") {
        return {
            error: "0003",
            message: "O tipo de dado do campo [name] não corresponde ao esperado!",
            tipoDeDado: typeof dados.name,
            tipoEsperado: "string"
        };
    }

    if (!dados.price) {
        return {
            error: "0002",
            message: "Preencha os campos da requisição!",
            camposNecessarios: ["price"]
        };
    }

    if (typeof dados.price != "number") {
        return {
            error: "0003",
            message: "O tipo de dado do campo [price] não corresponde ao esperado!",
            tipoDeDado: typeof dados.price,
            tipoEsperado: "number"
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
    try {
        const product = await crud.getById("Products", id);
        return product;
    } catch (erro) {
        return {
            error: "0005",
            message: "Produto não encontrado!"
        }
    }
}

async function editarProduto(id, user) {

    if (Object.keys(user).length != 2) {
        return {
            error: "0001",
            message: "Preencha somente os campos necessários!",
            camposNecessarios: ["name", "price"]
        };
    }

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