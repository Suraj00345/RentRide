const VerificationPill = ({ label, verified }) => (
  <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
    verified
      ? "bg-green-50 text-green-700 border border-green-200"
      : "bg-red-50 text-red-600 border border-red-200"
  }`}>
    {verified ? "✓" : "✗"} {label}
  </span>
);

export default VerificationPill;