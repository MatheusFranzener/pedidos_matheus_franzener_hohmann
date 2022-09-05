const crud = require("../../crud");
const nomeTabela = "OrderProducts";

async function cadastrarProduto(dados) {

    if (Object.keys(dados).length != 3) {
        return {
            error: "0001",
            message: "Preencha somente os dados necessários!",
            camposNecessarios: ["productId", "quantity", "orderId"]
        };
    }

    if (!dados.productId) {
        return {
            error: "0002",
            message: "Preencha os campos da requisição!",
            camposNecessarios: ["productId"]
        };
    }

    if (typeof dados.productId != "string") {
        return {
            error: "0003",
            message: "O tipo de dado do campo [productId] não corresponde ao esperado!",
            tipoDeDado: typeof dados.productId,
            tipoEsperado: "string"
        };
    }

    if (!dados.orderId) {
        return {
            error: "0002",
            message: "Preencha os campos da requisição!",
            camposNecessarios: ["orderId"]
        };
    }

    if (typeof dados.orderId != "string") {
        return {
            error: "0003",
            message: "O tipo de dado do campo [orderId] não corresponde ao esperado!",
            tipoDeDado: typeof dados.orderId,
            tipoEsperado: "string"
        };
    }

    if (!dados.quantity || !(dados.quantity > 0)) {
        return {
            error: "0002",
            message: "Preencha os campos da requisição!",
            camposNecessarios: ["quantity"]
        };
    }

    if (typeof dados.quantity != "number") {
        return {
            error: "0003",
            message: "O tipo de dado do campo [quantity] não corresponde ao esperado!",
            tipoDeDado: typeof dados.quantity,
            tipoEsperado: "number"
        };
    }

    if (await verificarProduct(dados.productId)) {
        return {
            error: "0005",
            message: "O product não foi encontrado!"
        };
    }

    if (await verificarOrder(dados.orderId)) {
        return {
            error: "0005",
            message: "A order não foi encontrada!"
        };
    }

    if (await verificarStatusOrder(dados.orderId)) {
        return {
            error: "0006",
            message: "A order já está finalizada!"
        };
    }

    const novoProduto = await crud.getWithFilter("OrderProducts", "orderId", "==", dados.orderId);

    for (const produto of novoProduto) {
        if (produto.productId == dados.productId) {
            produto.quantity += dados.quantity;

            const orderProductAtualizada = await crud.save("OrderProducts", produto.id, produto);
            return orderProductAtualizada;
        }
    }

    const order = await crud.save(nomeTabela, undefined, dados);
    return order;
}

async function removerProduto(dados) {

    if (Object.keys(dados).length != 3) {
        return {
            error: "0001",
            message: "Preencha somente os dados necessários!",
            camposNecessarios: ["productId", "quantity", "orderId"]
        };
    }

    if (!dados.productId) {
        return {
            error: "0002",
            message: "Preencha os campos da requisição!",
            camposNecessarios: ["productId"]
        };
    }

    if (typeof dados.productId != "string") {
        return {
            error: "0003",
            message: "O tipo de dado do campo [productId] não corresponde ao esperado!",
            tipoDeDado: typeof dados.productId,
            tipoEsperado: "string"
        };
    }

    if (!dados.orderId) {
        return {
            error: "0002",
            message: "Preencha os campos da requisição!",
            camposNecessarios: ["orderId"]
        };
    }

    if (typeof dados.orderId != "string") {
        return {
            error: "0003",
            message: "O tipo de dado do campo [orderId] não corresponde ao esperado!",
            tipoDeDado: typeof dados.orderId,
            tipoEsperado: "string"
        };
    }

    if (!dados.quantity || !(dados.quantity > 0)) {
        return {
            error: "0002",
            message: "Preencha os campos da requisição!",
            camposNecessarios: ["quantity"]
        };
    }

    if (typeof dados.quantity != "number") {
        return {
            error: "0003",
            message: "O tipo de dado do campo [quantity] não corresponde ao esperado!",
            tipoDeDado: typeof dados.quantity,
            tipoEsperado: "number"
        };
    }


    if (await verificarProduct(dados.productId)) {
        return {
            error: "0005",
            message: "O product não foi encontrado!"
        };
    }

    if (await verificarOrder(dados.orderId)) {
        return {
            error: "0005",
            message: "A order não foi encontrada!"
        };
    }

    if (await verificarStatusOrder(dados.orderId)) {
        return {
            error: "0006",
            message: "A order já está finalizada!"
        };
    }

    const removerProduct = await crud.getWithFilter("OrderProducts", "orderId", "==", dados.orderId);

    for (const produto of removerProduct) {
        if (produto.productId == dados.productId) {
            produto.quantity -= dados.quantity;
            if (produto.quantity <= 0) {
                const produtoRemovido = await crud.remove("OrderProducts", produto.id);
                return produtoRemovido;
            } else {
                const produtoAtualizado = await crud.save("OrderProducts", produto.id, produto);
                return produtoAtualizado;
            }
        }
    }

    return {
        error: "0007",
        message: "O product não existe na order!"
    };
}

async function buscarOrderProducts() {
    const orderProducts = await crud.get("OrderProducts");
    return orderProducts;
}

async function buscarOrderProduct(id) {
    try {
        const orderProduct = await crud.getById("OrderProducts", id);
        return orderProduct;
    } catch (erro) {
        return {
            error: "0005",
            message: "OrderProduct não encontrada!"
        }
    }
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

async function verificarStatusOrder(orderId) {
    let statusDisponivel = false;

    const order = await crud.getById("Orders", orderId);

    if (order.status == "Finalizado") {
        statusDisponivel = true;
        return statusDisponivel;
    }

    return statusDisponivel;
}

module.exports = {
    cadastrarProduto,
    buscarOrderProducts,
    buscarOrderProduct,
    removerProduto
}