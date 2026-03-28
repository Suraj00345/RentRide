import { useState } from "react";
import StatusBadge from "../UI/StatusBadge";
import { recentTransactions } from "../../data";
import { transactionStatusConfig } from "../../constants";

const TXN_FILTERS = ["all", "completed", "refunded", "pending", "failed"];

const TransactionsPage = () => {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = recentTransactions
    .filter((t) => filter === "all" || t.status === filter)
    .filter((t) =>
      search === "" ||
      t.user.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="space-y-4">
      {/* Search + filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Search by user or transaction ID…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[220px] text-sm px-4 py-2 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-200 transition"
        />
        <div className="flex gap-2 flex-wrap">
          {TXN_FILTERS.map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`text-xs font-semibold px-3 py-2 rounded-xl border transition-all ${
                filter === f
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-gray-500 border-gray-200 hover:border-green-300 hover:text-green-700"
              }`}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Txn ID</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">User</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide hidden md:table-cell">Car</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide hidden lg:table-cell">Date</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Amount</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide hidden md:table-cell">Commission</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((txn) => (
                <tr key={txn.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition">
                  <td className="px-5 py-3.5 text-xs font-mono text-gray-500">{txn.id}</td>
                  <td className="px-5 py-3.5 font-semibold text-gray-900">{txn.user}</td>
                  <td className="px-5 py-3.5 text-gray-500 hidden md:table-cell text-xs">{txn.car}</td>
                  <td className="px-5 py-3.5 text-gray-400 text-xs hidden lg:table-cell">{txn.date}</td>
                  <td className="px-5 py-3.5 text-right font-bold text-gray-900">₹{txn.amount.toLocaleString()}</td>
                  <td className="px-5 py-3.5 text-right text-green-700 font-semibold hidden md:table-cell">₹{txn.commission.toLocaleString()}</td>
                  <td className="px-5 py-3.5">
                    <StatusBadge config={transactionStatusConfig[txn.status]} />
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-sm text-gray-400">
                    No transactions found.
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

export default TransactionsPage;