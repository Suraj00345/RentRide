import { useState } from "react";
import StatusBadge          from "../UI/StatusBadge";
import VerificationPill     from "../UI/verificationPill";
import ApproveRejectButtons from "../UI/ApproveRejectButtons";
import { approvalStatusConfig } from "../../constants";

const FILTERS = ["all", "pending", "approved", "rejected"];

const CarCard = ({ car, onApprove, onReject }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
    <div className="flex flex-wrap items-start justify-between gap-4">
      {/* Car info */}
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center text-3xl shrink-0">
          {car.carImage}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-bold text-gray-900">{car.name}</h3>
            <span className="text-[11px] font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
              {car.category}
            </span>
          </div>
          <p className="text-xs text-gray-400">{car.plate} · {car.location}</p>
          <p className="text-xs text-gray-400">Listed by {car.owner}</p>
        </div>
      </div>
      <StatusBadge config={approvalStatusConfig[car.status]} withDot />
    </div>

    {/* Specs row */}
    <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-50">
      <div>
        <p className="text-[11px] text-gray-400 font-medium">Year</p>
        <p className="text-sm font-bold text-gray-900">{car.year}</p>
      </div>
      <div>
        <p className="text-[11px] text-gray-400 font-medium">Rate/Day</p>
        <p className="text-sm font-bold text-gray-900">₹{car.pricePerDay.toLocaleString()}</p>
      </div>
      <div>
        <p className="text-[11px] text-gray-400 font-medium">Submitted</p>
        <p className="text-xs font-semibold text-gray-900">{car.submittedOn}</p>
      </div>
    </div>

    {/* Verification chips */}
    <div className="flex flex-wrap gap-2 mt-4">
      <VerificationPill label="Documents"      verified={car.documentsUploaded} />
      <VerificationPill label="Insurance"      verified={car.insuranceValid} />
    </div>

    {/* Actions */}
    <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <div className="w-6 h-6 rounded-full bg-green-100 text-green-700 font-bold text-[10px] flex items-center justify-center">
          {car.ownerAvatar}
        </div>
        Owner: {car.owner}
      </div>
      {car.status === "pending" && (
        <ApproveRejectButtons id={car.id} onApprove={onApprove} onReject={onReject} />
      )}
      {car.status !== "pending" && (
        <span className="text-xs text-gray-400 italic">
          {car.status === "approved" ? "✓ Approved" : "✗ Rejected"}
        </span>
      )}
    </div>
  </div>
);

const CarApprovalsPage = ({ cars, onApprove, onReject }) => {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? cars : cars.filter((c) => c.status === filter);
  const countFor = (f) => cars.filter((c) => c.status === f).length;

  return (
    <div className="space-y-4">
      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {FILTERS.map((f) => {
          const count = f === "all" ? cars.length : countFor(f);
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

      {/* Cards grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((car) => (
          <CarCard key={car.id} car={car} onApprove={onApprove} onReject={onReject} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-2 bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <p className="text-3xl mb-3">🚗</p>
            <p className="text-sm font-semibold text-gray-600">No cars in this category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarApprovalsPage;