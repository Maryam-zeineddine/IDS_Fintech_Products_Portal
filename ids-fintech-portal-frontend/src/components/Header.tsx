import { useAuth} from '../context/AuthContext';

interface HeaderProps {
    breadcrumb: string;
}

export default function Header({ breadcrumb}: HeaderProps) {
    const { user, logout} = useAuth();

    return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
      <div className="text-gray-500 text-sm">
        IDS Fintech Products Portal <span className="mx-1">›</span>{' '}
        <span className="text-gray-800 font-medium">{breadcrumb}</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold">
          {user?.name?.slice(0, 2).toUpperCase()}
        </div>
        <div className="text-sm">
          <p className="font-medium text-gray-800">{user?.name}</p>
          <p className="text-gray-500">{user?.role}</p>
        </div>
        <button
          onClick={logout}
          className="ml-4 text-sm text-gray-500 hover:text-black"
        >
          Logout
        </button>
      </div>
    </header>
  );
}