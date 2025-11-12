const express = require('express');
const professorRoutes = require('./routes/professorRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/professores', professorRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
