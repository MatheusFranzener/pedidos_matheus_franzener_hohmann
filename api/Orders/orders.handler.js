const crud = require("../../crud");
const nomeTabela = "Orders";

async function cadastrarOrder(dados = { userId: "", status: "" }) {

    if (!dados.userId) {
        return {
            error: "0001",
            message: "Preencha os campos da requisição!",
            camposNecessarios: ["userId"]
        };
    }

    if (await verificarUser(dados.userId)) {
        return {
            error: "0003",
            message: "Not found!",
            situation: "O user não está cadastrado!"
        };
    }

    if(await verificarUserOrder(dados.userId)) {
        return {
            error: "0004",
            message: "User já possui uma order!"
        };
    }

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

async function verificarUserOrder(idUser){
    let naoCadastrado = false;
    const listaOrders = await crud.get("Orders");

    for(const id of listaOrders){
        if(id == idUser && listaOrders.status == "Aberto"){
            naoCadastrado = true
            return naoCadastrado;
        }
    }

    return naoCadastrado;
}

async function buscarOrders() {
    const orders = await crud.get("Orders");
    return orders;
}

async function buscarOrder(id) {
    const order = await crud.getById("Orders", id);
    return order;
}

async function editarOrder(id, user) {
    const orderEditada = await crud.save("Orders", id, user);
    return orderEditada;
}

async function deletarOrder(id) {
    const orderDeletada = await crud.remove("Orders", id);
    return orderDeletada;
}

module.exports = {
    cadastrarOrder,
    buscarOrders,
    buscarOrder,
    editarOrder,
    deletarOrder
}