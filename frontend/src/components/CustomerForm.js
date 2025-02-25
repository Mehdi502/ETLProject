import React, { useState } from "react";
import { addCustomer } from "../services/api";

const CustomerForm = ({ onCustomerAdded }) => {
    const [customer, setCustomer] = useState({
        customer_id: "",
        full_name: "",
        company: "",
        country: "",
        city: "",  // 🟢 Ajout des champs manquants
        phone_1: "",
        phone_2: "",
        email: "",
        subscription_date: "",
        website: ""
    });

    const handleChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ✅ Vérification et valeurs par défaut pour éviter l'erreur 422
        const newCustomer = {
            customer_id: customer.customer_id || "N/A",
            full_name: customer.full_name || "N/A",
            company: customer.company || "N/A",
            country: customer.country || "N/A",
            city: customer.city || "N/A",
            phone_1: customer.phone_1 || "N/A",
            phone_2: customer.phone_2 || "N/A",
            email: customer.email || "example@email.com",
            subscription_date: customer.subscription_date || "N/A",
            website: customer.website || "N/A"
        };

        console.log("Données envoyées à FastAPI :", newCustomer); // 🛠 Debugging

        try {
            await addCustomer(newCustomer);
            onCustomerAdded();  // Rafraîchir la liste des clients
            setCustomer({
                customer_id: "", full_name: "", company: "", country: "",
                city: "", phone_1: "", phone_2: "", email: "", subscription_date: "", website: ""
            });
        } catch (error) {
            console.error("Erreur lors de l'ajout du client :", error);
        }
    };

    return (
        <div>
            <h2>Ajouter un Client</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="customer_id" placeholder="ID Client" value={customer.customer_id} onChange={handleChange} required />
                <input type="text" name="full_name" placeholder="Nom Complet" value={customer.full_name} onChange={handleChange} required />
                <input type="text" name="company" placeholder="Entreprise" value={customer.company} onChange={handleChange} />
                <input type="text" name="country" placeholder="Pays" value={customer.country} onChange={handleChange} />
                <input type="text" name="city" placeholder="Ville" value={customer.city} onChange={handleChange} /> {/* 🟢 Champ ajouté */}
                <input type="text" name="phone_1" placeholder="Téléphone 1" value={customer.phone_1} onChange={handleChange} />
                <input type="text" name="phone_2" placeholder="Téléphone 2" value={customer.phone_2} onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" value={customer.email} onChange={handleChange} required />
                <input type="text" name="subscription_date" placeholder="Date d'inscription" value={customer.subscription_date} onChange={handleChange} />
                <input type="text" name="website" placeholder="Site Web" value={customer.website} onChange={handleChange} />
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
};

export default CustomerForm;
