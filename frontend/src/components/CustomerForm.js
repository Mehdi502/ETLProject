import React, { useState } from "react";
import { addCustomer } from "../services/api";

const CustomerForm = ({ onCustomerAdded }) => {
    const [customer, setCustomer] = useState({
        customer_id: "",
        full_name: "",
        company: "",
        country: "",
        email: ""
    });

    const handleChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addCustomer(customer);
        onCustomerAdded();
        setCustomer({ customer_id: "", full_name: "", company: "", country: "", email: "" });
    };

    return (
        <div>
            <h2>Ajouter un Client</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="customer_id" placeholder="ID Client" value={customer.customer_id} onChange={handleChange} required />
                <input type="text" name="full_name" placeholder="Nom Complet" value={customer.full_name} onChange={handleChange} required />
                <input type="text" name="company" placeholder="Entreprise" value={customer.company} onChange={handleChange} />
                <input type="text" name="country" placeholder="Pays" value={customer.country} onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" value={customer.email} onChange={handleChange} required />
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
};

export default CustomerForm;
