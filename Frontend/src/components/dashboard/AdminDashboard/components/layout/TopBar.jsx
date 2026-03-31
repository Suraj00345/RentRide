import { PAGE_TITLES } from "../../constants";

const TopBar = ({ activeNav, onMenuOpen, totalPending }) => (
  <header className="bg-white border-b mt-1 border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
    <div className="flex items-center gap-3">
      <button className="lg:hidden text-gray-500 hover:text-gray-800" onClick={onMenuOpen}>
        ☰
      </button>
      <div>
        <h1 className="text-lg font-bold text-gray-900">{PAGE_TITLES[activeNav] ?? "Admin"}</h1>
        <p className="text-xs text-gray-400">Saturday, 28 March 2026</p>
      </div>
    </div>

    <div className="flex items-center gap-3">
      {totalPending > 0 && (
        <div className="hidden sm:flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-xl">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          {totalPending} pending approval{totalPending > 1 ? "s" : ""}
        </div>
      )}
      <button className="relative p-2 rounded-xl hover:bg-gray-50 text-gray-500 transition">
        <span className="text-lg">🔔</span>
        {totalPending > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        )}
      </button>
    </div>
  </header>
);

export default TopBar;