import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { getClientById, deleteClient } from '../services/clientService';
import type { Client } from '../types/Client';
import { getAllDeployments } from '../services/deploymentService';
import type { Deployment } from '../types/Deployment';
import { getAllProducts } from '../services/productService';
import type { Product } from '../types/Product';
import { getAllEnvironments } from '../services/environmentService';
import type { DeploymentEnvironment } from '../types/Environment';

const TABS = ['Deployments', 'Environments', 'Responsible Team'] as const;
type Tab = (typeof TABS)[number];

export default function ClientDetails() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [client, setClient] = useState<Client | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<Tab>('Deployments');

    const [clientDeployments, setClientDeployments] = useState<Deployment[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [environments, setEnvironments] = useState<DeploymentEnvironment[]>([]);

    useEffect(()=> {
        getClientById(Number(id))
            .then(setClient)
            .catch(() => console.error('Failed to load client'))
            .finally(() => setLoading(false));
    }, [id]);

    useEffect(() => {
        getAllDeployments()
            .then((all) => setClientDeployments(all.filter((d) => d.clientId === Number(id))))
            .catch(console.error);
        getAllProducts().then(setProducts).catch(console.error);
        getAllEnvironments().then(setEnvironments).catch(console.error);
    }, [id]);

    const handleDelete = async () => {
        if(!confirm('Are you sure you want to delete this client?')) return;
        await deleteClient(Number(id));
        navigate('/clients');
    };

    if(loading){
        return (
            <Layout breadcrumb="Client Details">
                <p className="text-gray-500">Loading...</p>
            </Layout>
        );
    }

    if(!client) {
        return (
            <Layout breadcrumb="Client Details">
                <p className="text-gray-500">Client not found.</p>
            </Layout>
        );
    }

    return (
    <Layout breadcrumb={client.companyName}>
      <button
        onClick={() => navigate('/clients')}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-4"
      >
        ← Back to Clients
      </button>

      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">{client.companyName}</h1>
          <p className="text-sm text-gray-500">{client.country}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/clients/${id}/edit`)}
            className="border border-gray-300 rounded-full px-4 py-2 text-sm hover:bg-gray-50"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="border border-red-300 text-red-600 rounded-full px-4 py-2 text-sm hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Contact Info</p>
            <p className="text-gray-800">{client.contactInfo || '—'}</p>
          </div>
          <div>
            <p className="text-gray-500">Notes</p>
            <p className="text-gray-800">{client.notes || '—'}</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex border-b border-gray-200">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition ${
                activeTab === tab ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-4">
          {activeTab === 'Deployments' && (
            <div>
              {clientDeployments.length === 0 ? (
                <p className="text-gray-500 text-sm">No deployments yet.</p>
              ) : (
                <ul>
                  {clientDeployments.map((d) => {
                    const product = products.find((p) => p.id === d.productId);
                    return (
                      <li key={d.id} className="border-b border-gray-100 py-2 text-sm">
                        <p className="font-medium text-gray-800">{product?.name ?? 'Unknown product'}</p>
                        <p className="text-gray-500">
                          Version {d.productVersion} · Go-Live {d.goLiveDate ? new Date(d.goLiveDate).toLocaleDateString() : '—'}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}

          {activeTab === 'Environments' && (
            <div>
              {(() => {
                const clientDeploymentIds = clientDeployments.map((d) => d.id);
                const clientEnvironments = environments.filter((e) =>
                  clientDeploymentIds.includes(e.deploymentId)
                );
                return clientEnvironments.length === 0 ? (
                  <p className="text-gray-500 text-sm">No environments yet.</p>
                ) : (
                  <ul>
                    {clientEnvironments.map((env) => (
                      <li key={env.id} className="border-b border-gray-100 py-2 text-sm">
                        <p className="font-medium text-gray-800">{env.environmentName}</p>
                        <p className="text-gray-500">{env.environmentType}</p>
                      </li>
                    ))}
                  </ul>
                );
              })()}
            </div>
          )}

          {activeTab === 'Responsible Team' && (
            <p className="text-gray-500 text-sm">
              Team responsibilities are tracked per-product on the Product Details page.
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}
