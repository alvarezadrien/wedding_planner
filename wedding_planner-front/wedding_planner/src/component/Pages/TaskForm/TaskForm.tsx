import { useState } from "react";
import { TextField, Button, Box, Alert } from "@mui/material";
import { createTaskList } from "../services/api"; 
// import styles from "./TaskForm.css";

interface TaskFormProps {
  weddingId?: number;
  onTaskListAdded?: () => void;
}

const TaskForm = ({ weddingId, onTaskListAdded }: TaskFormProps) => {
  const [title, setTitle] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTaskList({ title, weddingId });
      setSuccess(true);
      setTitle("");
      onTaskListAdded?.();
    } catch (err) {
      setError("Erreur lors de la création de la tâche.");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className={styles.form}>
      <TextField
        label="Titre de la tâche"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        required
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Ajouter
      </Button>
      {success && <Alert severity="success">Tâche ajoutée avec succès !</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
    </Box>
  );
};

export default TaskForm;
