import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <form
        onSubmit={handleSubmit}
        className="bg-blue-200 border border-blue-400 rounded-lg p-8 w-96"
      >
        <h1 className="text-2xl font-bold text-center mb-1">IDS Fintech Portal</h1>
        <p className="text-center text-gray-700 mb-6">Login</p>

        <label className="block mb-4">
          <span className="text-gray-800">Email:</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 p-2 rounded border border-gray-300"
            required
          />
        </label>

        <label className="block mb-6">
          <span className="text-gray-800">Password:</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 p-2 rounded border border-gray-300"
            required
          />
        </label>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-black text-white rounded py-2 hover:bg-gray-800"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}