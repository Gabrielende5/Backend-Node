import mongoose from "mongoose";
const userShema = new mongoose.Schema({
    name:String,
    idade:Number,
    email:String,
    password:String,
});
export const User = mongoose.model("user", userShema); // O "user" seria uma tabela com tudo que tem na constante "productShema", ou seja,  "name", "description" e etc