import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { getAllUsers } from '../services/userService';
import type { User } from '../types/User';
import { getAllRoles } from '../services/roleService';
import type { Role } from '../types/Role';

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([getAllUsers(), getAllRoles()])
      .then(([u, r]) => {
        setUsers(u);
        setRoles(r);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const getRoleName = (roleId: number) => roles.find((r) => r.id === roleId)?.name ?? 'Unknown';

  return (
    <Layout breadcrumb="User Management">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate('/admin/users/new')}
          className="bg-black text-white rounded-full px-4 py-2 text-sm font-medium hover:bg-gray-800"
        >
          Create User
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {loading ? (
          <p className="p-6 text-gray-500">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="p-6 text-gray-500">No users found.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-500 border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr
                  key={u.id}
                  onClick={() => navigate(`/admin/users/${u.id}/edit`)}
                  className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-4 py-3 font-medium text-gray-800">{u.name}</td>
                  <td className="px-4 py-3">{u.email}</td>
                  <td className="px-4 py-3">{getRoleName(u.roleId)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${u.isActive ? 'bg-gray-200 text-gray-800' : 'bg-red-100 text-red-600'}`}>
                      {u.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}