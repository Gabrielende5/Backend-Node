import axios from 'axios';

export default class PokemonController{
    
    static async getPokemon(req,res){
        try{
            const pokemons = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0");
            return res.status(200).json(pokemons.data);
        } catch(error){
            return res.status(500).json({message:"Internal Server Error"});
        }

    }

    static async createPokemon(req,res){
        try{

        } catch{
            console.error("Error creating Pokemon",error);
            res.status(500).json({message:"Internal Server Error"});
        }
    }

    static async deletePokemon(req,res){
        try{

        } catch (error){
            console.error("Error deleting Pokemon", error);
            res.status(500).json({message:"Internal Server Error"});
        }
    }
}