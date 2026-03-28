const StatCard = ({ label, value, sub, accent, icon, trend }) => (
  <div
    className={`rounded-2xl p-5 border shadow-sm ${
      accent ? "bg-green-600 border-green-700" : "bg-white border-gray-100"
    }`}
  >
    <div className="flex items-start justify-between mb-3">
      <p className={`text-xs font-semibold uppercase tracking-widest ${accent ? "text-green-100" : "text-gray-400"}`}>
        {label}
      </p>
      {icon && (
        <span className={`text-xl ${accent ? "text-green-200" : "text-gray-200"}`}>{icon}</span>
      )}
    </div>
    <p className={`text-3xl font-bold ${accent ? "text-white" : "text-gray-900"}`}>{value}</p>
    {(sub || trend) && (
      <div className="flex items-center gap-2 mt-1">
        {trend && (
          <span className={`text-xs font-bold ${trend > 0 ? (accent ? "text-green-200" : "text-green-600") : "text-red-500"}`}>
            {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%
          </span>
        )}
        {sub && <p className={`text-xs ${accent ? "text-green-200" : "text-gray-400"}`}>{sub}</p>}
      </div>
    )}
  </div>
);

export default StatCard;