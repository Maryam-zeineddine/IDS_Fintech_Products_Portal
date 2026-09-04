import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from '../components/Layout';
import { getAllClients } from "../services/clientService";
import type { Client } from "../types/Client";

export default function ClientsList() {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getAllClients()
            .then(setClients)
            .catch((err) => console.error('Failed to load clients', err))
            .finally(() => setLoading(false));
    },[]);

    const filteredClients = clients.filter((c) =>
        c.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Layout breadcrumb="Clients">
            <div className="flex justify-between items-center mb-4">
                <input
                type="text"
                placeholder="Search by company name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-full px-4 py-2 text-sm w-64"
                />
                <button
                onClick={() => navigate('/clients/new')}
                className="bg-black text-white rounded-full px-4 py-2 text-sm font-medium hover:bg-gray-800"
                >
                    New Client
                </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                {loading ? (
                    <p className="p-6 text-gray-500">Loading clients...</p>
                ) : filteredClients.length === 0 ? (
                    <p className="p-6 text-gray-500">No clients found.</p>
                ) : (
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="text-gray-500 border-b border-gray-200 bg-gray-50">
                                <th className="px-4 py-3">Company Name</th>
                                <th className="px-4 py-3">Country</th>
                                <th className="px-4 py-3">Contact Info</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClients.map((client) => (
                                <tr
                                key={client.id}
                                onClick={() => navigate(`/clients/${client.id}`)}
                                className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                                >
                                    <td className="px-4 py-3 font-medium text-gray-800">{client.companyName}</td>
                                    <td className="px-4 py-3">{client.country}</td>
                                    <td className="px-4 py-3">{client.contactInfo}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </Layout>
    );
}