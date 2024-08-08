// Index do Node
import express from "express";
import {fileURLToPath} from "url";
import {dirname} from "path";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 4444;

app.use(express.static(path.join(__dirname, "public"))); // Diz que o "/" é a pagina inicial + falando que é public, ou seja, o server.js pode acessar tudo dentro desta pasta
 
app.listen(port, () =>{
    console.log(`Servidor rodando na porta ${port}`);
})