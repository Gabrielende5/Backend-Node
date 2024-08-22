import mongoose from "mongoose";

export const connectDatabase = () => {
    const dbUrl = process.env.dbUrl;
    mongoose.connect(dbUrl);
    const connection = mongoose.connection;

    connection.on("error", () =>{
        console.log("Erro ao conectar com o omgoDB");
    })
    connection.on("open", () => {
        console.log("Conectado com o mongoDB")
    })
    // connection.on("close", () => {
    //     console.log("Tchau")
    // })
}