import express from "express";
import dotenv from "dotenv";
import routes from "./src/routes/postsRoutes.js";
dotenv.config();


// Criando uma instância do servidor Express
const app = express();

app.use(express.static("uploads"))

routes(app)


// Iniciando o servidor na porta 3000
app.listen(3000, () => {
    console.log("Servidor escutando...");
});

