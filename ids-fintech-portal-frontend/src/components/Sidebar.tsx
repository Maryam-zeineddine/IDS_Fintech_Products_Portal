import { NavLink} from "react-router-dom";
import { useAuth} from "../context/AuthContext";

const navItems = [
    { label: 'Dashboard', path: '/dashboard'},
    { label: 'Products', path: '/products'},
    { label: 'Clients', path: '/clients'},
    { label: 'Deployments', path: '/deployments'},
    { label: 'Team Members', path: '/team'},
];

export default function sidebar() {
    const {user} = useAuth();

    return (
    <aside className="w-60 bg-white border-r border-gray-200 h-screen flex flex-col p-4">
      <div className="mb-8">
        <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold">
          IDS
        </div>
        <p className="mt-2 font-semibold text-gray-800">IDS Fintech</p>
        <p className="text-sm text-gray-500">Products Portal</p>
      </div>

      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `px-4 py-2 rounded-full text-sm font-medium transition ${
                isActive
                  ? 'bg-gray-200 text-black'
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {user?.role === 'Admin' && (
        <div className="mt-8 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-400 mb-2 px-4">Administration</p>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `px-4 py-2 rounded-full text-sm font-medium transition block ${
                isActive
                  ? 'bg-gray-200 text-black'
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            User Management
          </NavLink>
        </div>
      )}
    </aside>
  );



}