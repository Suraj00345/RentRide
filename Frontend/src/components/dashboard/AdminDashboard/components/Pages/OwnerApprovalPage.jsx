import { useState, useEffect } from "react";
import axios from "axios";
import OwnerCard from "../UI/OwnerCard";
import RentRideLoader from "../../../../../utils/Loader";
import VITE_API_URL from "../../../../../api"
const BASE_URL = VITE_API_URL;

const FILTERS = ["all", "pending", "approved", "rejected"];

const OwnerApprovalsPage = () => {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const token = localStorage.getItem("token");

  // ─── Fetch Owners ─────────────────────────────
  const fetchOwners = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/dashboard/getOwners`, {
        headers: { Authorization: token },
      });
      setOwners(res.data?.data?.owners || []);
    //  console.log(res.data?.data?.owners);
     
      
    } catch (error) {
      console.error("Error fetching owners:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOwners();
  }, []);

  // ─── Toggle Approve / Reject ─────────────────
  const handleToggleApprove = async (userId) => {
    try {
      await axios.patch(
        `${BASE_URL}/dashboard/toggleApprove-owner/${userId}`,
        {},
        {
          headers: { Authorization: token }, // ✅ FIXED
        }
      );

      // ✅ OPTIMISTIC UPDATE (no refetch)
      setOwners((prev) =>
        prev.map((o) =>
          o._id === userId
            ? {
                ...o,
                isApproved: !o.isApproved,
                isBanned: false, // reset if needed
              }
            : o
        )
      );
    } catch (error) {
      console.error(error);
      alert("Action failed. Please try again.");
    }
  };

  // ─── Status mapping ──────────────────────────
  const getStatus = (o) =>
    o.isBanned ? "banned" : o.isApproved ? "approved" : "pending";

  const filtered =
    filter === "all" ? owners : owners.filter((o) => getStatus(o) === filter);

  const countFor = (f) => owners.filter((o) => getStatus(o) === f).length;

  if (loading) return <RentRideLoader />;

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {FILTERS.map((f) => {
          const count = f === "all" ? owners.length : countFor(f);

          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs font-semibold px-4 py-2 rounded-xl border transition-all ${
                filter === f
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-gray-500 border-gray-200 hover:border-green-300 hover:text-green-700"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              <span
                className={`ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  filter === f
                    ? "bg-white/25 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Owners List */}
      <div className="space-y-4">
        {filtered.map((owner) => (
          <OwnerCard
            key={owner._id}
            owner={owner}
            onApprove={handleToggleApprove}
            onReject={handleToggleApprove}
          />
        ))}

        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <p className="text-3xl mb-3">👤</p>
            <p className="text-sm font-semibold text-gray-600">
              No owner requests found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerApprovalsPage;