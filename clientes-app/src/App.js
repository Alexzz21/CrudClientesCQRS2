import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import ClientForm from './components/ClientForm';
import ClientTable from './components/ClientTable';
import { getClientes } from './services/clientService';

const App = () => {
  const [clientes, setClientes] = useState([]);
  const [editingClient, setEditingClient] = useState(null);

  const fetchClientes = async () => {
    const response = await getClientes();
    setClientes(response.data);
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Gestión de Clientes
      </Typography>
      <ClientForm fetchClientes={fetchClientes} editingClient={editingClient} setEditingClient={setEditingClient} />
      <ClientTable clientes={clientes} fetchClientes={fetchClientes} setEditingClient={setEditingClient} />
    </Container>
  );
};

export default App;
