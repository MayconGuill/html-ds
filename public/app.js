const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cimatec',
    database: 'aula2910'
});

connection.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco', err.message);
        return;
    }

    console.log('Conexão estabelecida');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/busca', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'busca.html'));
});

app.get('/api/buscar', (req, res) => {
    const {nome} = req.query;
    if (!nome) return res.json([]);

    const sql = 'SELECT * FROM usuarios WHERE nome LIKE ?';
    connection.query(sql, [`%${nome}%`], (err, results) => {
        if (err) {
            return res.status(500).json({error: 'Erro ao buscar no banco'});
        }
        res.json(results);
    });
});

app.post('/salvar', (req, res) => {
    const {nome, descricao, preco} = req.body;
    const sql = 'INSERT INTO usuarios (nome, descricao, preco) VALUES (?, ?, ?)';
    connection.query(sql, [nome, descricao, preco], (err) => {
        if (err) {
            console.error("Erro ao inserir na tabela", err.message);
            return res.send("Erro ao salvar no banco");
        }

        res.send("Dados salvas no banco");
    });
});

app.listen(3030, () => console.log('Servidor rodando em http://localhost:3030'));