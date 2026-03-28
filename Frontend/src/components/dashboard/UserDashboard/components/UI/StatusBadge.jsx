import { bookingStatusConfig } from "../../constants";

const StatusBadge = ({ status, withDot = false }) => {
  const sc = bookingStatusConfig[status];
  if (!sc) return null;

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${sc.bg} ${sc.text} ${sc.border}`}
    >
      {withDot && <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />}
      {sc.label}
    </span>
  );
};

export default StatusBadge;