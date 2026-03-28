const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-lg p-3 text-sm min-w-[140px]">
      <p className="font-semibold text-gray-700 mb-2">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }} className="text-xs mb-0.5">
          {p.name}:{" "}
          {p.name === "bookings" ? p.value : `₹${p.value.toLocaleString()}`}
        </p>
      ))}
    </div>
  );
};

export default CustomTooltip;