import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout  from '../components/Layout';
import { getAllProducts } from '../services/productService';
import type { Product } from '../types/Product';

export default function ProductsList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await getAllProducts();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
    <Layout breadcrumb="Products">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-full px-4 py-2 text-sm w-64"
        />
        <button
          onClick={() => navigate('/products/new')}
          className="bg-black text-white rounded-full px-4 py-2 text-sm font-medium hover:bg-gray-800"
        >
          New Product
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {loading ? (
          <p className="p-6 text-gray-500">Loading products...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="p-6 text-gray-500">No products found.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-500 border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3">Product Name</th>
                <th className="px-4 py-3">Current Version</th>
                <th className="px-4 py-3">Criticality</th>
                <th className="px-4 py-3">Technologies</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  onClick={() => navigate(`/products/${product.id}`)}
                  className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-4 py-3 font-medium text-gray-800">{product.name}</td>
                  <td className="px-4 py-3">{product.currentVersion}</td>
                  <td className="px-4 py-3">{product.criticality}</td>
                  <td className="px-4 py-3">{product.technologies}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}