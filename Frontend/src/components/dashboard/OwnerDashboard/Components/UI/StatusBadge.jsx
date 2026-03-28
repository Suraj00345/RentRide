import { statusConfig } from "../../Constant/index";

const StatusBadge = ({ status, withDot = false }) => {
  const sc = statusConfig[status];
  if (!sc) return null;

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${sc.bg} ${sc.text} ${sc.border}`}
    >
      {withDot && <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />}
      {sc.label}
    </span>
  );
};

export default StatusBadge;