const StatusBadge = ({ config, withDot = false }) => {
  if (!config) return null;
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${config.bg} ${config.text} ${config.border}`}>
      {withDot && config.dot && <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />}
      {config.label}
    </span>
  );
};

export default StatusBadge;