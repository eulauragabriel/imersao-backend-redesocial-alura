import 'dotenv/config.js';
import { ObjectId } from "mongodb";
import conectarDB from "../config/dbconfig.js";

// Conecta ao banco de dados MongoDB
const conexao = await conectarDB(process.env.STRING_CONEXAO);

export async function getTodosPosts() {
    // Seleciona o banco de dados 'imersao-backend-alura'
    const db = conexao.db("imersao-backend-alura");
    // Seleciona a coleção 'posts'
    const colecao = db.collection("posts");
    // Busca todos os documentos da coleção e retorna como um array
    return colecao.find().toArray();
}

export async function criarNovoPost(novoPost) {
    // Seleciona o banco de dados 'imersao-backend-alura'
    const db = conexao.db("imersao-backend-alura");
    // Seleciona a coleção 'posts'
    const colecao = db.collection("posts");
    // Insere o novo post na coleção e retorna o post criado
    return colecao.insertOne(novoPost);
}

export async function atualizarNovoPost(id, novoPost) {
    const db = conexao.db("imersao-backend-alura");
    const colecao = db.collection("posts");
    const objectId = ObjectId.createFromHexString(id); 
    return colecao.updateOne({_id: new ObjectId(objectId)}, {$set: novoPost});
}
