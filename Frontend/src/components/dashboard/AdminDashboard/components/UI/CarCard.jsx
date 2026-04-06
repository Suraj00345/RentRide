import StatusBadge from "../UI/StatusBadge";
import VerificationPill from "../UI/verificationPill";
import ApproveRejectButtons from "../UI/ApproveRejectButtons";
import { approvalStatusConfig } from "../../constants";

const CarCard = ({ car, onApprove, onReject }) => {
  // Logic to determine status based on boolean fields from DB
  const status = car.isApproved ? "approved" : "pending";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        {/* Car info */}
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center text-3xl shrink-0">
            🚗
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-bold text-gray-900">{car.name}</h3>
              <span className="text-[11px] font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                {car.brand}
              </span>
            </div>
            <p className="text-xs text-gray-400">
              {car.plate} · {car.city}
            </p>
            <p className="text-xs text-gray-400">
              Owner: {car.firstname} {car.lastname}
            </p>
          </div>
        </div>
        <StatusBadge config={approvalStatusConfig[status]} withDot />
      </div>

      {/* Specs row */}
      <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-50">
        <div>
          <p className="text-[11px] text-gray-400 font-medium">Year</p>
          <p className="text-sm font-bold text-gray-900">{car.year || "N/A"}</p>
        </div>
        <div>
          <p className="text-[11px] text-gray-400 font-medium">Rate/Day</p>
          <p className="text-sm font-bold text-gray-900">
            ₹{car.price?.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-[11px] text-gray-400 font-medium">Submitted</p>
          <p className="text-xs font-semibold text-gray-900">
            {new Date(car.date).toLocaleDateString("en-IN", {
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Verification chips */}
      <div className="flex flex-wrap gap-2 mt-4">
        <VerificationPill label="Docs Provided" verified={!!car.plate} />
        <VerificationPill
          label="Verified Owner"
          verified={car.ownerId?.isApproved}
        />
      </div>

      {/* Actions */}
      <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <div className="w-6 h-6 rounded-full bg-green-100 text-green-700 font-bold text-[10px] flex items-center justify-center uppercase">
            {car.firstname[0]}
            {car.lastname[0]}
          </div>
          {car.email}
        </div>

        {status === "pending" && (
          <ApproveRejectButtons
            id={car._id}
            onApprove={() => onApprove(car._id)}
            onReject={() => onReject(car._id)}
          />
        )}

        {status !== "pending" && (
          <span
            className={`text-xs font-semibold italic ${status === "approved" ? "text-green-600" : "text-gray-400"}`}
          >
            {status === "approved"
              ? "✓ Approved for Rent"
              : "✗ Listing Rejected"}
          </span>
        )}
      </div>
    </div>
  );
};

export default CarCard;
