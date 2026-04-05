const pageTitles = {
  dashboard: "Dashboard Overview",
  cars: "My Listed Cars",
  orders: "Rental Orders",
  earnings: "Earnings",
  reviews: "Reviews",
  settings: "Settings",
};

const TopBar = ({ activeNav, onMenuOpen }) => (
  <header className="bg-white border-b mt-1 border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
    <div className="flex items-center gap-3">
      <button
        className="lg:hidden text-gray-500 hover:text-gray-800"
        onClick={onMenuOpen}
      >
        ☰
      </button>
      <div>
        <h1 className="text-lg font-bold text-gray-900">
          {pageTitles[activeNav] ?? "Dashboard"}
        </h1>
        <p className="text-xs text-gray-400">Friday, 27 March 2026</p>
      </div>
    </div>

    <div className="flex items-center gap-3">
      <button className="hidden sm:flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
        <span>+</span> Add Car
      </button>
    </div>
  </header>
);

export default TopBar;
