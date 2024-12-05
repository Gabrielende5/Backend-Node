import { Router } from "express";
import PokemonController from "../controllers/PokemonController.js";

const pokemonRouter = Router();

pokemonRouter.get("/",PokemonController.getPokemon);
pokemonRouter.post("/create",PokemonController.createPokemon);
pokemonRouter.delete("/delete/:id",PokemonController.deletePokemon);

export default pokemonRouter;