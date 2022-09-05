const crud = require("../../crud");
const nomeTabela = "Users";

async function cadastrarUser(dados) {

    if (Object.keys(dados).length != 3) {
        return {
            error: "0001",
            message: "Preencha somente os campos necessários!",
            camposNecessarios: ["cpf", "name", "surname"]
        };
    }

    if (!dados.cpf) {
        return {
            error: "0002",
            message: "Preencha os campos da requisição!",
            camposNecessarios: ["cpf"]
        };
    }

    if (typeof dados.cpf != "string") {
        return {
            error: "0003",
            message: "O tipo de dado do campo [cpf] não corresponde ao esperado!",
            tipoDeDado: typeof dados.cpf,
            tipoEsperado: "string"
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

    if (!dados.surname) {
        return {
            error: "0002",
            message: "Preencha os campos da requisição!",
            camposNecessarios: ["surname"]
        };
    }

    if (typeof dados.surname != "string") {
        return {
            error: "0003",
            message: "O tipo de dado do campo [surname] não corresponde ao esperado!",
            tipoDeDado: typeof dados.surname,
            tipoEsperado: "string"
        };
    }

    const user = await crud.save(nomeTabela, undefined, dados);
    return user;
}

async function buscarUsers() {
    const users = await crud.get("Users");
    return users;
}

async function buscarUser(id) {
    try {
        const user = await crud.getById("Users", id);
        return user;
    } catch (erro) {
        return {
            error: "0005",
            message: "User não encontrado!"
        }
    }
}

async function editarUser(id, user) {
    
    if (Object.keys(user).length != 3) {
        return {
            error: "0001",
            message: "Preencha somente os campos necessários!",
            camposNecessarios: ["cpf", "name", "surname"]
        };
    }

    const userEditado = await crud.save("Users", id, user);
    return userEditado;
}

async function deletarUser(id) {
    const userDeletado = await crud.remove("Users", id);
    return userDeletado;
}

module.exports = {
    cadastrarUser,
    buscarUsers,
    buscarUser,
    editarUser,
    deletarUser
}