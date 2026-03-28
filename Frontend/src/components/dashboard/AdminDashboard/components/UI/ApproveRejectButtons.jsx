const ApproveRejectButtons = ({ id, onApprove, onReject }) => (
  <div className="flex gap-2">
    <button
      onClick={() => onApprove(id)}
      className="text-xs font-bold px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition"
    >
      Approve
    </button>
    <button
      onClick={() => onReject(id)}
      className="text-xs font-bold px-4 py-2 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition"
    >
      Reject
    </button>
  </div>
);

export default ApproveRejectButtons;