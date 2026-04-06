import ApproveRejectButtons from "./ApproveRejectButtons";
import StatusBadge from "./StatusBadge";
import VerificationPill from "./verificationPill";
import { approvalStatusConfig } from "../../constants";

const OwnerCard = ({ owner, onApprove, onReject }) => {
  // Determine status string for the UI based on boolean fields
  const status = owner.isBanned
    ? "rejected"
    : owner.isApproved
      ? "approved"
      : "pending";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 font-bold flex items-center justify-center text-sm shrink-0 uppercase">
            {owner.firstname[0]}
            {owner.lastname[0]}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-bold text-gray-900">
                {owner.firstname} {owner.lastname}
              </h3>
              <span className="text-[10px] text-gray-400 font-mono">
                #{owner._id.slice(-6)}
              </span>
            </div>
            <p className="text-xs text-gray-500">{owner.email}</p>
            <p className="text-xs text-gray-400">
              ID: {owner.ID || "Not Provided"}
            </p>
          </div>
        </div>
        {/* Pass the derived status to the badge */}
        <StatusBadge config={approvalStatusConfig[status]} withDot />
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <VerificationPill label="License" verified={!!owner.license} />
        <VerificationPill label="ID Proof" verified={!!owner.ID} />
      </div>

      <div className="mt-4 pt-4 border-t border-gray-50 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-4 text-xs text-gray-500">
          <span>
            📅 Joined{" "}
            {new Date(owner.joinedAt).toLocaleDateString("en-IN", {
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>

        {status === "pending" && (
          <ApproveRejectButtons
            id={owner._id}
            onApprove={() => onApprove(owner._id)}
            onReject={() => onReject(owner._id)}
          />
        )}

        {status !== "pending" && (
          <span
            className={`text-xs font-semibold italic ${status === "approved" ? "text-green-600" : "text-red-500"}`}
          >
            {status === "approved" ? "✓ Verified Owner" : "✗ Approval Denied"}
          </span>
        )}
      </div>
    </div>
  );
};

export default OwnerCard;
