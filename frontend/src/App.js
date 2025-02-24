import React, { useState } from "react";
import CustomerList from "./components/CustomerList";
import CustomerForm from "./components/CustomerForm";
import Dashboard from "./components/Dashboard";

function App() {
    const [reload, setReload] = useState(false);

    return (
        <div>
            <h1>Gestion des Clients</h1>
            <CustomerForm onCustomerAdded={() => setReload(!reload)} />
            <CustomerList key={reload} />
            <Dashboard />
        </div>
    );
}

export default App;
