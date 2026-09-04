import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { createClient, updateClient, getClientById, type CreateClientDto } from '../services/clientService';
import { getAllClientStatuses, type ClientStatus } from '../services/clientStatusService';

const emptyForm: CreateClientDto = {
  companyName: '',
  country: '',
  contactInfo: '',
  clientStatusId: 1,
  notes: '',
};

export default function ClientForm() {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();

  const [form, setForm] = useState<CreateClientDto>(emptyForm);
  const [statuses, setStatuses] = useState<ClientStatus[]>([]);
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getAllClientStatuses().then(setStatuses).catch(console.error);
  }, []);

  useEffect(() => {
    if (isEditMode) {
      getClientById(Number(id))
        .then((client) => {
          setForm({
            companyName: client.companyName,
            country: client.country ?? '',
            contactInfo: client.contactInfo ?? '',
            clientStatusId: client.clientStatusId,
            notes: client.notes ?? '',
          });
        })
        .catch(() => setError('Failed to load client.'))
        .finally(() => setLoading(false));
    }
  }, [id, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      if (isEditMode) {
        await updateClient(Number(id), form);
      } else {
        await createClient(form);
      }
      navigate('/clients');
    } catch {
      setError('Failed to save client. Please check your inputs.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Layout breadcrumb={isEditMode ? 'Edit Client' : 'New Client'}>
        <p className="text-gray-500">Loading...</p>
      </Layout>
    );
  }

  return (
    <Layout breadcrumb={isEditMode ? 'Edit Client' : 'New Client'}>
      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 max-w-2xl">
        <h1 className="text-xl font-bold mb-6">{isEditMode ? 'Edit Client' : 'New Client'}</h1>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <div className="grid grid-cols-2 gap-4">
          <label className="col-span-2">
            <span className="text-sm text-gray-700">Company Name *</span>
            <input
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </label>

          <label>
            <span className="text-sm text-gray-700">Country</span>
            <input
              name="country"
              value={form.country}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </label>

          <label>
            <span className="text-sm text-gray-700">Status *</span>
            <select
              name="clientStatusId"
              value={form.clientStatusId}
              onChange={(e) => setForm({ ...form, clientStatusId: Number(e.target.value) })}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            >
              {statuses.map((s) => (
                <option key={s.Id} value={s.Id}>{s.Status}</option>
              ))}
            </select>
          </label>

          <label className="col-span-2">
            <span className="text-sm text-gray-700">Contact Info</span>
            <input
              name="contactInfo"
              value={form.contactInfo}
              onChange={handleChange}
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
            onClick={() => navigate('/clients')}
            className="border border-gray-300 rounded-full px-6 py-2 text-sm font-medium hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </Layout>
  );
}