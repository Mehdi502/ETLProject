import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000'; // URL de l'API FastAPI

export const fetchCustomers = async () => {
    const response = await axios.get(`${API_URL}/customers`);
    return response.data;
};

export const fetchStats = async () => {
    const response = await axios.get(`${API_URL}/countries`);
    return response.data;
};

export const addCustomer = async (customer) => {
    console.log("Données envoyées à FastAPI :", customer);  // 🔍 Vérifier ici
    const response = await axios.post(`${API_URL}/customers`, customer);
    return response.data;
};


export const updateCustomer = async (id, customer) => {
    const response = await axios.put(`${API_URL}/customers/${id}`, customer);
    return response.data;
};

export const deleteCustomer = async (id) => {
    await axios.delete(`${API_URL}/customers/${id}`);
};
