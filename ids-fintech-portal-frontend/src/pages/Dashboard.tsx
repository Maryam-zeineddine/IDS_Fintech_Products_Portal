import { useEffect, useState } from 'react';
import { getAllClients } from '../services/clientService';
import Layout from '../components/Layout';
import StatCard from '../components/StatCard';
import { getAllProducts } from '../services/productService';
import { getAllDeployments } from '../services/deploymentService';
import { getAllTeamMembers } from '../services/teamMemberService';
import type { Product } from '../types/Product';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [products, setProducts] = useState<Product[]>([]);
    const [clientCount, setClientCount] = useState(0);
    const [deploymentCount, setDeploymentCount] = useState(0);
    const [teamMemberCount, setTeamMemberCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => {
        const loadData = async () => {
            try {
                const [productsData, clientsData, deploymentsData, teamData] = await Promise.all([
                    getAllProducts(),
                    getAllClients(),
                    getAllDeployments(),
                    getAllTeamMembers()
                ]);
                setProducts(productsData);
                setClientCount(clientsData.length);
                setDeploymentCount(deploymentsData.length);
                setTeamMemberCount(teamData.length);
            } catch (err) {
                console.error('Failed to load dashboard', err);
        } finally {
            setLoading(false);
        }
    };
    loadData();
}, []);

const activeProductsCount = products.filter((p) => p.productStatusId === 1).length;

if(loading) {
    return (
      <Layout breadcrumb="Dashboard">
        <p className="text-gray-500">Loading dashboard...</p>
      </Layout>
    );
}

return (
    <Layout breadcrumb="Dashboard">
      <div className="flex gap-4 mb-6">
        <StatCard label="Total Products" value={products.length} />
        <StatCard label="Active Products" value={activeProductsCount} />
        <StatCard label="Total Clients" value={clientCount} />
        <StatCard label="Total Deployments" value={deploymentCount} />
        <StatCard label="Team Members" value={teamMemberCount} />
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Recently Added Products</h2>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-gray-500 border-b border-gray-200">
              <th className="pb-2">Product Name</th>
              <th className="pb-2">Version</th>
              <th className="pb-2">Criticality</th>
            </tr>
          </thead>
          <tbody>
            {products.slice(0, 5).map((product) => (
              <tr
              key={product.id}
              onClick={() => navigate(`/products/${product.id}`)}
              className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
              >
                <td className="py-2">{product.name}</td>
                <td className="py-2">{product.currentVersion}</td>
                <td className="py-2">{product.criticality}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}