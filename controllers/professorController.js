let professores = require('../professores');

const listarProfessores = (req, res) => {
    res.json(professores);
};

const buscarProfessorPorId = (req, res) => {
    const { id } = req.params;
    const professor = professores.find(p => p.id === id);

    if (!professor) {
        return res.status(404).json({ mensagem: "Professor não encontrado" });
    }
    res.json(professor);
};

const listarTurmasDeProfessor = (req, res) => {
    const { id } = req.params;
    const professor = professores.find(p => p.id === id);

    if (!professor) {
        return res.status(404).json({ mensagem: "Professor não encontrado" });
    }

    res.json(professor.turmas);
};

const atualizarProfessor = (req, res) => {
    const { id } = req.params;
    const { nome, idade, departamento } = req.body;
    const index = professores.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ mensagem: "Id não existente" });
    }

    // Atualiza os campos se eles existirem no body
    if (nome) professores[index].nome = nome;
    if (idade) professores[index].idade = idade;
    if (departamento) professores[index].departamento = departamento;

    res.json(professores[index]);
};

const adicionarTurma = (req, res) => {
    const { id } = req.params;
    const { codigo, disciplina, alunos } = req.body;
    const professor = professores.find(p => p.id === id);

    if (!professor) {
        return res.status(404).json({ mensagem: "Professor não encontrado" });
    }
    
    if (!codigo || !disciplina || !alunos || !Array.isArray(alunos)) {
        return res.status(400).json({ mensagem: "Dados da turma incompletos (código, disciplina e lista de alunos são obrigatórios)." });
    }

    const novaTurma = { codigo, disciplina, alunos };
    professor.turmas.push(novaTurma);

    res.status(201).json(novaTurma);
};

const listarPorDepartamento = (req, res) => {
    const { departamento } = req.params;
    const professoresDoDepto = professores.filter(p => p.departamento.toLowerCase() === departamento.toLowerCase());

    if (professoresDoDepto.length === 0) {
    return res.status(404).json({ mensagem: `Nenhum professor encontrado no departamento de ${departamento}` });
}


    res.json(professoresDoDepto);
};

const removerProfessor = (req, res) => {
    const { id } = req.params;
    const index = professores.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ mensagem: "Id não existente" });
    }

    professores.splice(index, 1);
    res.status(204).send(); // 204 No Content para DELETE bem-sucedido
};

module.exports = {
    listarProfessores,
    buscarProfessorPorId,
    listarTurmasDeProfessor,
    atualizarProfessor,
    adicionarTurma,
    listarPorDepartamento,
    removerProfessor
};