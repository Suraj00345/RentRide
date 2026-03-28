import { useState } from "react";
import StatusBadge        from "../UI/StatusBadge";
import VerificationPill   from "../UI/verificationPill";
import ApproveRejectButtons from "../UI/ApproveRejectButtons";
import { approvalStatusConfig } from "../../constants";

const FILTERS = ["all", "pending", "approved", "rejected"];

const OwnerCard = ({ owner, onApprove, onReject }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
    <div className="flex flex-wrap items-start justify-between gap-4">
      {/* Identity */}
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 font-bold flex items-center justify-center text-sm shrink-0">
          {owner.avatar}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-bold text-gray-900">{owner.name}</h3>
            <span className="text-xs text-gray-400">{owner.id}</span>
          </div>
          <p className="text-xs text-gray-500">{owner.email}</p>
          <p className="text-xs text-gray-400">{owner.phone} · {owner.location}</p>
        </div>
      </div>
      <StatusBadge config={approvalStatusConfig[owner.status]} withDot />
    </div>

    {/* Verification chips */}
    <div className="flex flex-wrap gap-2 mt-4">
      <VerificationPill label="Licence"        verified={owner.licenceUploaded} />
      <VerificationPill label="ID Verified"    verified={owner.idVerified} />
    </div>

    {/* Footer */}
    <div className="mt-4 pt-4 border-t border-gray-50 flex flex-wrap items-center justify-between gap-3">
      <div className="flex gap-4 text-xs text-gray-500">
        <span>🚗 {owner.cars} car{owner.cars > 1 ? "s" : ""} listed</span>
        <span>📅 Joined {owner.joinedOn}</span>
      </div>
      {owner.status === "pending" && (
        <ApproveRejectButtons id={owner.id} onApprove={onApprove} onReject={onReject} />
      )}
      {owner.status !== "pending" && (
        <span className="text-xs text-gray-400 italic">
          {owner.status === "approved" ? "✓ Approved" : "✗ Rejected"}
        </span>
      )}
    </div>
  </div>
);

const OwnerApprovalsPage = ({ owners, onApprove, onReject }) => {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? owners : owners.filter((o) => o.status === filter);
  const countFor = (f) => owners.filter((o) => o.status === f).length;

  return (
    <div className="space-y-4">
      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {FILTERS.map((f) => {
          const count = f === "all" ? owners.length : countFor(f);
          return (
            <button key={f} onClick={() => setFilter(f)}
              className={`text-xs font-semibold px-4 py-2 rounded-xl border transition-all ${
                filter === f
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-gray-500 border-gray-200 hover:border-green-300 hover:text-green-700"
              }`}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
              <span className={`ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                filter === f ? "bg-white/25 text-white" : "bg-gray-100 text-gray-500"
              }`}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {filtered.map((owner) => (
          <OwnerCard key={owner.id} owner={owner} onApprove={onApprove} onReject={onReject} />
        ))}
        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <p className="text-3xl mb-3">👤</p>
            <p className="text-sm font-semibold text-gray-600">No owners in this category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerApprovalsPage;