const express = require('express');
const router = express.Router();
const Wedding = require('../models/Wedding');

// GET Afficher tous les mariages
router.get('/', async (req, res) => {
    try {
        const weddings = await Wedding.find();
        res.json(weddings);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// GET afficher un mariage par ID
router.get('/:id', async (req, res) => {
    try {
        const wedding = await Wedding.findById(req.params.id);
        if (!wedding) return res.status(404).json({ message: 'Mariage non trouvé' });
        res.json(wedding);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// POST Poster un nouveau mariage
router.post('/', async (req, res) => {
    try {
        const newWedding = new Wedding(req.body);
        const savedWedding = await newWedding.save();
        res.status(201).json(savedWedding);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// PUT Mettre à jour un mariage
router.put('/:id', async (req, res) => {
    try {
        const updatedWedding = await Wedding.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedWedding) return res.status(404).json({ message: 'Mariage non trouvé' });
        res.json(updatedWedding);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// DELETE Supprimer un mariage
router.delete('/:id', async (req, res) => {
    try {
        await Wedding.findByIdAndDelete(req.params.id);
        res.json({ message: 'Mariage supprimé' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

module.exports = router;
