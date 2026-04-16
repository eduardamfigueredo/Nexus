const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Conexão com o Banco de Dados (Link virá do .env)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Conectado ao MongoDB!"))
    .catch(err => console.error("❌ Erro ao conectar:", err));

// Definindo como um Usuário será salvo no banco
const UserSchema = new mongoose.Schema({
    nome: String,
    email: { type: String, unique: true },
    senha: String
});
const User = mongoose.model('User', UserSchema);

// ROTA DE REGISTRO
app.post('/registrar', async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        const novoUsuario = new User({ nome, email, senha });
        await novoUsuario.save();
        res.status(201).send({ mensagem: "Usuário criado com sucesso!", nome: novoUsuario.nome });
    } catch (error) {
        res.status(400).send({ erro: "E-mail já cadastrado!" });
    }
});

// ROTA DE LOGIN
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    const usuario = await User.findOne({ email, senha });
    if (usuario) {
        res.status(200).send({ nome: usuario.nome });
    } else {
        res.status(401).send({ erro: "E-mail ou senha incorretos." });
    }
});

app.listen(3000, () => console.log("🚀 Servidor rodando em http://localhost:3000"));