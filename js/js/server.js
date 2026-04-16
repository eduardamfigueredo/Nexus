const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Permite frontend acessar
const cors = require('cors');
app.use(cors());

// ================= PASTA UPLOAD =================
const pastaUploads = path.join(__dirname, 'uploads');
if (!fs.existsSync(pastaUploads)) {
    fs.mkdirSync(pastaUploads);
}

// ================= CONFIG MULTER =================
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const nomeUnico = Date.now() + '-' + Math.random().toString(36).substring(2);
        cb(null, nomeUnico + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// ================= ROTAS =================

// Upload
app.post('/upload', upload.single('arquivo'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ erro: "Nenhum arquivo enviado" });
    }

    res.json({
        msg: "Upload feito!",
        arquivo: req.file.filename
    });
});

// Servir arquivos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ================= START =================
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});