import axios from 'axios';

const API_URL = 'http://localhost:3000/clientes'; // Asegúrate de que esta URL coincida con la de tu API en NestJS.

export const createCliente = (cliente) => axios.post(API_URL, cliente);
export const getClientes = () => axios.get(API_URL);
export const updateCliente = (codigo, cliente) => axios.put(`${API_URL}/${codigo}`, cliente);
export const deleteCliente = (codigo) => axios.delete(`${API_URL}/${codigo}`);
