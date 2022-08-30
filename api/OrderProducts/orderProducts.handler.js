const crud = require("../../crud");
const nomeTabela = "OrderProducts";

async function cadastrarOrderProducts(dados = { productId: "", quantity: 0, orderId: "" }) {
    if (!dados.productId) {
        return {
            error: "0001",
            message: "Preencha os campos da requisição!",
            camposNecessarios: ["productId"]
        };
    }

    if(!dados.orderId){
        return {
            error: "0001",
            message: "Preencha os campos da requisição!",
            camposNecessarios: ["orderId"]
        };
    }

    if(!dados.quantity || !(dados.quantity > 0)){
        return {
            error: "0001",
            message: "Preencha os campos da requisição!",
            camposNecessarios: ["quantity"]
        };
    }

    if(typeof dados.quantity != "number"){
        return {
            error: "0002",
            message: "O tipo de dado não corresponde ao esperado!",
            tipoDeDado: typeof dados.quantity,
            tipoEsperado: "number"
        };
    }

    if (await verificarProduct(dados.productId)) {
        return {
            error: "0003",
            message: "Not found!",
            situation: "O product não está cadastrado!"
        };
    }

    if (await verificarOrder(dados.orderId)) {
        return {
            error: "0003",
            message: "Not found!",
            situation: "A order não está cadastrada!"
        };
    }

    const order = await crud.save(nomeTabela, undefined, dados);
    return order;
}

async function verificarProduct(productId) {
    let naoCadastrado = false;
    try {
        await crud.getById("Products", productId);
    } catch (erro) {
        naoCadastrado = true;
        return naoCadastrado;
    }
    return naoCadastrado;
}

async function verificarOrder(orderId) {
    let naoCadastrado = false;
    try {
        await crud.getById("Orders", orderId);
    } catch (erro) {
        naoCadastrado = true;
        return naoCadastrado;
    }
    return naoCadastrado;
}

async function buscarOrderProducts() {
    const orderProducts = await crud.get("OrderProducts");
    return orderProducts;
}

async function buscarOrderProduct(id) {
    const orderProduct = await crud.getById("OrderProducts", id);
    return orderProduct;
}

async function editarOrderProduct(id, orderProduct) {
    const orderProductEditada = await crud.save("OrderProducts", id, orderProduct);
    return orderProductEditada;
}

async function deletarOrderProduct(id) {
    const orderProductDeletada = await crud.remove("OrderProducts", id);
    return orderProductDeletada;
}

module.exports = {
    cadastrarOrderProducts,
    buscarOrderProducts,
    buscarOrderProduct,
    editarOrderProduct,
    deletarOrderProduct
}