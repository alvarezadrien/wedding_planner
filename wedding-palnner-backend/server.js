require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());               // Pour autoriser le front à accéder à l'API
app.use(express.json());       // Pour parser le JSON dans le corps des requêtes

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connecté à MongoDB'))
    .catch(err => console.error('Erreur MongoDB', err));

// Importer les routes
const weddingRoutes = require('./routes/weddingRoutes');
const taskRoutes = require('./routes/taskRoutes');  // Si tu as ce fichier aussi

// Utiliser les routes
app.use('/api/weddings', weddingRoutes);
app.use('/api/tasks', taskRoutes);

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
