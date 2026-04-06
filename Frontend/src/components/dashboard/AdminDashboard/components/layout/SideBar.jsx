import Logo from "../../../../common/Logo";
import { navItems } from "../../constants";

const Sidebar = ({ activeNav, onNavChange, onClose, pendingCounts }) => (
  <aside className="fixed z-30 inset-y-0 left-0 w-64 bg-white border-r border-gray-100 flex flex-col lg:translate-x-0 lg:static">
    {/* Logo */}
    <div className="items-center gap-4 mt-2 px-auto border-b border-gray-100 bg-white">
      {/* Logo Component */}
      <Logo className="h-5 w-auto" />

      {/* Vertical Divider (Optional, adds a premium feel) */}
      <div className="h-6 w-px bg-gray-200" aria-hidden="true" />
    </div>

    {/* Nav */}
    <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
      {navItems.map((item) => {
        const badge = pendingCounts?.[item.id];
        return (
          <button
            key={item.id}
            onClick={() => {
              onNavChange(item.id);
              onClose();
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
              activeNav === item.id
                ? "bg-green-50 text-green-700"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
            }`}
          >
            <span className="text-base w-5 text-center">{item.icon}</span>
            {item.label}
            {badge > 0 && (
              <span className="ml-auto bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {badge}
              </span>
            )}
          </button>
        );
      })}
    </nav>

    {/* Admin profile */}
    <div className="px-4 py-4 border-t border-gray-100">
      <div className="flex items-center gap-3 bg-green-50 rounded-xl p-3">
        <div className="w-9 h-9 rounded-full bg-green-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
          AD
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">
            {localStorage.getItem("username")}
          </p>
          <p className="text-xs text-red-500 font-semibold">Super Admin</p>
        </div>
      </div>
    </div>
  </aside>
);

export default Sidebar;
