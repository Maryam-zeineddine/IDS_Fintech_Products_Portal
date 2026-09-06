import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
} from '../services/userService';
import { getAllRoles } from '../services/roleService';
import type { Role } from '../types/Role';

export default function UserForm() {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roleId, setRoleId] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getAllRoles().then(setRoles).catch(console.error);
  }, []);

  useEffect(() => {
    if (isEditMode) {
      getUserById(Number(id))
        .then((u) => {
          setName(u.name);
          setEmail(u.email);
          setRoleId(u.roleId);
          setIsActive(u.isActive);
        })
        .catch(() => setError('Failed to load user.'))
        .finally(() => setLoading(false));
    }
  }, [id, isEditMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      if (isEditMode) {
        await updateUser(Number(id), { name, email, roleId, isActive });
      } else {
        await createUser({ name, email, password, roleId });
      }
      navigate('/admin/users');
    } catch {
      setError('Failed to save user.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      await deleteUser(Number(id));
      navigate('/admin/users');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete user.');
    }
  };

  if (loading) {
    return (
      <Layout breadcrumb={isEditMode ? 'Edit User' : 'Create User'}>
        <p className="text-gray-500">Loading...</p>
      </Layout>
    );
  }

  return (
    <Layout breadcrumb={isEditMode ? 'Edit User' : 'Create User'}>
      <button
        onClick={() => navigate('/admin/users')}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-4"
      >
        ← Back to Users
      </button>

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 max-w-xl">
        <h1 className="text-xl font-bold mb-6">{isEditMode ? 'Edit User' : 'Create User'}</h1>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <div className="grid grid-cols-2 gap-4">
          <label className="col-span-2">
            <span className="text-sm text-gray-700">Name *</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </label>

          <label className="col-span-2">
            <span className="text-sm text-gray-700">Email *</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </label>

          {!isEditMode && (
            <label className="col-span-2">
              <span className="text-sm text-gray-700">Password *</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded"
              />
            </label>
          )}

          <label className="col-span-2">
            <span className="text-sm text-gray-700">Role *</span>
            <select
              value={roleId}
              onChange={(e) => setRoleId(Number(e.target.value))}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            >
              <option value={0}>Select role</option>
              {roles.map((r) => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          </label>

          {isEditMode && (
            <label className="col-span-2 flex items-center gap-2">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
              <span className="text-sm text-gray-700">Active</span>
            </label>
          )}
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
    </Layout>
  );
}