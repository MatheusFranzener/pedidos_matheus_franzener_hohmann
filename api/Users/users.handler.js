const crud = require("../../crud");
const nomeTabela = "Users";

async function cadastrarUser(dados = { cpf: "", name: "", surname: "" }) {
    if (!dados.cpf) {
        return {
            error: "0001",
            message: "É necessário preencher o cpf!",
            camposNecessarios: ["cpf"]
        };
    }
    if (!dados.name) {
        return {
            error: "0001",
            message: "É necessário preencher o name!",
            camposNecessarios: ["name"]
        };
    }
    if (!dados.surname) {
        return {
            error: "0001",
            message: "É necessário preencher o surname!",
            camposNecessarios: ["surname"]
        };
    }
    if (typeof dados.cpf != "string") {
        return {
            error: "0002",
            message: "O tipo de dado passado não corresponde ao esperado!",
            tipoDeDado: typeof dados.cpf,
            tipoEsperado: "string"
        };
    }
    if (typeof dados.name != "string") {
        return {
            error: "0002",
            message: "O tipo de dado passado não corresponde ao esperado!",
            tipoDeDado: typeof dados.name,
            tipoEsperado: "string"
        };
    }
    if (typeof dados.surname != "string") {
        return {
            error: "0002",
            message: "O tipo de dado passado não corresponde ao esperado!",
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
    const user = await crud.getById("Users", id);
    return user;
}

async function editarUser(id, user) {
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