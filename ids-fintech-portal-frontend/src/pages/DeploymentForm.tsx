import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import {
  createDeployment,
  updateDeployment,
  deleteDeployment,
  getDeploymentById,
  type CreateDeploymentDto,
} from '../services/deploymentService';
import { getAllProducts } from '../services/productService';
import type { Product } from '../types/Product';
import { getAllClients } from '../services/clientService';
import type { Client } from '../types/Client';
import { getAllDeploymentStatuses, type DeploymentStatus } from '../services/deploymentStatusService';
import { getAllModules } from '../services/moduleService';
import type { Module } from '../types/Module';
import {
  getModulesForDeployment,
  addModuleToDeployment,
  removeModuleFromDeployment,
} from '../services/deploymentModuleService';
import type { DeploymentModule } from '../types/DeploymentModule';

const emptyForm: CreateDeploymentDto = {
  productId: 0,
  clientId: 0,
  productVersion: '',
  goLiveDate: '',
  deploymentStatusId: 1,
  supportTier: '',
  clientSpecificNotes: '',
};

export default function DeploymentForm() {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();

  const [form, setForm] = useState<CreateDeploymentDto>(emptyForm);
  const [products, setProducts] = useState<Product[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [statuses, setStatuses] = useState<DeploymentStatus[]>([]);
  const [allModules, setAllModules] = useState<Module[]>([]);
  const [enabledModules, setEnabledModules] = useState<DeploymentModule[]>([]);
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getAllProducts().then(setProducts).catch(console.error);
    getAllClients().then(setClients).catch(console.error);
    getAllDeploymentStatuses().then(setStatuses).catch(console.error);
    getAllModules().then(setAllModules).catch(console.error);
  }, []);

  useEffect(() => {
    if (isEditMode) {
      getDeploymentById(Number(id))
        .then((deployment) => {
          setForm({
            productId: deployment.productId,
            clientId: deployment.clientId,
            productVersion: deployment.productVersion ?? '',
            goLiveDate: deployment.goLiveDate && typeof deployment.goLiveDate === 'string'? deployment.goLiveDate.split('T')[0]: '',            deploymentStatusId: deployment.deploymentStatusId,
            supportTier: deployment.supportTier ?? '',
            clientSpecificNotes: deployment.clientSpecificNotes ?? '',
          });
          loadEnabledModules();
        })
        .catch(() => setError('Failed to load deployment.'))
        .finally(() => setLoading(false));
    }
  }, [id, isEditMode]);

  const loadEnabledModules = () => {
    if (!id) return;
    getModulesForDeployment(Number(id)).then(setEnabledModules).catch(console.error);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    const payload = {
        ...form,
        goLiveDate: form.goLiveDate ? form.goLiveDate : undefined,
    };

    try {
        if (isEditMode) {
            await updateDeployment(Number(id), payload);
            navigate('/deployments');
        } else {
            const created = await createDeployment(payload);
            navigate(`/deployments/${created.id}/edit`);
        }
    } catch {
        setError('Failed to save deployment. Please check your inputs.');
    } finally {
        setSaving(false);
    }
};

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this deployment?')) return;
        await deleteDeployment(Number(id));
        navigate('/deployments');
    };

  const productModules = allModules.filter((m) => m.productId === Number(form.productId));
  const enabledModuleIds = enabledModules.map((em) => em.moduleId);

  const toggleModule = async (moduleId: number) => {
    const existing = enabledModules.find((em) => em.moduleId === moduleId);
    if (existing) {
      await removeModuleFromDeployment(existing.id);
    } else {
      await addModuleToDeployment(Number(id), moduleId);
    }
    loadEnabledModules();
  };

  if (loading) {
    return (
      <Layout breadcrumb={isEditMode ? 'Edit Deployment' : 'New Deployment'}>
        <p className="text-gray-500">Loading...</p>
      </Layout>
    );
  }

  return (
    <Layout breadcrumb={isEditMode ? 'Edit Deployment' : 'New Deployment'}>
      <button
        onClick={() => navigate('/deployments')}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-4"
      >
        ← Back to Deployments
      </button>

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 max-w-2xl mb-4">
        <h1 className="text-xl font-bold mb-6">{isEditMode ? 'Edit Deployment' : 'New Deployment'}</h1>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <div className="grid grid-cols-2 gap-4">
          <label>
            <span className="text-sm text-gray-700">Product *</span>
            <select
              value={form.productId}
              onChange={(e) => setForm({ ...form, productId: Number(e.target.value) })}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            >
              <option value={0}>Select product</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </label>

          <label>
            <span className="text-sm text-gray-700">Client *</span>
            <select
              value={form.clientId}
              onChange={(e) => setForm({ ...form, clientId: Number(e.target.value) })}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            >
              <option value={0}>Select client</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>{c.companyName}</option>
              ))}
            </select>
          </label>

          <label>
            <span className="text-sm text-gray-700">Product Version</span>
            <input
              name="productVersion"
              value={form.productVersion}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </label>

          <label>
            <span className="text-sm text-gray-700">Go-Live Date</span>
            <input
              type="date"
              name="goLiveDate"
              value={form.goLiveDate}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </label>

          <label>
            <span className="text-sm text-gray-700">Status *</span>
            <select
              value={form.deploymentStatusId}
              onChange={(e) => setForm({ ...form, deploymentStatusId: Number(e.target.value) })}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            >
              {statuses.map((s) => (
                <option key={s.Id} value={s.Id}>{s.Status}</option>
              ))}
            </select>
          </label>

          <label>
            <span className="text-sm text-gray-700">Support Tier</span>
            <input
              name="supportTier"
              value={form.supportTier}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </label>

          <label className="col-span-2">
            <span className="text-sm text-gray-700">Client-Specific Notes</span>
            <textarea
              name="clientSpecificNotes"
              value={form.clientSpecificNotes}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              rows={2}
            />
          </label>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            type="submit"
            disabled={saving}
            className="bg-black text-white rounded-full px-6 py-2 text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
          {isEditMode && (
            <button
            type="button"
            onClick={handleDelete}
            className="border border-red-300 text-red-600 rounded-full px-6 py-2 text-sm hover:bg-red-50"
            >
                Delete
            </button>
            )}
        </div>


      </form>

      {isEditMode && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-2xl">
          <h2 className="font-semibold mb-3">Enabled Modules</h2>
          {productModules.length === 0 ? (
            <p className="text-gray-500 text-sm">This product has no modules yet.</p>
          ) : (
            <ul>
              {productModules.map((m) => (
                <li key={m.id} className="flex items-center gap-2 py-1 text-sm">
                  <input
                    type="checkbox"
                    checked={enabledModuleIds.includes(m.id)}
                    onChange={() => toggleModule(m.id)}
                  />
                  <span>{m.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </Layout>
  );
}