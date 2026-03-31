const SpecCard = ({ icon, label, value }) => (
  <div className="bg-gray-50 p-4 rounded-xl flex flex-col gap-2 border border-transparent hover:border-green-100 transition-colors">
    <span className="text-green-600 text-xl">{icon}</span>
    <div>
      <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">{label}</p>
      <p className="text-sm font-semibold text-gray-700">{value}</p>
    </div>
  </div>
);

export default SpecCard;