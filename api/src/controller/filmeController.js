import { alterarImagem, inserirFilme , listarFilmes, deletarFilme, buscarId, buscarNome}   from "../repository/filmeRepository.js";

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

server.put('/filme/:id/imagem', async (req, resp) => {
    try{
        const { id } = req.params;
        const resp = await alterarImagem()
    }catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.get('/filme', async (req, resp) => {
    try{
        const resposta= await listarFilmes()
        resp.send(resposta) 
    }catch{
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.delete('/filme/:id', async (req, resp) => {
    try{
        const { id } = req.params
        const resposta = await deletarFilme(id)
        resp.send(resposta)
    }catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.get('/filme/busca', async(req, resp) => {
    try{
        const { nome } = req.query
        const resposta = await buscarNome(nome);
        if(!resposta)
        resp.status(404).send()
        else
        resp.send(resposta)
    }catch(err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.get('/filme/:id', async(req, resp) => {
    try{
        const id  = Number(req.params.id)
        const resposta = await buscarId(id)
        if(!resposta)
        throw new Error('Filme não encontrado')
        resp.send(resposta)
    }catch(err) {

        console.log(err);

        resp.status(400).send({
            erro: err.message
        })
    }
})


export default server;