import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import{
    createTeamMember,
    updateTeamMember,
    deleteTeamMember,
    getTeamMemberById,
} from '../services/teamMemberService';

export default function TeamMemberForm () {
    const {id} = useParams();
    const isEditMode  = !!id;
    const navigate = useNavigate();

    const [fullName, setFullName] = useState('');
    const [department, setDepartment] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [email, setEmail] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [loading, setLoading] = useState(isEditMode);
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);


    useEffect(() => {
    if (isEditMode) {
      getTeamMemberById(Number(id))
        .then((m) => {
          setFullName(m.fullName);
          setDepartment(m.department ?? '');
          setJobTitle(m.jobTitle ?? '');
          setEmail(m.email);
          setIsActive(m.isActive);
        })
        .catch(() => setError('Failed to load team member.'))
        .finally(() => setLoading(false));
    }
  }, [id, isEditMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
        if (isEditMode) {
            await updateTeamMember(Number(id), { fullName, department, jobTitle, email, isActive });
        } else {
            await createTeamMember({ fullName, department, jobTitle, email });
        }
        navigate('/team');
        } catch {
            setError('Failed to save team member.');
        } finally {
            setSaving(false);
        }
    } 


    const handleDelete = async () => {
        if (!confirm('Are you sure you want to remove this team member?')) return;
        try {
            await deleteTeamMember(Number(id));
            navigate('/team');
        } catch (err: any) {
            alert(err.response?.data?.message || 'Failed to delete team member.');
        }
    };

    if (loading) {
        return (
            <Layout breadcrumb={isEditMode ? 'Edit Team Member' : 'New Team Member'}>
                <p className="text-gray-500">Loading...</p>
            </Layout>
        );
    }

    return (
        <Layout breadcrumb={isEditMode ? 'Edit Team Member' : 'New Team Member'}>
            <button
            onClick={() => navigate('/team')}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-4"
            >
                ← Back to Team Members
            </button>

            <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 max-w-xl">
                <h1 className="text-xl font-bold mb-6">{isEditMode ? 'Edit Team Member' : 'New Team Member'}</h1>
                {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

                <div className="grid grid-cols-2 gap-4">
                    <label className="col-span-2">
                        <span className="text-sm text-gray-700">Full Name *</span>
                        <input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className="w-full mt-1 p-2 border border-gray-300 rounded"
                        />
                    </label>

                    <label>
                        <span className="text-sm text-gray-700">Job Title</span>
                        <input
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        className="w-full mt-1 p-2 border border-gray-300 rounded"
                        />
                    </label>

                    <label>
                        <span className="text-sm text-gray-700">Department</span>
                        <input
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
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
                            Remove
                        </button>
                    )}
                </div>
            </form>
        </Layout>
    );
}