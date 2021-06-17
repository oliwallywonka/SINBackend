import axios from 'axios';

const clienteAxios = axios.create({
    baseURL : 'http://localhost:8000/api'
});

export default clienteAxios;