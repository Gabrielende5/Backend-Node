// Index do Node
import express from "express";
import {fileURLToPath} from "url";
import {dirname} from "path";
import path from "path";
import testRouter from "./routes/TestRoute.js";
import productrouter from "./routes/ProductRouter.js";
import { connectDatabase } from "./config/database.js";
import { config } from "dotenv";
config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 4444;

// Permite o backend usar json
app.use(express.json());
    // Json é a característica, tipo nome Gabriel, idade 18 anos e etc

// Coloca a rota em uso
app.use("/exemplo", testRouter);
app.use("/products", productrouter);

app.use(express.static(path.join(__dirname, "public"))); // Diz que o "/" é a pagina inicial + falando que é public, ou seja, o server.js pode acessar tudo dentro desta pasta
 
app.listen(port, () =>{
    console.log(`Servidor rodando na porta ${port}`);
})

connectDatabase();