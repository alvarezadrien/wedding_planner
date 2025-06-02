const Wedding = require("../models/Wedding");

// Récupérer tous les mariages avec les vendeurs peuplés
exports.getAllWeddings = async (req, res) => {
    try {
        const weddings = await Wedding.find().populate("vendors");
        res.status(200).json(weddings);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

// Récupérer un mariage par ID avec les vendeurs peuplés
exports.getWeddingById = async (req, res) => {
    try {
        const wedding = await Wedding.findById(req.params.id).populate("vendors");
        if (!wedding) {
            return res.status(404).json({ message: "Mariage non trouvé" });
        }
        res.status(200).json(wedding);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

// Créer un mariage
exports.createWedding = async (req, res) => {
    try {
        const newWedding = new Wedding(req.body);
        const savedWedding = await newWedding.save();
        res.status(201).json(savedWedding);
    } catch (error) {
        res.status(400).json({ message: "Données invalides", error });
    }
};

// Mettre à jour un mariage
exports.updateWedding = async (req, res) => {
    try {
        const updatedWedding = await Wedding.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedWedding) {
            return res.status(404).json({ message: "Mariage non trouvé" });
        }
        res.status(200).json(updatedWedding);
    } catch (error) {
        res.status(400).json({ message: "Erreur mise à jour", error });
    }
};

// Supprimer un mariage
exports.deleteWedding = async (req, res) => {
    try {
        const deletedWedding = await Wedding.findByIdAndDelete(req.params.id);
        if (!deletedWedding) {
            return res.status(404).json({ message: "Mariage non trouvé" });
        }
        res.status(200).json({ message: "Mariage supprimé" });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

// Ajouter un vendeur à un mariage
exports.addVendorToWedding = async (req, res) => {
    const { weddingId, vendorId } = req.params;

    try {
        const wedding = await Wedding.findById(weddingId);
        if (!wedding) return res.status(404).json({ message: "Mariage non trouvé" });

        if (!wedding.vendors.includes(vendorId)) {
            wedding.vendors.push(vendorId);
            await wedding.save();
        }

        res.status(200).json({ message: "Vendeur ajouté au mariage", wedding });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

exports.getAllWeddings = async (req, res) => {
    try {
        // Ici on populate le champ vendors avec les données complètes des vendeurs
        const weddings = await Wedding.find().populate('vendors');
        res.status(200).json(weddings);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};
const Wedding = require('../models/Wedding');

exports.getAllWeddings = async (req, res) => {
    try {
        const weddings = await Wedding.find().populate('vendors'); // <-- ici populate
        res.status(200).json(weddings);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Idem pour getWeddingById
exports.getWeddingById = async (req, res) => {
    try {
        const wedding = await Wedding.findById(req.params.id).populate('vendors');
        if (!wedding) {
            return res.status(404).json({ message: 'Mariage non trouvé' });
        }
        res.status(200).json(wedding);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

