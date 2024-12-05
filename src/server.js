// Index do Node
import { config } from "dotenv";
import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import cors from "cors"
import testRouter from "./routes/TestRoute.js";
import { connectDatabase } from "./config/database.js";
import productrouter from "./routes/ProductRouter.js"
import router from "./routes/UserRouter.js";
import comidaRouter from "./routes/ComidaRouter.js";
import pokemonRouter from "./routes/PokemonRouter.js";
config();

// Procurando arquivos
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Criando um servidor express
const app = express();

// Permite o backend usar json
app.use(express.json());
    // Json é a característica, tipo nome Gabriel, idade 18 anos e etc

// Use o middleware cors
app.use(cors());

// Definindo a porta
const port = process.env.PORT || 4444;

// Middleware para servir arquivos estáticos
app.use(express.static(join(__dirname, "public"))); // Diz que o "/" é a pagina inicial + falando que é public, ou seja, o server.js pode acessar tudo dentro desta pasta

// Coloca a rota em uso
app.use("/exemplo", testRouter);
app.use("/products", productrouter);
app.use("/auth",router);

app.use("/comida",comidaRouter);
app.use("/pokemons",pokemonRouter);

// Função principal para iniciar o servidor
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

connectDatabase();
