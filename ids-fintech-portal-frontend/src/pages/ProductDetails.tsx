import {  useEffect, useState } from  'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { getProductById, deleteProduct} from '../services/productService';
import type { Product } from '../types/Product';
import { getAllModules, createModule, deleteModule } from '../services/moduleService';
import type { Module } from '../types/Module';
import { getAllRepositories, createRepository, deleteRepository } from '../services/repositoryService';
import type { Repository } from '../types/Repository';
import { getAllDocuments, createDocument, deleteDocument } from '../services/documentService';
import type { Document } from '../types/Document';
import { getAllProductResponsibilities, createProductResponsibility, deleteProductResponsibility } from '../services/productResponsibilityService';
import type { ProductResponsibility } from '../types/ProductResponsibility';
import { getAllTeamMembers } from '../services/teamMemberService';
import type { TeamMember } from '../types/TeamMember';

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
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [newRepoName, setNewRepoName] = useState('');
    const [newRepoUrl, setNewRepoUrl] = useState('');

    const [documents, setDocuments] = useState<Document[]>([]);
    const [newDocName, setNewDocName] = useState('');
    const [newDocUrl, setNewDocUrl] = useState('');

    const [responsibilities, setResponsibilities] = useState<ProductResponsibility[]>([]);
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [selectedTeamMemberId, setSelectedTeamMemberId] = useState<number | ''>('');
    const [newResponsibility, setNewResponsibility] = useState('');

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

    const loadRepositories = () => {
        getAllRepositories()
            .then((all) => setRepositories(all.filter((r) => r.productId === Number(id))))
            .catch(console.error);
    };

    const loadDocuments = () => {
        getAllDocuments()
            .then((all) => setDocuments(all.filter((d) => d.productId === Number(id))))
            .catch(console.error);
    };

    const loadResponsibilities = () => {
        getAllProductResponsibilities()
            .then((all) => setResponsibilities(all.filter((r) => r.productId === Number(id))))
            .catch(console.error);
    };

    useEffect(() => {
        loadRepositories();
        loadDocuments();
        loadResponsibilities();
        getAllTeamMembers().then(setTeamMembers).catch(console.error);
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

    const handleAddRepository = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!newRepoName.trim() || !newRepoUrl.trim()) return;
        await createRepository({productId: Number(id),repoName: newRepoName, githubUrl: newRepoUrl});
        setNewRepoName('');
        setNewRepoUrl('');
        loadRepositories();
    }

    const handleDeleteRepository  = async (repoId: number) => {
        if(!confirm('Remove this repository?')) return;
        await deleteRepository(repoId);
        loadRepositories();
    };

    const handleAddDocument = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!newDocName.trim()) return;
        await createDocument({productId: Number(id), documentName: newDocName, fileReference: newDocUrl});
        setNewDocName('');
        setNewDocUrl('');
        loadDocuments();
    };

    const handleDeleteDocument = async (docId: number) => {
        if(!confirm('Remove this document?')) return;
        await deleteDocument(docId);
        loadDocuments();
    };

    const handleAddResponsibility = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!selectedTeamMemberId || !newResponsibility.trim()) return;
        await createProductResponsibility({
            productId: Number(id),
            teamMemberId: Number(selectedTeamMemberId),
            responsibility: newResponsibility,
        });
        setSelectedTeamMemberId('');
        setNewResponsibility('');
        loadResponsibilities();
    };

    const handleDeleteResponsibility = async (respId: number) => {
        if(!confirm('Remove this team assignment?')) return;
        await deleteProductResponsibility(respId);
        loadResponsibilities();
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
                    {activeTab === 'Team' && (
                        <div>
                            <ul className="mb-4">
                                {responsibilities.length === 0 && <p className="text-gray-500 text-sm">No team assignments yet.</p>}
                                {responsibilities.map((r) => {
                                    const member = teamMembers.find((tm) => tm.id === r.teamMemberId);
                                    return (
                                        <li key={r.id} className="flex justify-between items-center border-b border-gray-100 py-2 text-sm">
                                            <div>
                                                <p className="font-medium text-gray-800">{member?.fullName ?? 'Unknown'}</p>
                                                <p className="text-gray-500">{r.responsibility}</p>
                                            </div>
                                            <button onClick={() => handleDeleteResponsibility(r.id)} className="text-red-600 text-xs hover:underline">
                                                Remove
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                            <form onSubmit={handleAddResponsibility} className="flex gap-2">
                                <select
                                value={selectedTeamMemberId}
                                onChange={(e) => setSelectedTeamMemberId(e.target.value ? Number(e.target.value) : '')}
                                className="border border-gray-300 rounded px-3 py-2 text-sm flex-1"
                                >
                                    <option value="">Select team member</option>
                                    {teamMembers.map((tm) => (
                                        <option key={tm.id} value={tm.id}>{tm.fullName}</option>
                                    ))}
                                </select>
                                <input
                                value={newResponsibility}
                                onChange={(e) => setNewResponsibility(e.target.value)}
                                placeholder="Responsibility"
                                className="border border-gray-300 rounded px-3 py-2 text-sm flex-1"
                                />
                                <button type="submit" className="bg-black text-white rounded px-4 py-2 text-sm">Add</button>
                            </form>
                        </div>
                    )}

                    {activeTab === 'Repositories' && (
                        <div>
                            <ul className="mb-4">
                                {repositories.length === 0 && <p className="text-gray-500 text-sm">No repositories yet.</p>}
                                {repositories.map((repo) => (
                                    <li key={repo.id} className="flex justify-between items-center border-b border-gray-100 py-2 text-sm">
                                        <div>
                                            <p className="font-medium text-gray-800">{repo.repoName}</p>
                                            <a href={repo.githubUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                                                {repo.githubUrl}
                                            </a>
                                        </div>
                                        <button onClick={() => handleDeleteRepository(repo.id)} className="text-red-600 text-xs hover:underline">
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <form onSubmit={handleAddRepository} className="flex gap-2">
                                <input
                                value={newRepoName}
                                onChange={(e) => setNewRepoName(e.target.value)}
                                placeholder="Repository name"
                                className="border border-gray-300 rounded px-3 py-2 text-sm flex-1"
                                />
                                <input
                                value={newRepoUrl}
                                onChange={(e) => setNewRepoUrl(e.target.value)}
                                placeholder="GitHub URL"
                                className="border border-gray-300 rounded px-3 py-2 text-sm flex-1"
                                />
                                <button type="submit" className="bg-black text-white rounded px-4 py-2 text-sm">Add</button>
                            </form>
                        </div>
                    )}

                    {activeTab === 'Documentation' && (
                        <div>
                            <ul className="mb-4">
                                {documents.length === 0 && <p className="text-gray-500 text-sm">No documents yet.</p>}
                                {documents.map((doc) => (
                                    <li key={doc.id} className="flex justify-between items-center border-b border-gray-100 py-2 text-sm">
                                        <div>
                                            <p className="font-medium text-gray-800">{doc.documentName}</p>
                                            {doc.fileReference && (
                                                <a href={doc.fileReference} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                                                    {doc.fileReference}
                                                </a>
                                            )}
                                        </div>
                                        <button onClick={() => handleDeleteDocument(doc.id)} className="text-red-600 text-xs hover:underline">
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <form onSubmit={handleAddDocument} className="flex gap-2">
                                <input
                                value={newDocName}
                                onChange={(e) => setNewDocName(e.target.value)}
                                placeholder="Document name"
                                className="border border-gray-300 rounded px-3 py-2 text-sm flex-1"
                                />
                                <input
                                value={newDocUrl}
                                onChange={(e) => setNewDocUrl(e.target.value)}
                                placeholder="URL / file reference"
                                className="border border-gray-300 rounded px-3 py-2 text-sm flex-1"
                                />
                                <button type="submit" className="bg-black text-white rounded px-4 py-2 text-sm">Add</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}