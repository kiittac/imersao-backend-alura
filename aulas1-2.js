// Aula 01: Desvendando APIs e Servidores
import express from "express";

// Criando uma instância do servidor Express
const app = express();

// Iniciando o servidor na porta 3000 e exibindo uma mensagem no console
app.listen(3000, () => {
    console.log("Servidor escutando...");
});

// Definindo uma rota GET para a raiz da API
app.get("/api", (req, res) => {
    // Envia uma resposta com status 200 (OK) e a mensagem "boas vindas"
    res.status(200).send("boas vindas");
});


// Aula 02: Criando e Estruturando sua Primeira API com GET e Banco de Dados npm run dev
// Array de posts (simulado, seria substituído por dados do banco)
const posts = [
    { id: 1, descricao: "Uma foto teste", imagem: "https://placecats.com/millie/300/150" },
    { id: 2, descricao: "Gato fazendo yoga", imagem: "https://placecats.com/millie/300/150" },
    { id: 3, descricao: "Gato fazendo panqueca", imagem: "https://placecats.com/millie/300/150"},
];

// Criando uma instância do servidor Express
const app = express();
// Habilitando o parse de JSON no corpo das requisições
app.use(express.json());

// Iniciando o servidor na porta 3000
app.listen(3000, () => {
    console.log("Servidor escutando...");
});

// Rota para obter todos os posts
app.get("/posts", (req, res) => {
    // Envia uma resposta com status 200 e os posts em formato JSON
    res.status(200).json(posts);
});

// Função para buscar um post por ID no array simulado
function buscarPostPorID(id) {
    return posts.findIndex((post) => {
        return post.id === Number(id)
    })
}

// Rota para obter um post específico por ID
app.get("/posts/:id", (req, res) => {
    const index = buscarPostPorID(req.params.id)
    res.status(200).json(posts[index]);
});
