import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';
import { useUser } from '../../UserContext';
import {
  Dialog,
  DialogContent,
  TextField,
  Button,
  IconButton,
  Typography,
  Grid,
  Box
} from '@mui/material';
import { Close, Save, Cancel } from '@mui/icons-material';

export const ProfileEditForm = ({ usuario, onClose }) => {
  const navigate = useNavigate();
  const { actualizarUsuario } = useUser();

  if (!usuario?.id) {
    toast.error("Error: Usuario no válido");
    navigate('/profile');
    return null;
  }

  const [formData, setFormData] = useState({
    name: usuario.name || '',
    lastname: usuario.lastname || '',
    email: usuario.email || '',
    username: usuario.username || '',
    bio: usuario.bio || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userProfileDTO = {
      name: formData.name,
      lastname: formData.lastname,
      email: formData.email,
      username: formData.username,
      bio: formData.bio,
    };

    const token = localStorage.getItem('authToken');
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await axios.put(
        `http://localhost:8080/ledrian-0.0.1-SNAPSHOT/api/users/edit/${usuario.id}`,
        userProfileDTO,
        { headers }
      );

      actualizarUsuario({ ...usuario, ...userProfileDTO });

      toast.success("¡Perfil actualizado con éxito!", {
        position: "top-right",
        autoClose: 3000,
      });

      onClose();

    } catch (error) {
      toast.error(`Error al actualizar el perfil: ${error.response?.data?.message || error.message}`, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          bgcolor: '#1F2937',
          borderRadius: '12px',
          boxShadow: '0px 8px 24px rgba(0,0,0,0.2)'
        }
      }}
    >
      <Box sx={{ p: 3, position: 'relative' }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            color: 'gray.400'
          }}
        >
          <Close />
        </IconButton>

        <Typography variant="h5" sx={{ color: 'white', mb: 3, fontWeight: 'bold' }}>
          Editar Perfil
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nombre"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="filled"
                InputProps={{
                  sx: {
                    color: 'white',
                    bgcolor: '#374151',
                    borderRadius: '8px',
                    '&:hover': { bgcolor: '#3B4252' }
                  }
                }}
                InputLabelProps={{ sx: { color: '#9CA3AF' } }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Apellido"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                variant="filled"
                InputProps={{
                  sx: {
                    color: 'white',
                    bgcolor: '#374151',
                    borderRadius: '8px',
                    '&:hover': { bgcolor: '#3B4252' }
                  }
                }}
                InputLabelProps={{ sx: { color: '#9CA3AF' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                variant="filled"
                InputProps={{
                  readOnly: true,
                  sx: {
                    color: 'white',
                    bgcolor: '#374151',
                    borderRadius: '8px',
                    '&:hover': { bgcolor: '#3B4252' }
                  }
                }}
                InputLabelProps={{ sx: { color: '#9CA3AF' } }}
              />
            </Grid>


            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Usuario"
                name="username"
                value={formData.username}
                onChange={handleChange}
                variant="filled"
                InputProps={{
                  readOnly: true,
                  sx: {
                    color: 'white',
                    bgcolor: '#374151',
                    borderRadius: '8px',
                    '&:hover': { bgcolor: '#3B4252' }
                  }
                }}
                InputLabelProps={{ sx: { color: '#9CA3AF' } }}
              />
            </Grid>


            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Biografía"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                multiline
                rows={4}
                variant="filled"
                InputProps={{
                  sx: {
                    color: 'white',
                    bgcolor: '#374151',
                    borderRadius: '8px',
                    '&:hover': { bgcolor: '#3B4252' }
                  }
                }}
                InputLabelProps={{ sx: { color: '#9CA3AF' } }}
              />
            </Grid>

            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                startIcon={<Save />}
                sx={{
                  bgcolor: '#10B981',
                  '&:hover': { bgcolor: '#059669' },
                  textTransform: 'none',
                  px: 3,
                  py: 1
                }}
              >
                Guardar Cambios
              </Button>
              <Button
                variant="outlined"
                startIcon={<Cancel />}
                onClick={onClose}
                sx={{
                  borderColor: '#6B7280',
                  color: 'white',
                  '&:hover': { borderColor: '#9CA3AF' },
                  textTransform: 'none',
                  px: 3,
                  py: 1
                }}
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Dialog>
  );
};
