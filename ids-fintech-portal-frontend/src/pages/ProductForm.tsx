import { useEffect, useState } from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import Layout from '../components/Layout';
import { createProduct, updateProduct, getProductById } from '../services/productService';
import type { CreateProductDto  } from '../types/Product';
import { getAllProductStatuses }   from '../services/productStatusService';
import type { ProductStatus } from '../types/ProductStatus';

const emptyForm: CreateProductDto = {
  name: '',
  description: '',
  businessPurpose: '',
  productStatusId: 1,
  currentVersion: '',
  supportedMarkets: '',
  criticality: '',
  technologies: '',
  notes: '',
};

export default function ProductForm() {
    const { id }  = useParams();
    const isEditMode = !!id;
    const navigate = useNavigate();

    const [form, setForm] = useState<CreateProductDto>(emptyForm);
    const [loading, setLoading] = useState(isEditMode);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [statuses, setStatuses] = useState<ProductStatus[]>([]);

    useEffect(() => {
        if (isEditMode) {
            getProductById(Number(id))
                .then((product) => {
                    setForm({
                        name: product.name,
                        description: product.description ?? '',
                        businessPurpose: product.businessPurpose ?? '',
                        productStatusId: product.productStatusId,
                        currentVersion: product.currentVersion ?? '',
                        supportedMarkets: product.supportedMarkets ?? '',
                        criticality: product.criticality ?? '',
                        technologies: product.technologies ?? '',
                        notes: product.notes ?? '',
                    })
                })  
                .catch(() => setError('Failed to load product'))
                .finally(() => setLoading(false));
        }
    }, [id, isEditMode]);

    useEffect(() => {
        getAllProductStatuses().then(setStatuses).catch(console.error);
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSaving(true);

        try {
            if(isEditMode)
            {
                await updateProduct(Number(id), form);
            } else {
                await createProduct(form);
            }
            navigate('/products');
        } catch {
            setError('Failed to save product. Please check your inputs');
        } finally {
            setSaving(false);
        }
    };

    if(loading)
    {
        return (
            <Layout breadcrumb={isEditMode ? 'Edit Product' : 'New Product'}>
                <p className="text-gray-500">Loading...</p>
            </Layout>
        );
    }

    return (
    <Layout breadcrumb={isEditMode ? 'Edit Product' : 'New Product'}>
      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 max-w-2xl">
        <h1 className="text-xl font-bold mb-6">
          {isEditMode ? 'Edit Product' : 'New Product'}
        </h1>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <div className="grid grid-cols-2 gap-4">
          <label className="col-span-2">
            <span className="text-sm text-gray-700">Product Name *</span>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </label>

          <label className="col-span-2">
            <span className="text-sm text-gray-700">Description</span>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              rows={2}
            />
          </label>

          <label>
            <span className="text-sm text-gray-700">Lifecycle Status *</span>
            <select
                name="productStatusId"
                value={form.productStatusId}
                onChange={(e) => setForm({ ...form, productStatusId: Number(e.target.value) })}
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded"
            >
                {statuses.map((s) => (
                    <option key={s.Id} value={s.Id}>
                    {s.Status}
                    </option>
                ))}
            </select>
        </label>

          <label className="col-span-2">
            <span className="text-sm text-gray-700">Business Purpose</span>
            <textarea
              name="businessPurpose"
              value={form.businessPurpose}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              rows={2}
            />
          </label>

          <label>
            <span className="text-sm text-gray-700">Current Version</span>
            <input
              name="currentVersion"
              value={form.currentVersion}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </label>

          <label>
            <span className="text-sm text-gray-700">Supported Markets</span>
            <input
              name="supportedMarkets"
              value={form.supportedMarkets}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </label>

          <label>
            <span className="text-sm text-gray-700">Criticality</span>
            <input
              name="criticality"
              value={form.criticality}
              onChange={handleChange}
              placeholder="Low / Medium / High / Critical"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </label>

          <label>
            <span className="text-sm text-gray-700">Technologies</span>
            <input
              name="technologies"
              value={form.technologies}
              onChange={handleChange}
              placeholder="Comma-separated"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </label>

          <label className="col-span-2">
            <span className="text-sm text-gray-700">Notes</span>
            <textarea
              name="notes"
              value={form.notes}
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
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="border border-gray-300 rounded-full px-6 py-2 text-sm font-medium hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </Layout>
  );
}
