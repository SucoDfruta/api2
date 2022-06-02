import { alterarImagem, inserirFilme , listarFilmes, deletarFilme, buscarId, buscarNome}   from "../repository/filmeRepository.js";
import multer from 'multer'
import { Router } from "express";

const server = Router();
const upload = multer({ dest : 'storage/capasFilmes' })

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






server.put('/filme/:id/capa', upload.single('capa'), async (req, resp) => {
    try{
        const { id } = req.params;
        const imagem = req.file.path;
        const resposta = await alterarImagem(imagem, id);
        if(resposta != 1)
            throw new Error('A imagem não pode ser salva');

        resp.status(204).send()
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