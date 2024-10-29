import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, MenuItem, FormControl, InputLabel, Select, Card, CardContent, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createCliente, updateCliente } from '../services/clientService';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const ClientForm = ({ fetchClientes, editingClient, setEditingClient }) => {
  const [formData, setFormData] = useState({
    password: '',
    email: '',
    nombreCliente: '',
    direccion: '',
    telefono: '',
    ciudad: '',
    pais: '',
    fechaRegistro: '',
    estado: ''
  });

  useEffect(() => {
    if (editingClient) setFormData(editingClient);
  }, [editingClient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    const formattedDate = date.toISOString();
    setFormData({ ...formData, fechaRegistro: formattedDate });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const requiredFields = ['nombreCliente', 'email', 'password', 'fechaRegistro', 'estado'];
    const isEmpty = requiredFields.some((field) => !formData[field]);

    if (isEmpty) {
      alert('Por favor, complete todos los campos requeridos.');
      return;
    }

    if (editingClient) {
      await updateCliente(editingClient.codigo, formData);
      setEditingClient(null);
    } else {
      await createCliente(formData);
    }
    fetchClientes();
    setFormData({
      nombreCliente: '',
      direccion: '',
      telefono: '',
      ciudad: '',
      pais: '',
      email: '',
      password: '',
      fechaRegistro: '',
      estado: ''
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Card elevation={3} sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {editingClient ? 'Editar Cliente' : 'Agregar Cliente'}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nombre Cliente"
                  name="nombreCliente"
                  value={formData.nombreCliente}
                  onChange={handleChange}
                  required
                  variant="outlined"
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
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Teléfono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Dirección"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Ciudad"
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="País"
                  name="pais"
                  value={formData.pais}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Fecha de Registro"
                  name="fechaRegistro"
                  type="date"
                  value={formData.fechaRegistro.split('T')[0]}
                  onChange={handleDateChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="estado-label">Estado</InputLabel>
                  <Select
                    labelId="estado-label"
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                    label="Estado"
                    required
                  >
                    <MenuItem value="activo">Activo</MenuItem>
                    <MenuItem value="inactivo">Inactivo</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              {editingClient ? 'Actualizar' : 'Crear'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};

export default ClientForm;