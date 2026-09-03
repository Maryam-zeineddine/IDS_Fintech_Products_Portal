import {  useEffect, useState } from  'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { getProductById, deleteProduct} from '../services/productService';
import type { Product } from '../types/Product';
import { getAllModules, createModule, deleteModule } from '../services/moduleService';
import type { Module } from '../types/Module';

const TABS = ['Modules', 'Clients', 'Team', 'Repositories', 'Documentation'] as const;
type Tab = (typeof TABS)[number];

export default function ProductDetails(){
    const {id} = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<Tab>('Modules');
    const [modules, setModules] = useState<Module[]>([]);
    const [newModuleName, setNewModuleName] = useState('');
    const [newModuleDescription, setNewModuleDescription] = useState('');

    useEffect(() => {
        getProductById(Number(id))
            .then(setProduct)
            .catch(() => console.error('Failed to load product'))
            .finally(() => setLoading(false));
    }, [id]);

    const loadModules = () => {
        getAllModules()
        .then((allModules) => setModules(allModules.filter((m) => m.productId === Number(id))))
        .catch(console.error);
    };

    useEffect(() => {
        loadModules();
    }, [id]);

    const handleAddModule = async (e: React.FormEvent) => {
        console.log('handleAddModule fired');
        e.preventDefault();
        if (!newModuleName.trim()) return;

        await createModule({
            productId: Number(id),
            name: newModuleName,
            description: newModuleDescription,
            moduleStatusId: 1,
        });
        console.log('module created');
        setNewModuleName('');
        setNewModuleDescription('');
        loadModules();
    };
    

    const handleDeleteModule = async (moduleId: number) => {
        if (!confirm('Remove this module?')) return;
        try {
            await deleteModule(moduleId);
            loadModules();
        } catch (err: any) {
            alert(err.response?.data?.message || 'Failed to remove module.');
        }
    };

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this product?')) return;
        await deleteProduct(Number(id));
        navigate('/products');
    };

    if(loading) {
        return (
            <Layout breadcrumb="Product Details">
                <p className="text-gray-500">Loading...</p>
            </Layout>
        );
    }

    if(!product) {
        return (
            <Layout breadcrumb="Product Details">
                <p className="text-gray-500">Product not found.</p>
            </Layout>
        );
    }

    return (
        <Layout breadcrumb={product.name}>
            <button
                onClick={() => navigate('/products')}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-4"
            >
                ← Back to Products
            </button>
            {/* Header */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-bold">{product.name}</h1>
                    <p className="text-sm text-gray-500">Version {product.currentVersion}</p>
                </div>
                <div className="flex gap-2">
                    <button
                    onClick={() => navigate(`/products/${id}/edit`)}
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

            {/* Static info block */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-gray-500">Description</p>
                        <p className="text-gray-800">{product.description || '—'}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Business Purpose</p>
                        <p className="text-gray-800">{product.businessPurpose || '—'}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Supported Markets</p>
                        <p className="text-gray-800">{product.supportedMarkets || '—'}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Criticality</p>
                        <p className="text-gray-800">{product.criticality || '—'}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Technologies</p>
                        <p className="text-gray-800">{product.technologies || '—'}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Notes</p>
                        <p className="text-gray-800">{product.notes || '—'}</p>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white border border-gray-200 rounded-lg">
                <div className="flex border-b border-gray-200">
                    {TABS.map((tab) => (
                    <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-3 text-sm font-medium border-b-2 transition ${
                        activeTab === tab
                        ? 'border-black text-black'
                        : 'border-transparent text-gray-500 hover:text-gray-800'
                    }`}
                    >
                        {tab}
                    </button>
                    ))}
                </div>

                <div className="p-4">
                    {activeTab === 'Modules' && (
                        <div>
                            <ul className="mb-4">
                                {modules.length === 0 && <p className="text-gray-500 text-sm">No modules yet.</p>}
                                {modules.map((module) => (
                                    <li
                                        key={module.id}
                                        className="flex justify-between items-center border-b border-gray-100 py-2 text-sm"
                                    >
                                        <div>
                                            <p className="font-medium text-gray-800">{module.name}</p>
                                            <p className="text-gray-500">{module.description}</p>
                                        </div>
                                        <button
                                        onClick={() => handleDeleteModule(module.id)}
                                        className="text-red-600 text-xs hover:underline"
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            <form onSubmit={handleAddModule} className="flex gap-2">
                                <input
                                value={newModuleName}
                                onChange={(e) => setNewModuleName(e.target.value)}
                                placeholder="Module name"
                                className="border border-gray-300 rounded px-3 py-2 text-sm flex-1"
                                />
                                <input
                                value={newModuleDescription}
                                onChange={(e) => setNewModuleDescription(e.target.value)}
                                placeholder="Description"
                                className="border border-gray-300 rounded px-3 py-2 text-sm flex-1"
                                />
                                <button
                                type="submit"
                                className="bg-black text-white rounded px-4 py-2 text-sm"
                                >
                                    Add Module
                                </button>
                            </form>
                        </div>
                    )}
                    {activeTab === 'Clients' && <p className="text-gray-500">Clients tab — coming next.</p>}
                    {activeTab === 'Team' && <p className="text-gray-500">Team tab — coming next.</p>}
                    {activeTab === 'Repositories' && <p className="text-gray-500">Repositories tab — coming next.</p>}
                    {activeTab === 'Documentation' && <p className="text-gray-500">Documentation tab — coming next.</p>}
                </div>
            </div>
        </Layout>
    );
}