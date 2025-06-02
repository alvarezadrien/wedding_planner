import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function Home() {
  const [weddings, setWeddings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeddingsWithTasks = async () => {
      try {
        // 1. Récupérer la liste des mariages
        const resWeddings = await axios.get(`${API_URL}/weddings`);
        const weddingsData = resWeddings.data;

        // 2. Pour chaque mariage, récupérer ses tâches
        const weddingsWithTasks = await Promise.all(
          weddingsData.map(async (wedding) => {
            const resTasks = await axios.get(`${API_URL}/tasks/${wedding._id}`);
            return {
              ...wedding,
              tasks: resTasks.data || [],
            };
          })
        );

        setWeddings(weddingsWithTasks);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement des mariages.");
        setLoading(false);
      }
    };

    fetchWeddingsWithTasks();
  }, []);

  if (loading)
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
      </Container>
    );

  if (error)
    return (
      <Container sx={{ mt: 5 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Liste des mariages et leurs tâches
      </Typography>
      {weddings.map((wedding) => (
        <Box
          key={wedding._id}
          sx={{ mb: 4, border: "1px solid #ccc", p: 2, borderRadius: 2 }}
        >
          <Typography variant="h5">
            {wedding.name || "Mariage sans nom"}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" mb={1}>
            Date:{" "}
            {wedding.date
              ? new Date(wedding.date).toLocaleDateString()
              : "Non spécifiée"}
          </Typography>

          {!wedding.tasks || wedding.tasks.length === 0 ? (
            <Typography color="text.secondary">
              Pas encore de tâches pour ce mariage.
            </Typography>
          ) : (
            <List>
              {wedding.tasks.map((task) => (
                <ListItem key={task._id} divider>
                  <ListItemText
                    primary={task.name}
                    secondary={task.completed ? "Terminé" : "En cours"}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      ))}
    </Container>
  );
}

export default Home;
