export default class TestController {
    // Static por conta do método que se utiliza no "routes" ("TestController.PrimeiraFuncao")
    // "Async" faz com que várias funções ocorram ao mesmo tempo
    static async PrimeiraFuncao(req,res){
        return res.json({message:"este é o controller funcionando"})
    }
    static async get (req,res){
        return res.json ({message:"Você veio pegar alguma coisa?"})  
    }
    static async post (req,res){
        const {name} = req.body;
        return res.json ({message:`Oi você veio adicionar alguma coisa? --- ${name}`})  
    }
    static async put (req,res){
        const {dados} = req.body;
        return res.json ({message:`você veio editar dados? --- ${dados}`})  
    }
    static async delete (req,res){
        const {id} = req.params;
        return res.json ({message:`você quer deletar esse id? --- ${id}`})  
    }
    
}