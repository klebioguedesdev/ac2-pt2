const express = require('express');
const professorController = require('../controllers/professorController');

const router = express.Router();

router.get('/', professorController.listarProfessores);
router.get('/:id', professorController.buscarProfessorPorId);
router.get('/:id/turmas', professorController.listarTurmasDeProfessor);
router.put('/:id', professorController.atualizarProfessor);
router.post('/:id/turmas', professorController.adicionarTurma);
router.get('/departamento/:departamento', professorController.listarPorDepartamento);
router.delete('/:id', professorController.removerProfessor);

module.exports = router;