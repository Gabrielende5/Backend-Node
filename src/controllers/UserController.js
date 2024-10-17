import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export default class UserController {
    static async loginUser(req, res) {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Senha incorreta" });
            }
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });

            return res.status(200).json({ token });
        } catch (error) { // Quando cai o servidor:
            console.error("Erro ao fazer login:", error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }
    static async RegisterUser(req, res) {
        const { name, idade, email, password, confirmPassword } = req.body;

        if (confirmPassword !== password) { // "!==" pois está verificando se é diferente no valor e no tipo (string, float), se fosse "!=" verificaria apenas no valor, isso é usado em todo o JavaScript
            return res.status(400).json({ message: "As senhas são diferentes!" });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                name,
                idade,
                email,
                password: hashedPassword,
            });

            const createdUser = await newUser.save();

            return res.status(200).json({
                message: "Usuário criado com sucesso!",
                data: createdUser,
            });
        } catch (error) {
            console.error("Erro ao registrar usuário:", error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }
    static async authenticateToken(req, res, next) {
        const authHeader = req.headers["authorization"];
        if (authHeader == null) {
            return res
                .status(401)
                .json({ message: "Sem token não é permitido criar coisas sem token!" });
        }

        // Verify the token
        jwt.verify(authHeader, process.env.JWT_SECRET, (err, user) => { // verifica se a pessoa está logada (tem um token)
            if (err) {
                return res.status(403).json({ message: "Token inválido" });
            }
            req.user = user;
            next();
        });
    }
}