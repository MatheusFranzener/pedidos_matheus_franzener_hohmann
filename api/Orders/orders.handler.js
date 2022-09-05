const crud = require("../../crud");
const nomeTabela = "Orders";

async function cadastrarOrder(dados) {

    if (Object.keys(dados).length != 1) {
        return {
            error: "0001",
            message: "Preencha somente os campos necessários!",
            camposNecessarios: ["userId"]
        }
    }

    if (!dados.userId) {
        return {
            error: "0002",
            message: "Preencha os campos da requisição!",
            camposNecessarios: ["userId"]
        };
    }

    if (typeof dados.userId != "string") {
        return {
            error: "0003",
            message: "O tipo de dado do campo [userId] não corresponde ao esperado!",
            tipoDeDado: typeof dados.userId,
            tipoEsperado: "string"
        };
    }

    if (await verificarUser(dados.userId)) {
        return {
            error: "0005",
            message: "User não encontrado!"
        };
    }

    if (await verificarUserOrder(dados.userId)) {
        return {
            error: "0004",
            message: "User já possui uma order!"
        };
    }

    const pedidosUser = await crud.getWithFilter("Orders", "userId", "==", dados.userId);

    dados.number = pedidosUser.length + 1;
    dados.status = "Aberto";

    const order = await crud.save(nomeTabela, undefined, dados);
    return order;
}

async function verificarUser(idUser) {
    let naoCadastrado = false;

    try {
        await crud.getById("Users", idUser);
    } catch (erro) {
        naoCadastrado = true;
        return naoCadastrado;
    }

    return naoCadastrado;
}

async function verificarUserOrder(idUser) {
    let userOrder = false;

    const pedidos = await crud.getWithFilter("Orders", "userId", "==", idUser);

    for (const pedido of pedidos) {
        if (pedido.status == "Aberto") {
            userOrder = true;
            return userOrder;
        }
    }

    return userOrder;
}

async function buscarOrders() {
    const orders = await crud.get("Orders");
    return orders;
}

async function buscarOrder(id) {
    try {
        const order = await crud.getById("Orders", id);
        return order;
    } catch (erro) {
        return {
            error: "0005",
            message: "Order não encontrada!"
        }
    }
}

async function finalizarOrder(id) {
    try {
        const order = await crud.getById("Orders", id);
        order.status = "Finalizado";

        const orderFinalizada = await crud.save("Orders", id, order);
        return orderFinalizada;
    } catch (erro) {
        return {
            error: "0005",
            message: "Order não encontrada!"
        }
    }
}

async function deletarOrder(id) {
    const orderDeletada = await crud.remove("Orders", id);
    return orderDeletada;
}

module.exports = {
    cadastrarOrder,
    buscarOrders,
    buscarOrder,
    finalizarOrder,
    deletarOrder
}