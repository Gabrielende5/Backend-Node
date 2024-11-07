import {pool} from "../config/database.js"

export default class ComidaController{
    static async getAllComida(req,res){
        try {
            const {rows} = await pool.query(`SELECT * FROM "comida";`);
            return res.json(rows)
        } catch (error){
            console.error ("Error fetching comida:",error);
            res.status(500).json({message:"Internal Server Error"});
        }
    }
    static async getComidaById(req,res){
        const {id} = req.params;
        try{
            const {rows} = await pool.query (`SELECT * FROM "comida" WHERE id=$1;`, [id]);
            if (rows.length===0){
                return res.status(404).json({message:"Comida not found"});

            }
            res.json(rows[0]);

        } catch(error){
            console.error("Error fetching comida:",error);
            res.status(500).json({message:"Internal Server Error"});
        }

    }
    static async createComida (req,res){
        const {name, description, nota} = req.body;
        try{
            const{rows} = await pool.query(`INSERT INTO "comida" (name, description, nota) VALUES ($1,$2,$3) RETURNING *; `, [name, description, nota]);
            res.status(201).json(rows[0]);
        } catch (error){
            console.error ("Error creating comida",error);
            res.status(500).json({message:"Internal Server Error"});
        }
    }
    static async updateComida(req,res){
        const{id} = req.params;
        const {name, description, nota} = req.body;
        try{    
            const{rows} = await pool.query(`UPDATE "comida" SET name = $1, description = $2, nota = $3 WHERE id = $4 RETURNING *;`,[name, description, nota, id]);
            if(rows.length===0){
                return res.status(404).json({message:"Comida not found"});
            }
            res.json(rows[0]);
        } catch(error){
            console.error("Error updating comida:", error);
            res.status(500).json({message:"Internal Server Error"});
        }
    }
    static async deleteComida(req, res){
        const {id} = req.params;
        try{
            const {rowCount} = await pool.query(`DELETE FROM "comida" WHERE id=$1`,[id]);
            if(rowCount===0){
                return res.status(404).json({message:"Comida not found"});
            }
            res.json({message:"comida deleted successfully"});
        }catch (error){
            console.error("Error deleting comida:", error);
            res.status(500).json({message:"Internal Server Error"});
        }
    }
}