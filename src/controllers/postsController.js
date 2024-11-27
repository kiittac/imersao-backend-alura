import { getTodosOsPosts, criarPost, atualizarPost } from "../models/postsModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";

// Função assíncrona para listar todos os posts
export async function listarPosts(req, res) {
  // Chama a função do modelo para obter todos os posts do banco de dados
  const posts = await getTodosOsPosts();
  // Envia uma resposta HTTP com status 200 (OK) e os posts no formato JSON
  res.status(200).json(posts);
}

// Função assíncrona para criar um novo post
export async function postarNovoPost(req, res) {
  // Obtém os dados do novo post a partir do corpo da requisição
  const novoPost = req.body;
  try {
    // Chama a função do modelo para criar o novo post
    const postCriado = await criarPost(novoPost);

    // Envia uma resposta HTTP com status 200 (OK) e o post criado
    res.status(200).json(postCriado);
  } catch (erro) {
    // Captura qualquer erro que possa ocorrer durante a criação do post
    console.error(erro.message);
    res.status(500).json({ "Erro": "Falha na requisição." });
  }
}

// Função assíncrona para fazer upload de uma imagem e criar um novo post
export async function uploadImagem(req, res) {
  // Cria um objeto para representar o novo post com a imagem
  const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname,
    alt: ""
  };
  try {
    // Cria o novo post no banco de dados
    const postCriado = await criarPost(novoPost);

    // Gera um novo nome para a imagem com base no ID do post
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;

    // Move a imagem da pasta temporária para a pasta de destino
    // **Observação:** Considerar usar fs.promises.rename para uma abordagem mais assíncrona e segura
    fs.renameSync(req.file.path, imagemAtualizada);

    // Envia uma resposta HTTP com status 200 (OK) e o post criado
    res.status(200).json(postCriado);
  } catch (error) {
    // Captura qualquer erro que possa ocorrer durante o processo
    console.error(erro.message);
    res.status(500).json({ "Erro": "Falha na requisição" });
  }
}

export async function atualizarNovoPost(req, res) {
    const postId = req.params.id;
    const urlImagem = `http://localhost:3000/${postId}.png`
    try {
        const imgBuffer = fs.readFileSync(`uploads/${postId}.png`)
        const decricao = await gerarDescricaoComGemini(imgBuffer)

        const post = {
            imgUrl: urlImagem,
            descricao: decricao,
            alt: req.body.alt
          }

      // Chama a função do modelo para atualizar o post
      const postCriado = await atualizarPost(postId, post);
      // Envia uma resposta HTTP com status 200 (OK) e o post atualizado
      res.status(200).json(postCriado);
    } catch (erro) {
      // Captura qualquer erro que possa ocorrer durante a atualização do post
      console.error(erro.message);
      res.status(500).json({ "Erro": "Falha na requisição." });
    }
  }