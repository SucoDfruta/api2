import { Router } from "express";
import { login } from "../repository/usuarioRepository.js";
const server = Router();
server.post('/usuario/login' , async (req, resp) => {
    try {
        const {email, senha} = req.body;
        const x = await login(email,senha)
        if(!x) {
            throw new Error('crendenciais tudo errada ein doidão')
        }
        resp.send(x)
        }
     catch(err){
        resp.status(400).send({
            erro: 'tá errado ai paizão'
    })
    }
})
export default server;