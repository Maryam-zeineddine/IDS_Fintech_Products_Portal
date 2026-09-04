import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { getAllDeployments } from '../services/deploymentService';
import { getAllProducts } from '../services/productService';
import { getAllClients } from '../services/clientService';
import { getAllDeploymentStatuses, type DeploymentStatus } from '../services/deploymentStatusService';
import type { Deployment } from '../types/Deployment';
import type { Product } from '../types/Product';
import type { Client } from '../types/Client';

export default function DeploymentsList() {
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [statuses, setStatuses] = useState<DeploymentStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      getAllDeployments(),
      getAllProducts(),
      getAllClients(),
      getAllDeploymentStatuses(),
    ])
      .then(([d, p, c, s]) => {
        setDeployments(d);
        setProducts(p);
        setClients(c);
        setStatuses(s);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const getProductName = (productId: number) => products.find((p) => p.id === productId)?.name ?? 'Unknown';
  const getClientName = (clientId: number) => clients.find((c) => c.id === clientId)?.companyName ?? 'Unknown';
  const getStatusName = (statusId: number) => statuses.find((s) => s.Id === statusId)?.Status ?? 'Unknown';

  return (
    <Layout breadcrumb="Deployments">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate('/deployments/new')}
          className="bg-black text-white rounded-full px-4 py-2 text-sm font-medium hover:bg-gray-800"
        >
          New Deployment
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {loading ? (
          <p className="p-6 text-gray-500">Loading deployments...</p>
        ) : deployments.length === 0 ? (
          <p className="p-6 text-gray-500">No deployments found.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-500 border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Version</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Support Tier</th>
              </tr>
            </thead>
            <tbody>
              {deployments.map((d) => (
                <tr
                  key={d.id}
                  onClick={() => navigate(`/deployments/${d.id}/edit`)}
                  className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-4 py-3 font-medium text-gray-800">{getClientName(d.clientId)}</td>
                  <td className="px-4 py-3">{getProductName(d.productId)}</td>
                  <td className="px-4 py-3">{d.productVersion}</td>
                  <td className="px-4 py-3">
                    <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs">
                      {getStatusName(d.deploymentStatusId)}
                    </span>
                  </td>
                  <td className="px-4 py-3">{d.supportTier}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}