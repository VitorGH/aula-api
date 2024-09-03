const express = require('express');
const swaggerUI = require('swagger-ui-express')
const app = express();
const port = 3000;

app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(require('./swagger.json')))

let alunos = [
    {id: 1, nome: 'fulano'},
    {id: 2, nome: 'ciclano'}
];

app.get('/api/alunos', (req, res) => {
    res.json(alunos);
});

app.get('/api/alunos/getByName/:name', (req, res) => {
    const {name} = req.params;
    const index = alunos.findIndex(a => a.nome === name);
    
    if (index < 1){
        res.json(alunos[index])
    } else {
        res.status(404).json({message: 'Não encontrado'})
    }
});

app.listen(port, () => {
    console.log('Servidor rodando na porta 3000');
});

app.put('/api/alunos/:id', (req, res) => {
    const {id} = req.params;
    const index = alunos.findIndex(a => a.id === id);

    if(index > -1){
        alunos[index] = {id, ...req.body}
        res.json(alunos[index])
    } else {
        res.status(404).json({message: 'Não encontrado'})
    }
})

app.post('/api/alunos', (req, res) => {
    const novoId = alunos.length + 1;
    const aluno = {id: novoId, ...req.body};

    alunos.push(aluno);
    res.status(201).json(aluno);
})