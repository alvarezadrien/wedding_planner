const express = require('express');
const router = express.Router();
const TaskList = require('../models/TaskList');
const auth = require('../middleware/auth');

// Ajouter une nouvelle TaskList (POST)
router.post('/', auth, async (req, res) => {
    const { weddingId, name } = req.body;

    if (!weddingId || !name) {
        return res.status(400).json({ message: 'weddingId et name sont requis' });
    }

    try {
        const taskList = new TaskList({ weddingId, name });
        const savedTaskList = await taskList.save();
        res.status(201).json(savedTaskList);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
});

// Récupérer toutes les TaskLists liées à un weddingId (GET)
router.get('/:weddingId', auth, async (req, res) => {
    try {
        const taskLists = await TaskList.find({ weddingId: req.params.weddingId });
        res.status(200).json(taskLists);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
});

module.exports = router;
