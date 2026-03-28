import { useState } from "react";
import StatusBadge from "../UI/StatusBadge";
import { userRoleConfig, userStatusConfig } from "../../constants";

const USER_FILTERS = ["all", "user", "owner"];

const ManageUsersPage = ({ users, onToggleBan }) => {
  const [filter, setFilter]   = useState("all");
  const [search, setSearch]   = useState("");

  const filtered = users
    .filter((u) => filter === "all" || u.role === filter)
    .filter((u) =>
      search === "" ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="space-y-4">
      {/* Search + filter row */}
      <div className="flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Search by name or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] text-sm px-4 py-2 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-200 transition"
        />
        <div className="flex gap-2">
          {USER_FILTERS.map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`text-xs font-semibold px-4 py-2 rounded-xl border transition-all ${
                filter === f
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-gray-500 border-gray-200 hover:border-green-300 hover:text-green-700"
              }`}>
              {f.charAt(0).toUpperCase() + f.slice(1)}s
            </button>
          ))}
        </div>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">User</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Role</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide hidden md:table-cell">Bookings</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide hidden lg:table-cell">Joined</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 font-bold text-xs flex items-center justify-center shrink-0">
                        {user.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${userRoleConfig[user.role].bg} ${userRoleConfig[user.role].text}`}>
                      {userRoleConfig[user.role].label}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 hidden md:table-cell text-sm text-gray-600 font-medium">{user.bookings}</td>
                  <td className="px-5 py-3.5 hidden lg:table-cell text-xs text-gray-400">{user.joined}</td>
                  <td className="px-5 py-3.5">
                    <StatusBadge config={userStatusConfig[user.status]} withDot />
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      onClick={() => onToggleBan(user.id)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition ${
                        user.status === "active"
                          ? "border-red-200 text-red-500 hover:bg-red-50"
                          : "border-green-200 text-green-600 hover:bg-green-50"
                      }`}>
                      {user.status === "active" ? "Ban" : "Unban"}
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-sm text-gray-400">
                    No users found.
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