import { useState, useEffect } from "react";
import axios from "axios";
import StatusBadge from "../UI/StatusBadge";
import { userRoleConfig, userStatusConfig } from "../../constants";
import BASE_URL from "../../../../../api";
import RentRideLoader from "../../../../../utils/Loader";

const USER_FILTERS = ["all", "user", "owner"];
const API_URL = BASE_URL;

const ManageUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`${API_URL}/dashboard/getUser`, {
        headers: { Authorization: token },
      });
      if (data.success) {
        setUsers(data.users);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onToggleBan = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      // Updated endpoint to match common naming or your specific route
      const response = await axios.patch(
        `${API_URL}/dashboard/toggle-ban/${userId}`,
        {},
        { headers: { Authorization: token } },
      );

      if (response.data.success) {
        // ✅ Optimization: Update local state directly instead of re-fetching everything
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u._id === userId
              ? { ...u, isBanned: response.data.currentStatus }
              : u,
          ),
        );
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Failed to update user status";
      alert(errorMsg);
    }
  };

  const filtered = users
    .filter((u) => filter === "all" || u.role === filter)
    .filter((u) => {
      const fullName = `${u.firstname} ${u.lastname}`.toLowerCase();
      const searchLower = search.toLowerCase();
      return (
        search === "" ||
        fullName.includes(searchLower) ||
        u.email.toLowerCase().includes(searchLower)
      );
    });

  if (loading) return <RentRideLoader />;

  return (
    <div className="space-y-4">
      {/* Search + filter row */}
      <div className="flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Search artists by name or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] text-sm px-4 py-2 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-200 transition"
        />
        <div className="flex gap-2">
          {USER_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs font-semibold px-4 py-2 rounded-xl border transition-all ${
                filter === f
                  ? "bg-green-600 text-white border-green-600 shadow-md shadow-purple-100"
                  : "bg-white text-gray-500 border-gray-200 hover:border-green-300 hover:text-green-700"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}s
            </button>
          ))}
        </div>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-5 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Artist
                </th>
                <th className="text-left px-5 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Role
                </th>
                <th className="text-left px-5 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest hidden lg:table-cell">
                  Joined
                </th>
                <th className="text-left px-5 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Status
                </th>
                <th className="px-5 py-4" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => {
                // ✅ UPDATED LOGIC: Check for the string "banned"
                const isUserBanned = user.isBanned === "banned";
                const initials = `${user.firstname?.[0] || ""}${user.lastname?.[0] || ""}`;

                return (
                  <tr
                    key={user._id}
                    className="border-b border-gray-50 last:border-0 hover:bg-purple-50/30 transition"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center shrink-0 uppercase border border-purple-200">
                          {initials}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-sm">
                            {user.firstname} {user.lastname}
                          </p>
                          <p className="text-xs text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-lg ${userRoleConfig[user.role]?.bg || "bg-gray-100"} ${userRoleConfig[user.role]?.text || "text-gray-600"}`}
                      >
                        {userRoleConfig[user.role]?.label || user.role}
                      </span>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell text-xs text-gray-400 font-medium">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString(
                            undefined,
                            { dateStyle: "medium" },
                          )
                        : "N/A"}
                    </td>
                    <td className="px-5 py-4">
                      {/* ✅ StatusBadge handles "banned" vs "active" keys */}
                      <StatusBadge
                        config={
                          userStatusConfig[isUserBanned ? "banned" : "active"]
                        }
                        withDot
                      />
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => onToggleBan(user._id)}
                        disabled={user.role === "admin"}
                        className={`text-xs font-bold px-4 py-2 rounded-xl border transition-all transform active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed ${
                          !isUserBanned
                            ? "border-red-100 text-red-500 hover:bg-red-50 hover:border-red-200"
                            : "border-purple-100 text-purple-600 hover:bg-purple-50 hover:border-purple-200"
                        }`}
                      >
                        {!isUserBanned ? "Ban User" : "Lift Ban"}
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-20 text-center text-gray-400 italic"
                  >
                    No creators found in the current gallery view.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsersPage;
