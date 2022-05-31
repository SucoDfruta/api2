import { inserirFilme }   from "../repository/filmeRepository.js";

import { Router } from "express";

const server = Router();

server.post('/filme', async (req, resp) => {

    try{
        const filme = req.body
        const  resposta = await inserirFilme(filme)
        resp.send(resposta)
    }catch(err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

export default server;