import React, { useEffect, useState } from "react";
import { fetchCustomers, deleteCustomer } from "../services/api";

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        loadCustomers();
    }, []);

    const loadCustomers = async () => {
        const data = await fetchCustomers();
        setCustomers(data);
    };

    const handleDelete = async (id) => {
        await deleteCustomer(id);
        loadCustomers();
    };

    return (
        <div>
            <h2>Liste des Clients</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Entreprise</th>
                        <th>Pays</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.customer_id}>
                            <td>{customer.full_name}</td>
                            <td>{customer.company}</td>
                            <td>{customer.country}</td>
                            <td>{customer.email}</td>
                            <td>
                                <button onClick={() => handleDelete(customer.customer_id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerList;
