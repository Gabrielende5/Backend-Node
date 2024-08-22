import mongoose from "mongoose";
const productShema = new mongoose.Schema({
    name:String,
    description:String,
    quantity: Number,
    createAt: {type: Date, default: Date.now}
});
export const Product = mongoose.model("user", productShema); // O "user" seria uma tabela com tudo que tem na constante "productShema", ou seja,  "name", "description" e etc