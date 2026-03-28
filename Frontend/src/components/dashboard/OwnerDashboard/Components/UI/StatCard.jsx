const StatCard = ({ label, value, sub, accent }) => (
  <div
    className={`rounded-2xl p-5 border shadow-sm ${
      accent ? "bg-green-600 border-green-700" : "bg-white border-gray-100"
    }`}
  >
    <p
      className={`text-xs font-semibold uppercase tracking-widest mb-2 ${
        accent ? "text-green-100" : "text-gray-400"
      }`}
    >
      {label}
    </p>
    <p className={`text-3xl font-bold ${accent ? "text-white" : "text-gray-900"}`}>
      {value}
    </p>
    {sub && (
      <p className={`text-xs mt-1 ${accent ? "text-green-200" : "text-gray-400"}`}>
        {sub}
      </p>
    )}
  </div>
);

export default StatCard;