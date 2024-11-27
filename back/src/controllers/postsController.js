import gerarDescricaoComGemini from '../services/geminiService.js';
import { getTodosPosts, criarNovoPost, atualizarNovoPost } from '../models/postsModel.js';
import fs from 'fs';

export async function listarPosts(req, res) {
    // Busca todos os posts usando a função assíncrona
    const posts = await getTodosPosts();
    // Envia os posts como resposta JSON com status 200 (OK)
    res.status(200).json(posts);
}

export async function criarPost(req, res) {
    // Pega o novo post do corpo da requisição
    const novoPost = req.body;
    // Valida se o novo post tem os campos necessários
    try {
        const postCriado = await criarNovoPost(novoPost);
        res.status(200).json(postCriado);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({"erro": "falha na requisição"});
    }
}

export async function uploadImagem(req, res) {
    // Cria um novo post com a imagem enviada
    const novoPost = {
        descricao: " ",
        imgUrl: req.file.originalname,
        alt: ""
    }
    try {
        // Cria o novo post no banco de dados
        const postCriado = await criarNovoPost(novoPost);
        // Renomeia a imagem para o ID do post
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        // Move a imagem para a pasta correta
        fs.renameSync(req.file.path, imagemAtualizada);
        // Atualiza o post com o caminho da imagem
        res.status(200).json(postCriado);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({"erro": "falha na requisição"});
    }
}

export async function atualizarPost(req, res) {
    // Pega o ID do post a ser atualizado
    const id = req.params.id;
    // Cria o URL da imagem com o ID
    const urlImagem = `http://localhost:3000/${id}.png`;
    // Valida se o novo post tem os campos necessários
    try {
        const imageBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imageBuffer);
        const post = {
            descricao: descricao,
            imgUrl: urlImagem,
            alt: req.body.alt
        };
        const postCriado = await atualizarNovoPost(id, post);
        res.status(200).json(postCriado);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({"erro": "falha na requisição"});
    }
}