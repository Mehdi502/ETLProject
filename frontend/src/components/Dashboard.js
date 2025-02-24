import React, { useEffect, useState } from "react";
import { fetchStats } from "../services/api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
    const [stats, setStats] = useState([]);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        const data = await fetchStats();
        setStats(data.countries);
    };

    return (
        <div>
            <h2>Statistiques des Clients</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats}>
                    <XAxis dataKey="_id" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Dashboard;
