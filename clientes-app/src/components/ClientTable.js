import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, TextField, Typography, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Delete, Edit, Sort } from '@mui/icons-material';
import { deleteCliente } from '../services/clientService';

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

const ClientTable = ({ clientes, fetchClientes, setEditingClient }) => {
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = async (codigo) => {
    if (window.confirm('¿Está seguro de que desea eliminar este cliente?')) {
      await deleteCliente(codigo);
      fetchClientes();
    }
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedClientes = [...clientes].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredClientes = sortedClientes.filter(cliente =>
    Object.values(cliente).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '100%', mt: 4 }}>
        <Typography variant="h5" component="div" gutterBottom>
          Lista de Clientes
        </Typography>
        <TextField
          label="Buscar clientes"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <TableContainer component={Paper} elevation={3}>
          <Table sx={{ minWidth: 650 }} aria-label="tabla de clientes">
            <TableHead>
              <TableRow>
                {['Código', 'Nombre', 'Email', 'Teléfono', 'Ciudad', 'País', 'Fecha de Registro', 'Estado', 'Acciones'].map((header) => (
                  <TableCell key={header}>
                    <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleSort(header.toLowerCase())}>
                      {header}
                      <IconButton size="small">
                        <Sort />
                      </IconButton>
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredClientes.map((cliente) => (
                <TableRow key={cliente.codigo} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{cliente.codigo}</TableCell>
                  <TableCell>{cliente.nombreCliente}</TableCell>
                  <TableCell>{cliente.email}</TableCell>
                  <TableCell>{cliente.telefono}</TableCell>
                  <TableCell>{cliente.ciudad}</TableCell>
                  <TableCell>{cliente.pais}</TableCell>
                  <TableCell>{new Date(cliente.fechaRegistro).toLocaleDateString()}</TableCell>
                  <TableCell>{cliente.estado}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => setEditingClient(cliente)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDelete(cliente.codigo)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </ThemeProvider>
  );
};

export default ClientTable;