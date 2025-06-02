import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

function TaskList({ weddingId }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await axios.get(`${API_URL}/tasks/${weddingId}`, {
          headers,
        });
        setTasks(response.data);
      } catch (err) {
        setError("Erreur lors du chargement des tâches.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (weddingId) {
      fetchTasks();
    }
  }, [weddingId]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Liste des tâches</h2>
      <ul>
        {tasks.length === 0 ? (
          <li>Aucune tâche trouvée.</li>
        ) : (
          tasks.map((task) => <li key={task._id}>{task.name}</li>)
        )}
      </ul>
    </div>
  );
}

export default TaskList;
