import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { getAllTeamMembers } from '../services/teamMemberService';
import type { TeamMember } from '../types/TeamMember';

export default function TeamMembersList () {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getAllTeamMembers().then(setMembers).catch(console.error).finally(() => setLoading(false));
    }, []);

    return (
        <Layout breadcrumb="Team Members">
            <div className="flex justify-end mb-4">
                <button
                onClick={() => navigate('/team/new')}
                className="bg-black text-white rounded-full px-4 py-2 text-sm font-medium hover:bg-gray-800"
                >
                    New Team Member
                </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                {loading ? (
                    <p className="p-6 text-gray-500">Loading team members...</p>
                ) : members.length === 0 ? (
                    <p className="p-6 text-gray-500">No team members found.</p>
                ) : (
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="text-gray-500 border-b border-gray-200 bg-gray-50">
                                <th className="px-4 py-3">Full Name</th>
                                <th className="px-4 py-3">Job Title</th>
                                <th className="px-4 py-3">Department</th>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map((m) => (
                                <tr
                                key={m.id}
                                onClick={() => navigate(`/team/${m.id}/edit`)}
                                className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                                >
                                    <td className="px-4 py-3 font-medium text-gray-800">{m.fullName}</td>
                                    <td className="px-4 py-3">{m.jobTitle}</td>
                                    <td className="px-4 py-3">{m.department}</td>
                                    <td className="px-4 py-3">{m.email}</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs ${m.isActive ? 'bg-gray-200 text-gray-800' : 'bg-red-100 text-red-600'}`}>
                                            {m.isActive ? 'Active' : 'Inactive'}
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