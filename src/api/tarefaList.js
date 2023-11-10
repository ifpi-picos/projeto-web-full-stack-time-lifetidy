const express = require('express')
const router = express.Router()
const { tarefa_list }= require('../models')
const TarefaListService = require('../services/tarefaList')

const tarefaListService = new TarefaListService(tarefa_list)

router.post('/adicionarLista' , async (req, res) =>{
    const {id_usuario, nome_lista, data_inicio, data_fim, hora_inicio, hora_fim} = req.body
    try{
        await tarefaListService.adicinarLista({
        id_usuario, nome_lista, data_inicio, data_fim, hora_inicio, hora_fim
        })
        res.status(200).json('Lista adicionada com sucesso')
    }catch(erro){
        res.status(400).json('Erro ao adicionar lista')
    }
})

router.get('/buscarLista', async(req, res ) =>{
    const {id} = req.body
    try{
        const listas = await tarefaListService.buscarLista(id)
        res.status(200).json(listas)
    }catch(erro){
        res.status(400).json('Erro ao buscar tarefas')
    }
})

module.exports = router