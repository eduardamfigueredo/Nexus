const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Conexão com o Banco de Dados (Lendo a variável do Render ou do .env)
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

// === A MUDANÇA ESTÁ AQUI NO FINAL ===
// O Render vai injetar a porta dele na variável process.env.PORT
// Se estiver rodando no seu computador (sem o Render), ele usa a porta 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));