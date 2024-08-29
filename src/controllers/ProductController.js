import {Product} from "../models/product.js"

export default class ProductController {
    static async getAllProducts(req,res){
        const products = await Product.find();
            // O "find" procura dentro do banco de dados os produtos, esse banco sendo não relacional 
                
        return res.json({products});
    }
    static async createdProduct (req, res){
        const {name, description, quantity} = req.body; //Requisição
        const data = new Product();
        data.name = name;
        data.description = description;
        data.quantity = quantity;
        const createdProduct = await Product.create(data);
        return res.json({message:"Criado com sucesso", data: createdProduct});
    }
    static async editProduct(req,res){
        const{ _id, name, quantity, description} = req.body; // Requisição
        const product = await Product.findById(_id); // Procura o produto e coloca no "product"
        if(!product){
            return res.status(404).json({message:"Produto não encontrado"}); 

        }
        product.name = name;
        product.quantity = quantity;
        product.description = description;
        await Product.updateOne({ _id }, {name, quantity, description});
        const updatedProduct = await Product.findById(_id); // Procura o produto de novo e mostra ele editado agora
        return res.json ({message: "Atualizado com sucesso", data: updatedProduct});
    }
    static async deleteProduct(req, res){
        const {id} = req.params;
        await Product.findOneAndDelete(id);
        return res.json({message:"Deletado com sucesso"});
    }
}